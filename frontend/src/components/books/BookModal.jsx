import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'

export default function BookModal({
	open,
	onOpenChange,
	bookForm,
	setBookForm,
	editingBook,
	onSubmit,
	onCancel
}) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>{editingBook ? 'Editar Livro' : 'Adicionar Novo Livro'}</DialogTitle>
					<DialogDescription>
						{editingBook ? 'Edite as informações do livro' : 'Preencha os dados do novo livro'}
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={onSubmit} className="space-y-4">
					<div className="grid grid-cols-1 gap-4">
						<div className="space-y-2">
							<Label htmlFor="titulo">Título</Label>
							<Input
								id="titulo"
								placeholder="Nome do livro"
								value={bookForm.title}
								onChange={(e) => setBookForm({ ...bookForm, title: e.target.value })}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="autor">Autor</Label>
							<Input
								id="autor"
								placeholder="Nome do autor"
								value={bookForm.author}
								onChange={(e) => setBookForm({ ...bookForm, author: e.target.value })}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="isbn">ISBN</Label>
							<Input
								id="isbn"
								placeholder="ISBN do livro"
								value={bookForm.isbn}
								onChange={(e) => setBookForm({ ...bookForm, isbn: e.target.value })}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="editora">Editora</Label>
							<Input
								id="editora"
								placeholder="Nome da editora"
								value={bookForm.publisher}
								onChange={(e) => setBookForm({ ...bookForm, publisher: e.target.value })}
								required
							/>
						</div>
						<div className='grid md:grid-cols-2 gap-4'>
							<div className="space-y-2">
								<Label htmlFor="ano">Ano de Publicação</Label>
								<Input
									id="ano"
									type="number"
									placeholder="2024"
									value={bookForm.publicationYear}
									onChange={(e) => setBookForm({ ...bookForm, publicationYear: e.target.value })}
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="quantidade">Quantidade</Label>
								<Input
									id="quantidade"
									type="number"
									placeholder="1"
									min="1"
									value={bookForm.totalQuantity}
									onChange={(e) => setBookForm({ ...bookForm, totalQuantity: parseInt(e.target.value) || 1 })}
									required
								/>
							</div>
						</div>
					</div>
					<div className="flex gap-2">
						<Button type="submit" className="w-full md:w-auto">
							{editingBook ? 'Atualizar Livro' : 'Cadastrar Livro'}
						</Button>
						{editingBook && (
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
