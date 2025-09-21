import openai from './openaiClient';

/**
 * Utility function to wait for a specified amount of time
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise} Promise that resolves after the specified time
 */
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Retry function with exponential backoff
 * @param {Function} fn - Function to retry
 * @param {number} retries - Number of retries
 * @param {number} delay - Initial delay in milliseconds
 * @returns {Promise} Result of the function or throws error
 */
const retryWithBackoff = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) {
      throw error;
    }
    
    // Check if it's a quota/rate limit error
    if (error?.status === 429 || error?.message?.includes('quota') || error?.message?.includes('429')) {
      console.warn(`Rate limit hit, retrying in ${delay}ms... (${retries} retries left)`);
      await wait(delay);
      return retryWithBackoff(fn, retries - 1, delay * 2); // Exponential backoff
    }
    
    // For other errors, don't retry
    throw error;
  }
};

/**
 * Generates mock career roadmap data when AI service is unavailable
 * @param {string} name - User's name
 * @param {string} dreamCareer - User's desired career
 * @returns {Object} Mock structured career roadmap data
 */
const generateMockRoadmap = (name, dreamCareer) => {
  const careerTitle = dreamCareer?.toLowerCase()?.includes('software') ? 'Software Engineer' : 
                     dreamCareer?.toLowerCase()?.includes('data') ? 'Data Scientist' :
                     dreamCareer?.toLowerCase()?.includes('product') ? 'Product Manager' :
                     dreamCareer || 'Professional';
  
  return {
    career: {
      title: careerTitle,
      description: `${careerTitle} is an exciting and rapidly growing field with excellent opportunities for career advancement. This role involves working with cutting-edge technologies and solving complex problems that impact millions of users worldwide. \n\nWith the increasing digital transformation across industries, professionals in this field are in high demand and can expect strong job security and competitive compensation packages.`,
      growth: '+22% growth expected over next 10 years',
      salaryRange: '$75,000 - $160,000 annually'
    },
    skills: [
      { name: 'Programming Languages', category: 'Technical', level: 'Advanced' },
      { name: 'Problem Solving', category: 'Soft Skills', level: 'Advanced' },
      { name: 'Version Control (Git)', category: 'Tools', level: 'Intermediate' },
      { name: 'Agile Methodology', category: 'Technical', level: 'Intermediate' },
      { name: 'Communication', category: 'Soft Skills', level: 'Advanced' },
      { name: 'Database Management', category: 'Technical', level: 'Intermediate' },
      { name: 'Cloud Platforms', category: 'Tools', level: 'Intermediate' },
      { name: 'API Development', category: 'Technical', level: 'Advanced' },
      { name: 'Testing & QA', category: 'Technical', level: 'Intermediate' },
      { name: 'Team Collaboration', category: 'Soft Skills', level: 'Advanced' },
      { name: 'CI/CD Pipelines', category: 'Tools', level: 'Intermediate' },
      { name: 'Industry Certifications', category: 'Certifications', level: 'Beginner' }
    ],
    roadmap: [
      {
        month: 1,
        title: 'Foundation Building',
        description: 'Establish core fundamentals and learning routine',
        tasks: [
          {
            title: 'Set up development environment',
            description: 'Install necessary tools and configure workspace',
            priority: 'high',
            timeframe: '1 week'
          },
          {
            title: 'Complete basic programming course',
            description: 'Learn fundamental programming concepts',
            priority: 'high',
            timeframe: '3 weeks'
          }
        ]
      },
      {
        month: 2,
        title: 'Skill Development',
        description: 'Build intermediate technical skills',
        tasks: [
          {
            title: 'Build first project',
            description: 'Create a portfolio-worthy project',
            priority: 'high',
            timeframe: '2 weeks'
          },
          {
            title: 'Learn version control',
            description: 'Master Git and GitHub workflows',
            priority: 'medium',
            timeframe: '1 week'
          }
        ]
      },
      {
        month: 3,
        title: 'Advanced Learning',
        description: 'Dive deeper into specialized areas',
        tasks: [
          {
            title: 'Advanced framework study',
            description: 'Learn industry-standard frameworks',
            priority: 'high',
            timeframe: '3 weeks'
          },
          {
            title: 'Database fundamentals',
            description: 'Understanding database design and querying',
            priority: 'medium',
            timeframe: '1 week'
          }
        ]
      },
      {
        month: 4,
        title: 'Project Portfolio',
        description: 'Build comprehensive project portfolio',
        tasks: [
          {
            title: 'Complete major project',
            description: 'Build a full-stack application',
            priority: 'high',
            timeframe: '3 weeks'
          },
          {
            title: 'Code review and optimization',
            description: 'Refine and optimize existing projects',
            priority: 'medium',
            timeframe: '1 week'
          }
        ]
      },
      {
        month: 5,
        title: 'Professional Development',
        description: 'Focus on career preparation and networking',
        tasks: [
          {
            title: 'Resume and portfolio polish',
            description: 'Perfect professional presentation materials',
            priority: 'high',
            timeframe: '1 week'
          },
          {
            title: 'Practice interviews',
            description: 'Technical and behavioral interview preparation',
            priority: 'high',
            timeframe: '2 weeks'
          },
          {
            title: 'Network with professionals',
            description: 'Connect with industry professionals',
            priority: 'medium',
            timeframe: '1 week'
          }
        ]
      },
      {
        month: 6,
        title: 'Job Search & Specialization',
        description: 'Apply for positions and continue learning',
        tasks: [
          {
            title: 'Job applications',
            description: 'Apply to targeted positions',
            priority: 'high',
            timeframe: '2 weeks'
          },
          {
            title: 'Skill specialization',
            description: 'Deepen expertise in chosen area',
            priority: 'medium',
            timeframe: '2 weeks'
          }
        ]
      }
    ],
    courses: [
      {
        title: 'Complete Web Development Bootcamp',
        provider: 'Udemy',
        description: 'Comprehensive course covering full-stack web development',
        duration: '65 hours',
        rating: '4.7/5',
        url: 'https://www.udemy.com'
      },
      {
        title: 'CS50 Introduction to Computer Science',
        provider: 'Harvard (edX)',
        description: 'Harvard\'s introduction to computer science fundamentals',
        duration: '12 weeks',
        rating: '4.9/5',
        url: 'https://www.edx.org'
      },
      {
        title: 'JavaScript Algorithms and Data Structures',
        provider: 'freeCodeCamp',
        description: 'Free comprehensive JavaScript programming course',
        duration: '300 hours',
        rating: '4.8/5',
        url: 'https://www.freecodecamp.org'
      },
      {
        title: 'React - The Complete Guide',
        provider: 'Udemy',
        description: 'Master React.js with hooks, context, and advanced patterns',
        duration: '48 hours',
        rating: '4.6/5',
        url: 'https://www.udemy.com'
      },
      {
        title: 'Python for Data Science',
        provider: 'Coursera',
        description: 'Learn Python programming for data analysis',
        duration: '6 weeks',
        rating: '4.5/5',
        url: 'https://www.coursera.org'
      },
      {
        title: 'Git and GitHub Crash Course',
        provider: 'YouTube',
        description: 'Master version control with practical examples',
        duration: '2 hours',
        rating: '4.7/5',
        url: 'https://www.youtube.com'
      },
      {
        title: 'Database Design and Management',
        provider: 'LinkedIn Learning',
        description: 'Comprehensive database design principles',
        duration: '4 hours',
        rating: '4.4/5',
        url: 'https://www.linkedin.com/learning'
      },
      {
        title: 'Cloud Computing Fundamentals',
        provider: 'AWS Training',
        description: 'Introduction to cloud computing concepts',
        duration: '8 hours',
        rating: '4.6/5',
        url: 'https://aws.amazon.com/training'
      }
    ],
    generatedFor: name,
    targetCareer: dreamCareer,
    generatedAt: new Date()?.toISOString(),
    aiModel: 'mock-data',
    isDemo: true
  };
};

