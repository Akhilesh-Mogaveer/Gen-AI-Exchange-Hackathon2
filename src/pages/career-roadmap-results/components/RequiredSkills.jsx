import React from 'react';
import Icon from '../../../components/AppIcon';

const RequiredSkills = ({ skills }) => {
  if (!skills || skills?.length === 0) return null;

  const getSkillIcon = (category) => {
    const iconMap = {
      'Technical': 'Code',
      'Soft Skills': 'Users',
      'Tools': 'Wrench',
      'Certifications': 'Award',
      'Languages': 'Globe',
      'default': 'CheckCircle'
    };
    return iconMap?.[category] || iconMap?.default;
  };

  const getSkillColor = (category) => {
    const colorMap = {
      'Technical': 'var(--color-primary)',
      'Soft Skills': 'var(--color-secondary)',
      'Tools': 'var(--color-accent)',
      'Certifications': 'var(--color-success)',
      'Languages': 'var(--color-warning)',
      'default': 'var(--color-muted-foreground)'
    };
    return colorMap?.[category] || colorMap?.default;
  };

  // Group skills by category
  const groupedSkills = skills?.reduce((acc, skill) => {
    const category = skill?.category || 'General';
    if (!acc?.[category]) {
      acc[category] = [];
    }
    acc?.[category]?.push(skill);
    return acc;
  }, {});

  return (
    <div className="glass-card p-6 rounded-lg animate-fade-in">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg gradient-secondary">
          <Icon name="BookOpen" size={20} color="black" strokeWidth={2.5} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Required Skills</h2>
          <p className="text-sm text-muted-foreground">Essential competencies for success</p>
        </div>
      </div>
      <div className="space-y-6">
        {Object.entries(groupedSkills)?.map(([category, categorySkills]) => (
          <div key={category} className="space-y-3">
            <div className="flex items-center space-x-2">
              <Icon 
                name={getSkillIcon(category)} 
                size={18} 
                color={getSkillColor(category)} 
              />
              <h3 className="text-lg font-medium text-foreground">{category}</h3>
              <div className="flex-1 h-px bg-border/30"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {categorySkills?.map((skill, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200"
                >
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10">
                    <Icon name="Check" size={12} color="var(--color-primary)" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{skill?.name}</p>
                    {skill?.level && (
                      <p className="text-xs text-muted-foreground">{skill?.level}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequiredSkills;