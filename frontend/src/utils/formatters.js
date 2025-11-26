// Formata data para exibição
export const formatDate = (dateString) => {
	if (!dateString) return '-';

	const date = new Date(dateString);
	return date.toLocaleDateString('pt-BR', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	});
};

// Verifica se empréstimo está atrasado
export const isLoanOverdue = (expectedReturnDate, actualReturnDate) => {
	if (actualReturnDate) return false; // Já foi devolvido

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const dueDate = new Date(expectedReturnDate);
	dueDate.setHours(0, 0, 0, 0);

	return today > dueDate;
};

// Verifica se reserva está expirada
export const isReservationExpired = (expirationDate, status) => {
	if (status !== 'ACTIVE') return false;

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const expDate = new Date(expirationDate);
	expDate.setHours(0, 0, 0, 0);

	return today > expDate;
};
