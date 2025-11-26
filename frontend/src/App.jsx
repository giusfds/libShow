import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { BookOpen, Users, BookMarked, FileText, LogIn, Loader2 } from 'lucide-react'
import { useAuth } from './contexts/AuthContext.jsx'
import { toast } from 'sonner'
import bookService from './services/bookService.js'
import userService from './services/userService.js'
import loanService from './services/loanService.js'
import reservationService from './services/reservationService.js'
import { USER_ROLES, USER_ROLE_LABELS, DEFAULT_LOAN_DAYS, DEFAULT_RESERVATION_DAYS, RESERVATION_STATUS_LABELS } from './utils/constants.js'
import { formatDate, isLoanOverdue, isReservationExpired } from './utils/formatters.js'
import './App.css'

function App() {
	const { isAuthenticated, loading, login, logout } = useAuth()
	const [activeTab, setActiveTab] = useState('livros')
	const [showRegister, setShowRegister] = useState(false)
	const [loginData, setLoginData] = useState({ username: '', password: '' })
	const [registerData, setRegisterData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	})

	const [livros, setLivros] = useState([])
	const [loadingLivros, setLoadingLivros] = useState(false)
	const [bookForm, setBookForm] = useState({
		title: '',
		author: '',
		isbn: '',
		publicationYear: '',
		publisher: '',
		totalQuantity: 1,
	})
	const [editingBook, setEditingBook] = useState(null)

	const [usuarios, setUsuarios] = useState([])
	const [loadingUsuarios, setLoadingUsuarios] = useState(false)
	const [userForm, setUserForm] = useState({
		name: '',
		email: '',
		password: '',
		role: 'STUDENT',
	})
	const [editingUser, setEditingUser] = useState(null)

	const [emprestimos, setEmprestimos] = useState([])
	const [loadingEmprestimos, setLoadingEmprestimos] = useState(false)
	const [loanForm, setLoanForm] = useState({
		userId: '',
		bookId: '',
		days: DEFAULT_LOAN_DAYS,
	})

	const [reservas, setReservas] = useState([])
	const [loadingReservas, setLoadingReservas] = useState(false)
	const [reservationForm, setReservationForm] = useState({
		userId: '',
		bookId: '',
		days: DEFAULT_RESERVATION_DAYS,
	})

	const handleLogin = async (e) => {
		e.preventDefault()

		const result = await login(loginData.username, loginData.password)

		if (result.success) {
			toast.success('Login realizado com sucesso!')
		} else {
			toast.error(result.error || 'Erro ao fazer login')
		}
	}

	const handleLogout = () => {
		logout()
		setLoginData({ username: '', password: '' })
		setShowRegister(false)
		toast.info('Você saiu do sistema')
	}

	const handleRegister = async (e) => {
		e.preventDefault()

		if (registerData.password !== registerData.confirmPassword) {
			toast.error('As senhas não coincidem')
			return
		}

		if (registerData.password.length < 6) {
			toast.error('A senha deve ter pelo menos 6 caracteres')
			return
		}

		try {
			await userService.create({
				name: registerData.name,
				email: registerData.email,
				password: registerData.password,
				role: 'STUDENT', // Novo usuário sempre começa como STUDENT
			})

			toast.success('Cadastro realizado com sucesso! Faça login para continuar.')

			setRegisterData({
				name: '',
				email: '',
				password: '',
				confirmPassword: '',
			})
			setShowRegister(false)
		} catch (error) {
			toast.error(error.response?.data?.message || 'Erro ao realizar cadastro')
			console.error(error)
		}
	}

	// Load data when authenticated
	useEffect(() => {
		if (isAuthenticated) {
			loadBooks()
			loadUsers()
			loadLoans()
			loadReservations()
		}
	}, [isAuthenticated])

	const loadBooks = async () => {
		try {
			setLoadingLivros(true)
			const data = await bookService.getAll()
			setLivros(data)
		} catch (error) {
			toast.error('Erro ao carregar livros')
			console.error(error)
		} finally {
			setLoadingLivros(false)
		}
	}

	const handleBookSubmit = async (e) => {
		e.preventDefault()

		try {
			if (editingBook) {
				await bookService.update(editingBook.id, bookForm)
				toast.success('Livro atualizado com sucesso!')
				setEditingBook(null)
			} else {
				await bookService.create({
					...bookForm,
					availableQuantity: bookForm.totalQuantity,
				})
				toast.success('Livro cadastrado com sucesso!')
			}

			setBookForm({
				title: '',
				author: '',
				isbn: '',
				publicationYear: '',
				publisher: '',
				totalQuantity: 1,
			})

			loadBooks()
		} catch (error) {
			toast.error(editingBook ? 'Erro ao atualizar livro' : 'Erro ao cadastrar livro')
			console.error(error)
		}
	}

	const handleEditBook = (book) => {
		setEditingBook(book)
		setBookForm({
			title: book.title,
			author: book.author,
			isbn: book.isbn,
			publicationYear: book.publicationYear,
			publisher: book.publisher,
			totalQuantity: book.totalQuantity,
		})
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const handleCancelEdit = () => {
		setEditingBook(null)
		setBookForm({
			title: '',
			author: '',
			isbn: '',
			publicationYear: '',
			publisher: '',
			totalQuantity: 1,
		})
	}

	const handleDeleteBook = async (id) => {
		if (!confirm('Tem certeza que deseja excluir este livro?')) return

		try {
			await bookService.delete(id)
			toast.success('Livro excluído com sucesso!')
			loadBooks()
		} catch (error) {
			toast.error('Erro ao excluir livro')
			console.error(error)
		}
	}

	const loadUsers = async () => {
		try {
			setLoadingUsuarios(true)
			const data = await userService.getAll()
			setUsuarios(data)
		} catch (error) {
			toast.error('Erro ao carregar usuários')
			console.error(error)
		} finally {
			setLoadingUsuarios(false)
		}
	}

	const handleUserSubmit = async (e) => {
		e.preventDefault()

		try {
			if (editingUser) {
				// Se não digitou nova senha, remove o campo
				const updateData = { ...userForm }
				if (!updateData.password) {
					delete updateData.password
				}

				await userService.update(editingUser.id, updateData)
				toast.success('Usuário atualizado com sucesso!')
				setEditingUser(null)
			} else {
				await userService.create(userForm)
				toast.success('Usuário cadastrado com sucesso!')
			}

			setUserForm({
				name: '',
				email: '',
				password: '',
				role: 'STUDENT',
			})

			loadUsers()
		} catch (error) {
			toast.error(editingUser ? 'Erro ao atualizar usuário' : 'Erro ao cadastrar usuário')
			console.error(error)
		}
	}

	const handleEditUser = (user) => {
		setEditingUser(user)
		setUserForm({
			name: user.name,
			email: user.email,
			password: '', // Não mostra a senha por segurança
			role: user.role,
		})
		setActiveTab('usuarios')
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const handleCancelEditUser = () => {
		setEditingUser(null)
		setUserForm({
			name: '',
			email: '',
			password: '',
			role: 'STUDENT',
		})
	}

	const handleDeleteUser = async (id) => {
		if (!confirm('Tem certeza que deseja excluir este usuário?')) return

		try {
			await userService.delete(id)
			toast.success('Usuário excluído com sucesso!')
			loadUsers()
		} catch (error) {
			toast.error('Erro ao excluir usuário')
			console.error(error)
		}
	}

	const loadLoans = async () => {
		try {
			setLoadingEmprestimos(true)
			const data = await loanService.getAll()
			setEmprestimos(data)
		} catch (error) {
			toast.error('Erro ao carregar empréstimos')
			console.error(error)
		} finally {
			setLoadingEmprestimos(false)
		}
	}

	const handleLoanSubmit = async (e) => {
		e.preventDefault()

		if (!loanForm.userId || !loanForm.bookId) {
			toast.error('Selecione um usuário e um livro')
			return
		}

		try {
			await loanService.create(loanForm.userId, loanForm.bookId, loanForm.days)
			toast.success('Empréstimo registrado com sucesso!')

			setLoanForm({
				userId: '',
				bookId: '',
				days: DEFAULT_LOAN_DAYS,
			})

			loadLoans()
			loadBooks() // Atualiza disponibilidade
		} catch (error) {
			toast.error(error.response?.data?.message || 'Erro ao registrar empréstimo')
			console.error(error)
		}
	}

	const handleReturnBook = async (id) => {
		try {
			await loanService.returnBook(id)
			toast.success('Devolução registrada com sucesso!')
			loadLoans()
			loadBooks() // Atualiza disponibilidade
		} catch (error) {
			toast.error('Erro ao registrar devolução')
			console.error(error)
		}
	}

	const handleDeleteLoan = async (id) => {
		if (!confirm('Tem certeza que deseja excluir este empréstimo?')) return

		try {
			await loanService.delete(id)
			toast.success('Empréstimo excluído com sucesso!')
			loadLoans()
			loadBooks() // Atualiza disponibilidade
		} catch (error) {
			toast.error('Erro ao excluir empréstimo')
			console.error(error)
		}
	}

	const loadReservations = async () => {
		try {
			setLoadingReservas(true)
			const data = await reservationService.getAll()
			setReservas(data)
		} catch (error) {
			toast.error('Erro ao carregar reservas')
			console.error(error)
		} finally {
			setLoadingReservas(false)
		}
	}

	const handleReservationSubmit = async (e) => {
		e.preventDefault()

		if (!reservationForm.userId || !reservationForm.bookId) {
			toast.error('Selecione um usuário e um livro')
			return
		}

		try {
			await reservationService.create(reservationForm.userId, reservationForm.bookId, reservationForm.days)
			toast.success('Reserva criada com sucesso!')

			setReservationForm({
				userId: '',
				bookId: '',
				days: DEFAULT_RESERVATION_DAYS,
			})

			loadReservations()
		} catch (error) {
			toast.error(error.response?.data?.message || 'Erro ao criar reserva')
			console.error(error)
		}
	}

	const handleCancelReservation = async (id) => {
		try {
			await reservationService.cancel(id)
			toast.success('Reserva cancelada com sucesso!')
			loadReservations()
		} catch (error) {
			toast.error('Erro ao cancelar reserva')
			console.error(error)
		}
	}

	const handleDeleteReservation = async (id) => {
		if (!confirm('Tem certeza que deseja excluir esta reserva?')) return

		try {
			await reservationService.delete(id)
			toast.success('Reserva excluída com sucesso!')
			loadReservations()
		} catch (error) {
			toast.error('Erro ao excluir reserva')
			console.error(error)
		}
	}

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
				<div className="text-center">
					<BookOpen className="h-12 w-12 text-indigo-600 animate-pulse mx-auto mb-4" />
					<p className="text-gray-600">Carregando...</p>
				</div>
			</div>
		)
	}

	if (!isAuthenticated) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
				<Card className="w-full max-w-md">
					<CardHeader className="space-y-1">
						<div className="flex items-center justify-center mb-4">
							<BookOpen className="h-12 w-12 text-indigo-600" />
						</div>
						<CardTitle className="text-2xl text-center">LibShow</CardTitle>
						<CardDescription className="text-center">
							Sistema de Gerenciamento de Biblioteca
						</CardDescription>
					</CardHeader>
					<CardContent>
						{!showRegister ? (
							<>
								<form onSubmit={handleLogin} className="space-y-4">
									<div className="space-y-2">
										<Label htmlFor="username">Email</Label>
										<Input
											id="username"
											type="email"
											placeholder="seu@email.com"
											value={loginData.username}
											onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
											required
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="password">Senha</Label>
										<Input
											id="password"
											type="password"
											placeholder="••••••••"
											value={loginData.password}
											onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
											required
										/>
									</div>
									<Button type="submit" className="w-full">
										<LogIn className="mr-2 h-4 w-4" />
										Entrar
									</Button>
								</form>
								<div className="mt-4 text-center">
									<p className="text-sm text-gray-600">
										Não tem uma conta ainda?{' '}
										<button
											type="button"
											onClick={() => setShowRegister(true)}
											className="text-indigo-600 hover:text-indigo-800 font-semibold"
										>
											Cadastre-se
										</button>
									</p>
								</div>
							</>
						) : (
							<>
								<form onSubmit={handleRegister} className="space-y-4">
									<div className="space-y-2">
										<Label htmlFor="register-name">Nome Completo</Label>
										<Input
											id="register-name"
											type="text"
											placeholder="Seu nome completo"
											value={registerData.name}
											onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
											required
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="register-email">Email</Label>
										<Input
											id="register-email"
											type="email"
											placeholder="seu@email.com"
											value={registerData.email}
											onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
											required
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="register-password">Senha</Label>
										<Input
											id="register-password"
											type="password"
											placeholder="Mínimo 6 caracteres"
											value={registerData.password}
											onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
											required
											minLength={6}
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="register-confirm">Confirmar Senha</Label>
										<Input
											id="register-confirm"
											type="password"
											placeholder="Digite a senha novamente"
											value={registerData.confirmPassword}
											onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
											required
										/>
									</div>
									<Button type="submit" className="w-full">
										Cadastrar
									</Button>
								</form>
								<div className="mt-4 text-center">
									<p className="text-sm text-gray-600">
										Já tem uma conta?{' '}
										<button
											type="button"
											onClick={() => setShowRegister(false)}
											className="text-indigo-600 hover:text-indigo-800 font-semibold"
										>
											Fazer login
										</button>
									</p>
								</div>
							</>
						)}
					</CardContent>
				</Card>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
			<header className="bg-white shadow-sm border-b">
				<div className="container mx-auto px-4 py-4 flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<BookOpen className="h-8 w-8 text-indigo-600" />
						<h1 className="text-2xl font-bold text-gray-900">LibShow</h1>
					</div>
					<Button variant="outline" onClick={handleLogout}>
						Sair
					</Button>
				</div>
			</header>

			<main className="container mx-auto px-4 py-8">
				<Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
					<TabsList className="grid w-full grid-cols-4 lg:w-auto">
						<TabsTrigger value="livros" className="flex items-center gap-2">
							<BookOpen className="h-4 w-4" />
							<span className="hidden sm:inline">Livros</span>
						</TabsTrigger>
						<TabsTrigger value="usuarios" className="flex items-center gap-2">
							<Users className="h-4 w-4" />
							<span className="hidden sm:inline">Usuários</span>
						</TabsTrigger>
						<TabsTrigger value="emprestimos" className="flex items-center gap-2">
							<BookMarked className="h-4 w-4" />
							<span className="hidden sm:inline">Empréstimos</span>
						</TabsTrigger>
						<TabsTrigger value="reservas" className="flex items-center gap-2">
							<FileText className="h-4 w-4" />
							<span className="hidden sm:inline">Reservas</span>
						</TabsTrigger>
					</TabsList>

					<TabsContent value="livros" className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle>Gerenciamento de Livros</CardTitle>
								<CardDescription>
									{editingBook ? 'Edite as informações do livro' : 'Cadastre e gerencie o acervo da biblioteca'}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<form onSubmit={handleBookSubmit} className="space-y-4">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
											<Label htmlFor="editora">Editora</Label>
											<Input
												id="editora"
												placeholder="Nome da editora"
												value={bookForm.publisher}
												onChange={(e) => setBookForm({ ...bookForm, publisher: e.target.value })}
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
									<div className="flex gap-2">
										<Button type="submit" className="w-full md:w-auto">
											{editingBook ? 'Atualizar Livro' : 'Cadastrar Livro'}
										</Button>
										{editingBook && (
											<Button type="button" variant="outline" onClick={handleCancelEdit} className="w-full md:w-auto">
												Cancelar Edição
											</Button>
										)}
									</div>
								</form>

								<div className="mt-6">
									<h3 className="text-lg font-semibold mb-4">Livros Cadastrados</h3>
									{loadingLivros ? (
										<div className="flex justify-center py-8">
											<Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
										</div>
									) : livros.length === 0 ? (
										<p className="text-gray-500 text-center py-8">Nenhum livro cadastrado ainda.</p>
									) : (
										<div className="space-y-2">
											{livros.map((livro) => (
												<div key={livro.id} className="p-4 border rounded-lg flex justify-between items-center hover:bg-gray-50 transition-colors">
													<div>
														<h4 className="font-semibold">{livro.title}</h4>
														<p className="text-sm text-gray-600">{livro.author} - {livro.publisher} ({livro.publicationYear})</p>
														<p className="text-sm text-gray-500">ISBN: {livro.isbn}</p>
														<p className="text-sm text-gray-500">
															Disponíveis: {livro.availableQuantity} de {livro.totalQuantity}
														</p>
													</div>
													<div className="flex gap-2">
														<Button variant="outline" size="sm" onClick={() => handleEditBook(livro)}>
															Editar
														</Button>
														<Button variant="destructive" size="sm" onClick={() => handleDeleteBook(livro.id)}>
															Excluir
														</Button>
													</div>
												</div>
											))}
										</div>
									)}
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="usuarios" className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle>Gerenciamento de Usuários</CardTitle>
								<CardDescription>
									{editingUser ? 'Edite as informações do usuário' : 'Cadastre e gerencie usuários da biblioteca'}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<form onSubmit={handleUserSubmit} className="space-y-4">
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
												placeholder="email@exemplo.com"
												value={userForm.email}
												onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
												required
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="senha">Senha {editingUser && '(deixe vazio para não alterar)'}</Label>
											<Input
												id="senha"
												type="password"
												placeholder="••••••••"
												value={userForm.password}
												onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
												required={!editingUser}
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="perfil">Perfil de Acesso</Label>
											<select
												id="perfil"
												className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
												value={userForm.role}
												onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
												required
											>
												{Object.entries(USER_ROLES).map(([key, value]) => (
													<option key={value} value={value}>
														{USER_ROLE_LABELS[value]}
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
											<Button type="button" variant="outline" onClick={handleCancelEditUser} className="w-full md:w-auto">
												Cancelar Edição
											</Button>
										)}
									</div>
								</form>

								<div className="mt-6">
									<h3 className="text-lg font-semibold mb-4">Usuários Cadastrados</h3>
									{loadingUsuarios ? (
										<div className="flex justify-center py-8">
											<Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
										</div>
									) : usuarios.length === 0 ? (
										<p className="text-gray-500 text-center py-8">Nenhum usuário cadastrado ainda.</p>
									) : (
										<div className="space-y-2">
											{usuarios.map((usuario) => (
												<div key={usuario.id} className="p-4 border rounded-lg flex justify-between items-center hover:bg-gray-50 transition-colors">
													<div>
														<h4 className="font-semibold">{usuario.name}</h4>
														<p className="text-sm text-gray-600">{usuario.email}</p>
														<p className="text-sm text-gray-500">Perfil: {USER_ROLE_LABELS[usuario.role]}</p>
													</div>
													<div className="flex gap-2">
														<Button variant="outline" size="sm" onClick={() => handleEditUser(usuario)}>
															Editar
														</Button>
														<Button variant="destructive" size="sm" onClick={() => handleDeleteUser(usuario.id)}>
															Excluir
														</Button>
													</div>
												</div>
											))}
										</div>
									)}
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="emprestimos" className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle>Gerenciamento de Empréstimos</CardTitle>
								<CardDescription>
									Registre empréstimos e devoluções de livros
								</CardDescription>
							</CardHeader>
							<CardContent>
								<form onSubmit={handleLoanSubmit} className="space-y-4">
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
												{usuarios.map((user) => (
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
												{livros.filter(book => book.availableQuantity > 0).map((book) => (
													<option key={book.id} value={book.id}>
														{book.title} - {book.author} (Disponíveis: {book.availableQuantity})
													</option>
												))}
											</select>
										</div>
										<div className="space-y-2">
											<Label htmlFor="dias">Dias de Empréstimo</Label>
											<Input
												id="dias"
												type="number"
												placeholder="14"
												min="1"
												value={loanForm.days}
												onChange={(e) => setLoanForm({ ...loanForm, days: parseInt(e.target.value) || DEFAULT_LOAN_DAYS })}
												required
											/>
										</div>
									</div>
									<Button type="submit" className="w-full md:w-auto">
										Registrar Empréstimo
									</Button>
								</form>

								<div className="mt-6">
									<h3 className="text-lg font-semibold mb-4">Empréstimos Ativos</h3>
									{loadingEmprestimos ? (
										<div className="flex justify-center py-8">
											<Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
										</div>
									) : emprestimos.length === 0 ? (
										<p className="text-gray-500 text-center py-8">Nenhum empréstimo ativo.</p>
									) : (
										<div className="space-y-2">
											{emprestimos.map((emprestimo) => {
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
															<p className={`text-sm ${overdue && !isReturned ? 'text-red-600 font-semibold' : 'text-gray-500'}`}>
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
																<Button variant="outline" size="sm" onClick={() => handleReturnBook(emprestimo.id)}>
																	Registrar Devolução
																</Button>
															)}
															<Button variant="destructive" size="sm" onClick={() => handleDeleteLoan(emprestimo.id)}>
																Excluir
															</Button>
														</div>
													</div>
												)
											})}
										</div>
									)}
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="reservas" className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle>Gerenciamento de Reservas</CardTitle>
								<CardDescription>
									Gerencie reservas de livros indisponíveis
								</CardDescription>
							</CardHeader>
							<CardContent>
								<form onSubmit={handleReservationSubmit} className="space-y-4">
									<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
										<div className="space-y-2">
											<Label htmlFor="usuario-res">Usuário</Label>
											<select
												id="usuario-res"
												className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
												value={reservationForm.userId}
												onChange={(e) => setReservationForm({ ...reservationForm, userId: e.target.value })}
												required
											>
												<option value="">Selecione um usuário</option>
												{usuarios.map((user) => (
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
												{livros.filter(book => book.availableQuantity === 0).map((book) => (
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
												onChange={(e) => setReservationForm({ ...reservationForm, days: parseInt(e.target.value) || DEFAULT_RESERVATION_DAYS })}
												required
											/>
										</div>
									</div>
									<Button type="submit" className="w-full md:w-auto">
										Fazer Reserva
									</Button>
								</form>

								<div className="mt-6">
									<h3 className="text-lg font-semibold mb-4">Reservas Cadastradas</h3>
									{loadingReservas ? (
										<div className="flex justify-center py-8">
											<Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
										</div>
									) : reservas.length === 0 ? (
										<p className="text-gray-500 text-center py-8">Nenhuma reserva cadastrada.</p>
									) : (
										<div className="space-y-2">
											{reservas.map((reserva) => {
												const expired = isReservationExpired(reserva.expirationDate, reserva.status)
												const isCancelled = reserva.status === 'CANCELLED'
												const isCompleted = reserva.status === 'COMPLETED'

												return (
													<div
														key={reserva.id}
														className={`p-4 border rounded-lg flex justify-between items-center transition-colors ${isCancelled || isCompleted ? 'bg-gray-50' : expired ? 'bg-yellow-50 border-yellow-300' : 'hover:bg-gray-50'
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
															<p className={`text-sm ${expired && !isCancelled && !isCompleted ? 'text-yellow-600 font-semibold' : 'text-gray-500'}`}>
																Validade: {formatDate(reserva.expirationDate)}
																{expired && !isCancelled && !isCompleted && ' (EXPIRADA)'}
															</p>
															<p className={`text-sm font-semibold ${isCancelled ? 'text-red-600' :
																isCompleted ? 'text-green-600' :
																	'text-blue-600'
																}`}>
																Status: {RESERVATION_STATUS_LABELS[reserva.status]}
															</p>
														</div>
														<div className="flex gap-2">
															{reserva.status === 'ACTIVE' && (
																<Button variant="outline" size="sm" onClick={() => handleCancelReservation(reserva.id)}>
																	Cancelar
																</Button>
															)}
															<Button variant="destructive" size="sm" onClick={() => handleDeleteReservation(reserva.id)}>
																Excluir
															</Button>
														</div>
													</div>
												)
											})}
										</div>
									)}
								</div>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</main>
		</div>
	)
}

export default App
