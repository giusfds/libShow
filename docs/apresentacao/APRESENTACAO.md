# 📚 LibShow - Apresentação Final

**Sistema de Gerenciamento de Biblioteca Acadêmica**  
Disciplina: Engenharia de Software 2  
PUC Minas - Ciência da Computação

---

## 1️⃣ Introdução e Objetivo do Sistema

### Contexto do Problema

Bibliotecas acadêmicas enfrentam desafios significativos no gerenciamento manual de:

- Controle de empréstimos e devoluções
- Gestão de acervo e disponibilidade
- Cadastro e autenticação de usuários
- Geração de relatórios administrativos
- Reservas e filas de espera

### Motivação

- **Reduzir tempo** no processo de empréstimo/devolução
- **Eliminar erros** de controle manual
- **Centralizar informações** em um sistema integrado
- **Melhorar experiência** de bibliotecários e alunos
- **Facilitar análise** através de relatórios

### Público-Alvo

- 👨‍🎓 **Alunos**: Consultar acervo, fazer reservas, ver histórico
- 👩‍💼 **Bibliotecários**: Gerenciar empréstimos, usuários e acervo
- 🎯 **Administradores**: Visualizar relatórios e estatísticas

---

## 2️⃣ Requisitos e Modelagem

### Principais User Stories

#### US-01: Autenticação de Usuários

```
Como usuário do sistema
Quero realizar login com minhas credenciais
Para acessar funcionalidades de acordo com meu perfil
```

**Critérios de Aceitação:**

- Login via email/senha com autenticação JWT
- Diferentes perfis: Aluno, Bibliotecário, Admin
- Sessão segura com token de expiração

#### US-02: Consultar Acervo

```
Como aluno
Quero buscar livros no acervo
Para verificar disponibilidade antes de ir à biblioteca
```

**Critérios de Aceitação:**

- Busca por título, autor, ISBN
- Visualizar quantidade disponível
- Informações completas: editora, ano, etc.

#### US-03: Realizar Empréstimo

```
Como bibliotecário
Quero registrar empréstimos de livros
Para controlar o acervo emprestado
```

**Critérios de Aceitação:**

- Selecionar usuário e livro
- Definir data de devolução
- Atualizar quantidade disponível automaticamente
- Não permitir empréstimo se quantidade = 0

#### US-04: Fazer Reserva

```
Como aluno
Quero reservar um livro indisponível
Para ser notificado quando estiver disponível
```

**Critérios de Aceitação:**

- Reservar apenas livros indisponíveis
- Fila de reservas por ordem de solicitação
- Cancelamento de reserva

#### US-05: Visualizar Relatórios

```
Como administrador
Quero visualizar relatórios do sistema
Para tomar decisões baseadas em dados
```

**Critérios de Aceitação:**

- Livros mais emprestados
- Usuários com empréstimos ativos
- Empréstimos atrasados

### Diagramas UML

#### Diagrama de Casos de Uso

```
┌─────────────────────────────────────────────┐
│           Sistema LibShow                    │
│                                              │
│  ┌────────────────┐                         │
│  │ Fazer Login    │◄────────┐               │
│  └────────────────┘         │               │
│                              │               │
│  ┌────────────────┐    ┌────┴─────┐         │
│  │ Consultar      │    │  Aluno   │         │
│  │ Acervo         │◄───┤          │         │
│  └────────────────┘    └──────────┘         │
│                                              │
│  ┌────────────────┐                         │
│  │ Fazer Reserva  │◄───────┐                │
│  └────────────────┘        │                │
│                        ┌───┴────────┐       │
│  ┌────────────────┐   │            │       │
│  │ Registrar      │   │ Bibliotec. │       │
│  │ Empréstimo     │◄──┤            │       │
│  └────────────────┘   └───┬────────┘       │
│                           │                 │
│  ┌────────────────┐       │                 │
│  │ Devolver Livro │◄──────┘                 │
│  └────────────────┘                         │
│                        ┌────────────┐       │
│  ┌────────────────┐   │            │       │
│  │ Ver Relatórios │◄──┤   Admin    │       │
│  └────────────────┘   └────────────┘       │
└─────────────────────────────────────────────┘
```

#### Diagrama de Classes (Modelo de Domínio)

