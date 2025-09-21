import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const TopNavigationBar = ({ isAuthenticated = true, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: 'Home',
      description: 'Your personalized career hub'
    },
    {
      name: 'Career Guide',
      path: '/career-guide',
      icon: 'Compass',
      description: 'AI-powered roadmap generation'
    },
    {
      name: 'Profile',
      path: '/user-profile',
      icon: 'User',
      description: 'Account and career history'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    setIsMobileMenuOpen(false);
    navigate('/authentication');
  };

  const isActivePath = (path) => {
    if (path === '/career-guide') {
      return location?.pathname === '/career-guide' || location?.pathname === '/career-roadmap-results';
    }
    return location?.pathname === path;
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 glass-card border-b border-border/20">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg gradient-primary">
                <Icon name="Brain" size={20} color="white" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-foreground">CareerAdvisor</span>
                <span className="text-xs font-medium text-primary">AI</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {isAuthenticated && navigationItems?.map((item) => (
                <Button
                  key={item?.path}
                  variant={isActivePath(item?.path) ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleNavigation(item?.path)}
                  iconName={item?.icon}
                  iconPosition="left"
                  iconSize={16}
                  className="transition-all duration-200 ease-out"
                >
                  {item?.name}
                </Button>
              ))}
              
              {isAuthenticated && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  iconName="LogOut"
                  iconPosition="left"
                  iconSize={16}
                  className="ml-2 text-muted-foreground hover:text-error transition-colors duration-200"
                >
                  Logout
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                iconName={isMobileMenuOpen ? "X" : "Menu"}
                iconSize={20}
                className="transition-transform duration-200 ease-out"
              />
            </div>
          </div>
        </div>
      </nav>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] glass-card border-l border-border/20 animate-slide-up">
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-6 border-b border-border/20">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg gradient-primary">
                    <Icon name="Brain" size={20} color="white" strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold text-foreground">CareerAdvisor</span>
                    <span className="text-xs font-medium text-primary">AI</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                  iconName="X"
                  iconSize={20}
                />
              </div>

              {/* Mobile Navigation Items */}
              <div className="flex-1 p-6 space-y-2">
                {isAuthenticated && navigationItems?.map((item) => (
                  <button
                    key={item?.path}
                    onClick={() => handleNavigation(item?.path)}
                    className={`w-full flex items-center space-x-3 p-4 rounded-lg text-left transition-all duration-200 ease-out ${
                      isActivePath(item?.path)
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'hover:bg-muted text-foreground'
                    }`}
                  >
                    <Icon 
                      name={item?.icon} 
                      size={20} 
                      color={isActivePath(item?.path) ? 'currentColor' : 'var(--color-muted-foreground)'} 
                    />
                    <div className="flex flex-col">
                      <span className="font-medium">{item?.name}</span>
                      <span className={`text-xs ${
                        isActivePath(item?.path) 
                          ? 'text-primary-foreground/80' 
                          : 'text-muted-foreground'
                      }`}>
                        {item?.description}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Mobile Logout */}
              {isAuthenticated && (
                <div className="p-6 border-t border-border/20">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 p-4 rounded-lg text-left text-error hover:bg-error/10 transition-all duration-200 ease-out"
                  >
                    <Icon name="LogOut" size={20} color="var(--color-error)" />
                    <div className="flex flex-col">
                      <span className="font-medium">Logout</span>
                      <span className="text-xs text-muted-foreground">End your session</span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopNavigationBar;