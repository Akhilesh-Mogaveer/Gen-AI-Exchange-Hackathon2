import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickAccessCards = ({ onNavigate }) => {
  const quickAccessItems = [
    {
      id: 1,
      title: "My Career Profile",
      description: "View and update your professional information",
      icon: "User",
      action: "View Profile",
      path: "/user-profile",
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600"
    },
    {
      id: 2,
      title: "Previous Roadmaps",
      description: "Access your generated career roadmaps",
      icon: "Map",
      action: "View Roadmaps",
      path: "/career-roadmap-results",
      color: "bg-purple-50 border-purple-200",
      iconColor: "text-purple-600"
    },
    {
      id: 3,
      title: "Skill Assessment",
      description: "Evaluate your current skills and identify gaps",
      icon: "Target",
      action: "Start Assessment",
      path: "/career-guide",
      color: "bg-emerald-50 border-emerald-200",
      iconColor: "text-emerald-600"
    },
    {
      id: 4,
      title: "Career Resources",
      description: "Explore courses, articles, and learning materials",
      icon: "BookOpen",
      action: "Browse Resources",
      path: "/career-guide",
      color: "bg-amber-50 border-amber-200",
      iconColor: "text-amber-600"
    }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="Zap" size={24} color="var(--color-primary)" strokeWidth={2.5} />
        <h2 className="text-xl font-semibold text-foreground">Quick Access</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickAccessItems?.map((item) => (
          <div
            key={item?.id}
            className={`glass-card p-6 rounded-lg border-2 ${item?.color} hover:shadow-lg transition-all duration-300 cursor-pointer group`}
            onClick={() => onNavigate(item?.path)}
          >
            <div className="flex flex-col h-full">
              <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${item?.iconColor} bg-white/80 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon name={item?.icon} size={24} strokeWidth={2.5} />
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                  {item?.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {item?.description}
                </p>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                iconName="ArrowRight"
                iconPosition="right"
                iconSize={16}
                className="self-start text-xs font-medium group-hover:text-primary transition-colors duration-200"
              >
                {item?.action}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickAccessCards;