import { Button } from '@/components/ui/button.jsx'
import { Loader2, Trash2, Undo } from 'lucide-react'
import { formatDate, isLoanOverdue } from '@/utils/formatters.js'

export default function LoanList({ loans, loading, onReturn, onDelete }) {
	if (loading) {
		return (
			<div className="flex justify-center py-8">
				<Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
			</div>
		)
	}

	if (loans.length === 0) {
		return <p className="text-gray-500 text-center py-8">Nenhum empréstimo ativo.</p>
	}

	return (
		<div className="space-y-2">
			{loans.map((emprestimo) => {
				const overdue = isLoanOverdue(emprestimo.expectedReturnDate, emprestimo.actualReturnDate)
				const isReturned = !!emprestimo.actualReturnDate

				return (
					<div
						key={emprestimo.id}
						className={`p-4 border rounded-lg flex justify-between items-center transition-colors ${isReturned ? 'bg-gray-50' : overdue ? 'bg-red-50 border-red-300' : 'hover:bg-gray-50'
							}`}
					>
						<div>
							<h4 className="font-semibold">{emprestimo.book?.title || 'Livro não encontrado'}</h4>
							<p className="text-sm text-gray-600">
								Emprestado para: {emprestimo.user?.name || 'Usuário não encontrado'}
							</p>
							<p className="text-sm text-gray-500">
								Data do empréstimo: {formatDate(emprestimo.loanDate)}
							</p>
							<p
								className={`text-sm ${overdue && !isReturned ? 'text-red-600 font-semibold' : 'text-gray-500'
									}`}
							>
								Devolução prevista: {formatDate(emprestimo.expectedReturnDate)}
								{overdue && !isReturned && ' (ATRASADO)'}
							</p>
							{isReturned && (
								<p className="text-sm text-green-600 font-semibold">
									Devolvido em: {formatDate(emprestimo.actualReturnDate)}
								</p>
							)}
						</div>
						<div className="flex gap-2">
							{!isReturned && (
								<Button variant="outline" size="sm" onClick={() => onReturn(emprestimo.id)}>
									<Undo className="h-4 w-4 mr-1" />
									Registrar Devolução
								</Button>
							)}
							<Button variant="destructive" size="sm" onClick={() => onDelete(emprestimo.id)}>
								<Trash2 className="h-4 w-4 mr-1" />
								Excluir
							</Button>
						</div>
					</div>
				)
			})}
		</div>
	)
}
