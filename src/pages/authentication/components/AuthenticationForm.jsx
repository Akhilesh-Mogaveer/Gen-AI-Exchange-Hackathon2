import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AuthenticationForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    fullName: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Mock credentials for authentication
  // const mockCredentials = {
  //   admin: { username: 'admin', password: 'admin123', fullName: 'Admin User', email: 'admin@careeradvisor.ai' },
  //   user: { username: 'user', password: 'user123', fullName: 'John Doe', email: 'john@example.com' },
  //   demo: { username: 'demo', password: 'demo123', fullName: 'Demo User', email: 'demo@careeradvisor.ai' }
  // };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.username?.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData?.username?.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData?.password?.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData?.fullName?.trim()) {
        newErrors.fullName = 'Full name is required';
      }

      if (!formData?.email?.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
        newErrors.email = 'Please enter a valid email address';
      }

      if (!formData?.confirmPassword?.trim()) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData?.password !== formData?.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (isLogin) {
        // Check mock credentials for login
        const user = Object.values(mockCredentials)?.find(
          cred => cred?.username === formData?.username && cred?.password === formData?.password
        );

        if (user) {
          // Store authentication state
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('currentUser', JSON.stringify({
            username: user?.username,
            fullName: user?.fullName,
            email: user?.email,
            dreamCareer: 'Software Engineer' // Default dream career
          }));
          
          navigate('/dashboard');
        } else {
          setErrors({
            submit: 'Invalid username or password. Try: admin/admin123, user/user123, or demo/demo123'
          });
        }
      } else {
        // Handle signup - check if username already exists
        const existingUser = Object.values(mockCredentials)?.find(
          cred => cred?.username === formData?.username
        );

        if (existingUser) {
          setErrors({
            username: 'Username already exists. Please choose a different one.'
          });
        } else {
          // Store new user data
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('currentUser', JSON.stringify({
            username: formData?.username,
            fullName: formData?.fullName,
            email: formData?.email,
            dreamCareer: '' // Empty for new users
          }));
          
          navigate('/dashboard');
        }
      }
    } catch (error) {
      setErrors({
        submit: 'Authentication failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      fullName: ''
    });
    setErrors({});
  };

  return (
    <div className="glass-card p-8 rounded-xl max-w-md w-full mx-4 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center w-16 h-16 rounded-xl gradient-primary mx-auto mb-4">
          <Icon name="Brain" size={32} color="white" strokeWidth={2.5} />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h1>
        <p className="text-muted-foreground">
          {isLogin 
            ? 'Sign in to continue your career journey' :'Start your AI-powered career guidance'
          }
        </p>
      </div>
      {/* Toggle Tabs */}
      <div className="flex bg-muted rounded-lg p-1 mb-6">
        <button
          type="button"
          onClick={() => setIsLogin(true)}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
            isLogin
              ? 'bg-card text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setIsLogin(false)}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
            !isLogin
              ? 'bg-card text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Sign Up
        </button>
      </div>
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Sign Up Fields */}
        {!isLogin && (
          <>
            <Input
              label="Full Name"
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData?.fullName}
              onChange={handleInputChange}
              error={errors?.fullName}
              required
            />
            
            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData?.email}
              onChange={handleInputChange}
              error={errors?.email}
              required
            />
          </>
        )}

        {/* Common Fields */}
        <Input
          label="Username"
          type="text"
          name="username"
          placeholder="Enter your username"
          value={formData?.username}
          onChange={handleInputChange}
          error={errors?.username}
          required
        />

        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
          required
        />

        {/* Confirm Password for Sign Up */}
        {!isLogin && (
          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData?.confirmPassword}
            onChange={handleInputChange}
            error={errors?.confirmPassword}
            required
          />
        )}

        {/* Submit Error */}
        {errors?.submit && (
          <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
            <p className="text-sm text-error">{errors?.submit}</p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          iconName={isLogin ? "LogIn" : "UserPlus"}
          iconPosition="left"
          className="mt-6"
        >
          {isLogin ? 'Sign In' : 'Create Account'}
        </Button>
      </form>
      {/* Demo Credentials Info */}
      {isLogin && (
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground text-center mb-2">Demo Credentials:</p>
          <div className="text-xs text-muted-foreground space-y-1">
            <div className="flex justify-between">
              <span>Admin:</span>
              <span className="font-mono">admin / admin123</span>
            </div>
            <div className="flex justify-between">
              <span>User:</span>
              <span className="font-mono">user / user123</span>
            </div>
            <div className="flex justify-between">
              <span>Demo:</span>
              <span className="font-mono">demo / demo123</span>
            </div>
          </div>
        </div>
      )}
      {/* Toggle Link */}
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            onClick={toggleMode}
            className="ml-1 text-primary hover:text-primary/80 font-medium transition-colors duration-200"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthenticationForm;
