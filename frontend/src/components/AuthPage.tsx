import React from 'react';

interface AuthPageProps {
  children: React.ReactNode;
  isLogin: boolean;
}

const AuthPage: React.FC<AuthPageProps> = ({ children, isLogin }) => {
  return (
    <div className="auth-container">
      <div className="auth-left-section">
        {}
      </div>
      <div className="auth-right-section">
        <h1 className="auth-title">{isLogin ? 'login' : 'signup'}</h1>
        {children}
      </div>
    </div>
  );
};

export default AuthPage;