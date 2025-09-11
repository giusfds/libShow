import React from 'react';
import AuthPage from '../components/AuthPage';
import AuthForm from '../components/AuthForm';

const LoginPage: React.FC = () => {
  return (
    <AuthPage isLogin={true}>
      <AuthForm isLogin={true} />
    </AuthPage>
  );
};

export default LoginPage;