```
┌──────────────────────┐
│      Usuario         │
├──────────────────────┤
│ - id: Long           │
│ - nome: String       │
│ - email: String      │
│ - senha: String      │
│ - cpf: String        │
│ - tipo: String       │
├──────────────────────┤
│ + getters/setters    │
└──────────┬───────────┘
           │ 1
           │
           │ *
┌──────────▼───────────┐         ┌──────────────────────┐
│    Emprestimo        │    *    │       Livro          │
├──────────────────────┤  ◄────► ├──────────────────────┤
│ - id: Long           │    1    │ - id: Long           │
│ - dataEmprestimo     │         │ - titulo: String     │
│ - dataDevolucao      │         │ - autor: String      │
│ - devolvido: Boolean │         │ - isbn: String       │
├──────────────────────┤         │ - anoPublicacao: int │
│ + getters/setters    │         │ - editora: String    │
└──────────────────────┘         │ - quantidadeTotal    │
                                 │ - quantidadeDisp.    │
           │ 1                   ├──────────────────────┤
           │                     │ + getters/setters    │
           │ *                   └──────────┬───────────┘
┌──────────▼───────────┐                   │ 1
│      Reserva         │                   │
├──────────────────────┤                   │ *
│ - id: Long           │◄──────────────────┘
│ - dataReserva        │
│ - status: String     │
├──────────────────────┤
│ + getters/setters    │
└──────────────────────┘
```

---

## 3️⃣ Arquitetura do Sistema

### Arquitetura Geral (3 Camadas)

```
┌─────────────────────────────────────────────────────┐
│                   FRONTEND (React)                   │
│  ┌──────────────────────────────────────────────┐   │
│  │  Components UI (shadcn/ui + Tailwind CSS)    │   │
│  │  - Login, Dashboard, Forms, Tables           │   │
│  └──────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────┐   │
│  │  Services (API Client - Axios/Fetch)         │   │
│  └──────────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────────┘
                     │ HTTP/REST (JSON)
                     │ JWT Authentication
                     │
┌────────────────────▼────────────────────────────────┐
│              BACKEND (Spring Boot)                   │
│  ┌──────────────────────────────────────────────┐   │
│  │  Controller Layer (REST API)                 │   │
│  │  - LivroController                           │   │
│  │  - UsuarioController                         │   │
│  │  - EmprestimoController                      │   │
│  │  - ReservaController                         │   │
│  │  - RelatorioController                       │   │
│  │  - JwtAuthenticationController               │   │
│  └──────────────────┬───────────────────────────┘   │
│                     │                                │
│  ┌──────────────────▼───────────────────────────┐   │
│  │  Service Layer (Business Logic)              │   │
│  │  - Validações, Regras de Negócio             │   │
│  │  - LivroService, UsuarioService, etc.        │   │
│  └──────────────────┬───────────────────────────┘   │
│                     │                                │
│  ┌──────────────────▼───────────────────────────┐   │
│  │  Repository Layer (Spring Data JPA)          │   │
│  │  - Abstração do acesso a dados               │   │
│  │  - LivroRepository, UsuarioRepository, etc.  │   │
│  └──────────────────┬───────────────────────────┘   │
│                     │                                │
│  ┌──────────────────▼───────────────────────────┐   │
│  │  Domain Layer (Entities)                     │   │
│  │  - Livro, Usuario, Emprestimo, Reserva       │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │  Security Layer (JWT + Spring Security)      │   │
│  │  - JwtTokenUtil, JwtRequestFilter            │   │
│  │  - WebSecurityConfig                         │   │
│  └──────────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────────┘
                     │ JPA/Hibernate
                     │
┌────────────────────▼────────────────────────────────┐
│           DATABASE (H2 / PostgreSQL)                 │
│  - Tabelas: usuarios, livros, emprestimos, reservas  │
└─────────────────────────────────────────────────────┘
```

### Padrões de Design Utilizados

#### 1. **Arquitetura em Camadas (Layered Architecture)**

- **Separação de responsabilidades** em camadas distintas
- Facilita manutenção e testes
- Camadas: Presentation → Service → Repository → Domain

#### 2. **MVC (Model-View-Controller)**

- **Model**: Entidades JPA (Livro, Usuario, etc.)
- **View**: Frontend React
- **Controller**: RestControllers do Spring Boot

#### 3. **Repository Pattern**

