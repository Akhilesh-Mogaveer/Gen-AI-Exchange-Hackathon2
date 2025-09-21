import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingState = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="glass-card p-8 rounded-2xl max-w-md w-full mx-4 text-center">
        <div className="space-y-6">
          {/* Animated Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary animate-pulse">
                <Icon name="Brain" size={32} color="white" strokeWidth={2.5} />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center animate-bounce">
                <Icon name="Sparkles" size={12} color="white" strokeWidth={3} />
              </div>
            </div>
          </div>

          {/* Loading Text */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-foreground">
              Generating Your Roadmap
            </h3>
            <p className="text-muted-foreground">
              Our AI is analyzing your career goals and creating a personalized roadmap...
            </p>
          </div>

          {/* Progress Indicators */}
          <div className="space-y-4">
            <div className="flex justify-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-gradient-primary h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
          </div>

          {/* Processing Steps */}
          <div className="text-left space-y-2">
            <div className="flex items-center space-x-3 text-sm">
              <Icon name="Check" size={16} color="var(--color-success)" />
              <span className="text-muted-foreground">Analyzing career requirements</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <Icon name="Loader2" size={16} color="var(--color-primary)" className="animate-spin" />
              <span className="text-foreground font-medium">Generating skill roadmap</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <Icon name="Clock" size={16} color="var(--color-muted-foreground)" />
              <span className="text-muted-foreground">Finding free resources</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;