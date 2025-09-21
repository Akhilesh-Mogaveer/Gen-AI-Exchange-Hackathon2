import React from 'react';

const AuthenticationBackground = ({ children }) => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Gradient Background */}
      <div className="absolute inset-0 gradient-primary opacity-10"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Large Circle */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        
        {/* Medium Circle */}
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-secondary/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Small Circles */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-accent/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-success/5 rounded-full blur-lg animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-primary) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        {children}
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/80 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default AuthenticationBackground;