- Abstração do acesso a dados com Spring Data JPA
- Interfaces que estendem `JpaRepository`
- Queries automáticas e customizadas

#### 4. **Dependency Injection (DI)**

- Spring IoC Container gerencia dependências
- Uso de `@Autowired` para injeção
- Facilita testes com mocks

#### 5. **DTO Pattern (implícito)**

- Entidades retornadas diretamente pela API
- JSON serialization automática com Jackson

### Justificativa das Escolhas

#### Backend: Spring Boot

✅ Framework maduro e robusto  
✅ Ecossistema completo (Data JPA, Security, Web)  
✅ Configuração por convenção  
✅ Suporte a REST API nativo  
✅ Excelente para projetos Java enterprise

#### Frontend: React + Vite

✅ Biblioteca moderna e popular  
✅ Component-based architecture  
✅ Vite para build rápido  
✅ shadcn/ui para componentes prontos  
✅ Tailwind CSS para estilização eficiente

#### Banco de Dados: H2 (Dev) / PostgreSQL (Prod)

✅ H2 para desenvolvimento (embedded, sem setup)  
✅ PostgreSQL para produção (robusto, open-source)  
✅ JPA abstrai diferenças entre bancos

#### Segurança: JWT

✅ Stateless authentication  
✅ Escalável (sem sessão no servidor)  
✅ Padrão moderno para APIs REST

---

## 4️⃣ Implementação

### Stack Tecnológica Completa

#### Backend

- **Java 21** - Linguagem principal
- **Spring Boot 3.3.4** - Framework web
- **Spring Data JPA** - ORM e persistência
- **Spring Security** - Autenticação e autorização
- **JWT (io.jsonwebtoken)** - Tokens de autenticação
- **H2 Database** - Banco de dados em memória
- **Lombok** - Redução de boilerplate
- **Maven** - Gerenciamento de dependências

#### Frontend

- **React 19** - Biblioteca UI
- **Vite** - Build tool
- **Tailwind CSS 4** - Framework CSS
- **shadcn/ui** - Componentes UI
- **Radix UI** - Primitivos acessíveis
- **Lucide React** - Ícones
- **Framer Motion** - Animações

#### Testes

- **JUnit 5** - Framework de testes
- **Mockito** - Mocking framework
- **Spring Boot Test** - Testes de integração

### Principais Componentes

#### Backend - Controller Example

```java
@RestController
@RequestMapping("/api/livros")
public class LivroController {
    @Autowired
    private LivroService livroService;

    @GetMapping
    public List<Livro> getAllLivros() {
        return livroService.findAll();
    }

    @PostMapping
    public Livro createLivro(@RequestBody Livro livro) {
        return livroService.save(livro);
    }

    @PostMapping("/{id}/decrease/{quantity}")
    public ResponseEntity<Livro> decreaseAvailableQuantity(
            @PathVariable Long id,
            @PathVariable int quantity) {
        livroService.decreaseAvailableQuantity(id, quantity);
        return ResponseEntity.ok(livroService.findById(id).get());
    }
}
```

#### Backend - Service Example

```java
@Service
public class LivroService {
    @Autowired
    private LivroRepository livroRepository;

    public void decreaseAvailableQuantity(Long livroId, int quantity) {
        Livro livro = livroRepository.findById(livroId)
            .orElseThrow(() -> new RuntimeException("Livro not found"));

        if (livro.getQuantidadeDisponivel() < quantity) {
            throw new RuntimeException("Not enough books available");
        }

        livro.setQuantidadeDisponivel(
            livro.getQuantidadeDisponivel() - quantity
        );
        livroRepository.save(livro);
    }
}
```

#### Backend - Security Configuration

```java
@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
    // JWT filter configuration
    // CORS configuration
    // Authentication manager
    // Password encoder (BCrypt)
}
```

#### Frontend - Component Example

```jsx
function LivrosTable({ livros }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Título</TableHead>
          <TableHead>Autor</TableHead>
          <TableHead>Disponível</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {livros.map((livro) => (
          <TableRow key={livro.id}>
            <TableCell>{livro.titulo}</TableCell>
            <TableCell>{livro.autor}</TableCell>
            <TableCell>
              <Badge
                variant={
                  livro.quantidadeDisponivel > 0 ? "success" : "destructive"
                }
              >
                {livro.quantidadeDisponivel}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

### Fluxo de Chamadas (Exemplo: Realizar Empréstimo)

```
1. Frontend: User clica em "Emprestar Livro"
   └─► Component chama: emprestimoService.create(data)

