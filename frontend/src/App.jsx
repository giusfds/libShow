import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { BookOpen, Users, BookMarked, FileText, Plus } from 'lucide-react'
import { useAuth } from './contexts/AuthContext.jsx'
import { usePermissions } from './hooks/usePermissions.js'
import { toast } from 'sonner'
import bookService from './services/bookService.js'
import userService from './services/userService.js'
import loanService from './services/loanService.js'
import reservationService from './services/reservationService.js'
import { DEFAULT_LOAN_DAYS, DEFAULT_RESERVATION_DAYS } from './utils/constants.js'
import LoginForm from './components/auth/LoginForm.jsx'
import BookModal from './components/books/BookModal.jsx'
import BookList from './components/books/BookList.jsx'
import UserModal from './components/users/UserModal.jsx'
import UserList from './components/users/UserList.jsx'
import LoanModal from './components/loans/LoanModal.jsx'
import LoanList from './components/loans/LoanList.jsx'
import ReservationModal from './components/reservations/ReservationModal.jsx'
import ReservationList from './components/reservations/ReservationList.jsx'
import './App.css'

function App() {
	const { isAuthenticated, user, loading, logout } = useAuth()
	const permissions = usePermissions()
	const [activeTab, setActiveTab] = useState('livros')

	// Books state
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
	const [bookModalOpen, setBookModalOpen] = useState(false)

	// Users state
	const [usuarios, setUsuarios] = useState([])
	const [loadingUsuarios, setLoadingUsuarios] = useState(false)
	const [userForm, setUserForm] = useState({
		name: '',
		email: '',
		password: '',
		role: 'STUDENT',
	})
	const [editingUser, setEditingUser] = useState(null)
	const [userModalOpen, setUserModalOpen] = useState(false)

	// Loans state
	const [emprestimos, setEmprestimos] = useState([])
	const [loadingEmprestimos, setLoadingEmprestimos] = useState(false)
	const [loanForm, setLoanForm] = useState({
		userId: '',
		bookId: '',
		days: DEFAULT_LOAN_DAYS,
	})
	const [loanModalOpen, setLoanModalOpen] = useState(false)

	// Reservations state
	const [reservas, setReservas] = useState([])
	const [loadingReservas, setLoadingReservas] = useState(false)
	const [reservationForm, setReservationForm] = useState({
		userId: '',
		bookId: '',
		days: DEFAULT_RESERVATION_DAYS,
	})
	const [reservationModalOpen, setReservationModalOpen] = useState(false)

	const handleLogout = () => {
		logout()
		toast.info('Você saiu do sistema')
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

	// Books handlers
	const loadBooks = async () => {
		try {
			setLoadingLivros(true)
			const data = await bookService.getAllWithAvailability()
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

			setBookModalOpen(false)
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
		setBookModalOpen(true)
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
		setBookModalOpen(false)
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

	// Users handlers
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

			setUserModalOpen(false)
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
			password: '',
			role: user.role,
		})
		setUserModalOpen(true)
	}

	const handleCancelEditUser = () => {
		setEditingUser(null)
		setUserForm({
			name: '',
			email: '',
			password: '',
			role: 'STUDENT',
		})
		setUserModalOpen(false)
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

	// Loans handlers
	const loadLoans = async () => {
		try {
			setLoadingEmprestimos(true)
			const data = await loanService.getAll()
			
			// Filtra empréstimos para PROFESSOR e STUDENT verem apenas os próprios
			if (permissions.isProfessor() || permissions.isStudent()) {
				const filteredData = data.filter(loan => loan.user?.email === user)
				setEmprestimos(filteredData)
			} else {
				setEmprestimos(data)
			}
		} catch (error) {
			toast.error('Erro ao carregar empréstimos')
			console.error(error)
		} finally {
			setLoadingEmprestimos(false)
		}
	}

	const handleOpenLoanModal = () => {
		// Se for PROFESSOR ou STUDENT, busca o ID do usuário logado
		if (permissions.isProfessor() || permissions.isStudent()) {
			const loggedUser = usuarios.find(u => u.email === user)
			if (loggedUser) {
				setLoanForm({
					...loanForm,
					userId: loggedUser.id.toString()
				})
			}
		} else {
			setLoanForm({
				userId: '',
				bookId: '',
				days: DEFAULT_LOAN_DAYS,
			})
		}
		setLoanModalOpen(true)
	}

	const handleLoanSubmit = async (e) => {
		e.preventDefault()

		if (!loanForm.userId || !loanForm.bookId) {
			toast.error('Selecione um usuário e um livro')
			return
		}

		const selectedBook = livros.find((b) => b.id === parseInt(loanForm.bookId))

		// Verifica se o livro tem reserva ativa
		if (selectedBook?.hasActiveReservations) {
			try {
				const userReservations = await reservationService.getAll()
				const hasUserReservation = userReservations.some(
					(r) =>
						r.book?.id === selectedBook.id &&
						r.user?.id === parseInt(loanForm.userId) &&
						r.status === 'ACTIVE'
				)

				if (!hasUserReservation) {
					toast.error('Este livro possui reserva ativa. Apenas usuários com reserva podem retirá-lo.')
					return
				}
			} catch (error) {
				console.error('Erro ao validar reserva:', error)
			}
		}

		try {
			await loanService.create(loanForm.userId, loanForm.bookId, loanForm.days)
			toast.success('Empréstimo registrado com sucesso!')

			setLoanForm({
				userId: '',
				bookId: '',
				days: DEFAULT_LOAN_DAYS,
			})

			setLoanModalOpen(false)
			loadLoans()
			loadBooks()
			loadReservations()
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
			loadBooks()
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
			loadBooks()
		} catch (error) {
			toast.error('Erro ao excluir empréstimo')
			console.error(error)
		}
	}

	// Reservations handlers
	const loadReservations = async () => {
		try {
			setLoadingReservas(true)
			const data = await reservationService.getAll()
			
			// Filtra reservas para PROFESSOR e STUDENT verem apenas as próprias
			if (permissions.isProfessor() || permissions.isStudent()) {
				const filteredData = data.filter(reservation => reservation.user?.email === user)
				setReservas(filteredData)
			} else {
				setReservas(data)
			}
		} catch (error) {
			toast.error('Erro ao carregar reservas')
			console.error(error)
		} finally {
			setLoadingReservas(false)
		}
	}

	const handleOpenReservationModal = () => {
		// Se for PROFESSOR ou STUDENT, busca o ID do usuário logado
		if (permissions.isProfessor() || permissions.isStudent()) {
			const loggedUser = usuarios.find(u => u.email === user)
			if (loggedUser) {
				setReservationForm({
					...reservationForm,
					userId: loggedUser.id.toString()
				})
			}
		} else {
			setReservationForm({
				userId: '',
				bookId: '',
				days: DEFAULT_RESERVATION_DAYS,
			})
		}
		setReservationModalOpen(true)
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

			setReservationModalOpen(false)
			loadReservations()
		} catch (error) {
			toast.error(error.response?.data?.message || 'Erro ao criar reserva')
			console.error(error)
		}
	}

	const handleConvertReservationToLoan = async (id, days = DEFAULT_LOAN_DAYS) => {
		try {
			await reservationService.convertToLoan(id, days)
			toast.success('Empréstimo criado e reserva finalizada com sucesso!')
			loadReservations()
			loadLoans()
			loadBooks()
		} catch (error) {
			toast.error(error.response?.data?.message || 'Erro ao criar empréstimo')
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

	// Show loading or login screen
	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
				<div className="text-center">
					<div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
					<p className="mt-4 text-gray-600">Carregando...</p>
				</div>
			</div>
		)
	}

	if (!isAuthenticated) {
		return <LoginForm />
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
					<TabsList className="grid w-full lg:w-auto" style={{ gridTemplateColumns: `repeat(${[permissions.canViewBooks(), permissions.canViewUsers(), permissions.canViewLoans(), permissions.canViewReservations()].filter(Boolean).length}, minmax(0, 1fr))` }}>
						{permissions.canViewBooks() && (
							<TabsTrigger value="livros" className="flex items-center gap-2">
								<BookOpen className="h-4 w-4" />
								<span className="hidden sm:inline">Livros</span>
							</TabsTrigger>
						)}
						{permissions.canViewUsers() && (
							<TabsTrigger value="usuarios" className="flex items-center gap-2">
								<Users className="h-4 w-4" />
								<span className="hidden sm:inline">Usuários</span>
							</TabsTrigger>
						)}
						{permissions.canViewLoans() && (
							<TabsTrigger value="emprestimos" className="flex items-center gap-2">
								<BookMarked className="h-4 w-4" />
								<span className="hidden sm:inline">Empréstimos</span>
							</TabsTrigger>
						)}
						{permissions.canViewReservations() && (
							<TabsTrigger value="reservas" className="flex items-center gap-2">
								<FileText className="h-4 w-4" />
								<span className="hidden sm:inline">Reservas</span>
							</TabsTrigger>
						)}
					</TabsList>

					{/* Books Tab */}
					{permissions.canViewBooks() && (
						<TabsContent value="livros" className="space-y-4">
							<BookModal
								open={bookModalOpen}
								onOpenChange={setBookModalOpen}
								bookForm={bookForm}
								setBookForm={setBookForm}
								editingBook={editingBook}
								onSubmit={handleBookSubmit}
								onCancel={handleCancelEdit}
							/>

							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
									<div>
										<CardTitle>Gerenciamento de Livros</CardTitle>
										<CardDescription className="mt-1.5">
											{permissions.canManageBooks()
												? 'Cadastre e gerencie o acervo da biblioteca'
												: 'Consulte o acervo da biblioteca'}
										</CardDescription>
									</div>
									{permissions.canManageBooks() && (
										<Button
											onClick={() => {
												setEditingBook(null)
												setBookModalOpen(true)
											}}
										>
											<Plus className="h-4 w-4 mr-2" />
											Adicionar Livro
										</Button>
									)}
								</CardHeader>
								<CardContent>
									<h3 className="text-lg font-semibold mb-4">Livros Cadastrados</h3>
									<BookList
										books={livros}
										loading={loadingLivros}
										onEdit={handleEditBook}
										onDelete={handleDeleteBook}
										canManage={permissions.canManageBooks()}
									/>
								</CardContent>
							</Card>
						</TabsContent>
					)}

					{/* Users Tab */}
					{permissions.canViewUsers() && (
						<TabsContent value="usuarios" className="space-y-4">
							<UserModal
								open={userModalOpen}
								onOpenChange={setUserModalOpen}
								userForm={userForm}
								setUserForm={setUserForm}
								editingUser={editingUser}
								onSubmit={handleUserSubmit}
								onCancel={handleCancelEditUser}
							/>

							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
									<div>
										<CardTitle>Gerenciamento de Usuários</CardTitle>
										<CardDescription className="mt-1.5">
											Cadastre e gerencie usuários da biblioteca
										</CardDescription>
									</div>
									<Button
										onClick={() => {
											setEditingUser(null)
											setUserModalOpen(true)
										}}
									>
										<Plus className="h-4 w-4 mr-2" />
										Adicionar Usuário
									</Button>
								</CardHeader>
								<CardContent>
									<h3 className="text-lg font-semibold mb-4">Usuários Cadastrados</h3>
									<UserList
										users={usuarios}
										loading={loadingUsuarios}
										onEdit={handleEditUser}
										onDelete={handleDeleteUser}
									/>
								</CardContent>
							</Card>
						</TabsContent>
					)}

					{/* Loans Tab */}
					{permissions.canViewLoans() && (
						<TabsContent value="emprestimos" className="space-y-4">
						<LoanModal
							open={loanModalOpen}
							onOpenChange={setLoanModalOpen}
							loanForm={loanForm}
							setLoanForm={setLoanForm}
							users={usuarios}
							books={livros}
							reservations={reservas}
							onSubmit={handleLoanSubmit}
							canSelectUser={permissions.isAdmin() || permissions.isLibrarian()}
						/>							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
									<div>
										<CardTitle>Gerenciamento de Empréstimos</CardTitle>
										<CardDescription className="mt-1.5">
											Registre empréstimos e devoluções de livros
										</CardDescription>
								</div>
								{permissions.canCreateLoans() && (
									<Button onClick={handleOpenLoanModal}>
										<Plus className="h-4 w-4 mr-2" />
										Registrar Empréstimo
									</Button>
								)}
								</CardHeader>
								<CardContent>
									<h3 className="text-lg font-semibold mb-4">Empréstimos Ativos</h3>
								<LoanList
									loans={emprestimos}
									loading={loadingEmprestimos}
									onReturn={handleReturnBook}
									onDelete={handleDeleteLoan}
									canManage={permissions.canManageLoans()}
									canReturnLoan={permissions.canReturnLoan()}
									canDeleteFinishedLoan={permissions.canDeleteFinishedLoan()}
									currentUserEmail={user}
								/>
								</CardContent>
							</Card>
						</TabsContent>
					)}

					{/* Reservations Tab */}
					{permissions.canViewReservations() && (
						<TabsContent value="reservas" className="space-y-4">
						<ReservationModal
							open={reservationModalOpen}
							onOpenChange={setReservationModalOpen}
							reservationForm={reservationForm}
							setReservationForm={setReservationForm}
							users={usuarios}
							books={livros}
							onSubmit={handleReservationSubmit}
							canSelectUser={permissions.isAdmin() || permissions.isLibrarian()}
						/>							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
									<div>
										<CardTitle>Gerenciamento de Reservas</CardTitle>
										<CardDescription className="mt-1.5">
											Gerencie reservas de livros indisponíveis
										</CardDescription>
								</div>
								{permissions.canCreateReservations() && (
									<Button onClick={handleOpenReservationModal}>
										<Plus className="h-4 w-4 mr-2" />
										Fazer Reserva
									</Button>
								)}
								</CardHeader>
								<CardContent>
									<h3 className="text-lg font-semibold mb-4">Reservas Cadastradas</h3>
								<ReservationList
									reservations={reservas}
									loading={loadingReservas}
									onConvertToLoan={handleConvertReservationToLoan}
									onCancel={handleCancelReservation}
									onDelete={handleDeleteReservation}
									canManage={permissions.canManageReservations()}
									canConvertReservation={permissions.canConvertReservationToLoan()}
									currentUserEmail={user}
								/>
								</CardContent>
							</Card>
						</TabsContent>
					)}
				</Tabs>
			</main>
		</div>
	)
}

export default App
