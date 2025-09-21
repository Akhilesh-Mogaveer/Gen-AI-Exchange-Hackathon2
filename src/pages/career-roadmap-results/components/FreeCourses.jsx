import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FreeCourses = ({ courses }) => {
  if (!courses || courses?.length === 0) return null;

  const handleCourseClick = (courseUrl) => {
    if (courseUrl) {
      window.open(courseUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const getProviderIcon = (provider) => {
    const iconMap = {
      'Coursera': 'GraduationCap',
      'edX': 'BookOpen',
      'Udemy': 'Play',
      'Khan Academy': 'Brain',
      'freeCodeCamp': 'Code',
      'YouTube': 'Video',
      'MIT OpenCourseWare': 'School',
      'Stanford Online': 'University',
      'default': 'ExternalLink'
    };
    return iconMap?.[provider] || iconMap?.default;
  };

  const getProviderColor = (provider) => {
    const colorMap = {
      'Coursera': 'var(--color-primary)',
      'edX': 'var(--color-secondary)',
      'Udemy': 'var(--color-accent)',
      'Khan Academy': 'var(--color-success)',
      'freeCodeCamp': 'var(--color-warning)',
      'YouTube': 'var(--color-error)',
      'MIT OpenCourseWare': 'var(--color-primary)',
      'Stanford Online': 'var(--color-secondary)',
      'default': 'var(--color-muted-foreground)'
    };
    return colorMap?.[provider] || colorMap?.default;
  };

  return (
    <div className="glass-card p-6 rounded-lg animate-fade-in">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg gradient-success">
          <Icon name="BookOpen" size={20} color="white" strokeWidth={2.5} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Free Learning Resources</h2>
          <p className="text-sm text-muted-foreground">Recommended courses to build your skills</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses?.map((course, index) => (
          <div 
            key={index}
            className="p-4 rounded-lg border border-border/20 bg-card hover:shadow-md transition-all duration-200 hover:border-primary/30"
          >
            <div className="flex items-start space-x-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted/30 flex-shrink-0">
                <Icon 
                  name={getProviderIcon(course?.provider)} 
                  size={18} 
                  color={getProviderColor(course?.provider)} 
                  strokeWidth={2} 
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-foreground line-clamp-2 mb-1">
                  {course?.title}
                </h3>
                <p className="text-xs text-muted-foreground">{course?.provider}</p>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
              {course?.description}
            </p>
            
            <div className="flex items-center justify-between mb-4">
              {course?.duration && (
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={14} color="var(--color-muted-foreground)" />
                  <span className="text-xs text-muted-foreground">{course?.duration}</span>
                </div>
              )}
              
              {course?.rating && (
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={14} color="var(--color-accent)" />
                  <span className="text-xs text-muted-foreground">{course?.rating}</span>
                </div>
              )}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={() => handleCourseClick(course?.url)}
              iconName="ExternalLink"
              iconPosition="right"
              iconSize={14}
              className="text-xs"
            >
              Start Learning
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-border/20">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={18} color="var(--color-primary)" className="mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Pro Tip</p>
            <p className="text-sm text-muted-foreground">
              Start with courses marked as high priority in your roadmap. Complete one course before moving to the next for better retention and skill building.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeCourses;