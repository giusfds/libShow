import { useAuth } from '../contexts/AuthContext'
import { USER_ROLES } from '../utils/constants'

export const usePermissions = () => {
	const { userRole } = useAuth()

	// Permissões de leitura
	const canViewBooks = () => {
		return [USER_ROLES.ADMIN, USER_ROLES.LIBRARIAN, USER_ROLES.PROFESSOR, USER_ROLES.STUDENT].includes(userRole)
	}

	const canViewUsers = () => {
		return [USER_ROLES.ADMIN].includes(userRole)
	}

	const canViewLoans = () => {
		return [USER_ROLES.ADMIN, USER_ROLES.LIBRARIAN, USER_ROLES.PROFESSOR, USER_ROLES.STUDENT].includes(userRole)
	}

	const canViewReservations = () => {
		return [USER_ROLES.ADMIN, USER_ROLES.LIBRARIAN, USER_ROLES.PROFESSOR, USER_ROLES.STUDENT].includes(userRole)
	}

	// Permissões de escrita
	const canManageBooks = () => {
		return [USER_ROLES.ADMIN, USER_ROLES.LIBRARIAN].includes(userRole)
	}

	const canManageUsers = () => {
		return [USER_ROLES.ADMIN].includes(userRole)
	}

	const canManageLoans = () => {
		return [USER_ROLES.ADMIN, USER_ROLES.LIBRARIAN].includes(userRole)
	}

	const canManageReservations = () => {
		return [USER_ROLES.ADMIN, USER_ROLES.LIBRARIAN].includes(userRole)
	}

	// Permissões para criar novos registros (sem editar/excluir)
	const canCreateLoans = () => {
		return [USER_ROLES.ADMIN, USER_ROLES.LIBRARIAN, USER_ROLES.PROFESSOR, USER_ROLES.STUDENT].includes(userRole)
	}

	const canCreateReservations = () => {
		return [USER_ROLES.ADMIN, USER_ROLES.LIBRARIAN, USER_ROLES.PROFESSOR, USER_ROLES.STUDENT].includes(userRole)
	}

	// Permissões específicas para empréstimos
	const canReturnLoan = () => {
		return [USER_ROLES.ADMIN, USER_ROLES.LIBRARIAN, USER_ROLES.PROFESSOR, USER_ROLES.STUDENT].includes(userRole)
	}

	const canDeleteFinishedLoan = () => {
		return [USER_ROLES.ADMIN, USER_ROLES.LIBRARIAN, USER_ROLES.PROFESSOR, USER_ROLES.STUDENT].includes(userRole)
	}

	// Permissões específicas para reservas
	const canConvertReservationToLoan = () => {
		return [USER_ROLES.ADMIN, USER_ROLES.LIBRARIAN, USER_ROLES.PROFESSOR, USER_ROLES.STUDENT].includes(userRole)
	}

	// Verifica se é admin
	const isAdmin = () => {
		return userRole === USER_ROLES.ADMIN
	}

	// Verifica se é bibliotecário
	const isLibrarian = () => {
		return userRole === USER_ROLES.LIBRARIAN
	}

	// Verifica se é professor
	const isProfessor = () => {
		return userRole === USER_ROLES.PROFESSOR
	}

	// Verifica se é estudante
	const isStudent = () => {
		return userRole === USER_ROLES.STUDENT
	}

	return {
		// Visualização
		canViewBooks,
		canViewUsers,
		canViewLoans,
		canViewReservations,
		// Gerenciamento
		canManageBooks,
		canManageUsers,
		canManageLoans,
		canManageReservations,
		// Criação
		canCreateLoans,
		canCreateReservations,
		// Ações específicas
		canReturnLoan,
		canDeleteFinishedLoan,
		canConvertReservationToLoan,
		// Verificações de role
		isAdmin,
		isLibrarian,
		isProfessor,
		isStudent,
		// Role atual
		userRole,
	}
}
