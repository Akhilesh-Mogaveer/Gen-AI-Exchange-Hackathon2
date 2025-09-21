import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsOverview = () => {
  const stats = [
    {
      id: 1,
      title: "Career Roadmaps Generated",
      value: "2,847",
      change: "+12%",
      changeType: "increase",
      icon: "Map",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      id: 2,
      title: "Success Stories",
      value: "1,234",
      change: "+8%",
      changeType: "increase",
      icon: "Trophy",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    },
    {
      id: 3,
      title: "Active Users",
      value: "15,678",
      change: "+15%",
      changeType: "increase",
      icon: "Users",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      id: 4,
      title: "Course Completions",
      value: "8,945",
      change: "+23%",
      changeType: "increase",
      icon: "GraduationCap",
      color: "text-amber-600",
      bgColor: "bg-amber-50"
    }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="BarChart3" size={24} color="var(--color-primary)" strokeWidth={2.5} />
        <h2 className="text-xl font-semibold text-foreground">Platform Overview</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats?.map((stat) => (
          <div
            key={stat?.id}
            className="glass-card p-6 rounded-lg hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${stat?.bgColor}`}>
                <Icon name={stat?.icon} size={24} className={stat?.color} strokeWidth={2.5} />
              </div>
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                stat?.changeType === 'increase' ?'text-emerald-600 bg-emerald-50' :'text-red-600 bg-red-50'
              }`}>
                <Icon 
                  name={stat?.changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                  size={12} 
                />
                <span>{stat?.change}</span>
              </div>
            </div>
            
            <div>
              <div className="text-2xl font-bold text-foreground mb-1">
                {stat?.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat?.title}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsOverview;