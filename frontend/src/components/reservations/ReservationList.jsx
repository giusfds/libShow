import { Button } from '@/components/ui/button.jsx'
import { Loader2, Trash2, CirclePlus, CircleX } from 'lucide-react'
import { formatDate, isReservationExpired } from '@/utils/formatters.js'
import { RESERVATION_STATUS_LABELS } from '@/utils/constants.js'

export default function ReservationList({ reservations, loading, onConvertToLoan, onCancel, onDelete, canManage = true, canConvertReservation = true, currentUserEmail = null }) {
	if (loading) {
		return (
			<div className="flex justify-center py-8">
				<Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
			</div>
		)
	}

	if (reservations.length === 0) {
		return <p className="text-gray-500 text-center py-8">Nenhuma reserva cadastrada.</p>
	}

	return (
		<div className="space-y-2">
			{reservations.map((reserva) => {
				const expired = isReservationExpired(reserva.expirationDate, reserva.status)
				const isCancelled = reserva.status === 'CANCELLED'
				const isCompleted = reserva.status === 'COMPLETED'
				const isOwnReservation = currentUserEmail && reserva.user?.email === currentUserEmail
				const canShowConvertButton = reserva.status === 'ACTIVE' && reserva.book?.availableQuantity > 0 && (canManage || (canConvertReservation && isOwnReservation))

				return (
					<div
						key={reserva.id}
						className={`p-4 border rounded-lg flex justify-between items-center transition-colors ${isCancelled || isCompleted
							? 'bg-gray-50'
							: expired
								? 'bg-yellow-50 border-yellow-300'
								: 'hover:bg-gray-50'
							}`}
					>
						<div>
							<h4 className="font-semibold">{reserva.book?.title || 'Livro não encontrado'}</h4>
							<p className="text-sm text-gray-600">
								Reservado por: {reserva.user?.name || 'Usuário não encontrado'}
							</p>
							<p className="text-sm text-gray-500">
								Data da reserva: {formatDate(reserva.reservationDate)}
							</p>
							<p
								className={`text-sm ${expired && !isCancelled && !isCompleted
									? 'text-yellow-600 font-semibold'
									: 'text-gray-500'
									}`}
							>
								Validade: {formatDate(reserva.expirationDate)}
								{expired && !isCancelled && !isCompleted && ' (EXPIRADA)'}
							</p>
							<p
								className={`text-sm font-semibold ${isCancelled ? 'text-red-600' : isCompleted ? 'text-green-600' : 'text-blue-600'
									}`}
							>
								Status: {RESERVATION_STATUS_LABELS[reserva.status]}
							</p>
						</div>
						{(canManage || canShowConvertButton) && (
							<div className="flex gap-2">
								{canShowConvertButton && (
									<Button
										size="sm"
										className="bg-green-600 hover:bg-green-700"
										onClick={() => onConvertToLoan(reserva.id)}
									>
										<CirclePlus className="h-4 w-4 mr-1" />
										Criar Empréstimo
									</Button>
								)}
								{canManage && reserva.status === 'ACTIVE' && (
									<Button variant="outline" size="sm" onClick={() => onCancel(reserva.id)}>
										<CircleX className="h-4 w-4 mr-1" />
										Cancelar
									</Button>
								)}
								{canManage && (
									<Button variant="destructive" size="sm" onClick={() => onDelete(reserva.id)}>
										<Trash2 className="h-4 w-4 mr-1" />
										Excluir
									</Button>
								)}
							</div>
						)}
					</div>
				)
			})}
		</div>
	)
}
