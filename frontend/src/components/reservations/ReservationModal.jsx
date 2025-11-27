import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { DEFAULT_RESERVATION_DAYS } from '@/utils/constants.js'

export default function ReservationModal({
	open,
	onOpenChange,
	reservationForm,
	setReservationForm,
	users,
	books,
	onSubmit,
	canSelectUser = true,
}) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Fazer Nova Reserva</DialogTitle>
					<DialogDescription>Preencha os dados para reservar um livro indisponível</DialogDescription>
				</DialogHeader>
				<form onSubmit={onSubmit} className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div className="space-y-2">
							<Label htmlFor="usuario-res">Usuário</Label>
						<select
							id="usuario-res"
							className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
							value={reservationForm.userId}
							onChange={(e) => setReservationForm({ ...reservationForm, userId: e.target.value })}
							required
							disabled={!canSelectUser}
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
							<Label htmlFor="livro-res">Livro</Label>
							<select
								id="livro-res"
								className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
								value={reservationForm.bookId}
								onChange={(e) => setReservationForm({ ...reservationForm, bookId: e.target.value })}
								required
							>
								<option value="">Selecione um livro</option>
								{books
									.filter((book) => book.availableQuantity === 0)
									.map((book) => (
										<option key={book.id} value={book.id}>
											{book.title} - {book.author} (Indisponível)
										</option>
									))}
							</select>
						</div>
						<div className="space-y-2">
							<Label htmlFor="dias-res">Dias de Reserva</Label>
							<Input
								id="dias-res"
								type="number"
								placeholder="7"
								min="1"
								value={reservationForm.days}
								onChange={(e) =>
									setReservationForm({
										...reservationForm,
										days: parseInt(e.target.value) || DEFAULT_RESERVATION_DAYS,
									})
								}
								required
							/>
						</div>
					</div>
					<Button type="submit" className="w-full md:w-auto">
						Fazer Reserva
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}
