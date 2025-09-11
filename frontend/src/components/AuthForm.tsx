import React from 'react';
import { Link } from 'react-router-dom';

interface AuthFormProps {
  isLogin: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin }) => {
  return (
    <form className="auth-form">
      <div className="avatar-placeholder">
        {/* Placeholder para a imagem de usuário */}
      </div>

      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="vinishow@libshow.com" />
      </div>

      {!isLogin && (
        <div className="input-group">
          <label htmlFor="name">Nome</label>
          <input type="text" id="name" placeholder="Nome" />
        </div>
      )}

      <div className="input-group">
        <label htmlFor="password">Senha</label>
        <input type="password" id="password" placeholder="***********" />
      </div>

      {!isLogin && (
        <div className="input-group">
          <label htmlFor="role">Função</label>
          <select id="role">
            <option>Bibliotecário</option>
            <option>Usuário</option>
          </select>
        </div>
      )}
      
      {/* 
        TODO: isValid => validar o banco de dados se o user existe
      */}
      <button type="submit" className="primary-button">
        {isLogin ? 'Log In' : 'Sign Up'}
      </button>

      {isLogin ? (
        <Link to="/signup" className="secondary-link">Sign Up</Link>
      ) : (
        <Link to="/login" className="secondary-link">Log In</Link>
      )}
    </form>
  );
};

export default AuthForm;