/**
 * Generates a comprehensive career roadmap using OpenAI with fallback strategies
 * @param {string} name - User's name
 * @param {string} dreamCareer - User's desired career
 * @returns {Promise<Object>} Structured career roadmap data
 */
export async function generateCareerRoadmap(name, dreamCareer) {
  // Check if OpenAI API key is available
  if (!import.meta.env?.VITE_OPENAI_API_KEY || import.meta.env?.VITE_OPENAI_API_KEY === 'your-openai-api-key-here') {
    console.warn('OpenAI API key not found, using mock data');
    return generateMockRoadmap(name, dreamCareer);
  }

  const careerRoadmapSchema = {
    type: 'object',
    properties: {
      career: {
        type: 'object',
        properties: {
          title: { type: 'string', description: 'Professional career title' },
          description: { type: 'string', description: 'Detailed career description (2-3 paragraphs)' },
          growth: { type: 'string', description: 'Career growth outlook with percentage' },
          salaryRange: { type: 'string', description: 'Salary range in USD format' }
        },
        required: ['title', 'description', 'growth', 'salaryRange']
      },
      skills: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Skill name' },
            category: { type: 'string', enum: ['Technical', 'Soft Skills', 'Tools', 'Certifications'] },
            level: { type: 'string', enum: ['Beginner', 'Intermediate', 'Advanced'] }
          },
          required: ['name', 'category', 'level']
        },
        minItems: 12,
        maxItems: 16
      },
      roadmap: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            month: { type: 'number', minimum: 1, maximum: 6 },
            title: { type: 'string' },
            description: { type: 'string' },
            tasks: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  description: { type: 'string' },
                  priority: { type: 'string', enum: ['high', 'medium', 'low'] },
                  timeframe: { type: 'string' }
                },
                required: ['title', 'description', 'priority', 'timeframe']
              },
              minItems: 2,
              maxItems: 4
            }
          },
          required: ['month', 'title', 'description', 'tasks']
        },
        minItems: 6,
        maxItems: 6
      },
      courses: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            provider: { type: 'string' },
            description: { type: 'string' },
            duration: { type: 'string' },
            rating: { type: 'string' },
            url: { type: 'string' }
          },
          required: ['title', 'provider', 'description', 'duration', 'rating', 'url']
        },
        minItems: 8,
        maxItems: 10
      }
    },
    required: ['career', 'skills', 'roadmap', 'courses'],
    additionalProperties: false
  };

  const prompt = `Create a comprehensive 6-month career roadmap for ${name} who wants to become a ${dreamCareer}. 

IMPORTANT REQUIREMENTS:
1. Career Info: Provide realistic salary ranges, accurate growth statistics, and detailed role descriptions
2. Skills: Include 12-16 skills across Technical, Soft Skills, Tools, and Certifications categories
3. 6-Month Roadmap: Create exactly 6 months of learning path, each with 2-4 actionable tasks
4. Learning Resources: Include 8-10 real, high-quality courses from platforms like Coursera, Udemy, edX, freeCodeCamp, YouTube, etc.
5. Make it personalized for ${name} and specific to ${dreamCareer}
6. Ensure all URLs are real and accessible
7. Use current market data for salary and growth projections
8. Balance theoretical learning with practical projects

Focus on creating a realistic, actionable plan that someone can actually follow to transition into ${dreamCareer}.`;

  // Function to make OpenAI API call
  const makeOpenAICall = async (model = 'gpt-3.5-turbo') => {
    const isGPT4 = model?.includes('gpt-4') || model?.includes('gpt-5');
    
    const requestConfig = {
      model,
      messages: [
        {
          role: 'system',
          content: 'You are an expert career counselor and professional development advisor. Create detailed, actionable career roadmaps based on current industry standards and market demands. Always provide realistic timelines, genuine learning resources, and practical advice.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: isGPT4 ? 4000 : 2500, // Adjust token limit based on model
      temperature: 0.7
    };

    // Add structured output for supported models
    if (isGPT4) {
      requestConfig.response_format = {
        type: 'json_schema',
        json_schema: {
          name: 'career_roadmap_response',
          schema: careerRoadmapSchema
        }
      };
    }

    const response = await openai?.chat?.completions?.create(requestConfig);
    
    let content = response?.choices?.[0]?.message?.content;
    
    // For non-structured models, try to extract JSON
    if (!isGPT4) {
      try {
        // Try to find JSON in the response
        const jsonMatch = content?.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          content = jsonMatch?.[0];
        }
      } catch (e) {
        console.warn('Failed to extract JSON from response, using mock data');
        throw new Error('Invalid response format');
      }
    }

    return JSON.parse(content);
  };

  try {
    // Try with different models in order of preference and cost-effectiveness
    const models = [
      'gpt-3.5-turbo',  // Most cost-effective
      'gpt-4o-mini',    // Balanced cost and performance
      'gpt-4o'          // Highest quality but expensive
    ];

    let lastError;
    for (const model of models) {
      try {
        console.log(`Attempting to generate roadmap with ${model}...`);
        
        const roadmapData = await retryWithBackoff(
          () => makeOpenAICall(model),
          2, // Reduce retries for faster fallback
          2000 // 2 second initial delay
        );
        
        console.log(`Successfully generated roadmap with ${model}`);
        
        // Add metadata
        return {
          ...roadmapData,
          generatedFor: name,
          targetCareer: dreamCareer,
          generatedAt: new Date()?.toISOString(),
          aiModel: model,
          isDemo: false
        };

      } catch (error) {
        lastError = error;
        console.warn(`Failed with ${model}:`, error?.message);
        
        // If it's a quota error, try next model immediately
        if (error?.status === 429 || error?.message?.includes('quota')) {
          continue;
        }
        
        // For other errors, still try next model
        continue;
      }
    }

    // If all models failed, throw the last error
    throw lastError;

  } catch (error) {
    console.error('All AI models failed, using mock data:', error?.message);
    
    // Check if it's a quota/billing error
    if (error?.status === 429 || error?.message?.includes('quota') || error?.message?.includes('exceeded')) {
      // Return mock data with a flag indicating API quota issue
      const mockData = generateMockRoadmap(name, dreamCareer);
      mockData.quotaExceeded = true;
      mockData.originalError = error?.message;
      return mockData;
    }
    
    // For other errors, still provide mock data but with different error handling
    throw new Error(`Failed to generate career roadmap: ${error?.message || 'AI service temporarily unavailable'}`);
  }
}

