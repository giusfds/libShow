# 🎬 Roteiro para Vídeo de Demonstração - LibShow

## 📋 Informações Gerais

**Duração Total:** 5-8 minutos  
**Formato:** Screencast com narração  
**Resolução:** 1080p (Full HD)  
**Software Sugerido:** OBS Studio, Loom, ou Zoom

---

## 🎯 Objetivos do Vídeo

1. Apresentar o sistema de forma clara e profissional
2. Demonstrar funcionalidades principais
3. Mostrar fluxos completos (início ao fim)
4. Evidenciar qualidade técnica e design
5. Destacar decisões de engenharia de software

---

## 🎬 Estrutura do Vídeo

### Abertura (30 segundos)

### Demonstração Técnica (4-6 minutos)

### Encerramento (30 segundos)

---

## 📝 Script Detalhado

---

## 🎥 CENA 1: Abertura (0:00 - 0:30)

### Visual

- Tela preta com fade in
- Logo/Nome do projeto: **LibShow**
- Subtítulo: "Sistema de Gerenciamento de Biblioteca Acadêmica"
- Badges tecnológicos: Spring Boot | React | H2 Database

### Narração

> "Olá! Bem-vindos à apresentação do **LibShow**, um sistema completo de gerenciamento de biblioteca acadêmica desenvolvido para a disciplina de Engenharia de Software 2 da PUC Minas."

> "O LibShow foi construído utilizando **Spring Boot** no backend, **React** no frontend, e implementa autenticação **JWT**, arquitetura em camadas, e padrões de design como MVC e Repository Pattern."

### Transição

- Fade out para a tela de login do sistema

---

## 🎥 CENA 2: Autenticação (0:30 - 1:00)

### Visual

- Mostrar tela de login
- Focar nos campos de email e senha
- Destacar design moderno (shadcn/ui + Tailwind)

### Narração

> "Vamos começar pela autenticação. O sistema implementa login seguro com **JWT Tokens** e **senhas criptografadas com BCrypt**."

### Ações

1. Inserir email: `carlos.oliveira@puc.br`
2. Inserir senha: `senha123`
3. Clicar em "Entrar"
4. Mostrar transição para dashboard

### Narração (continuação)

> "Estamos logando como **bibliotecário**, um dos três perfis do sistema: aluno, bibliotecário e administrador. Cada perfil tem permissões específicas."

### Transição

- Dashboard carrega com animação suave

---

## 🎥 CENA 3: Dashboard e Visão Geral (1:00 - 1:30)

### Visual

- Mostrar dashboard principal
- Destacar menu lateral
- Mostrar estatísticas (se implementadas)

### Narração

> "O dashboard oferece uma visão geral do sistema. Aqui o bibliotecário pode acessar todas as funcionalidades: gerenciar livros, processar empréstimos, visualizar reservas e acompanhar usuários."

### Ações

1. Passar o mouse pelos itens do menu
2. Mostrar as seções disponíveis
3. Destacar navegação intuitiva

### Narração (continuação)

> "A interface foi desenvolvida com **React 19** e componentes do **shadcn/ui**, garantindo uma experiência moderna e acessível."

### Transição

- Clicar em "Livros" no menu

---

## 🎥 CENA 4: Gestão de Acervo (1:30 - 2:30)

### Visual

- Mostrar lista de livros
- Destacar colunas: título, autor, quantidade disponível
- Mostrar badges de disponibilidade (verde/vermelho)

### Narração

> "Vamos explorar a gestão de acervo. Aqui temos a lista completa de livros da biblioteca."

### Ações

1. Scroll pela lista de livros
2. Destacar informações exibidas
3. Mostrar busca (se implementada)

### Narração (continuação)

> "Cada livro exibe título, autor, ISBN, e **quantidade disponível**. Veja os badges: verde indica disponibilidade, vermelho indica esgotado."

### Sub-ação: Cadastrar Novo Livro

**Visual:** Clicar em "Adicionar Livro"

**Narração:**

> "Vamos cadastrar um novo livro no sistema."

**Ações:**

1. Clicar no botão "Adicionar Livro"
2. Preencher formulário:
   - Título: "Engenharia de Software Moderna"
   - Autor: "Marco Tulio Valente"
   - ISBN: "978-6500019506"
   - Ano: 2020
   - Editora: "Independente"
   - Quantidade Total: 3
   - Quantidade Disponível: 3
