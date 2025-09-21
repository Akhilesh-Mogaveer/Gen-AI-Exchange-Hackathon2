import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavigationBar from '../../components/ui/TopNavigationBar';
import AuthenticationGuard from '../../components/ui/AuthenticationGuard';
import WelcomeSection from './components/WelcomeSection';
import QuickAccessCards from './components/QuickAccessCards';
import TrendingCareers from './components/TrendingCareers';
import StatsOverview from './components/StatsOverview';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Get user information from localStorage or sessionStorage
    const storedUserName = localStorage.getItem('userName') || sessionStorage.getItem('userName') || 'Alex';
    setUserName(storedUserName);
    
    // Check authentication status
    const authStatus = localStorage.getItem('isAuthenticated') === 'true' || 
                      sessionStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  const handleNavigateToCareerGuide = () => {
    navigate('/career-guide');
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleExploreCareer = (career) => {
    // Store selected career for the career guide
    sessionStorage.setItem('selectedCareer', JSON.stringify(career));
    navigate('/career-guide');
  };

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userName');
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('selectedCareer');
    
    setIsAuthenticated(false);
    navigate('/authentication');
  };

  return (
    <AuthenticationGuard isAuthenticated={isAuthenticated}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <TopNavigationBar 
          isAuthenticated={isAuthenticated} 
          onLogout={handleLogout}
        />
        
        <main className="pt-20 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Welcome Section */}
            <WelcomeSection 
              userName={userName}
              onNavigateToCareerGuide={handleNavigateToCareerGuide}
            />
            
            {/* Quick Access Cards */}
            <QuickAccessCards onNavigate={handleNavigate} />
            
            {/* Stats Overview */}
            <StatsOverview />
            
            {/* Trending Careers */}
            <TrendingCareers onExploreCareer={handleExploreCareer} />
            
            {/* Footer Section */}
            <div className="mt-12 text-center">
              <div className="glass-card p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Ready to Transform Your Career?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Join thousands of professionals who have successfully navigated their career transitions with our AI-powered guidance.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={handleNavigateToCareerGuide}
                    className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
                  >
                    Start Your Journey
                  </button>
                  <button
                    onClick={() => handleNavigate('/user-profile')}
                    className="px-6 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-colors duration-200"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AuthenticationGuard>
  );
};

export default Dashboard;