/**
 * Gets AI-powered career advice with fallback strategies
 * @param {string} question - User's career-related question
 * @param {string} careerContext - User's career context (optional)
 * @returns {Promise<string>} AI-generated career advice
 */
export async function getCareerAdvice(question, careerContext = '') {
  if (!import.meta.env?.VITE_OPENAI_API_KEY || import.meta.env?.VITE_OPENAI_API_KEY === 'your-openai-api-key-here') {
    return `Thank you for your question about "${question}". While our AI advisor is currently unavailable, here's some general guidance: Focus on continuous learning, build a strong professional network, and gain practical experience through projects or internships. For personalized career advice, consider consulting with a career counselor or mentor in your target field.`;
  }

  const contextPrompt = careerContext 
    ? `Context: The user is interested in ${careerContext}. ` 
    : '';

  const makeAdviceCall = async (model = 'gpt-3.5-turbo') => {
    const response = await openai?.chat?.completions?.create({
      model,
      messages: [
        {
          role: 'system',
          content: 'You are a professional career advisor with expertise across multiple industries. Provide practical, actionable career advice based on current market trends and professional best practices. Keep responses concise but comprehensive.'
        },
        {
          role: 'user',
          content: `${contextPrompt}${question}`
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    });

    return response?.choices?.[0]?.message?.content;
  };

  try {
    return await retryWithBackoff(() => makeAdviceCall(), 2, 1000);
  } catch (error) {
    console.error('Error getting career advice:', error);
    
    if (error?.status === 429 || error?.message?.includes('quota')) {
      return `I apologize, but our AI advisor is currently experiencing high demand. Here's some general advice: Research your target industry thoroughly, develop relevant skills through online courses and practice projects, and connect with professionals in your field. Consider reaching out to career counselors or mentors for personalized guidance.`;
    }
    
    throw new Error(`Failed to get career advice: ${error?.message || 'Service temporarily unavailable'}`);
  }
}

/**
 * Analyzes user's current skills with fallback strategies
 * @param {Array} currentSkills - Array of user's current skills
 * @param {string} targetCareer - Target career path
 * @returns {Promise<Object>} Skills analysis and recommendations
 */
export async function analyzeSkillGap(currentSkills, targetCareer) {
  if (!import.meta.env?.VITE_OPENAI_API_KEY || import.meta.env?.VITE_OPENAI_API_KEY === 'your-openai-api-key-here') {
    // Return mock analysis
    return {
      analysis: `Based on your interest in ${targetCareer} and current skills, there are several areas for development. Focus on building both technical and soft skills relevant to your target role.`,
      strengths: currentSkills?.slice(0, 3) || ['Communication', 'Problem Solving', 'Adaptability'],
      gaps: [
        { skill: 'Technical Skills', importance: 'Critical', timeToLearn: '3-6 months', resources: ['Online Courses', 'Practice Projects'] },
        { skill: 'Industry Knowledge', importance: 'Important', timeToLearn: '2-4 months', resources: ['Industry Publications', 'Networking'] },
        { skill: 'Certifications', importance: 'Nice to have', timeToLearn: '1-3 months', resources: ['Official Training', 'Study Materials'] }
      ],
      recommendations: [
        'Start with foundational technical skills',
        'Build a portfolio of relevant projects',
        'Network with professionals in your target field'
      ],
      confidence: 0.7,
      isDemo: true
    };
  }

  const skillAnalysisSchema = {
    type: 'object',
    properties: {
      analysis: { type: 'string', description: 'Overall skills gap analysis' },
      strengths: {
        type: 'array',
        items: { type: 'string' },
        description: 'Current strengths that align with target career'
      },
      gaps: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            skill: { type: 'string' },
            importance: { type: 'string', enum: ['Critical', 'Important', 'Nice to have'] },
            timeToLearn: { type: 'string' },
            resources: {
              type: 'array',
              items: { type: 'string' }
            }
          },
          required: ['skill', 'importance', 'timeToLearn']
        }
      },
      recommendations: {
        type: 'array',
        items: { type: 'string' },
        description: 'Specific action recommendations'
      },
      confidence: { type: 'number', minimum: 0, maximum: 1 }
    },
    required: ['analysis', 'strengths', 'gaps', 'recommendations', 'confidence'],
    additionalProperties: false
  };

  const makeSkillsCall = async (model = 'gpt-3.5-turbo') => {
    const response = await openai?.chat?.completions?.create({
      model,
      messages: [
        {
          role: 'system',
          content: 'You are a skills assessment expert who analyzes skill gaps and provides actionable learning recommendations for career transitions.'
        },
        {
          role: 'user',
          content: `Analyze the skills gap for someone wanting to become a ${targetCareer}.
          
Current skills: ${currentSkills?.join(', ') || 'None specified'}

Provide a detailed analysis of their strengths, identify critical skill gaps, and suggest specific learning resources and timelines.`
        }
      ],
      max_tokens: 1500,
      temperature: 0.7
    });

    let content = response?.choices?.[0]?.message?.content;
    
    // Try to extract JSON if response isn't structured
    try {
      const jsonMatch = content?.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        content = jsonMatch?.[0];
      }
      return JSON.parse(content);
    } catch (e) {
      throw new Error('Invalid response format');
    }
  };

  try {
    return await retryWithBackoff(() => makeSkillsCall(), 2, 1000);
  } catch (error) {
    console.error('Error analyzing skill gap:', error);
    throw new Error(`Failed to analyze skill gap: ${error?.message || 'Service temporarily unavailable'}`);
  }
}

/**
 * Moderates user input for inappropriate content with fallback
 * @param {string} text - Text to moderate
 * @returns {Promise<boolean>} True if content is safe, false if flagged
 */
export async function moderateContent(text) {
  if (!import.meta.env?.VITE_OPENAI_API_KEY || import.meta.env?.VITE_OPENAI_API_KEY === 'your-openai-api-key-here') {
    // Basic client-side content filtering as fallback
    const inappropriateWords = ['spam', 'abuse', 'harmful'];
    const lowerText = text?.toLowerCase();
    return !inappropriateWords?.some(word => lowerText?.includes(word));
  }

  try {
    const response = await openai?.moderations?.create({
      model: 'text-moderation-latest',
      input: text
    });

    return !response?.results?.[0]?.flagged;
  } catch (error) {
    console.error('Error moderating content:', error);
    // Default to allowing content if moderation fails
    return true;
  }
}