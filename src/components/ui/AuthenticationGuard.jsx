import React, { useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Icon from '../AppIcon';

const AuthenticationGuard = ({ children, isAuthenticated }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [authStatus, setAuthStatus] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Simulate authentication check
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Check if user is authenticated (from props or localStorage/sessionStorage)
        const authenticated = isAuthenticated || 
          localStorage.getItem('isAuthenticated') === 'true' ||
          sessionStorage.getItem('isAuthenticated') === 'true';
        
        setAuthStatus(authenticated);
      } catch (error) {
        console.error('Authentication check failed:', error);
        setAuthStatus(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, [isAuthenticated]);

  // Show loading state during authentication verification
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="glass-card p-8 rounded-lg max-w-md w-full mx-4">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg gradient-primary animate-pulse">
              <Icon name="Brain" size={24} color="white" strokeWidth={2.5} />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Verifying Authentication
              </h3>
              <p className="text-sm text-muted-foreground">
                Please wait while we verify your session...
              </p>
            </div>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Redirect to authentication if not authenticated
  if (!authStatus) {
    return (
      <Navigate 
        to="/authentication" 
        state={{ from: location?.pathname }} 
        replace 
      />
    );
  }

  // Render protected content if authenticated
  return children;
};

export default AuthenticationGuard;