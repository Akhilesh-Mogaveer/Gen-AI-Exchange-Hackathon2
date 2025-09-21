import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WelcomeSection = ({ userName, onNavigateToCareerGuide }) => {
  const currentHour = new Date()?.getHours();
  const getGreeting = () => {
    if (currentHour < 12) return 'Good morning';
    if (currentHour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="glass-card p-8 rounded-xl mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="mb-6 lg:mb-0">
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl gradient-primary">
              <Icon name="Sparkles" size={24} color="white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                {getGreeting()}, {userName}!
              </h1>
              <p className="text-muted-foreground text-sm lg:text-base">
                Ready to take the next step in your career journey?
              </p>
            </div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 border border-border/20">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Calendar" size={16} />
              <span>Today is {new Date()?.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col space-y-4">
          <Button
            variant="default"
            size="lg"
            onClick={onNavigateToCareerGuide}
            iconName="ArrowRight"
            iconPosition="right"
            iconSize={20}
            className="gradient-primary text-white font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Go to Career Guide
          </Button>
          <p className="text-xs text-muted-foreground text-center lg:text-right">
            Get AI-powered career roadmaps tailored for you
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;