3. Clicar em "Salvar"
4. Mostrar mensagem de sucesso
5. Livro aparece na lista

**Narração:**

> "O sistema valida os dados e garante que o **ISBN seja único**. A quantidade disponível não pode exceder a quantidade total - validações implementadas na camada de serviço."

### Transição

- Voltar para a lista de livros
- Clicar em "Empréstimos" no menu

---

## 🎥 CENA 5: Registrar Empréstimo (2:30 - 3:30)

### Visual

- Mostrar tela de empréstimos
- Formulário de novo empréstimo

### Narração

> "Agora vamos processar um empréstimo. Este é o fluxo principal do sistema."

### Ações

1. Clicar em "Novo Empréstimo"
2. Selecionar usuário: "João Silva"
3. Selecionar livro: "Clean Code"
4. Verificar quantidade disponível (deve ser > 0)
5. Data de devolução preenchida automaticamente (+14 dias)
6. Clicar em "Confirmar Empréstimo"

### Narração (continuação)

> "Ao selecionar o livro **Clean Code**, o sistema valida automaticamente se há exemplares disponíveis. A data de devolução padrão é **14 dias** a partir de hoje."

### Pós-confirmação

**Visual:** Empréstimo criado com sucesso

**Narração:**

> "Observe o que acontece nos bastidores: O **EmprestimoService** valida a disponibilidade, o **LivroService** decrementa a quantidade disponível, e o empréstimo é registrado no banco. Tudo em uma transação atômica."

**Ações:**

1. Voltar para lista de livros
2. Mostrar que "Clean Code" agora tem 1 exemplar a menos
3. Ir para "Empréstimos Ativos"

**Visual:** Lista de empréstimos ativos

**Narração:**

> "Na lista de empréstimos ativos, vemos o novo registro com usuário, livro, data de empréstimo e data prevista de devolução."

### Transição

- Destacar empréstimo recém-criado
- Clicar em "Reservas" no menu

---

## 🎥 CENA 6: Sistema de Reservas (3:30 - 4:15)

### Visual

- Voltar para lista de livros
- Buscar/selecionar livro indisponível (ex: "Domain-Driven Design")

### Narração

> "O LibShow também implementa um **sistema de reservas** para livros indisponíveis. Vamos fazer uma reserva."

### Ações

1. Buscar livro com quantidade disponível = 0
2. Mostrar que botão "Emprestar" está desabilitado
3. Clicar em "Reservar"
4. Confirmar reserva
5. Mostrar mensagem de sucesso

### Narração (continuação)

> "Quando um livro está indisponível, o sistema oferece a opção de reserva. As reservas funcionam em uma **fila FIFO** - primeiro a reservar, primeiro a ser notificado."

### Visual: Lista de Reservas

**Ações:**

1. Ir para "Reservas"
2. Mostrar lista de reservas ativas
3. Destacar ordem cronológica (fila)

**Narração:**

> "Na tela de reservas, vemos todas as solicitações pendentes. Quando o livro for devolvido, o próximo da fila será notificado automaticamente."

### Transição

- Clicar em "Relatórios" no menu (se admin)

---

## 🎥 CENA 7: Relatórios (4:15 - 5:00)

### Visual

- Dashboard de relatórios
- Gráficos e estatísticas

### Narração

> "Para administradores, o LibShow oferece uma **seção de relatórios** com análises e estatísticas do sistema."

### Ações

1. Mostrar "Livros Mais Emprestados"
2. Mostrar "Empréstimos Ativos"
3. Mostrar "Empréstimos Atrasados" (se houver)
4. Mostrar estatísticas gerais (totais)

### Narração (continuação)

> "Estes relatórios são gerados pela camada de serviço com queries otimizadas, ajudando gestores a tomar decisões baseadas em dados."

### Transição

- Mostrar código (opcional, se tempo permitir)

---

## 🎥 CENA 8: Arquitetura e Código (5:00 - 6:00) [OPCIONAL]

### Visual

- Abrir IDE (VS Code/IntelliJ)
- Mostrar estrutura de pastas

### Narração

> "Vamos dar uma rápida olhada na arquitetura do sistema."

### Ações

1. Mostrar estrutura de pastas (backend)
   - controller/
   - service/
   - repository/
   - domain/
   - security/

