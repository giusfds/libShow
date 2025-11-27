import { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState(null);
	const [userRole, setUserRole] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Verifica se tem token ao carregar
		const token = localStorage.getItem('token');
		const username = localStorage.getItem('user');
		const role = localStorage.getItem('role');

		if (token && username) {
			setIsAuthenticated(true);
			setUser(username);
			setUserRole(role);
		}

		setLoading(false);
	}, []);

	const login = async (username, password) => {
		try {
			const response = await authService.login(username, password);
			setIsAuthenticated(true);
			setUser(response.username);
			setUserRole(response.role);
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
		setUserRole(null);
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, user, userRole, loading, login, logout }}>
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
