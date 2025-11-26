import api from './api';

const bookService = {
	// GET /api/v1/books
	async getAll() {
		const response = await api.get('/v1/books');
		return response.data;
	},

	// GET /api/v1/books/availability
	async getAllWithAvailability() {
		const response = await api.get('/v1/books/availability');
		return response.data;
	},

	// GET /api/v1/books/{id}
	async getById(id) {
		const response = await api.get(`/v1/books/${id}`);
		return response.data;
	},

	// POST /api/v1/books
	async create(book) {
		const response = await api.post('/v1/books', book);
		return response.data;
	},

	// PUT /api/v1/books/{id}
	async update(id, book) {
		const response = await api.put(`/v1/books/${id}`, book);
		return response.data;
	},

	// DELETE /api/v1/books/{id}
	async delete(id) {
		await api.delete(`/v1/books/${id}`);
	},
};

export default bookService;
