import React from 'react';
import Icon from '../../../components/AppIcon';

const GuideHeader = () => {
  return (
    <div className="text-center space-y-6 mb-12">
      {/* Icon and Title */}
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary shadow-lg">
          <Icon name="Compass" size={32} color="white" strokeWidth={2.5} />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Career Guide
          </h1>
          <div className="flex items-center justify-center space-x-2">
            <Icon name="Sparkles" size={16} color="var(--color-primary)" />
            <span className="text-lg font-medium text-primary">AI-Powered Roadmap Generation</span>
            <Icon name="Sparkles" size={16} color="var(--color-primary)" />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="max-w-3xl mx-auto space-y-4">
        <p className="text-xl text-muted-foreground leading-relaxed">
          Get personalized career guidance tailored to your aspirations. Our AI will analyze your dream career and create a comprehensive roadmap with skills, timeline, and resources.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/50">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-success/20">
              <Icon name="Target" size={16} color="var(--color-success)" />
            </div>
            <div className="text-left">
              <p className="font-medium text-foreground text-sm">Personalized</p>
              <p className="text-xs text-muted-foreground">Tailored to your goals</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/50">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/20">
              <Icon name="Clock" size={16} color="var(--color-primary)" />
            </div>
            <div className="text-left">
              <p className="font-medium text-foreground text-sm">6-Month Plan</p>
              <p className="text-xs text-muted-foreground">Structured timeline</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/50">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/20">
              <Icon name="BookOpen" size={16} color="var(--color-accent)" />
            </div>
            <div className="text-left">
              <p className="font-medium text-foreground text-sm">Free Resources</p>
              <p className="text-xs text-muted-foreground">Curated courses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideHeader;