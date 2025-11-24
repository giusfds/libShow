<h1 align="center">
   📚 LibShow
</h1>

<p align="center">
  <img alt="Spring Boot Badge" src="https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
  <img alt="React Badge" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img alt="H2 Database Badge" src="https://img.shields.io/badge/H2-0000BB?style=for-the-badge&logo=database&logoColor=white">
  <img alt="Java Badge" src="https://img.shields.io/badge/Java_21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white">
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
