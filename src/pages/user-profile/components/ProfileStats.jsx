import React from 'react';
import Icon from '../../../components/AppIcon';

const ProfileStats = ({ stats }) => {
  const statItems = [
    {
      key: 'roadmapsGenerated',
      label: 'Roadmaps Generated',
      icon: 'Map',
      color: 'var(--color-primary)',
      bgColor: 'bg-primary/10'
    },
    {
      key: 'skillsLearned',
      label: 'Skills Learned',
      icon: 'Award',
      color: 'var(--color-success)',
      bgColor: 'bg-success/10'
    },
    {
      key: 'coursesCompleted',
      label: 'Courses Completed',
      icon: 'BookOpen',
      color: 'var(--color-accent)',
      bgColor: 'bg-accent/10'
    },
    {
      key: 'daysActive',
      label: 'Days Active',
      icon: 'Calendar',
      color: 'var(--color-secondary)',
      bgColor: 'bg-secondary/10'
    }
  ];

  return (
    <div className="glass-card p-6 rounded-lg">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
          <Icon name="BarChart3" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Your Progress</h2>
          <p className="text-sm text-muted-foreground">Career development statistics</p>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statItems?.map((item) => (
          <div key={item?.key} className="text-center p-4 bg-muted/20 rounded-lg">
            <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${item?.bgColor} mx-auto mb-3`}>
              <Icon name={item?.icon} size={20} color={item?.color} />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">
              {stats?.[item?.key] || 0}
            </div>
            <div className="text-xs text-muted-foreground">
              {item?.label}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-gradient-primary rounded-lg text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold mb-1">Career Journey Score</h3>
            <p className="text-sm opacity-90">Based on your activity and progress</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{stats?.careerScore || 0}</div>
            <div className="text-sm opacity-90">out of 100</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;