2. Service Layer (Frontend):
   └─► axios.post('/api/emprestimos', data, { headers: { Authorization: JWT } })

3. Backend: Request chega no EmprestimoController
   └─► JwtRequestFilter intercepta e valida token
   └─► @PostMapping("/api/emprestimos")

4. Controller Layer:
   └─► emprestimoController.createEmprestimo(emprestimoDTO)
   └─► Delega para: emprestimoService.save()

5. Service Layer:
   └─► Valida disponibilidade do livro
   └─► Chama livroService.decreaseAvailableQuantity()
   └─► Salva empréstimo: emprestimoRepository.save()

6. Repository Layer:
   └─► Spring Data JPA traduz para SQL:
       INSERT INTO emprestimos (usuario_id, livro_id, data_emprestimo, ...)
       UPDATE livros SET quantidade_disponivel = quantidade_disponivel - 1

7. Database:
   └─► Executa transação
   └─► Retorna entidade persistida

8. Response:
   └─► Service → Controller → JSON Response
   └─► Frontend atualiza UI com sucesso/erro
```

### Estrutura de Diretórios

```
libshow/
├── backend/
│   └── src/
│       ├── main/
│       │   ├── java/com/example/libshow/
│       │   │   ├── controller/      # REST endpoints
│       │   │   ├── service/         # Business logic
│       │   │   ├── repository/      # Data access
│       │   │   ├── domain/          # JPA entities
│       │   │   ├── security/        # JWT & Auth
│       │   │   └── LibshowApplication.java
│       │   └── resources/
│       │       └── application.properties
│       └── test/
│           └── java/com/example/libshow/
│               ├── controller/
│               ├── service/
│               └── domain/
└── frontend/
    └── src/
        ├── components/
        │   └── ui/              # shadcn/ui components
        ├── service/             # API clients
        ├── hooks/               # Custom React hooks
        └── App.jsx              # Main component
```

---

## 5️⃣ Testes e Qualidade

### Estratégia de Testes

#### 1. **Testes Unitários (Backend)**

- **Framework**: JUnit 5 + Mockito
- **Cobertura**: Service Layer e Domain Logic
- **Objetivo**: Validar regras de negócio isoladamente

**Exemplo: LivroServiceTest**

```java
@SpringBootTest
class LivroServiceTest {
    @Mock
    private LivroRepository livroRepository;

    @InjectMocks
    private LivroService livroService;

    @Test
    void testDecreaseAvailableQuantity_Success() {
        Livro livro = new Livro("Teste", "Autor", "123", 2023, "Ed", 10, 5);
        when(livroRepository.findById(1L)).thenReturn(Optional.of(livro));

        livroService.decreaseAvailableQuantity(1L, 2);

        assertEquals(3, livro.getQuantidadeDisponivel());
        verify(livroRepository).save(livro);
    }

