import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { generateCareerRoadmap, moderateContent } from '../../../services/careerAIService';

const CareerGuideForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    dreamCareer: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.name?.trim()) {
      newErrors.name = 'Please enter your name';
    } else if (formData?.name?.trim()?.length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }
    
    if (!formData?.dreamCareer?.trim()) {
      newErrors.dreamCareer = 'Please enter your dream career';
    } else if (formData?.dreamCareer?.trim()?.length < 3) {
      newErrors.dreamCareer = 'Career must be at least 3 characters long';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    try {
      // Moderate user input before processing
      const isNameSafe = await moderateContent(formData?.name);
      const isCareerSafe = await moderateContent(formData?.dreamCareer);
      
      if (!isNameSafe || !isCareerSafe) {
        setErrors({
          submit: 'Please ensure your input contains appropriate content only.'
        });
        return;
      }

      // Generate AI-powered career roadmap
      const roadmapData = await generateCareerRoadmap(
        formData?.name?.trim(),
        formData?.dreamCareer?.trim()
      );
      
      // Store the generated roadmap data
      localStorage.setItem('careerGuideData', JSON.stringify(formData));
      localStorage.setItem('aiGeneratedRoadmap', JSON.stringify(roadmapData));
      
      // Navigate to results page with the data
      navigate('/career-roadmap-results', {
        state: { 
          roadmapData,
          userInput: formData 
        }
      });

    } catch (error) {
      console.error('Error generating AI roadmap:', error);
      
      // Enhanced error handling for different scenarios
      let errorMessage = 'Failed to generate your career roadmap. Please try again.';
      
      if (error?.message?.includes('quota') || error?.message?.includes('429')) {
        errorMessage = 'OpenAI API quota exceeded. The system will use demo data for now. Please check your billing or try again later.';
      } else if (error?.message?.includes('API key')) {
        errorMessage = 'OpenAI service configuration issue. Using demo data instead.';
      } else if (error?.message?.includes('network') || error?.message?.includes('fetch')) {
        errorMessage = 'Network connection issue. Please check your internet connection and try again.';
      } else if (error?.message?.includes('unavailable')) {
        errorMessage = 'AI service is temporarily unavailable. Using demo data instead.';
      }
      
      setErrors({
        submit: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Input */}
        <div className="space-y-2">
          <Input
            label="Your Name"
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData?.name}
            onChange={handleInputChange}
            error={errors?.name}
            required
            disabled={isLoading}
            className="w-full"
          />
        </div>

        {/* Dream Career Input */}
        <div className="space-y-2">
          <Input
            label="Dream Career"
            type="text"
            name="dreamCareer"
            placeholder="e.g., Software Engineer, Data Scientist, Product Manager"
            value={formData?.dreamCareer}
            onChange={handleInputChange}
            error={errors?.dreamCareer}
            required
            disabled={isLoading}
            className="w-full"
            description="Be specific about the role you want to pursue"
          />
        </div>

        {/* Loading Progress */}
        {isLoading && (
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <div className="flex items-center space-x-3">
              <Icon name="Brain" size={20} color="var(--color-primary)" className="animate-pulse" />
              <div className="flex-1">
                <p className="text-sm font-medium text-primary">
                  AI is creating your personalized roadmap...
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  This may take 30-60 seconds. Please don't refresh the page.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Submit Error */}
        {errors?.submit && (
          <div className={`p-4 rounded-lg border ${
            errors?.submit?.includes('demo data') || errors?.submit?.includes('quota') 
              ? 'bg-warning/10 border-warning/20' :'bg-error/10 border-error/20'
          }`}>
            <div className="flex items-start space-x-2">
              <Icon 
                name={errors?.submit?.includes('demo data') || errors?.submit?.includes('quota') 
                  ? "AlertTriangle" : "AlertCircle"} 
                size={16} 
                color={errors?.submit?.includes('demo data') || errors?.submit?.includes('quota') 
                  ? "var(--color-warning)" : "var(--color-error)"} 
                className="mt-0.5"
              />
              <div className="flex-1">
                <span className={`text-sm font-medium ${
                  errors?.submit?.includes('demo data') || errors?.submit?.includes('quota') 
                    ? 'text-warning' : 'text-error'
                }`}>
                  {errors?.submit}
                </span>
                {errors?.submit?.includes('quota') && (
                  <div className="mt-2 space-y-1">
                    <a 
                      href="https://platform.openai.com/usage" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-xs block"
                    >
                      → Check your OpenAI usage and billing
                    </a>
                    <a 
                      href="https://platform.openai.com/account/billing" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-xs block"
                    >
                      → Add credits to your OpenAI account
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* API Key Notice */}
        {!import.meta.env?.VITE_OPENAI_API_KEY && !isLoading && (
          <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
            <div className="flex items-start space-x-2">
              <Icon name="AlertTriangle" size={16} color="var(--color-warning)" className="mt-0.5" />
              <div className="text-sm text-warning">
                <p className="font-medium">OpenAI API Key Required</p>
                <p className="mt-1">
                  To use AI-powered career roadmaps, please add your OpenAI API key to the environment variables.
                </p>
                <a 
                  href="https://platform.openai.com/api-keys" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline mt-1 inline-block"
                >
                  Get your API key here →
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isLoading}
            disabled={isLoading || !formData?.name?.trim() || !formData?.dreamCareer?.trim()}
            iconName={isLoading ? "Loader2" : "Sparkles"}
            iconPosition="left"
            iconSize={20}
            className="gradient-primary text-white font-semibold py-4 text-lg"
          >
            {isLoading ? 'Generating AI Roadmap...' : 'Generate My AI Career Roadmap'}
          </Button>
          
          {!isLoading && (
            <p className="text-center text-xs text-muted-foreground mt-2">
              Powered by OpenAI GPT-5 • Personalized just for you
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default CareerGuideForm;