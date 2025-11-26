import api from './api';

const authService = {
	// Login - POST /api/v1/auth/login
	async login(username, password) {
		const response = await api.post('/v1/auth/login', {
			username,
			password,
		});

		if (response.data.token) {
			localStorage.setItem('token', response.data.token);
			localStorage.setItem('user', username);
		}

		return response.data;
	},

	// Logout
	logout() {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
	},

	// Verifica se está autenticado
	isAuthenticated() {
		return !!localStorage.getItem('token');
	},

	// Pega o usuário atual
	getCurrentUser() {
		return localStorage.getItem('user');
	},
};

export default authService;