### Narração (continuação)

> "O backend segue a **arquitetura em camadas**: Controllers para REST API, Services para lógica de negócio, Repositories para acesso a dados, e Domain para as entidades JPA."

### Visual: Controller Example

**Ações:**

1. Abrir `LivroController.java`
2. Destacar anotações REST (`@GetMapping`, `@PostMapping`)
3. Destacar injeção de dependência (`@Autowired`)

**Narração:**

> "Veja o **LivroController**: endpoints REST claramente definidos, injeção de dependência do **LivroService**, seguindo os princípios SOLID."

### Visual: Service Example

**Ações:**

1. Abrir `LivroService.java`
2. Destacar método `decreaseAvailableQuantity`

**Narração:**

> "No **LivroService**, implementamos as regras de negócio. Por exemplo, este método valida se há exemplares disponíveis antes de decrementar."

### Visual: Testes

**Ações:**

1. Abrir `LivroServiceTest.java`
2. Mostrar método de teste
3. Executar testes no terminal: `./mvnw test`
4. Mostrar resultado (todos passando)

**Narração:**

> "O sistema possui **testes automatizados** com JUnit e Mockito, garantindo qualidade e confiabilidade do código."

### Transição

- Fade out do código
- Voltar para aplicação rodando

---

## 🎥 CENA 9: Segurança e JWT (6:00 - 6:30) [OPCIONAL]

### Visual

- Abrir DevTools do navegador
- Aba "Network"

### Narração

> "Vamos ver a segurança em ação."

### Ações

1. Fazer uma requisição (ex: buscar livros)
2. Inspecionar requisição no DevTools
3. Mostrar header `Authorization: Bearer <token>`
4. Copiar token e mostrar no jwt.io (decodificar)

### Narração (continuação)

> "Toda requisição inclui um **token JWT** no header Authorization. Este token é gerado no login e validado pelo **JwtRequestFilter** em cada requisição."

### Visual: jwt.io

**Narração:**

> "Decodificando o token, vemos os claims: username, roles e expiração. O token é **stateless**, ou seja, o servidor não mantém sessão."

### Transição

- Voltar para aplicação

---

## 🎥 CENA 10: Responsividade (6:30 - 7:00) [OPCIONAL]

### Visual

- Redimensionar janela do navegador
- Mostrar layout responsivo

### Narração

> "O frontend foi desenvolvido com **Tailwind CSS** e **shadcn/ui**, garantindo uma interface **totalmente responsiva**."

### Ações

1. Redimensionar para tablet
2. Redimensionar para mobile
3. Mostrar menu hamburguer (se implementado)
4. Navegar em mobile

### Narração (continuação)

> "A experiência se adapta perfeitamente a diferentes tamanhos de tela, desde desktops até smartphones."

### Transição

- Voltar ao tamanho desktop

---

## 🎥 CENA 11: Encerramento (7:00 - 7:30)

### Visual

- Fazer logout
- Tela de login novamente
- Fade para slide de encerramento

### Narração

> "E assim concluímos a demonstração do **LibShow**."

### Slide de Encerramento (Visual)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      📚 LibShow
      Sistema de Gerenciamento de
      Biblioteca Acadêmica
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏗️ Arquitetura em 3 Camadas
🔐 Autenticação JWT
📊 Relatórios e Analytics
✅ Testes Automatizados

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tecnologias:
• Spring Boot 3.3.4
• React 19
• H2 Database
• JWT + Spring Security
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Desenvolvido por: [Nomes]
Disciplina: Eng. Software 2
PUC Minas - 2024/2

📂 Repositório: github.com/andreeluis/libshow
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Narração (final)

> "Este projeto demonstra a aplicação prática de conceitos fundamentais de **Engenharia de Software**: arquitetura em camadas, padrões de design, autenticação segura, testes automatizados, e desenvolvimento full-stack moderno."

> "Implementamos user stories completas, desde autenticação até relatórios administrativos, sempre seguindo boas práticas de clean code e SOLID."

> "Esperamos que tenham gostado da apresentação. Todo o código-fonte, documentação e slides estão disponíveis no repositório GitHub. Obrigado!"

### Visual Final

- Fade out suave
- Música de fundo (opcional)

---

## 📌 Checklist Pré-Gravação

### Ambiente

