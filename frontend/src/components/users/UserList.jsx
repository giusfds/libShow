import { Button } from '@/components/ui/button.jsx'
import { Loader2, Pencil, Trash2 } from 'lucide-react'
import { USER_ROLE_LABELS } from '@/utils/constants.js'

export default function UserList({ users, loading, onEdit, onDelete }) {
	if (loading) {
		return (
			<div className="flex justify-center py-8">
				<Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
			</div>
		)
	}

	if (users.length === 0) {
		return <p className="text-gray-500 text-center py-8">Nenhum usuário cadastrado ainda.</p>
	}

	return (
		<div className="space-y-2">
			{users.map((usuario) => (
				<div
					key={usuario.id}
					className="p-4 border rounded-lg flex justify-between items-center hover:bg-gray-50 transition-colors"
				>
					<div>
						<h4 className="font-semibold">{usuario.name}</h4>
						<p className="text-sm text-gray-600">{usuario.email}</p>
						<p className="text-sm text-gray-500">Perfil: {USER_ROLE_LABELS[usuario.role]}</p>
					</div>
					<div className="flex gap-2">
						<Button variant="outline" size="sm" onClick={() => onEdit(usuario)}>
							<Pencil className="h-4 w-4 mr-1" />
							Editar
						</Button>
						<Button variant="destructive" size="sm" onClick={() => onDelete(usuario.id)}>
							<Trash2 className="h-4 w-4 mr-1" />
							Excluir
						</Button>
					</div>
				</div>
			))}
		</div>
	)
}
