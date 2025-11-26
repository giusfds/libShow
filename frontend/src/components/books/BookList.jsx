import { Button } from '@/components/ui/button.jsx'
import { Loader2, Pencil, Trash2 } from 'lucide-react'

export default function BookList({ books, loading, onEdit, onDelete }) {
	if (loading) {
		return (
			<div className="flex justify-center py-8">
				<Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
			</div>
		)
	}

	if (books.length === 0) {
		return <p className="text-gray-500 text-center py-8">Nenhum livro cadastrado ainda.</p>
	}

	return (
		<div className="space-y-2">
			{books.map((livro) => (
				<div
					key={livro.id}
					className={`p-4 border rounded-lg flex justify-between items-center hover:bg-gray-50 transition-colors ${livro.hasActiveReservations ? 'border-amber-300 bg-amber-50' : ''
						}`}
				>
					<div>
						<h4 className="font-semibold">{livro.title}</h4>
						<p className="text-sm text-gray-600">
							{livro.author} - {livro.publisher} ({livro.publicationYear})
						</p>
						<p className="text-sm text-gray-500">ISBN: {livro.isbn}</p>
						<p className="text-sm text-gray-500">
							Disponíveis: {livro.availableQuantity} de {livro.totalQuantity}
						</p>
						{livro.hasActiveReservations && (
							<p className="text-sm text-amber-600 font-semibold mt-1">
								⚠️ {livro.activeReservationsCount} reserva(s) ativa(s)
							</p>
						)}
					</div>
					<div className="flex gap-2">
						<Button variant="outline" size="sm" onClick={() => onEdit(livro)}>
							<Pencil className="h-4 w-4 mr-1" />
							Editar
						</Button>
						<Button variant="destructive" size="sm" onClick={() => onDelete(livro.id)}>
							<Trash2 className="h-4 w-4 mr-1" />
							Excluir
						</Button>
					</div>
				</div>
			))}
		</div>
	)
}