- [ ] Backend rodando sem erros (http://localhost:8080)
- [ ] Frontend rodando sem erros (http://localhost:5173)
- [ ] Banco de dados populado com dados de exemplo
- [ ] Navegador limpo (sem abas desnecessárias)
- [ ] DevTools abertos (aba Network para mostrar JWT)

### Software de Gravação

- [ ] OBS Studio / Loom configurado
- [ ] Resolução: 1920x1080 (Full HD)
- [ ] Taxa de quadros: 30 fps
- [ ] Microfone testado (áudio claro)
- [ ] Zoom configurado para destacar áreas (se necessário)

### Conteúdo

- [ ] Script ensaiado
- [ ] Timing controlado (5-8 minutos)
- [ ] Transições suaves planejadas
- [ ] Dados de teste preparados
- [ ] Credenciais de login anotadas

### Pós-Gravação

- [ ] Editar vídeo (cortar erros, adicionar transições)
- [ ] Adicionar legendas (se possível)
- [ ] Adicionar música de fundo (baixo volume)
- [ ] Exportar em alta qualidade
- [ ] Upload no YouTube/Drive
- [ ] Link público adicionado ao README.md

---

## 🎨 Dicas de Edição

### Transições Sugeridas

- Fade in/out entre seções
- Zoom suave para destacar elementos
- Slow motion em momentos importantes (ex: salvando livro)
- Text overlay para explicar conceitos técnicos

### Música de Fundo

- Volume baixo (não distrair da narração)
- Estilo: corporativo, inspirador, moderno
- Sem copyright (YouTube Audio Library)

### Texto na Tela

- Destacar tecnologias quando mencionadas
  - Exemplo: "Spring Boot" aparece na tela quando narrado
- Destacar padrões de design
  - Exemplo: "MVC Pattern" aparece quando navegando no código

### Cortes

- Remover pausas longas
- Acelerar navegação lenta (1.5x)
- Slow motion em confirmações importantes

---

## 🎯 Objetivos de Impacto

Ao final do vídeo, o espectador deve entender:

1. ✅ **O que é o LibShow**: Sistema de biblioteca acadêmica
2. ✅ **Principais funcionalidades**: CRUD, empréstimos, reservas, relatórios
3. ✅ **Qualidade técnica**: Arquitetura, padrões, segurança
4. ✅ **Tecnologias modernas**: Spring Boot, React, JWT
5. ✅ **Fluxos completos**: Da autenticação ao relatório
6. ✅ **Boas práticas**: Testes, clean code, SOLID

---

## 📤 Publicação

### Upload no YouTube

1. Título: "LibShow - Sistema de Gerenciamento de Biblioteca | Engenharia de Software"
2. Descrição:

```
LibShow - Sistema completo de gerenciamento de biblioteca acadêmica

🔗 Repositório: https://github.com/andreeluis/libshow

🛠️ Tecnologias:
• Spring Boot 3.3.4
• React 19
• H2 Database
• JWT Authentication
• Spring Security

📚 Funcionalidades:
• Gestão de Acervo
• Controle de Empréstimos
• Sistema de Reservas
• Relatórios Administrativos

🎓 Projeto desenvolvido para a disciplina de Engenharia de Software 2
PUC Minas - Ciência da Computação - 2024/2

#SpringBoot #React #EngenhariadeSoftware #JWT #FullStack
```

3. Tags: Spring Boot, React, Java, Full Stack, Software Engineering
4. Visibilidade: Público
5. Miniatura: Screenshot do dashboard com logo

### Link no README

Adicionar link do vídeo no README.md:

```markdown
## 🎥 Demonstração

**[📹 Assistir Vídeo de Demonstração](https://youtube.com/...)**
```

---

## 🚀 Extras (Se Tempo Permitir)

### Bloopers

- Mostrar erro sendo corrigido em tempo real
- Demonstra processo real de desenvolvimento

### Comparação Antes/Depois

- Mostrar como ficaria sem o sistema (manual)
- Destacar ganhos de eficiência

### Depoimento Fictício

- "Como bibliotecário, o LibShow reduziu meu tempo de trabalho em 50%"

---

**Documento criado para:** LibShow - Sistema de Gerenciamento de Biblioteca  
**Data:** Novembro 2024  
**Disciplina:** Engenharia de Software 2 - PUC Minas

**Boa gravação! 🎬**
