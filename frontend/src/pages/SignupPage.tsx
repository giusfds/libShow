import React from 'react';
import AuthPage from '../components/AuthPage';
import AuthForm from '../components/AuthForm';

const SignupPage: React.FC = () => {
  return (
    <AuthPage isLogin={false}>
      <AuthForm isLogin={false} />
    </AuthPage>
  );
};

export default SignupPage;