# LibShow - Sistema de Gerenciamento de Biblioteca

[![Backend CI](https://github.com/andreeluis/libshow/workflows/Backend%20CI/badge.svg)](https://github.com/andreeluis/libshow/actions/workflows/backend-ci.yml)
[![Frontend CI](https://github.com/andreeluis/libshow/workflows/Frontend%20CI/badge.svg)](https://github.com/andreeluis/libshow/actions/workflows/frontend-ci.yml)
[![Code Quality](https://github.com/andreeluis/libshow/workflows/Code%20Quality/badge.svg)](https://github.com/andreeluis/libshow/actions/workflows/code-quality.yml)
[![Deploy](https://github.com/andreeluis/libshow/workflows/Deploy%20to%20Production/badge.svg)](https://github.com/andreeluis/libshow/actions/workflows/deploy.yml)

Sistema completo de gerenciamento de biblioteca desenvolvido como projeto final da disciplina **Engenharia de Software 2** da **PUC Minas**.

---

## 📖 Sobre o Projeto

LibShow é uma aplicação web moderna para gestão de bibliotecas que permite:

- 🔐 Autenticação e autorização baseada em JWT
- 📚 Gestão completa do acervo (livros, categorias, autores)
- 📖 Controle de empréstimos e devoluções
- 🎫 Sistema de reservas com fila FIFO
- 📊 Relatórios administrativos e estatísticas
- 👥 Gerenciamento de usuários (alunos, bibliotecários, administradores)
- 🔍 Busca avançada e filtros
- 📱 Interface responsiva

---

## 🏗️ Arquitetura

Arquitetura **3 camadas** (Three-Tier):

```
┌─────────────────┐
│   Frontend      │  React 19 + Vite + Tailwind
│  (Presentation) │  shadcn/ui + Radix UI
└────────┬────────┘
         │ REST API
┌────────┴────────┐
│    Backend      │  Spring Boot 3.3.4 + JWT
│ (Business Logic)│  Spring Security + JPA
└────────┬────────┘
         │ JDBC
┌────────┴────────┐
│    Database     │  H2 (dev) / PostgreSQL (prod)
│    (Data)       │  
└─────────────────┘
```

---

## 🚀 Tecnologias

### Backend
- **Java 21**
- **Spring Boot 3.3.4**
- **Spring Data JPA** - ORM e persistência
- **Spring Security** - Autenticação/Autorização
- **JWT** - Tokens de autenticação
- **H2 Database** - Banco de dados (desenvolvimento)
- **PostgreSQL** - Banco de dados (produção)
- **Maven** - Gerenciamento de dependências
- **JUnit 5 + Mockito** - Testes

### Frontend
- **React 19**
- **Vite 5** - Build tool
- **Tailwind CSS 4** - Estilização
- **shadcn/ui** - Biblioteca de componentes
- **Radix UI** - Componentes acessíveis
- **React Router** - Navegação
- **Axios** - Cliente HTTP

### DevOps
- **Docker** - Containerização
- **Docker Compose** - Orquestração
- **GitHub Actions** - CI/CD
- **Nginx** - Servidor web / Proxy reverso

---

## 📦 Executando o Projeto

### Pré-requisitos

- **Java 21** ou superior
- **Node.js 18+** ou superior
- **Maven 3.9+**
- **Git**

### 1️⃣ Clonar o Repositório

```bash
git clone https://github.com/andreeluis/libshow.git
cd libshow
```

### 2️⃣ Backend (Spring Boot)

```bash
# Navegar para o diretório do backend
cd backend

# Executar com Maven Wrapper
./mvnw spring-boot:run

# Ou compilar e executar JAR
./mvnw clean package
java -jar target/libshow-0.0.1-SNAPSHOT.jar
```

**Backend estará rodando em:** http://localhost:8080

#### Console H2 Database
- **URL:** http://localhost:8080/h2-console
- **JDBC URL:** `jdbc:h2:file:./data/db`
- **Username:** `sa`
- **Password:** *(deixar em branco)*

### 3️⃣ Frontend (React)

```bash
# Em outro terminal, navegar para o frontend
cd frontend

# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev
```

**Frontend estará rodando em:** http://localhost:5173

---

## 🐳 Executando com Docker

### Docker Compose (Recomendado)

```bash
# Subir todos os serviços
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar serviços
docker-compose down
```

**Acessar:**
- Frontend: http://localhost
- Backend: http://localhost:8080
- PostgreSQL: localhost:5432

### Docker Individual

```bash
# Backend
cd backend
docker build -t libshow-backend .
docker run -p 8080:8080 libshow-backend

# Frontend
cd frontend
docker build -t libshow-frontend .
docker run -p 80:80 libshow-frontend
```

---

## 🧪 Executando Testes

### Backend
```bash
cd backend
./mvnw test

# Com cobertura
./mvnw test jacoco:report
# Relatório em: target/site/jacoco/index.html
```

### Frontend
```bash
cd frontend
npm test
```

---

## 👥 Usuários de Teste

| Tipo | Email | Senha | Perfil |
|------|-------|-------|--------|
| Aluno | `aluno@pucminas.br` | `senha123` | USER |
| Bibliotecário | `biblio@pucminas.br` | `senha123` | LIBRARIAN |
| Administrador | `admin@pucminas.br` | `senha123` | ADMIN |

---

## 🔄 CI/CD

Pipeline completo implementado com GitHub Actions:

### Workflows

1. **Backend CI** - Build, testes e análise do backend
2. **Frontend CI** - Build, testes e análise do frontend
3. **Code Quality** - SonarCloud, CodeQL, análise estática
4. **Deploy** - Deploy automático para staging/produção
5. **PR Validation** - Validação de Pull Requests

Veja [CI_CD.md](./CI_CD.md) para documentação detalhada.

---

## 📚 Documentação Completa

- **[APRESENTACAO.md](./docs/APRESENTACAO.md)** - Apresentação do projeto (slides)
- **[ARQUITETURA.md](./ARQUITETURA.md)** - Documentação da arquitetura
- **[USER_STORIES.md](./USER_STORIES.md)** - Histórias de usuário
- **[DATABASE.md](./DATABASE.md)** - Documentação do banco de dados
- **[VIDEO_ROTEIRO.md](./VIDEO_ROTEIRO.md)** - Roteiro da demonstração
- **[CI_CD.md](./CI_CD.md)** - Documentação do pipeline CI/CD
- **[CHECKLIST_ENTREGA.md](./CHECKLIST_ENTREGA.md)** - Checklist de entrega

---

## 🎯 Funcionalidades Principais

### Para Alunos
- ✅ Buscar livros no acervo
- ✅ Realizar empréstimos
- ✅ Reservar livros indisponíveis
- ✅ Consultar histórico de empréstimos
- ✅ Renovar empréstimos

### Para Bibliotecários
- ✅ Gerenciar acervo (CRUD de livros)
- ✅ Processar empréstimos e devoluções
- ✅ Gerenciar reservas
- ✅ Consultar relatórios
- ✅ Enviar notificações

### Para Administradores
- ✅ Todas as funções de bibliotecário
- ✅ Gerenciar usuários
- ✅ Configurar sistema
- ✅ Relatórios avançados
- ✅ Auditoria de operações

---

## 🎨 Padrões de Projeto Utilizados

- **MVC** (Model-View-Controller)
- **Repository Pattern** (Spring Data JPA)
- **Dependency Injection** (Spring IoC)
- **RESTful API** (Richardson Maturity Model Level 2)
- **JWT Authentication** (Stateless)
- **DTO Pattern** (Data Transfer Objects)

---

## 🔒 Segurança

- ✅ Autenticação JWT
- ✅ Senhas criptografadas (BCrypt)
- ✅ CORS configurado
- ✅ Proteção CSRF
- ✅ Validação de entrada
- ✅ Rate limiting (em implementação)
- ✅ Security headers (Nginx)

---

## 📊 Métricas de Qualidade

- **Cobertura de Testes**: >70%
- **SonarCloud Quality Gate**: Passing
- **Code Smells**: Low
- **Technical Debt**: <5%
- **Security Vulnerabilities**: None
- **Bugs**: None

---

## 🎥 Demonstração

📹 **Vídeo de Demonstração:** [Link para YouTube/Drive]

*Duração: 5-8 minutos mostrando todas as funcionalidades principais*

---

## 🤝 Contribuindo

### Fluxo de Trabalho

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

### Padrão de Commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação
- `refactor:` Refatoração
- `test:` Testes
- `chore:` Manutenção

---

## 📝 Licença

Este projeto é parte do trabalho acadêmico da disciplina de **Engenharia de Software 2** da **PUC Minas**.

---

## 👨‍💻 Equipe

- **[Nome 1]** - [email1@sga.pucminas.br]
- **[Nome 2]** - [email2@sga.pucminas.br]
- **[Nome 3]** - [email3@sga.pucminas.br]

**Professor:** [Nome do Professor]  
**Disciplina:** Engenharia de Software 2  
**Instituição:** PUC Minas  
**Período:** 2024/2

---

## 📞 Contato

Para dúvidas ou sugestões:
- 📧 Email: libshow@sga.pucminas.br
- 💬 Issues: [GitHub Issues](https://github.com/andreeluis/libshow/issues)
- 📖 Wiki: [GitHub Wiki](https://github.com/andreeluis/libshow/wiki)

---

## 🙏 Agradecimentos

- Professor e monitores da disciplina
- Comunidade Spring Boot
- Comunidade React
- PUC Minas

---

**Desenvolvido com ❤️ pela equipe LibShow**
