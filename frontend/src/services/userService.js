import api from './api';

const userService = {
	// GET /api/v1/users
	async getAll() {
		const response = await api.get('/v1/users');
		return response.data;
	},

	// GET /api/v1/users/{id}
	async getById(id) {
		const response = await api.get(`/v1/users/${id}`);
		return response.data;
	},

	// POST /api/v1/users
	async create(user) {
		const response = await api.post('/v1/users', user);
		return response.data;
	},

	// PUT /api/v1/users/{id}
	async update(id, user) {
		const response = await api.put(`/v1/users/${id}`, user);
		return response.data;
	},

	// DELETE /api/v1/users/{id}
	async delete(id) {
		await api.delete(`/v1/users/${id}`);
	},
};

export default userService;
