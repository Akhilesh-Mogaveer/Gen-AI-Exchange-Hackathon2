import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CareerHistory = ({ careerHistory }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error bg-error/10';
      case 'medium':
        return 'text-warning bg-warning/10';
      case 'low':
        return 'text-success bg-success/10';
      default:
        return 'text-muted-foreground bg-muted/10';
    }
  };

  const handleGenerateNewRoadmap = () => {
    navigate('/career-guide');
  };

  const handleViewRoadmap = (roadmapId) => {
    navigate('/career-roadmap-results', { state: { roadmapId } });
  };

  return (
    <div className="glass-card p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10">
            <Icon name="History" size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Career Guidance History</h2>
            <p className="text-sm text-muted-foreground">Your previous roadmaps and progress</p>
          </div>
        </div>
        
        <Button
          variant="default"
          size="sm"
          onClick={handleGenerateNewRoadmap}
          iconName="Plus"
          iconPosition="left"
          iconSize={16}
        >
          New Roadmap
        </Button>
      </div>
      {careerHistory?.length === 0 ? (
        <div className="text-center py-12">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted/20 mx-auto mb-4">
            <Icon name="MapPin" size={24} color="var(--color-muted-foreground)" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No Career History Yet</h3>
          <p className="text-muted-foreground mb-6">
            Start your career journey by generating your first personalized roadmap
          </p>
          <Button
            variant="default"
            onClick={handleGenerateNewRoadmap}
            iconName="Compass"
            iconPosition="left"
            iconSize={16}
          >
            Generate Your First Roadmap
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {careerHistory?.map((history) => (
            <div key={history?.id} className="border border-border/20 rounded-lg p-4 hover:bg-muted/20 transition-colors duration-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-medium text-foreground">{history?.careerTitle}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(history?.priority)}`}>
                      {history?.priority} priority
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center space-x-1">
                      <Icon name="Calendar" size={14} />
                      <span>Generated on {formatDate(history?.generatedDate)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Target" size={14} />
                      <span>{history?.completedTasks}/{history?.totalTasks} tasks completed</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="BookOpen" size={14} />
                      <span>{history?.coursesAccessed} courses accessed</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {history?.topSkills?.slice(0, 3)?.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {history?.topSkills?.length > 3 && (
                      <span className="px-2 py-1 bg-muted/20 text-muted-foreground text-xs rounded-full">
                        +{history?.topSkills?.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewRoadmap(history?.id)}
                    iconName="Eye"
                    iconPosition="left"
                    iconSize={14}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Download"
                    iconPosition="left"
                    iconSize={14}
                  >
                    Export
                  </Button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>Progress</span>
                  <span>{Math.round((history?.completedTasks / history?.totalTasks) * 100)}%</span>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-2">
                  <div
                    className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(history?.completedTasks / history?.totalTasks) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CareerHistory;