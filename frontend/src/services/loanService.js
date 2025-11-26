import api from './api';

const loanService = {
	// GET /api/v1/loans
	async getAll() {
		const response = await api.get('/v1/loans');
		return response.data;
	},

	// GET /api/v1/loans/{id}
	async getById(id) {
		const response = await api.get(`/v1/loans/${id}`);
		return response.data;
	},

	// POST /api/v1/loans?userId={userId}&bookId={bookId}&days={days}
	async create(userId, bookId, days) {
		const response = await api.post('/v1/loans', null, {
			params: { userId, bookId, days },
		});
		return response.data;
	},

	// PUT /api/v1/loans/{id}/return
	async returnBook(id) {
		const response = await api.put(`/v1/loans/${id}/return`);
		return response.data;
	},

	// DELETE /api/v1/loans/{id}
	async delete(id) {
		await api.delete(`/v1/loans/${id}`);
	},
};

export default loanService;
