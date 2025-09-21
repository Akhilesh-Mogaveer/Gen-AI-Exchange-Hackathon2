import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TrendingCareers = ({ onExploreCareer }) => {
  const trendingCareers = [
    {
      id: 1,
      title: "AI/Machine Learning Engineer",
      description: "Design and develop artificial intelligence systems and machine learning models to solve complex problems.",
      growth: "+22%",
      avgSalary: "$130,000",
      skills: ["Python", "TensorFlow", "Data Science", "Deep Learning"],
      icon: "Brain",
      gradient: "from-blue-500 to-purple-600",
      demand: "Very High"
    },
    {
      id: 2,
      title: "Cloud Solutions Architect",
      description: "Design and implement scalable cloud infrastructure solutions for enterprise applications.",
      growth: "+19%",
      avgSalary: "$145,000",
      skills: ["AWS", "Azure", "Kubernetes", "DevOps"],
      icon: "Cloud",
      gradient: "from-emerald-500 to-teal-600",
      demand: "High"
    },
    {
      id: 3,
      title: "Cybersecurity Specialist",
      description: "Protect organizations from digital threats and ensure data security across all systems.",
      growth: "+31%",
      avgSalary: "$120,000",
      skills: ["Network Security", "Penetration Testing", "Risk Assessment", "Compliance"],
      icon: "Shield",
      gradient: "from-red-500 to-pink-600",
      demand: "Very High"
    },
    {
      id: 4,
      title: "Data Scientist",
      description: "Extract insights from complex datasets to drive business decisions and strategy.",
      growth: "+16%",
      avgSalary: "$125,000",
      skills: ["Python", "R", "SQL", "Statistics", "Visualization"],
      icon: "BarChart3",
      gradient: "from-amber-500 to-orange-600",
      demand: "High"
    },
    {
      id: 5,
      title: "UX/UI Designer",
      description: "Create intuitive and engaging user experiences for digital products and applications.",
      growth: "+13%",
      avgSalary: "$95,000",
      skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
      icon: "Palette",
      gradient: "from-violet-500 to-indigo-600",
      demand: "High"
    }
  ];

  const getDemandColor = (demand) => {
    switch (demand) {
      case 'Very High':
        return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'High':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="TrendingUp" size={24} color="var(--color-primary)" strokeWidth={2.5} />
          <h2 className="text-xl font-semibold text-foreground">Trending Careers</h2>
        </div>
        <div className="text-sm text-muted-foreground">
          Updated {new Date()?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {trendingCareers?.map((career) => (
          <div
            key={career?.id}
            className="glass-card rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
            onClick={() => onExploreCareer(career)}
          >
            {/* Header with gradient background */}
            <div className={`bg-gradient-to-r ${career?.gradient} p-6 text-white relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <Icon name={career?.icon} size={28} color="white" strokeWidth={2.5} />
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDemandColor(career?.demand)}`}>
                    {career?.demand}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:scale-105 transition-transform duration-200">
                  {career?.title}
                </h3>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6">
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {career?.description}
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-emerald-600">{career?.growth}</div>
                  <div className="text-xs text-muted-foreground">Growth Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-primary">{career?.avgSalary}</div>
                  <div className="text-xs text-muted-foreground">Avg Salary</div>
                </div>
              </div>
              
              {/* Skills */}
              <div className="mb-4">
                <div className="text-xs font-medium text-muted-foreground mb-2">Key Skills:</div>
                <div className="flex flex-wrap gap-1">
                  {career?.skills?.slice(0, 3)?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-muted rounded-md text-xs text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                  {career?.skills?.length > 3 && (
                    <span className="px-2 py-1 bg-muted rounded-md text-xs text-muted-foreground">
                      +{career?.skills?.length - 3}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Action Button */}
              <Button
                variant="outline"
                size="sm"
                iconName="ArrowRight"
                iconPosition="right"
                iconSize={16}
                className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-200"
              >
                Explore Career
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingCareers;