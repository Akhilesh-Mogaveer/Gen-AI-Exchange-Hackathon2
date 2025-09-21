import React from 'react';
import Icon from '../../../components/AppIcon';

const RoadmapTimeline = ({ roadmap }) => {
  if (!roadmap || roadmap?.length === 0) return null;

  const getPriorityConfig = (priority) => {
    const configs = {
      'high': {
        bgColor: 'bg-error/10',
        borderColor: 'border-error/30',
        iconColor: 'var(--color-error)',
        textColor: 'text-error',
        icon: 'AlertTriangle'
      },
      'medium': {
        bgColor: 'bg-warning/10',
        borderColor: 'border-warning/30',
        iconColor: 'var(--color-warning)',
        textColor: 'text-warning',
        icon: 'Clock'
      },
      'low': {
        bgColor: 'bg-success/10',
        borderColor: 'border-success/30',
        iconColor: 'var(--color-success)',
        textColor: 'text-success',
        icon: 'CheckCircle'
      }
    };
    return configs?.[priority?.toLowerCase()] || configs?.medium;
  };

  const getMonthName = (offset) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const currentMonthIndex = new Date().getMonth(); // 0-based
  const targetIndex = (currentMonthIndex + offset - 1) % 12;
  return months[targetIndex];
};

  return (
    <div className="glass-card p-6 rounded-lg animate-fade-in">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg gradient-accent">
          <Icon name="Calendar" size={20} color="white" strokeWidth={2.5} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">6-Month Roadmap</h2>
          <p className="text-sm text-muted-foreground">Your structured learning path</p>
        </div>
      </div>
      <div className="space-y-6">
        {roadmap?.map((month, index) => (
          <div key={index} className="relative">
            {/* Timeline connector */}
            {index < roadmap?.length - 1 && (
              <div className="absolute left-6 top-16 w-0.5 h-full bg-border/30 -z-10"></div>
            )}
            
            <div className="flex items-start space-x-4">
              {/* Month indicator */}
              <div className="flex items-center justify-center w-12 h-12 rounded-lg gradient-primary flex-shrink-0">
                <span className="text-sm font-semibold text-white">{month?.month}</span>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    {getMonthName(month?.month)} - {month?.title}

                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{month?.description}</p>
                </div>
                
                {/* Tasks */}
                <div className="space-y-3">
                  {month?.tasks && month?.tasks?.map((task, taskIndex) => {
                    const priorityConfig = getPriorityConfig(task?.priority);
                    
                    return (
                      <div 
                        key={taskIndex}
                        className={`p-4 rounded-lg border-2 ${priorityConfig?.bgColor} ${priorityConfig?.borderColor} hover:shadow-md transition-all duration-200`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/50 flex-shrink-0 mt-0.5">
                            <Icon 
                              name={priorityConfig?.icon} 
                              size={16} 
                              color={priorityConfig?.iconColor} 
                              strokeWidth={2.5} 
                            />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="text-sm font-medium text-foreground">{task?.title}</h4>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityConfig?.textColor} bg-white/50`}>
                                {task?.priority?.toUpperCase() || 'MEDIUM'}
                              </span>
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-3">{task?.description}</p>
                            
                            {task?.timeframe && (
                              <div className="flex items-center space-x-2">
                                <Icon name="Clock" size={14} color="var(--color-muted-foreground)" />
                                <span className="text-xs text-muted-foreground">{task?.timeframe}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapTimeline;