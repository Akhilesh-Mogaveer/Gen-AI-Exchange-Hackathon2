import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavigationBar from '../../components/ui/TopNavigationBar';
import AuthenticationGuard from '../../components/ui/AuthenticationGuard';
import GuideHeader from './components/GuideHeader';
import CareerGuideForm from './components/CareerGuideForm';
import LoadingState from './components/LoadingState';

const CareerGuide = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem('isAuthenticated') === 'true' ||
                      sessionStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('isAuthenticated');
    localStorage.removeItem('careerGuideData');
    setIsAuthenticated(false);
    navigate('/authentication');
  };

  return (
    <AuthenticationGuard isAuthenticated={isAuthenticated}>
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        {/* Navigation */}
        <TopNavigationBar 
          isAuthenticated={isAuthenticated} 
          onLogout={handleLogout}
        />

        {/* Main Content */}
        <main className="pt-20 pb-12 px-6">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <GuideHeader />

            {/* Form Section */}
            <div className="flex justify-center">
              <div className="w-full max-w-2xl">
                <div className="glass-card p-8 md:p-12 rounded-2xl shadow-glass">
                  <div className="space-y-8">
                    {/* Form Title */}
                    <div className="text-center space-y-2">
                      <h2 className="text-2xl font-semibold text-foreground">
                        Tell Us About Your Goals
                      </h2>
                      <p className="text-muted-foreground">
                        Provide your details to receive a personalized career roadmap
                      </p>
                    </div>

                    {/* Career Guide Form */}
                    <CareerGuideForm />

                    {/* Additional Info */}
                    <div className="pt-6 border-t border-border/20">
                      <div className="text-center space-y-3">
                        <p className="text-sm text-muted-foreground">
                          Your roadmap will include:
                        </p>
                        <div className="flex flex-wrap justify-center gap-2">
                          <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                            Required Skills
                          </span>
                          <span className="px-3 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
                            6-Month Timeline
                          </span>
                          <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
                            Free Courses
                          </span>
                          <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded-full">
                            Priority Tasks
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA Section */}
            <div className="mt-16 text-center">
              <div className="max-w-2xl mx-auto space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  Ready to Transform Your Career?
                </h3>
                <p className="text-muted-foreground">
                  Join thousands of professionals who have successfully navigated their career transitions with our AI-powered guidance.
                </p>
                <div className="flex flex-wrap justify-center gap-6 mt-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Personalized Roadmaps</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Expert-Curated Resources</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-sm text-muted-foreground">100% Free</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Loading State Overlay */}
        <LoadingState isVisible={isLoading} />
      </div>
    </AuthenticationGuard>
  );
};

export default CareerGuide;