    @Test
    void testDecreaseAvailableQuantity_NotEnoughBooks() {
        Livro livro = new Livro("Teste", "Autor", "123", 2023, "Ed", 10, 1);
        when(livroRepository.findById(1L)).thenReturn(Optional.of(livro));

        assertThrows(RuntimeException.class, () -> {
            livroService.decreaseAvailableQuantity(1L, 5);
        });
    }
}
```

#### 2. **Testes de Integração (Backend)**

- **Framework**: Spring Boot Test + MockMvc
- **Objetivo**: Testar fluxo completo Controller → Service → Repository

**Exemplo: LivroControllerTest**

```java
@SpringBootTest
@AutoConfigureMockMvc
class LivroControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    void testGetAllLivros() throws Exception {
        mockMvc.perform(get("/api/livros"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$").isArray());
    }
}
```

#### 3. **Testes de Domínio**

- Validação de entidades e constraints
- Testes de getters/setters e lógica interna

### Ferramentas de Qualidade

#### Backend

- ✅ **JUnit 5** - Testes unitários
- ✅ **Mockito** - Mocking de dependências
- ✅ **Spring Boot Test** - Contexto de testes
- ✅ **Maven Surefire** - Execução de testes

#### Frontend

- ✅ **ESLint** - Análise estática de código
- ✅ **Prettier** (potencial) - Formatação
- ✅ **Vite** - Build otimizado

### Métricas de Qualidade

| Métrica             | Meta           | Status          |
| ------------------- | -------------- | --------------- |
| Cobertura de Testes | > 70%          | ✅ Parcial      |
| Testes Unitários    | Camada Service | ✅ Implementado |
| Testes Integração   | Controllers    | ✅ Implementado |
| Code Review         | Via PRs        | ✅ Git Workflow |

### Boas Práticas Aplicadas

1. **SOLID Principles**

   - Single Responsibility: Cada classe com uma responsabilidade
   - Dependency Inversion: Uso de interfaces e injeção

2. **Clean Code**

   - Nomes descritivos
   - Métodos pequenos e focados
   - Comentários apenas quando necessário

3. **Git Workflow**

   - Commits atômicos com mensagens claras
   - Branches para features
   - Pull requests com revisão

4. **Documentação**
   - README completo
   - Javadoc em métodos complexos
   - API endpoints documentados

---

## 6️⃣ Demonstração Funcional

### Fluxos Principais a Demonstrar

#### 1. **Autenticação**

```
✓ Acessar sistema
✓ Fazer login (bibliotecário/admin)
✓ Dashboard carregado com informações
```

#### 2. **Gestão de Livros**

```
✓ Listar acervo completo
✓ Buscar livro específico
✓ Adicionar novo livro
✓ Editar informações
✓ Visualizar disponibilidade
```

#### 3. **Gestão de Usuários**

```
✓ Listar usuários cadastrados
✓ Adicionar novo usuário (aluno)
✓ Editar perfil de usuário
✓ Visualizar histórico
```

#### 4. **Realizar Empréstimo**

```
✓ Selecionar usuário e livro
✓ Definir data de devolução
✓ Confirmar empréstimo
✓ Verificar quantidade disponível reduzida
✓ Empréstimo aparece na lista de ativos
```

#### 5. **Fazer Reserva**

```
✓ Buscar livro indisponível (quantidade = 0)
✓ Criar reserva
✓ Reserva entra na fila
✓ Status exibido no sistema
```

#### 6. **Relatórios**

```
✓ Visualizar livros mais emprestados
✓ Listar empréstimos ativos
✓ Identificar empréstimos atrasados
✓ Estatísticas do sistema
```

### Funcionalidades Extras Implementadas

- 🔐 **Autenticação JWT** completa
- 📊 **Dashboard interativo** com estatísticas
- 🎨 **UI moderna** com shadcn/ui e Tailwind
- 📱 **Interface responsiva** para diferentes telas
- ⚡ **Validações em tempo real**
- 🔍 **Busca e filtros** no acervo
- 📈 **Sistema de relatórios** administrativo

### Screenshots Sugeridos

1. Tela de Login
2. Dashboard Principal
3. Lista de Livros
4. Formulário de Empréstimo
5. Tela de Reservas
6. Relatórios Administrativos

---

## 7️⃣ Conclusões

### Principais Aprendizados

#### Técnicos

✅ **Arquitetura em Camadas**: Separação clara de responsabilidades  
✅ **Spring Boot Ecosystem**: JPA, Security, Web  
✅ **React Moderno**: Hooks, Component composition  
✅ **APIs RESTful**: Design de endpoints, HTTP methods  
✅ **Autenticação JWT**: Stateless authentication  
✅ **Testes Automatizados**: JUnit, Mockito, mocks

#### Engenharia de Software

✅ **Modelagem UML**: Casos de uso, classes, sequência  
✅ **User Stories**: Captura de requisitos  
✅ **Padrões de Design**: Repository, MVC, DI  
✅ **Git Workflow**: Branches, commits, PRs  
✅ **Documentação**: Essencial para manutenção

#### Trabalho em Equipe

✅ **Comunicação**: Alinhamento constante  
✅ **Divisão de Tarefas**: Frontend/Backend  
✅ **Code Review**: Qualidade do código  
✅ **Gestão de Tempo**: Entregas incrementais

### Desafios Enfrentados

1. **Integração Frontend-Backend**

   - Solução: Definir contrato de API claro

2. **Segurança com JWT**

   - Solução: Estudar Spring Security em profundidade

3. **Gestão de Estado no React**

   - Solução: Hooks (useState, useEffect)

4. **Testes de Integração**
   - Solução: MockMvc e contexto de testes

### Melhorias Futuras

#### Curto Prazo

- [ ] **Notificações**: Email/SMS para devoluções
- [ ] **Multas**: Sistema de penalidades por atraso
- [ ] **Upload de Capas**: Imagens dos livros
- [ ] **Histórico Detalhado**: Auditoria completa
- [ ] **Filtros Avançados**: Busca por categoria, ano, etc.

#### Médio Prazo

- [ ] **Mobile App**: React Native ou PWA
- [ ] **Leitor de Código de Barras**: Scan ISBN
- [ ] **Dashboard Analytics**: Gráficos avançados
- [ ] **Integração com APIs Externas**: Google Books
- [ ] **Sistema de Recomendação**: ML-based

#### Longo Prazo

- [ ] **Microservices**: Separar domínios (users, books, loans)
- [ ] **GraphQL API**: Alternativa ao REST
- [ ] **Docker & K8s**: Containerização e orquestração
- [ ] **CI/CD Pipeline**: GitHub Actions, Jenkins
- [ ] **Monitoring**: Prometheus, Grafana

### O Que Faríamos Diferente

#### Planejamento

- ⚠️ **Definir API Contract antes**: Swagger/OpenAPI no início
- ⚠️ **Modelagem mais detalhada**: Mais tempo em UML
- ⚠️ **Setup de CI/CD desde o início**: Automatizar testes

#### Implementação

- ⚠️ **DTOs separados das Entities**: Melhor separação
- ⚠️ **Validação com Bean Validation**: `@Valid`, `@NotNull`, etc.
- ⚠️ **Exception Handling Global**: `@ControllerAdvice`
- ⚠️ **Logs estruturados**: SLF4J com níveis apropriados

#### Testes

- ⚠️ **TDD desde o início**: Write tests first
- ⚠️ **Maior cobertura**: Meta de 90%+
- ⚠️ **Testes E2E**: Selenium, Cypress

#### Documentação

- ⚠️ **Swagger/OpenAPI**: Documentação automática da API
- ⚠️ **Architecture Decision Records**: Documentar escolhas
- ⚠️ **User Manual**: Guia para usuários finais

---

## 📊 Resumo Executivo

| Aspecto          | Detalhes                                   |
| ---------------- | ------------------------------------------ |
| **Problema**     | Gestão manual de bibliotecas é ineficiente |
| **Solução**      | Sistema web integrado e moderno            |
| **Arquitetura**  | 3 Camadas (React + Spring Boot + H2)       |
| **Padrões**      | MVC, Repository, DI, JWT                   |
| **Tecnologias**  | Java 21, Spring Boot 3.3, React 19, JPA    |
| **Testes**       | JUnit 5, Mockito, Spring Test              |
| **Resultados**   | Sistema funcional e escalável              |
| **Aprendizados** | Arquitetura, padrões, trabalho em equipe   |

---

## 🎯 Próximos Passos

1. ✅ **Vídeo de Demonstração**: Gravar walkthrough completo
2. ✅ **Publicar Repositório**: Organizar README e documentação
3. ✅ **Deploy (Opcional)**: Heroku, Railway, ou Vercel
4. ✅ **Feedback**: Coletar sugestões de melhorias

---

## 📚 Referências

- Spring Boot Documentation: https://spring.io/projects/spring-boot
- React Documentation: https://react.dev
- JWT Introduction: https://jwt.io/introduction
- Spring Security: https://spring.io/projects/spring-security
- shadcn/ui: https://ui.shadcn.com
- UML Best Practices: Martin Fowler's UML Distilled

---

## 👥 Equipe

**Projeto desenvolvido por:**

- [Nome dos integrantes]

**Orientação:**

- Professor: [Nome]
- Disciplina: Engenharia de Software 2
- Instituição: PUC Minas - Ciência da Computação
- Período: 2024/2

---

## 🎬 Links Importantes

- 📁 **Repositório**: [GitHub Link]
- 🎥 **Vídeo Demonstração**: [YouTube/Drive Link]
- 📊 **Slides**: Este documento
- 📝 **Relatório de Qualidade**: [Link no repo]

---

**Obrigado!** 🚀

_"A melhor forma de prever o futuro é implementá-lo."_ - Alan Kay
