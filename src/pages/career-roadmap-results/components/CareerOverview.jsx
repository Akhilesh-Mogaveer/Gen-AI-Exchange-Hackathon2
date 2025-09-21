import React from 'react';
import Icon from '../../../components/AppIcon';

const CareerOverview = ({ careerData }) => {
  if (!careerData) return null;

  return (
    <div className="glass-card p-6 rounded-lg animate-fade-in">
      <div className="flex items-center space-x-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg gradient-primary">
          <Icon name="Target" size={20} color="white" strokeWidth={2.5} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Career Overview</h2>
          <p className="text-sm text-muted-foreground">Your chosen career path</p>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-foreground mb-2">{careerData?.title}</h3>
          <p className="text-muted-foreground leading-relaxed">{careerData?.description}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border/20">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-success/10">
              <Icon name="TrendingUp" size={16} color="var(--color-success)" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Growth Outlook</p>
              <p className="text-xs text-muted-foreground">{careerData?.growth}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/10">
              <Icon name="DollarSign" size={16} color="var(--color-accent)" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Salary Range</p>
              <p className="text-xs text-muted-foreground">{careerData?.salaryRange}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerOverview;