import { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Verifica se tem token ao carregar
		const token = localStorage.getItem('token');
		const username = localStorage.getItem('user');

		if (token && username) {
			setIsAuthenticated(true);
			setUser(username);
		}

		setLoading(false);
	}, []);

	const login = async (username, password) => {
		try {
			await authService.login(username, password);
			setIsAuthenticated(true);
			setUser(username);
			return { success: true };
		} catch (error) {
			console.error('Erro ao fazer login:', error);
			return {
				success: false,
				error: error.response?.data?.message || 'Erro ao fazer login'
			};
		}
	};

	const logout = () => {
		authService.logout();
		setIsAuthenticated(false);
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
