import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:8080/api',
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Request interceptor - Adiciona token JWT em todas as requisições
api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Response interceptor - Trata erros globalmente
api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response) {
			// Erros com resposta do servidor
			const { status } = error.response;

			if (status === 401) {
				// Token inválido ou expirado - fazer logout
				localStorage.removeItem('token');
				localStorage.removeItem('user');
				window.location.href = '/';
			}

			if (status === 404) {
				console.error('Recurso não encontrado');
			}

			if (status === 500) {
				console.error('Erro interno do servidor');
			}
		} else if (error.request) {
			// Erro de rede
			console.error('Erro de conexão com o servidor');
		}

		return Promise.reject(error);
	}
);

export default api;
