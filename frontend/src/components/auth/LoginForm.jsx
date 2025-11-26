import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { LogIn } from 'lucide-react'
import { toast } from 'sonner'
import { useAuth } from '@/contexts/AuthContext.jsx'
import userService from '@/services/userService.js'

export default function LoginForm() {
	const { login } = useAuth()
	const [showRegister, setShowRegister] = useState(false)
	const [loginData, setLoginData] = useState({ username: '', password: '' })
	const [registerData, setRegisterData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
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
				role: 'STUDENT',
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

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1 flex flex-col items-center">
					<div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 mb-2">
						<LogIn className="h-6 w-6 text-indigo-600" />
					</div>
					<CardTitle className="text-2xl font-bold text-center">
						{showRegister ? 'Criar Conta' : 'Bem-vindo ao LibShow'}
					</CardTitle>
					<CardDescription className="text-center">
						{showRegister ? 'Preencha os dados para se cadastrar' : 'Faça login para continuar'}
					</CardDescription>
				</CardHeader>
				<CardContent>
					{!showRegister ? (
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
								Entrar
							</Button>
							<div className="text-center">
								<Button
									type="button"
									variant="link"
									onClick={() => setShowRegister(true)}
									className="text-sm"
								>
									Não tem uma conta? Cadastre-se
								</Button>
							</div>
						</form>
					) : (
						<form onSubmit={handleRegister} className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="reg-name">Nome</Label>
								<Input
									id="reg-name"
									placeholder="Seu nome completo"
									value={registerData.name}
									onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="reg-email">Email</Label>
								<Input
									id="reg-email"
									type="email"
									placeholder="seu@email.com"
									value={registerData.email}
									onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="reg-password">Senha</Label>
								<Input
									id="reg-password"
									type="password"
									placeholder="••••••••"
									value={registerData.password}
									onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
									required
									minLength={6}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="reg-confirm">Confirmar Senha</Label>
								<Input
									id="reg-confirm"
									type="password"
									placeholder="••••••••"
									value={registerData.confirmPassword}
									onChange={(e) =>
										setRegisterData({ ...registerData, confirmPassword: e.target.value })
									}
									required
									minLength={6}
								/>
							</div>
							<Button type="submit" className="w-full">
								Cadastrar
							</Button>
							<div className="text-center">
								<Button
									type="button"
									variant="link"
									onClick={() => setShowRegister(false)}
									className="text-sm"
								>
									Já tem uma conta? Faça login
								</Button>
							</div>
						</form>
					)}
				</CardContent>
			</Card>
		</div>
	)
}
