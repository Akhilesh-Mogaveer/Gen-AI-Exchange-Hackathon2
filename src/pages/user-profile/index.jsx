import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavigationBar from '../../components/ui/TopNavigationBar';
import AuthenticationGuard from '../../components/ui/AuthenticationGuard';
import ProfileHeader from './components/ProfileHeader';
import AccountInformation from './components/AccountInformation';
import CareerHistory from './components/CareerHistory';
import ProfileStats from './components/ProfileStats';

const UserProfile = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState({
    username: "john_doe",
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    dreamCareer: "Full Stack Developer",
    joinedDate: "2024-01-15"
  });

  const [stats, setStats] = useState({
    roadmapsGenerated: 3,
    skillsLearned: 12,
    coursesCompleted: 8,
    daysActive: 45,
    careerScore: 78
  });

  const [careerHistory] = useState([
    {
      id: 1,
      careerTitle: "Full Stack Developer",
      priority: "high",
      generatedDate: "2024-09-01",
      completedTasks: 8,
      totalTasks: 12,
      coursesAccessed: 5,
      topSkills: ["React", "Node.js", "MongoDB", "JavaScript", "CSS"]
    },
    {
      id: 2,
      careerTitle: "Data Scientist",
      priority: "medium",
      generatedDate: "2024-08-15",
      completedTasks: 6,
      totalTasks: 10,
      coursesAccessed: 3,
      topSkills: ["Python", "Machine Learning", "SQL", "Statistics"]
    },
    {
      id: 3,
      careerTitle: "UI/UX Designer",
      priority: "low",
      generatedDate: "2024-07-20",
      completedTasks: 4,
      totalTasks: 8,
      coursesAccessed: 2,
      topSkills: ["Figma", "Adobe XD", "User Research", "Prototyping"]
    }
  ]);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true' ||
                      sessionStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    navigate('/authentication');
  };

  const handleUpdateProfile = (updatedData) => {
    setUser(prev => ({
      ...prev,
      ...updatedData
    }));
    
    // Update stats if dream career changed
    if (updatedData?.dreamCareer !== user?.dreamCareer) {
      setStats(prev => ({
        ...prev,
        careerScore: Math.min(prev?.careerScore + 5, 100)
      }));
    }
  };

  const handleUpdateAccount = (updatedData) => {
    setUser(prev => ({
      ...prev,
      ...updatedData
    }));
  };

  return (
    <AuthenticationGuard isAuthenticated={isAuthenticated}>
      <div className="min-h-screen bg-background">
        <TopNavigationBar 
          isAuthenticated={isAuthenticated} 
          onLogout={handleLogout} 
        />
        
        <main className="pt-20 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg gradient-primary">
                  <span className="text-white font-bold text-sm">
                    {user?.fullName?.charAt(0)}
                  </span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Profile</h1>
                  <p className="text-muted-foreground">
                    Manage your account and career journey
                  </p>
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="space-y-8">
              {/* Profile Header */}
              <ProfileHeader 
                user={user} 
                onUpdateProfile={handleUpdateProfile}
              />

              {/* Stats and Account Info Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ProfileStats stats={stats} />
                <AccountInformation 
                  user={user} 
                  onUpdateAccount={handleUpdateAccount}
                />
              </div>

              {/* Career History */}
              <CareerHistory careerHistory={careerHistory} />
            </div>
          </div>
        </main>
      </div>
    </AuthenticationGuard>
  );
};

export default UserProfile;