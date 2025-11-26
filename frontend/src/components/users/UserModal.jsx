import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { USER_ROLES, USER_ROLE_LABELS } from '@/utils/constants.js'

export default function UserModal({
	open,
	onOpenChange,
	userForm,
	setUserForm,
	editingUser,
	onSubmit,
	onCancel
}) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>{editingUser ? 'Editar Usuário' : 'Adicionar Novo Usuário'}</DialogTitle>
					<DialogDescription>
						{editingUser ? 'Edite as informações do usuário' : 'Preencha os dados do novo usuário'}
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={onSubmit} className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="nome">Nome</Label>
							<Input
								id="nome"
								placeholder="Nome completo"
								value={userForm.name}
								onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="usuario@email.com"
								value={userForm.email}
								onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="senha">Senha {editingUser && '(deixe em branco para manter)'}</Label>
							<Input
								id="senha"
								type="password"
								placeholder="••••••••"
								value={userForm.password}
								onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
								required={!editingUser}
								minLength={6}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="perfil">Perfil</Label>
							<select
								id="perfil"
								className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
								value={userForm.role}
								onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
								required
							>
								{Object.values(USER_ROLES).map((role) => (
									<option key={role} value={role}>
										{USER_ROLE_LABELS[role]}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className="flex gap-2">
						<Button type="submit" className="w-full md:w-auto">
							{editingUser ? 'Atualizar Usuário' : 'Cadastrar Usuário'}
						</Button>
						{editingUser && (
							<Button type="button" variant="outline" onClick={onCancel} className="w-full md:w-auto">
								Cancelar
							</Button>
						)}
					</div>
				</form>
			</DialogContent>
		</Dialog>
	)
}
