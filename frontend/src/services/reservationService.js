import api from './api';

const reservationService = {
	// GET /api/v1/reservations
	async getAll() {
		const response = await api.get('/v1/reservations');
		return response.data;
	},

	// GET /api/v1/reservations/{id}
	async getById(id) {
		const response = await api.get(`/v1/reservations/${id}`);
		return response.data;
	},

	// POST /api/v1/reservations?userId={userId}&bookId={bookId}&days={days}
	async create(userId, bookId, days) {
		const response = await api.post('/v1/reservations', null, {
			params: { userId, bookId, days },
		});
		return response.data;
	},

	// PUT /api/v1/reservations/{id}/cancel
	async cancel(id) {
		const response = await api.put(`/v1/reservations/${id}/cancel`);
		return response.data;
	},

	// DELETE /api/v1/reservations/{id}
	async delete(id) {
		await api.delete(`/v1/reservations/${id}`);
	},
};

export default reservationService;
