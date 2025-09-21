import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import AuthenticationForm from './components/AuthenticationForm';
import AuthenticationBackground from './components/AuthenticationBackground';

const Authentication = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true' ||
                           sessionStorage.getItem('isAuthenticated') === 'true';
    
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Sign In - CareerAdvisor AI</title>
        <meta name="description" content="Sign in to CareerAdvisor AI for personalized career guidance and AI-powered roadmap generation. Access your career development dashboard and continue your professional journey." />
        <meta name="keywords" content="career advisor, AI career guidance, login, sign in, professional development, career roadmap" />
        <meta property="og:title" content="Sign In - CareerAdvisor AI" />
        <meta property="og:description" content="Access your personalized career guidance platform powered by AI technology." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/authentication" />
      </Helmet>

      <AuthenticationBackground>
        <AuthenticationForm />
      </AuthenticationBackground>
    </>
  );
};

export default Authentication;