import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import TopNavigationBar from '../../components/ui/TopNavigationBar';
import AuthenticationGuard from '../../components/ui/AuthenticationGuard';
import CareerOverview from './components/CareerOverview';
import RequiredSkills from './components/RequiredSkills';
import RoadmapTimeline from './components/RoadmapTimeline';
import FreeCourses from './components/FreeCourses';
import ActionButtons from './components/ActionButtons';
import Icon from '../../components/AppIcon';

const CareerRoadmapResults = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [roadmapData, setRoadmapData] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('Loading your career roadmap...');
  const location = useLocation();
  const navigate = useNavigate();

  // Mock data fallback (in case AI generation fails)
  const mockRoadmapData = {
    career: {
      title: "Full Stack Web Developer",
      description: `A Full Stack Web Developer is responsible for both front-end and back-end development of web applications. This role involves creating user interfaces, developing server-side logic, managing databases, and ensuring seamless integration between different components of web applications.\n\nFull stack developers work with various technologies and frameworks to build complete web solutions that are scalable, maintainable, and user-friendly. They collaborate with designers, product managers, and other developers to deliver high-quality digital experiences.`,
      growth: "23% growth expected by 2031",
      salaryRange: "$65,000 - $130,000 annually"
    },
    skills: [
      { name: "HTML5 & CSS3", category: "Technical", level: "Advanced" },
      { name: "JavaScript (ES6+)", category: "Technical", level: "Advanced" },
      { name: "React.js", category: "Technical", level: "Intermediate" },
      { name: "Node.js", category: "Technical", level: "Intermediate" },
      { name: "Express.js", category: "Technical", level: "Intermediate" },
      { name: "MongoDB/PostgreSQL", category: "Technical", level: "Intermediate" },
      { name: "Git & Version Control", category: "Tools", level: "Advanced" },
      { name: "RESTful APIs", category: "Technical", level: "Intermediate" },
      { name: "Problem Solving", category: "Soft Skills", level: "Advanced" },
      { name: "Communication", category: "Soft Skills", level: "Advanced" },
      { name: "Team Collaboration", category: "Soft Skills", level: "Intermediate" },
      { name: "Time Management", category: "Soft Skills", level: "Intermediate" },
      { name: "VS Code", category: "Tools", level: "Advanced" },
      { name: "Postman", category: "Tools", level: "Intermediate" },
      { name: "Docker", category: "Tools", level: "Beginner" },
      { name: "AWS Fundamentals", category: "Certifications", level: "Beginner" }
    ],
    roadmap: [
      {
        month: 1,
        title: "Frontend Fundamentals",
        description: "Master the core technologies for frontend development",
        tasks: [
          {
            title: "Complete HTML5 & CSS3 Mastery",
            description: "Learn semantic HTML, CSS Grid, Flexbox, and responsive design principles",
            priority: "high",
            timeframe: "2-3 weeks"
          },
          {
            title: "JavaScript Fundamentals",
            description: "Master ES6+ features, DOM manipulation, and asynchronous programming",
            priority: "high",
            timeframe: "3-4 weeks"
          },
          {
            title: "Build 3 Static Projects",
            description: "Create portfolio website, landing page, and interactive calculator",
            priority: "medium",
            timeframe: "1-2 weeks"
          }
        ]
      },
      {
        month: 2,
        title: "React.js Development",
        description: "Learn modern frontend framework and component-based architecture",
        tasks: [
          {
            title: "React Fundamentals",
            description: "Components, props, state, hooks, and lifecycle methods",
            priority: "high",
            timeframe: "2-3 weeks"
          },
          {
            title: "State Management",
            description: "Context API, Redux basics, and local state management patterns",
            priority: "medium",
            timeframe: "1-2 weeks"
          },
          {
            title: "Build React Applications",
            description: "Todo app, weather app, and e-commerce product catalog",
            priority: "high",
            timeframe: "2-3 weeks"
          }
        ]
      },
      {
        month: 3,
        title: "Backend Development Basics",
        description: "Introduction to server-side development and databases",
        tasks: [
          {
            title: "Node.js & Express.js",
            description: "Server setup, routing, middleware, and RESTful API development",
            priority: "high",
            timeframe: "3-4 weeks"
          },
          {
            title: "Database Fundamentals",
            description: "MongoDB basics, CRUD operations, and data modeling",
            priority: "high",
            timeframe: "2-3 weeks"
          },
          {
            title: "API Development",
            description: "Build REST APIs with authentication and error handling",
            priority: "medium",
            timeframe: "1-2 weeks"
          }
        ]
      },
      {
        month: 4,
        title: "Full Stack Integration",
        description: "Connect frontend and backend for complete applications",
        tasks: [
          {
            title: "Full Stack Project",
            description: "Build a complete CRUD application with React frontend and Node.js backend",
            priority: "high",
            timeframe: "3-4 weeks"
          },
          {
            title: "Authentication & Authorization",
            description: "Implement JWT authentication, user registration, and protected routes",
            priority: "high",
            timeframe: "2-3 weeks"
          },
          {
            title: "Testing Fundamentals",
            description: "Unit testing with Jest and integration testing basics",
            priority: "low",
            timeframe: "1 week"
          }
        ]
      },
      {
        month: 5,
        title: "Advanced Concepts & Tools",
        description: "Learn deployment, version control, and advanced development practices",
        tasks: [
          {
            title: "Git & GitHub Mastery",
            description: "Advanced Git workflows, branching strategies, and collaboration",
            priority: "medium",
            timeframe: "1-2 weeks"
          },
          {
            title: "Deployment & DevOps",
            description: "Deploy applications to Heroku, Netlify, and learn CI/CD basics",
            priority: "high",
            timeframe: "2-3 weeks"
          },
          {
            title: "Performance Optimization",
            description: "Code splitting, lazy loading, and performance monitoring",
            priority: "medium",
            timeframe: "1-2 weeks"
          }
        ]
      },
      {
        month: 6,
        title: "Portfolio & Job Preparation",
        description: "Build professional portfolio and prepare for job applications",
        tasks: [
          {
            title: "Portfolio Development",
            description: "Create professional portfolio showcasing 4-5 full stack projects",
            priority: "high",
            timeframe: "2-3 weeks"
          },
          {
            title: "Resume & LinkedIn Optimization",
            description: "Technical resume writing and LinkedIn profile optimization",
            priority: "high",
            timeframe: "1 week"
          },
          {
            title: "Interview Preparation",
            description: "Technical interview practice, coding challenges, and system design basics",
            priority: "medium",
            timeframe: "2-3 weeks"
          },
          {
            title: "Job Applications",
            description: "Apply to entry-level and junior developer positions",
            priority: "high",
            timeframe: "Ongoing"
          }
        ]
      }
    ],
    courses: [
      {
        title: "The Complete Web Developer Course 2024",
        provider: "Udemy",
        description: "Learn HTML, CSS, JavaScript, Node.js, React, and MongoDB in one comprehensive course",
        duration: "40+ hours",
        rating: "4.7",
        url: "https://www.udemy.com/course/the-complete-web-developer-course-2/"
      },
      {
        title: "freeCodeCamp Full Stack Development",
        provider: "freeCodeCamp",
        description: "Complete curriculum covering responsive web design, JavaScript, and full stack development",
        duration: "300+ hours",
        rating: "4.8",
        url: "https://www.freecodecamp.org/learn"
      },
      {
        title: "React - The Complete Guide",
        provider: "Udemy",
        description: "Master React.js with hooks, context, Redux, and advanced patterns",
        duration: "48+ hours",
        rating: "4.6",
        url: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/"
      },
      {
        title: "Node.js Developer Course",
        provider: "Coursera",
        description: "Learn server-side development with Node.js, Express, and MongoDB",
        duration: "25+ hours",
        rating: "4.5",
        url: "https://www.coursera.org/learn/server-side-nodejs"
      },
      {
        title: "CS50\'s Web Programming with Python and JavaScript",
        provider: "edX",
        description: "Harvard\'s introduction to web programming with modern frameworks",
        duration: "12 weeks",
        rating: "4.9",
        url: "https://www.edx.org/course/cs50s-web-programming-with-python-and-javascript"
      },
      {
        title: "JavaScript Algorithms and Data Structures",
        provider: "freeCodeCamp",
        description: "Master fundamental programming concepts and problem-solving skills",
        duration: "300+ hours",
        rating: "4.8",
        url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/"
      },
      {
        title: "Git & GitHub Crash Course",
        provider: "YouTube",
        description: "Learn version control with Git and collaboration with GitHub",
        duration: "2+ hours",
        rating: "4.7",
        url: "https://www.youtube.com/watch?v=RGOj5yH7evk"
      },
      {
        title: "MongoDB University",
        provider: "MongoDB",
        description: "Official MongoDB courses covering database fundamentals and advanced topics",
        duration: "Self-paced",
        rating: "4.6",
        url: "https://university.mongodb.com/"
      },
      {
        title: "AWS Cloud Practitioner Essentials",
        provider: "AWS",
        description: "Introduction to cloud computing and AWS services for developers",
        duration: "6+ hours",
        rating: "4.5",
        url: "https://aws.amazon.com/training/course-descriptions/cloud-practitioner-essentials/"
      }
    ]
  };

  useEffect(() => {
    const initializeData = async () => {
      try {
        // Check authentication status
        const authStatus = localStorage.getItem('isAuthenticated') === 'true' ||
                          sessionStorage.getItem('isAuthenticated') === 'true';
        setIsAuthenticated(authStatus);

        // Show different loading messages
        const messages = [
          'Analyzing your career goals...',
          'Researching industry requirements...',
          'Creating personalized learning path...',
          'Finding the best resources for you...',
          'Finalizing your roadmap...'
        ];

        let messageIndex = 0;
        const messageInterval = setInterval(() => {
          if (messageIndex < messages?.length - 1) {
            setLoadingMessage(messages?.[messageIndex]);
            messageIndex++;
          } else {
            clearInterval(messageInterval);
          }
        }, 800);

        // Try to get AI-generated data first
        let data = location?.state?.roadmapData;
        
        // Fallback to localStorage if not in state
        if (!data) {
          const storedRoadmap = localStorage.getItem('aiGeneratedRoadmap');
          if (storedRoadmap) {
            try {
              data = JSON.parse(storedRoadmap);
            } catch (error) {
              console.error('Error parsing stored roadmap:', error);
            }
          }
        }
        
        // Final fallback to mock data
        if (!data) {
          data = mockRoadmapData;
        }

        // Simulate minimum loading time for better UX
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setRoadmapData(data);
        clearInterval(messageInterval);

        // Check if results are bookmarked
        const bookmarkedResults = JSON.parse(localStorage.getItem('bookmarkedResults') || '[]');
        const isCurrentBookmarked = bookmarkedResults?.some(result => 
          result?.career?.title === data?.career?.title
        );
        setIsBookmarked(isCurrentBookmarked);

      } catch (error) {
        console.error('Error initializing roadmap data:', error);
        // Fallback to mock data
        setRoadmapData(mockRoadmapData);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, [location?.state]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    navigate('/authentication');
  };

  const handleBookmark = () => {
    try {
      const bookmarkedResults = JSON.parse(localStorage.getItem('bookmarkedResults') || '[]');
      
      if (isBookmarked) {
        // Remove bookmark
        const updatedBookmarks = bookmarkedResults?.filter(result => 
          result?.career?.title !== roadmapData?.career?.title
        );
        localStorage.setItem('bookmarkedResults', JSON.stringify(updatedBookmarks));
        setIsBookmarked(false);
      } else {
        // Add bookmark
        const bookmarkData = {
          ...roadmapData,
          bookmarkedAt: new Date()?.toISOString(),
          id: Date.now()
        };
        bookmarkedResults?.push(bookmarkData);
        localStorage.setItem('bookmarkedResults', JSON.stringify(bookmarkedResults));
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error('Error handling bookmark:', error);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <AuthenticationGuard isAuthenticated={isAuthenticated}>
        <div className="min-h-screen bg-background">
          <Helmet>
            <title>Generating AI Roadmap - CareerAdvisor AI</title>
            <meta name="description" content="AI is generating your personalized career roadmap..." />
          </Helmet>
          
          <TopNavigationBar 
            isAuthenticated={isAuthenticated} 
            onLogout={handleLogout} 
          />
          
          <div className="pt-20 pb-8 px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center min-h-[60vh]">
                <div className="glass-card p-8 rounded-lg max-w-md w-full text-center">
                  <div className="flex items-center justify-center w-16 h-16 rounded-lg gradient-primary mx-auto mb-6 animate-pulse">
                    <Icon name="Brain" size={32} color="white" strokeWidth={2.5} />
                  </div>
                  
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    AI is Creating Your Roadmap
                  </h2>
                  
                  <p className="text-muted-foreground mb-6">
                    {loadingMessage}
                  </p>
                  
                  <div className="flex justify-center space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-border/20">
                    <p className="text-xs text-muted-foreground">
                      Powered by OpenAI GPT-5 • Personalizing just for you
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AuthenticationGuard>
    );
  }

  // Error state - no data available
  if (!roadmapData) {
    return (
      <AuthenticationGuard isAuthenticated={isAuthenticated}>
        <div className="min-h-screen bg-background">
          <Helmet>
            <title>Error - CareerAdvisor AI</title>
            <meta name="description" content="Unable to load career roadmap data" />
          </Helmet>
          
          <TopNavigationBar 
            isAuthenticated={isAuthenticated} 
            onLogout={handleLogout} 
          />
          
          <div className="pt-20 pb-8 px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center min-h-[60vh]">
                <div className="glass-card p-8 rounded-lg max-w-md w-full text-center">
                  <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-error/10 mx-auto mb-6">
                    <Icon name="AlertTriangle" size={32} color="var(--color-error)" strokeWidth={2.5} />
                  </div>
                  
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    Unable to Load Roadmap
                  </h2>
                  
                  <p className="text-muted-foreground mb-6">
                    We couldn't generate your career roadmap. Please try again with a different career goal.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => navigate('/career-guide')}
                      className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200"
                    >
                      Generate New Roadmap
                    </button>
                    <button
                      onClick={() => navigate('/dashboard')}
                      className="flex-1 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors duration-200"
                    >
                      Back to Dashboard
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AuthenticationGuard>
    );
  }

  return (
    <AuthenticationGuard isAuthenticated={isAuthenticated}>
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>{roadmapData?.career?.title} Roadmap - CareerAdvisor AI</title>
          <meta 
            name="description" 
            content={`AI-generated career roadmap for ${roadmapData?.career?.title} with personalized learning path, skills requirements, and curated resources.`} 
          />
          <meta name="keywords" content="AI career roadmap, OpenAI GPT-5, career guidance, skill development, personalized learning" />
        </Helmet>
        
        <TopNavigationBar 
          isAuthenticated={isAuthenticated} 
          onLogout={handleLogout} 
        />
        
        <div className="pt-20 pb-8 px-6">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Header with AI Badge */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full border border-primary/20">
                  <Icon name="Sparkles" size={16} color="var(--color-primary)" />
                  <span className="text-sm font-medium text-primary">
                    AI-Generated by OpenAI GPT-5
                  </span>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Your Personalized Career Roadmap
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Tailored specifically for your career goals with actionable steps and curated learning resources
              </p>
              
              {roadmapData?.generatedFor && (
                <p className="text-sm text-muted-foreground mt-2">
                  Created for <span className="font-medium text-foreground">{roadmapData?.generatedFor}</span>
                  {roadmapData?.generatedAt && (
                    <span> • {new Date(roadmapData?.generatedAt)?.toLocaleDateString()}</span>
                  )}
                </p>
              )}
            </div>

            {/* Career Overview */}
            <CareerOverview careerData={roadmapData?.career} />

            {/* Required Skills */}
            <RequiredSkills skills={roadmapData?.skills} />

            {/* 6-Month Roadmap */}
            <RoadmapTimeline roadmap={roadmapData?.roadmap} />

            {/* Free Courses */}
            <FreeCourses courses={roadmapData?.courses} />

            {/* Action Buttons */}
            <ActionButtons 
              onBookmark={handleBookmark}
              isBookmarked={isBookmarked}
            />

            {/* AI Disclaimer */}
            <div className="mt-12 p-4 bg-muted/50 rounded-lg border border-border/50">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={16} color="var(--color-muted-foreground)" className="mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">AI-Generated Content Notice</p>
                  <p>
                    This roadmap was generated using OpenAI's GPT-5 technology. While we strive for accuracy, 
                    please verify information and adapt recommendations based on your specific situation and local market conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticationGuard>
  );
};

export default CareerRoadmapResults;