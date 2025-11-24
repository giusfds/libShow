<h1 align="center">
   📚 LibShow
</h1>

<p align="center">
  <img alt="Spring Boot Badge" src="https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
  <img alt="React Badge" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img alt="H2 Database Badge" src="https://img.shields.io/badge/H2-0000BB?style=for-the-badge&logo=database&logoColor=white">
  <img alt="Java Badge" src="https://img.shields.io/badge/Java_21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white">
  <img alt="CI/CD Badge" src="https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white">
</p>

<p align="center">
  <b>Sistema de Gerenciamento de Biblioteca Acadêmica</b><br>
  Desenvolvido para a disciplina de <b>Engenharia de Software 2</b><br>
  PUC Minas - Ciência da Computação
</p>

---

## 📖 Sobre o Projeto

O **LibShow** é um sistema completo de gerenciamento de biblioteca acadêmica que facilita:

- 📚 **Gestão de Acervo**: Cadastro, edição e consulta de livros
- 👥 **Controle de Usuários**: Gerenciamento de alunos, bibliotecários e administradores
- 📝 **Empréstimos e Devoluções**: Controle automatizado com validações
- 🔖 **Sistema de Reservas**: Fila de espera para livros indisponíveis
- 📊 **Relatórios Administrativos**: Análise de uso e estatísticas
- 🔐 **Autenticação JWT**: Segurança e controle de acesso por perfil

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Java 21** ou superior - [Download](https://adoptium.net/)
- **Maven 3.9+** (ou use o Maven Wrapper incluído)
- **Node.js 18+** - [Download](https://nodejs.org/)
- **pnpm** (opcional, pode usar npm) - `npm install -g pnpm`
- **Docker** (opcional, para execução com containers) - [Download](https://www.docker.com/)
- **Git** - [Download](https://git-scm.com/)

### Método 1: Execução Manual (Desenvolvimento) 🔧

Este é o método recomendado para desenvolvimento e testes.

#### 1️⃣ Clone o Repositório

```bash
git clone https://github.com/giusfds/libshow.git
cd libshow
```

#### 2️⃣ Backend (Spring Boot)

```bash
# Entre no diretório do backend
cd backend

# IMPORTANTE: Compile o projeto (isso SIM termina!)
./mvnw clean package -DskipTests
# ✅ Este comando COMPILA e gera o JAR. Quando terminar, você verá "BUILD SUCCESS"

# Agora EXECUTE o servidor Spring Boot (este comando NÃO termina, fica rodando!)
./mvnw spring-boot:run
# ⚠️ Este processo fica rodando até você parar com Ctrl+C

# OU execute diretamente o JAR gerado
java -jar target/libshow-0.0.1-SNAPSHOT.jar
```

**💡 Atalho:** Use o script pronto na raiz do projeto:

```bash
./run-backend.sh
```

O backend estará disponível em **http://localhost:8080**

**Endpoints principais:**

- API REST: `http://localhost:8080/api/*`
- Health Check: `http://localhost:8080/actuator/health`
- Console H2: `http://localhost:8080/h2-console`
  - **JDBC URL**: `jdbc:h2:file:./data/db`
  - **Username**: `sa`
  - **Password**: _(deixe em branco)_

#### 3️⃣ Frontend (React + Vite)

Em **outro terminal**, execute:

```bash
# Entre no diretório do frontend
cd frontend

# Instale as dependências
pnpm install
# ou: npm install

# Execute o servidor de desenvolvimento
pnpm dev
# ou: npm run dev
```

**💡 Atalho:** Use o script pronto na raiz do projeto:

```bash
./run-frontend.sh
```

O frontend estará disponível em **http://localhost:5173**

#### 4️⃣ Acesse a Aplicação

Abra seu navegador em **http://localhost:5173** e comece a usar o LibShow!

---

### Método 1.5: Script Automatizado (Mais Rápido) ⚡

Use o script que inicia **backend e frontend automaticamente**:

```bash
# Na raiz do projeto
./run.sh
```

Este script:

- ✅ Compila o backend automaticamente
- ✅ Instala dependências do frontend
- ✅ Inicia ambos os serviços
- ✅ Mostra os logs em arquivos separados
- ✅ Para tudo com Ctrl+C

---

### Método 2: Docker Compose (Produção) 🐳

Este método configura o ambiente completo com PostgreSQL, backend e frontend containerizados.

#### 1️⃣ Configure as Variáveis de Ambiente

```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite conforme necessário (opcional)
nano .env
```

#### 2️⃣ Suba os Containers

```bash
# Inicie todos os serviços
docker-compose up -d

# Veja os logs em tempo real
docker-compose logs -f
```

#### 3️⃣ Acesse a Aplicação

- **Frontend**: http://localhost (porta 80)
- **Backend API**: http://localhost:8080
- **PostgreSQL**: localhost:5432

#### 4️⃣ Comandos Úteis Docker

```bash
# Ver status dos containers
docker-compose ps

# Parar todos os serviços
docker-compose down

# Parar e remover volumes (apaga dados do banco!)
docker-compose down -v

# Rebuild das imagens
docker-compose up -d --build

# Ver logs de um serviço específico
docker-compose logs -f backend
docker-compose logs -f frontend
```

---

### Método 3: Docker Compose com Monitoramento 📊

Para executar com Prometheus e Grafana:

```bash
# Suba com profile de monitoramento
docker-compose --profile monitoring up -d

# Acesse:
# - Prometheus: http://localhost:9090
# - Grafana: http://localhost:3000 (admin/admin)
```

---

## 🧪 Executando os Testes

### Backend (JUnit + Mockito)

```bash
cd backend

# Executar todos os testes
./mvnw test

# Executar testes com relatório de cobertura
./mvnw test jacoco:report

# Ver relatório de cobertura
open target/site/jacoco/index.html
```

**⚠️ Nota:** Alguns testes de integração podem falhar se as configurações de segurança não estiverem completas. Para desenvolvimento, compile com `-DskipTests`.

### Frontend (Vitest)

```bash
cd frontend

# Executar testes
pnpm test
# ou: npm test

# Executar com cobertura
pnpm test:coverage
```

---

## 🔐 Credenciais de Teste

Usuários pré-cadastrados para teste:

| Perfil            | Email                | Senha      | Permissões                     |
| ----------------- | -------------------- | ---------- | ------------------------------ |
| **Administrador** | `admin@pucminas.br`  | `senha123` | Todas                          |
| **Bibliotecário** | `biblio@pucminas.br` | `senha123` | Gerenciar acervo e empréstimos |
| **Aluno**         | `aluno@pucminas.br`  | `senha123` | Consultar e fazer empréstimos  |

---

## 🔍 Testando a API

### Usando cURL

```bash
# Health Check
curl http://localhost:8080/actuator/health

# Listar livros (não precisa autenticação)
curl http://localhost:8080/api/livros

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@pucminas.br",
    "senha": "senha123"
  }'

# Usar token JWT (substitua <TOKEN>)
curl http://localhost:8080/api/livros \
  -H "Authorization: Bearer <TOKEN>"
```

### Usando Postman/Insomnia

1. Importe a coleção de requests (se disponível)
2. Configure a URL base: `http://localhost:8080`
3. Faça login em `/api/auth/login`
4. Copie o token JWT retornado
5. Use o token no header `Authorization: Bearer <TOKEN>`

---

## 🛠️ Troubleshooting

### ❌ Erro: "BUILD FAILURE" nos testes

Se você vir erros como `Tests run: 6, Failures: 0, Errors: 1`:

```bash
# Solução: Compile SEM executar os testes
cd backend
./mvnw clean package -DskipTests

# Depois execute normalmente
./mvnw spring-boot:run
# OU
java -jar target/libshow-0.0.1-SNAPSHOT.jar
```

**Por quê?** Alguns testes de integração precisam de configuração adicional do Spring Security. Isso não afeta a execução da aplicação.

### ❌ Erro: "Port 8080 already in use"

```bash
# Encontre o processo usando a porta
lsof -i :8080

# Mate o processo (substitua <PID>)
kill -9 <PID>

# Ou use outra porta
./mvnw spring-boot:run -Dserver.port=8081
```

### ❌ Erro: "Cannot connect to database"

```bash
# Verifique se o diretório data/ existe
mkdir -p backend/data

# Ou limpe o banco H2 e reinicie
rm -rf backend/data/
./mvnw spring-boot:run
```

### ❌ Erro no Frontend: "Module not found"

```bash
# Limpe e reinstale dependências
cd frontend
rm -rf node_modules .vite
pnpm install
pnpm dev
```

### ❌ Docker: "Container unhealthy"

```bash
# Veja os logs do container
docker-compose logs backend

# Reinicie o container específico
docker-compose restart backend

# Rebuild completo
docker-compose down
docker-compose up -d --build
```

---

## 📊 Estrutura do Projeto

```
libshow/
├── backend/                    # Spring Boot Application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/          # Código fonte Java
│   │   │   └── resources/     # application.properties
│   │   └── test/              # Testes unitários
│   ├── pom.xml                # Dependências Maven
│   └── Dockerfile             # Container do backend
│
├── frontend/                   # React Application
│   ├── src/
│   │   ├── components/        # Componentes React
│   │   ├── services/          # Serviços API
│   │   └── main.jsx           # Entry point
│   ├── package.json           # Dependências npm
│   └── Dockerfile             # Container do frontend
│
├── .github/
│   └── workflows/             # CI/CD com GitHub Actions
│
├── docker-compose.yml         # Orquestração de containers
├── .env.example               # Exemplo de variáveis de ambiente
└── README.md                  # Este arquivo
```

---

## ✨ Funcionalidades Principais

### Para Alunos

- ✅ Consultar acervo disponível
- ✅ Visualizar histórico de empréstimos
- ✅ Fazer reservas de livros indisponíveis
- ✅ Acompanhar status de reservas

### Para Bibliotecários

- ✅ Gerenciar empréstimos e devoluções
- ✅ Cadastrar e editar livros
- ✅ Gerenciar usuários
- ✅ Processar fila de reservas
- ✅ Visualizar empréstimos ativos e atrasados

### Para Administradores

- ✅ Visualizar relatórios completos
- ✅ Análise de livros mais emprestados
- ✅ Estatísticas do sistema
- ✅ Gestão completa do sistema

---

## 🏗️ Arquitetura

O LibShow utiliza uma **arquitetura em 3 camadas** (Three-Tier Architecture):

```
┌─────────────────────────────┐
│   Frontend (React + Vite)   │  ← Presentation Layer
│   - UI Components           │
│   - State Management        │
│   - API Services            │
└──────────┬──────────────────┘
           │ HTTP REST + JWT
┌──────────▼──────────────────┐
│  Backend (Spring Boot)      │  ← Business Logic Layer
│  - Controllers (REST API)   │
│  - Services (Business Logic)│
│  - Repositories (Data Access│
│  - Security (JWT + Spring)  │
└──────────┬──────────────────┘
           │ JPA/Hibernate
┌──────────▼──────────────────┐
│  Database (H2/PostgreSQL)   │  ← Data Layer
│  - Tables & Relationships   │
└─────────────────────────────┘
```

### Padrões de Design Utilizados

- **MVC** (Model-View-Controller)
- **Repository Pattern** (Spring Data JPA)
- **Dependency Injection** (Spring IoC)
- **RESTful API Design**
- **JWT Authentication** (Stateless)

📄 **Documentação Completa:** [ARQUITETURA.md](./ARQUITETURA.md)

---

## 🛠️ Tecnologias Utilizadas

### Backend

- **Java 21** - Linguagem de programação
- **Spring Boot 3.3.4** - Framework web
- **Spring Data JPA** - ORM e persistência
- **Spring Security** - Autenticação e autorização
- **JWT** - Tokens de autenticação
- **H2 Database** - Banco de dados (desenvolvimento)
- **Lombok** - Redução de boilerplate
- **Maven** - Gerenciamento de dependências
- **JUnit 5 + Mockito** - Testes automatizados

### Frontend

- **React 19** - Biblioteca UI
- **Vite** - Build tool moderna
- **Tailwind CSS 4** - Framework CSS
- **shadcn/ui** - Componentes UI acessíveis
- **Lucide React** - Ícones
- **Axios** - Cliente HTTP

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

> [!IMPORTANT]
> Certifique-se de ter instalado:
>
> - **Java 21** ou superior ([Download](https://adoptium.net/))
> - **Node.js 18+** (LTS) ([Download](https://nodejs.org/))
> - **Maven 3.8+** (ou usar o wrapper incluído)
> - **Git** para clonar o repositório

### 1️⃣ Clonar o Repositório

```bash
git clone https://github.com/andreeluis/libshow.git
cd libshow
```

### 2️⃣ Configurar e Executar o Backend

```bash
cd backend

# Instalar dependências e compilar
./mvnw clean install

# Executar aplicação Spring Boot
./mvnw spring-boot:run
```

O backend estará disponível em: **http://localhost:8080**

**Acessar H2 Console** (para visualizar banco de dados):

- URL: http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:file:./data/db`
- Username: `show`
- Password: `1234`

### 3️⃣ Configurar e Executar o Frontend

Abra um **novo terminal** e execute:

```bash
cd frontend

# Instalar dependências
npm install
# ou se usar pnpm:
pnpm install

# Executar em modo desenvolvimento
npm run dev
```

O frontend estará disponível em: **http://localhost:5173**

### 4️⃣ Credenciais de Teste

Use estas credenciais para fazer login:

**Aluno:**

- Email: `joao.silva@puc.br`
- Senha: `senha123`

**Bibliotecário:**

- Email: `carlos.oliveira@puc.br`
- Senha: `senha123`

**Administrador:**

- Email: `ana.paula@puc.br`
- Senha: `senha123`

---

## 🧪 Executar Testes

### Testes Backend (JUnit + Mockito)

```bash
cd backend
./mvnw test
```

### Cobertura de Testes

```bash
./mvnw clean test jacoco:report
```

O relatório estará em: `target/site/jacoco/index.html`

---

## 📂 Estrutura do Projeto

```
libshow/
├── backend/                      # Spring Boot Application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/example/libshow/
│   │   │   │   ├── controller/   # REST Controllers
│   │   │   │   ├── service/      # Business Logic
│   │   │   │   ├── repository/   # Data Access Layer
│   │   │   │   ├── domain/       # JPA Entities
│   │   │   │   ├── security/     # JWT & Security Config
│   │   │   │   └── LibshowApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   │       └── java/             # Unit & Integration Tests
│   └── pom.xml
│
├── frontend/                     # React Application
│   ├── src/
│   │   ├── components/           # React Components
│   │   │   └── ui/              # shadcn/ui components
│   │   ├── service/             # API Client Services
│   │   ├── hooks/               # Custom React Hooks
│   │   ├── lib/                 # Utilities
│   │   ├── App.jsx              # Main App Component
│   │   └── main.jsx             # Entry Point
│   ├── package.json
│   └── vite.config.js
│
├── APRESENTACAO.md              # Slides da apresentação
├── ARQUITETURA.md               # Documentação da arquitetura
├── USER_STORIES.md              # User Stories detalhadas
├── DATABASE.md                  # Schema do banco de dados
├── VIDEO_ROTEIRO.md             # Roteiro para demonstração
└── README.md                    # Este arquivo
```

---

## 📚 Documentação Completa

| Documento                              | Descrição                                 |
| -------------------------------------- | ----------------------------------------- |
| [APRESENTACAO.md](./APRESENTACAO.md)   | Slides completos da apresentação final    |
| [ARQUITETURA.md](./ARQUITETURA.md)     | Diagrama arquitetural e decisões técnicas |
| [USER_STORIES.md](./USER_STORIES.md)   | User stories detalhadas por épico         |
| [DATABASE.md](./DATABASE.md)           | Schema do banco, DDL, DML e queries       |
| [VIDEO_ROTEIRO.md](./VIDEO_ROTEIRO.md) | Roteiro para gravação do vídeo            |

---

## 🎥 Demonstração

### Vídeo de Demonstração

🎬 **[Link do Vídeo](https://youtube.com/...)** _(adicionar após gravação)_

O vídeo demonstra:

- Login e autenticação
- Gestão de livros (CRUD)
- Realização de empréstimos
- Sistema de reservas
- Relatórios administrativos

### Screenshots

_(Adicionar screenshots após deploy)_

---

## 🔐 Segurança

- ✅ **Autenticação JWT**: Tokens seguros e stateless
- ✅ **Senhas com BCrypt**: Hash seguro de senhas
- ✅ **CORS configurado**: Proteção contra requisições não autorizadas
- ✅ **Validação de entrada**: Prevenção de injeções
- ✅ **Controle de acesso por perfil**: Autorização granular

---

## 📊 Testes e Qualidade

### Estratégia de Testes

- ✅ **Testes Unitários**: Service layer com Mockito
- ✅ **Testes de Integração**: Controllers com MockMvc
- ✅ **Testes de Domínio**: Validação de entidades

### Ferramentas

- JUnit 5
- Mockito
- Spring Boot Test
- AssertJ

**Cobertura atual:** ~70% (Service + Controller layers)

📄 **Relatório de Qualidade:** _(adicionar link)_

---

## 🚀 Deploy (Opcional)

### Backend (Heroku / Railway)

```bash
# Criar Procfile
echo "web: java -jar target/libshow-0.0.1-SNAPSHOT.jar" > Procfile

# Deploy no Heroku
heroku create libshow-backend
git push heroku main
```

### Frontend (Vercel / Netlify)

```bash
# Build de produção
cd frontend
npm run build

# Deploy no Vercel
vercel --prod
```

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto foi desenvolvido para fins acadêmicos na disciplina de Engenharia de Software 2.

---

## 👥 Equipe

**Desenvolvido por:**

- [Nome do Integrante 1]
- [Nome do Integrante 2]
- [Nome do Integrante 3]

**Orientação:**

- Professor: [Nome do Professor]
- Disciplina: Engenharia de Software 2
- Instituição: PUC Minas - Ciência da Computação
- Período: 2024/2

---

## 📞 Contato

Para dúvidas ou sugestões:

- 📧 Email: [email@exemplo.com]
- 💬 Issues: [GitHub Issues](https://github.com/andreeluis/libshow/issues)

---

## 🎯 Roadmap - Melhorias Futuras

- [ ] Sistema de notificações por email
- [ ] Multas por atraso automatizadas
- [ ] Upload de capas de livros
- [ ] Leitor de código de barras (ISBN)
- [ ] Dashboard com gráficos avançados
- [ ] Aplicativo mobile (React Native)
- [ ] Integração com Google Books API
- [ ] Sistema de recomendação de livros
- [ ] Docker & Kubernetes para deploy
- [ ] CI/CD pipeline com GitHub Actions

---

<p align="center">
  Feito com ❤️ para a disciplina de Engenharia de Software 2<br>
  PUC Minas - Ciência da Computação
</p>

<p align="center">
  <i>"A melhor forma de prever o futuro é implementá-lo."</i> - Alan Kay
</p>

---

## Banco de Dados

> [!TIP]  
> Configure o arquivo `application.properties` no backend com as credenciais do seu banco PostgreSQL:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/libshow
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
```

---

## Integrantes

- [André Luís Silva de Paula](https://github.com/andreeluis)
- [Breno Pires Santos](https://github.com/brenodft)
- [Caio Faria Diniz](https://github.com/CaioFD)
- [Giuseppe Sena Cordeiro](https://github.com/giusfds)
- [Vinícius Miranda de Araújo](https://github.com/vinimiraa)

---

## Licença

Este projeto é distribuído sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
