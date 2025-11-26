import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { DEFAULT_LOAN_DAYS } from '@/utils/constants.js'

export default function LoanModal({
	open,
	onOpenChange,
	loanForm,
	setLoanForm,
	users,
	books,
	reservations,
	onSubmit,
}) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Registrar Novo Empréstimo</DialogTitle>
					<DialogDescription>Preencha os dados para registrar um empréstimo de livro</DialogDescription>
				</DialogHeader>
				<form onSubmit={onSubmit} className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div className="space-y-2">
							<Label htmlFor="usuario-emp">Usuário</Label>
							<select
								id="usuario-emp"
								className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
								value={loanForm.userId}
								onChange={(e) => setLoanForm({ ...loanForm, userId: e.target.value })}
								required
							>
								<option value="">Selecione um usuário</option>
								{users.map((user) => (
									<option key={user.id} value={user.id}>
										{user.name} ({user.email})
									</option>
								))}
							</select>
						</div>
						<div className="space-y-2">
							<Label htmlFor="livro-emp">Livro</Label>
							<select
								id="livro-emp"
								className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
								value={loanForm.bookId}
								onChange={(e) => setLoanForm({ ...loanForm, bookId: e.target.value })}
								required
							>
								<option value="">Selecione um livro</option>
								{books
									.filter((book) => book.availableQuantity > 0 && !book.hasActiveReservations)
									.map((book) => (
										<option key={book.id} value={book.id}>
											{book.title} - {book.author} (Disponíveis: {book.availableQuantity})
										</option>
									))}
								{books.filter((book) => book.availableQuantity > 0 && book.hasActiveReservations)
									.length > 0 && (
										<optgroup label="Livros com Reserva Ativa (Acesso Restrito)">
											{books
												.filter((book) => book.availableQuantity > 0 && book.hasActiveReservations)
												.map((book) => (
													<option key={book.id} value={book.id}>
														{book.title} - {book.author} ({book.activeReservationsCount} reserva(s)
														ativa(s))
													</option>
												))}
										</optgroup>
									)}
							</select>
							{loanForm.bookId &&
								books.find((b) => b.id === parseInt(loanForm.bookId))?.hasActiveReservations && (
									<div className="text-sm">
										<p className="text-amber-600 mb-1">
											⚠️ Este livro possui reserva ativa. Apenas usuários com reserva podem retirá-lo.
										</p>
										{loanForm.userId &&
											reservations.some(
												(r) =>
													r.book?.id === parseInt(loanForm.bookId) &&
													r.user?.id === parseInt(loanForm.userId) &&
													r.status === 'ACTIVE'
											) && (
												<p className="text-green-600 font-semibold">
													✓ O usuário selecionado possui reserva ativa para este livro
												</p>
											)}
									</div>
								)}
						</div>
						<div className="space-y-2">
							<Label htmlFor="dias">Dias de Empréstimo</Label>
							<Input
								id="dias"
								type="number"
								placeholder="14"
								min="1"
								value={loanForm.days}
								onChange={(e) =>
									setLoanForm({ ...loanForm, days: parseInt(e.target.value) || DEFAULT_LOAN_DAYS })
								}
								required
							/>
						</div>
					</div>
					<Button type="submit" className="w-full md:w-auto">
						Registrar Empréstimo
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}
