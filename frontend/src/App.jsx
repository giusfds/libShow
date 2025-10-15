import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { BookOpen, Users, BookMarked, FileText, LogIn } from 'lucide-react'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState('livros')
  const [loginData, setLoginData] = useState({ username: '', password: '' })
  
  const [livros, setLivros] = useState([])
  const [usuarios, setUsuarios] = useState([])
  const [emprestimos, setEmprestimos] = useState([])
  const [reservas, setReservas] = useState([])

  const handleLogin = async (e) => {
    e.preventDefault()
    // TODO: Implement actual authentication with backend
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setLoginData({ username: '', password: '' })
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
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
                  Cadastre e gerencie o acervo da biblioteca
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="titulo">Título</Label>
                      <Input id="titulo" placeholder="Nome do livro" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="autor">Autor</Label>
                      <Input id="autor" placeholder="Nome do autor" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="isbn">ISBN</Label>
                      <Input id="isbn" placeholder="ISBN do livro" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ano">Ano de Publicação</Label>
                      <Input id="ano" type="number" placeholder="2024" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="editora">Editora</Label>
                      <Input id="editora" placeholder="Nome da editora" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantidade">Quantidade</Label>
                      <Input id="quantidade" type="number" placeholder="1" />
                    </div>
                  </div>
                  <Button className="w-full md:w-auto">
                    Cadastrar Livro
                  </Button>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Livros Cadastrados</h3>
                  {livros.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">Nenhum livro cadastrado ainda.</p>
                  ) : (
                    <div className="space-y-2">
                      {livros.map((livro, index) => (
                        <div key={index} className="p-4 border rounded-lg flex justify-between items-center hover:bg-gray-50 transition-colors">
                          <div>
                            <h4 className="font-semibold">{livro.titulo}</h4>
                            <p className="text-sm text-gray-600">{livro.autor} - {livro.editora}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Editar</Button>
                            <Button variant="destructive" size="sm">Excluir</Button>
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
                  Cadastre e gerencie usuários da biblioteca
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome</Label>
                      <Input id="nome" placeholder="Nome completo" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="email@exemplo.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="senha">Senha</Label>
                      <Input id="senha" type="password" placeholder="••••••••" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="perfil">Perfil de Acesso</Label>
                      <select id="perfil" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                        <option value="ALUNO">Aluno</option>
                        <option value="PROFESSOR">Professor</option>
                        <option value="BIBLIOTECARIO">Bibliotecário</option>
                        <option value="ADMINISTRADOR">Administrador</option>
                      </select>
                    </div>
                  </div>
                  <Button className="w-full md:w-auto">
                    Cadastrar Usuário
                  </Button>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Usuários Cadastrados</h3>
                  {usuarios.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">Nenhum usuário cadastrado ainda.</p>
                  ) : (
                    <div className="space-y-2">
                      {usuarios.map((usuario, index) => (
                        <div key={index} className="p-4 border rounded-lg flex justify-between items-center hover:bg-gray-50 transition-colors">
                          <div>
                            <h4 className="font-semibold">{usuario.nome}</h4>
                            <p className="text-sm text-gray-600">{usuario.email} - {usuario.perfilAcesso}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Editar</Button>
                            <Button variant="destructive" size="sm">Excluir</Button>
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
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="usuario-emp">Usuário</Label>
                      <select id="usuario-emp" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                        <option value="">Selecione um usuário</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="livro-emp">Livro</Label>
                      <select id="livro-emp" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                        <option value="">Selecione um livro</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dias">Dias de Empréstimo</Label>
                      <Input id="dias" type="number" placeholder="14" defaultValue="14" />
                    </div>
                  </div>
                  <Button className="w-full md:w-auto">
                    Registrar Empréstimo
                  </Button>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Empréstimos Ativos</h3>
                  {emprestimos.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">Nenhum empréstimo ativo.</p>
                  ) : (
                    <div className="space-y-2">
                      {emprestimos.map((emprestimo, index) => (
                        <div key={index} className="p-4 border rounded-lg flex justify-between items-center hover:bg-gray-50 transition-colors">
                          <div>
                            <h4 className="font-semibold">{emprestimo.livro}</h4>
                            <p className="text-sm text-gray-600">Emprestado para: {emprestimo.usuario}</p>
                            <p className="text-sm text-gray-500">Devolução prevista: {emprestimo.dataDevolucao}</p>
                          </div>
                          <Button variant="outline" size="sm">Registrar Devolução</Button>
                        </div>
                      ))}
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
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="usuario-res">Usuário</Label>
                      <select id="usuario-res" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                        <option value="">Selecione um usuário</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="livro-res">Livro</Label>
                      <select id="livro-res" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                        <option value="">Selecione um livro</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dias-res">Dias de Reserva</Label>
                      <Input id="dias-res" type="number" placeholder="7" defaultValue="7" />
                    </div>
                  </div>
                  <Button className="w-full md:w-auto">
                    Fazer Reserva
                  </Button>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Reservas Ativas</h3>
                  {reservas.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">Nenhuma reserva ativa.</p>
                  ) : (
                    <div className="space-y-2">
                      {reservas.map((reserva, index) => (
                        <div key={index} className="p-4 border rounded-lg flex justify-between items-center hover:bg-gray-50 transition-colors">
                          <div>
                            <h4 className="font-semibold">{reserva.livro}</h4>
                            <p className="text-sm text-gray-600">Reservado por: {reserva.usuario}</p>
                            <p className="text-sm text-gray-500">Expira em: {reserva.dataExpiracao}</p>
                          </div>
                          <Button variant="destructive" size="sm">Cancelar Reserva</Button>
                        </div>
                      ))}
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

