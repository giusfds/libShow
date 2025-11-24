# 📋 User Stories - LibShow

## Visão Geral

Este documento descreve as principais user stories do sistema LibShow, organizadas por tipo de usuário (persona).

---

## Personas

### 👨‍🎓 Aluno

Estudante que utiliza a biblioteca para consultar acervo, fazer reservas e acompanhar seus empréstimos.

**Características:**

- Acesso básico ao sistema
- Consulta acervo
- Faz reservas
- Visualiza histórico próprio

### 👩‍💼 Bibliotecário

Funcionário responsável por gerenciar empréstimos, devoluções e cadastro de livros.

**Características:**

- Acesso intermediário
- Gerencia empréstimos/devoluções
- Cadastra e atualiza livros
- Gerencia usuários
- Processa reservas

### 🎯 Administrador

Gestor que visualiza relatórios e toma decisões estratégicas.

**Características:**

- Acesso completo ao sistema
- Visualiza relatórios
- Acessa estatísticas
- Configurações do sistema

---

## Épicos

### Épico 1: Autenticação e Controle de Acesso

User stories relacionadas a login, logout e gerenciamento de perfis.

### Épico 2: Gestão de Acervo

User stories sobre livros (CRUD, consulta, disponibilidade).

### Épico 3: Gestão de Empréstimos

User stories sobre empréstimos e devoluções.

### Épico 4: Gestão de Reservas

User stories sobre reservas de livros indisponíveis.

### Épico 5: Relatórios e Analytics

User stories sobre relatórios administrativos.

---

## User Stories Detalhadas

### 📌 ÉPICO 1: Autenticação e Controle de Acesso

#### US-01: Login no Sistema

**Como** usuário do sistema  
**Quero** realizar login com minhas credenciais  
**Para** acessar funcionalidades de acordo com meu perfil

**Critérios de Aceitação:**

- [ ] Sistema deve ter tela de login com campos de email e senha
- [ ] Validação de credenciais contra banco de dados
- [ ] Senha armazenada com hash BCrypt
- [ ] Retornar token JWT após login bem-sucedido
- [ ] Token deve ter validade de 24 horas
- [ ] Mensagem de erro clara para credenciais inválidas
- [ ] Redirecionamento para dashboard após login

**Prioridade:** Alta  
**Estimativa:** 5 pontos  
**Sprint:** 1

**Regras de Negócio:**

- RN-01: Email deve ser único no sistema
- RN-02: Senha deve ter no mínimo 6 caracteres
- RN-03: Após 3 tentativas falhas, bloquear temporariamente

**Testes de Aceitação:**

```gherkin
Scenario: Login com credenciais válidas
  Given o usuário está na tela de login
  When informa email "aluno@puc.br" e senha "senha123"
  Then o sistema valida as credenciais
  And retorna um token JWT válido
  And redireciona para o dashboard

Scenario: Login com credenciais inválidas
  Given o usuário está na tela de login
  When informa email "aluno@puc.br" e senha incorreta
  Then o sistema exibe mensagem "Credenciais inválidas"
  And não permite acesso ao sistema
```

---

#### US-02: Logout do Sistema

**Como** usuário autenticado  
**Quero** realizar logout do sistema  
**Para** encerrar minha sessão com segurança

**Critérios de Aceitação:**

- [ ] Botão de logout visível no header/menu
- [ ] Limpar token JWT do armazenamento local
- [ ] Redirecionar para tela de login
- [ ] Limpar estado da aplicação (dados em memória)

**Prioridade:** Média  
**Estimativa:** 2 pontos  
**Sprint:** 1

---

#### US-03: Cadastro de Novo Usuário

**Como** bibliotecário  
**Quero** cadastrar novos usuários no sistema  
**Para** permitir que alunos acessem o sistema

**Critérios de Aceitação:**

- [ ] Formulário com campos: nome, email, CPF, senha, tipo
- [ ] Validação de CPF e email únicos
- [ ] Senha gerada automaticamente ou definida pelo bibliotecário
- [ ] Tipos disponíveis: ALUNO, BIBLIOTECARIO, ADMIN
- [ ] Email de confirmação enviado (futuro)

**Prioridade:** Alta  
**Estimativa:** 8 pontos  
**Sprint:** 2

**Regras de Negócio:**

- RN-04: CPF deve ser válido e único
- RN-05: Email deve ser válido e único
- RN-06: Apenas bibliotecários e admins podem cadastrar usuários

---

### 📌 ÉPICO 2: Gestão de Acervo

#### US-04: Consultar Acervo de Livros

**Como** aluno  
**Quero** visualizar todos os livros disponíveis  
**Para** conhecer o acervo da biblioteca

**Critérios de Aceitação:**

- [ ] Listagem de todos os livros com: título, autor, quantidade disponível
- [ ] Paginação (20 itens por página)
- [ ] Busca por título, autor ou ISBN
- [ ] Filtro por disponibilidade (disponível/indisponível)
- [ ] Indicador visual de disponibilidade (badge verde/vermelho)
- [ ] Detalhes completos ao clicar no livro

**Prioridade:** Alta  
**Estimativa:** 5 pontos  
**Sprint:** 2

**Testes de Aceitação:**

```gherkin
Scenario: Visualizar acervo completo
  Given o usuário está autenticado
  When acessa a página de livros
  Then o sistema exibe lista de livros
  And cada livro mostra título, autor e disponibilidade

Scenario: Buscar livro por título
  Given o usuário está na página de livros
  When digita "Dom Casmurro" no campo de busca
  Then o sistema filtra e exibe apenas livros correspondentes
```

---

#### US-05: Cadastrar Novo Livro

**Como** bibliotecário  
**Quero** cadastrar novos livros no sistema  
**Para** manter o acervo atualizado

**Critérios de Aceitação:**

- [ ] Formulário com campos obrigatórios: título, autor, ISBN
- [ ] Campos opcionais: ano publicação, editora
- [ ] Campos numéricos: quantidade total, quantidade disponível
- [ ] Validação de ISBN único
- [ ] ISBN pode ser escaneado via código de barras (futuro)
- [ ] Mensagem de sucesso após cadastro

**Prioridade:** Alta  
**Estimativa:** 5 pontos  
**Sprint:** 2

**Regras de Negócio:**

- RN-07: ISBN deve ser único no sistema
- RN-08: Quantidade disponível ≤ quantidade total
- RN-09: Quantidade total deve ser > 0

---

#### US-06: Editar Informações de Livro

**Como** bibliotecário  
**Quero** editar informações de um livro  
**Para** corrigir dados ou atualizar acervo

**Critérios de Aceitação:**

- [ ] Carregar dados atuais do livro no formulário
- [ ] Permitir edição de todos os campos exceto ID
- [ ] Validações aplicadas (ISBN único, quantidades)
- [ ] Confirmação antes de salvar alterações
- [ ] Histórico de alterações (futuro)

**Prioridade:** Média  
**Estimativa:** 3 pontos  
**Sprint:** 3

---

#### US-07: Remover Livro do Acervo

**Como** bibliotecário  
**Quero** remover um livro do sistema  
**Para** manter acervo atualizado quando livro for descartado

**Critérios de Aceitação:**

- [ ] Confirmação obrigatória antes de remover
- [ ] Não permitir remoção se existir empréstimo ativo
- [ ] Não permitir remoção se existir reserva ativa
- [ ] Mensagem de erro explicativa em caso de impedimento

**Prioridade:** Baixa  
**Estimativa:** 3 pontos  
**Sprint:** 4

**Regras de Negócio:**

- RN-10: Não remover livro com empréstimo ativo
- RN-11: Não remover livro com reserva ativa

---

### 📌 ÉPICO 3: Gestão de Empréstimos

#### US-08: Registrar Empréstimo de Livro

**Como** bibliotecário  
**Quero** registrar um empréstimo de livro  
**Para** controlar livros emprestados

**Critérios de Aceitação:**

- [ ] Selecionar usuário (busca por nome ou CPF)
- [ ] Selecionar livro (busca por título ou ISBN)
- [ ] Definir data de devolução (padrão: 14 dias)
- [ ] Validar disponibilidade do livro antes de emprestar
- [ ] Atualizar quantidade disponível automaticamente (-1)
- [ ] Registrar data do empréstimo automaticamente
- [ ] Gerar comprovante (opcional, futuro)

**Prioridade:** Alta  
**Estimativa:** 8 pontos  
**Sprint:** 3

**Regras de Negócio:**

- RN-12: Livro deve ter quantidade disponível > 0
- RN-13: Usuário não pode ter mais de 3 empréstimos ativos
- RN-14: Usuário com empréstimo atrasado não pode emprestar novo livro
- RN-15: Prazo padrão de devolução: 14 dias

**Testes de Aceitação:**

```gherkin
Scenario: Empréstimo com sucesso
  Given existe um livro "Clean Code" com quantidade disponível = 2
  And existe um usuário "João Silva" sem empréstimos ativos
  When o bibliotecário registra empréstimo para este usuário e livro
  Then o sistema cria o empréstimo
  And atualiza quantidade disponível para 1
  And define data de devolução para 14 dias à frente

Scenario: Tentativa de empréstimo sem disponibilidade
  Given existe um livro "Clean Code" com quantidade disponível = 0
  When o bibliotecário tenta registrar empréstimo
  Then o sistema exibe erro "Livro indisponível"
  And não cria o empréstimo
```

---

#### US-09: Registrar Devolução de Livro

**Como** bibliotecário  
**Quero** registrar a devolução de um livro  
**Para** atualizar o acervo e histórico

**Critérios de Aceitação:**

- [ ] Buscar empréstimo ativo por usuário ou livro
- [ ] Marcar empréstimo como devolvido
- [ ] Registrar data da devolução
- [ ] Atualizar quantidade disponível (+1)
- [ ] Calcular multa se atrasado (futuro)
- [ ] Notificar próximo usuário na fila de reservas (futuro)

**Prioridade:** Alta  
**Estimativa:** 5 pontos  
**Sprint:** 3

**Regras de Negócio:**

- RN-16: Empréstimo deve estar ativo (não devolvido)
- RN-17: Multa de R$ 2,00 por dia de atraso (futuro)
- RN-18: Notificar próximo na fila de reservas (futuro)

---

#### US-10: Visualizar Empréstimos Ativos

**Como** bibliotecário  
**Quero** visualizar todos os empréstimos ativos  
**Para** gerenciar o controle de livros emprestados

**Critérios de Aceitação:**

- [ ] Listar empréstimos com status "não devolvido"
- [ ] Exibir: usuário, livro, data empréstimo, data devolução prevista
- [ ] Destacar empréstimos atrasados em vermelho
- [ ] Filtro por usuário
- [ ] Filtro por livro
- [ ] Ordenação por data de devolução

**Prioridade:** Média  
**Estimativa:** 5 pontos  
**Sprint:** 4

---

#### US-11: Visualizar Histórico de Empréstimos (Aluno)

**Como** aluno  
**Quero** visualizar meu histórico de empréstimos  
**Para** acompanhar livros que já li

**Critérios de Aceitação:**

- [ ] Listar empréstimos do usuário logado
- [ ] Exibir: livro, data empréstimo, data devolução, status
- [ ] Filtro por status (ativo/devolvido)
- [ ] Ordenação por data (mais recente primeiro)

**Prioridade:** Baixa  
**Estimativa:** 3 pontos  
**Sprint:** 4

---

### 📌 ÉPICO 4: Gestão de Reservas

#### US-12: Fazer Reserva de Livro Indisponível

**Como** aluno  
**Quero** reservar um livro indisponível  
**Para** ser notificado quando estiver disponível

**Critérios de Aceitação:**

- [ ] Botão "Reservar" visível apenas para livros indisponíveis
- [ ] Sistema registra data e hora da reserva
- [ ] Status inicial: "ATIVA"
- [ ] Ordem de reserva: FIFO (primeiro a reservar, primeiro a ser notificado)
- [ ] Usuário pode ter no máximo 2 reservas ativas

**Prioridade:** Média  
**Estimativa:** 5 pontos  
**Sprint:** 4

**Regras de Negócio:**

- RN-19: Reservar apenas livros com quantidade disponível = 0
- RN-20: Usuário não pode reservar livro que já tem emprestado
- RN-21: Máximo de 2 reservas ativas por usuário

---

#### US-13: Cancelar Reserva

**Como** aluno  
**Quero** cancelar uma reserva  
**Para** desistir de um livro que não preciso mais

**Critérios de Aceitação:**

- [ ] Botão "Cancelar" visível nas reservas ativas
- [ ] Confirmação antes de cancelar
- [ ] Atualizar status para "CANCELADA"
- [ ] Notificar próximo da fila (futuro)

**Prioridade:** Baixa  
**Estimativa:** 2 pontos  
**Sprint:** 5

---

#### US-14: Visualizar Fila de Reservas (Bibliotecário)

**Como** bibliotecário  
**Quero** visualizar a fila de reservas de um livro  
**Para** saber quem será o próximo a ser notificado

**Critérios de Aceitação:**

- [ ] Listar reservas ativas de um livro específico
- [ ] Ordenar por data de reserva (mais antigo primeiro)
- [ ] Exibir: usuário, data reserva, posição na fila
- [ ] Opção de processar reserva (alocar livro)

**Prioridade:** Baixa  
**Estimativa:** 3 pontos  
**Sprint:** 5

---

### 📌 ÉPICO 5: Relatórios e Analytics

#### US-15: Visualizar Livros Mais Emprestados

**Como** administrador  
**Quero** visualizar os livros mais emprestados  
**Para** identificar popularidade e planejar compras

**Critérios de Aceitação:**

- [ ] Ranking dos 10 livros mais emprestados
- [ ] Exibir: título, autor, quantidade de empréstimos
- [ ] Filtro por período (último mês, últimos 6 meses, último ano)
- [ ] Gráfico de barras ou pizza

**Prioridade:** Média  
**Estimativa:** 5 pontos  
**Sprint:** 5

---

#### US-16: Visualizar Empréstimos Atrasados

**Como** administrador  
**Quero** visualizar empréstimos atrasados  
**Para** tomar ações de cobrança

**Critérios de Aceitação:**

- [ ] Listar empréstimos com data de devolução prevista < hoje
- [ ] Exibir: usuário, livro, dias de atraso, multa calculada
- [ ] Exportar para CSV/Excel (futuro)
- [ ] Ordenação por dias de atraso

**Prioridade:** Alta  
**Estimativa:** 5 pontos  
**Sprint:** 5

---

#### US-17: Visualizar Estatísticas do Sistema

**Como** administrador  
**Quero** visualizar estatísticas gerais do sistema  
**Para** acompanhar uso e desempenho

**Critérios de Aceitação:**

- [ ] Total de livros no acervo
- [ ] Total de usuários cadastrados
- [ ] Empréstimos ativos
- [ ] Reservas ativas
- [ ] Taxa de ocupação do acervo (emprestados/total)
- [ ] Gráficos de evolução temporal

**Prioridade:** Baixa  
**Estimativa:** 8 pontos  
**Sprint:** 6

---

## Backlog Priorizado

| ID    | User Story                    | Prioridade | Estimativa | Sprint |
| ----- | ----------------------------- | ---------- | ---------- | ------ |
| US-01 | Login no Sistema              | Alta       | 5          | 1      |
| US-02 | Logout do Sistema             | Média      | 2          | 1      |
| US-04 | Consultar Acervo              | Alta       | 5          | 2      |
| US-05 | Cadastrar Livro               | Alta       | 5          | 2      |
| US-03 | Cadastro de Usuário           | Alta       | 8          | 2      |
| US-08 | Registrar Empréstimo          | Alta       | 8          | 3      |
| US-09 | Registrar Devolução           | Alta       | 5          | 3      |
| US-06 | Editar Livro                  | Média      | 3          | 3      |
| US-10 | Visualizar Empréstimos Ativos | Média      | 5          | 4      |
| US-12 | Fazer Reserva                 | Média      | 5          | 4      |
| US-11 | Histórico de Empréstimos      | Baixa      | 3          | 4      |
| US-07 | Remover Livro                 | Baixa      | 3          | 4      |
| US-16 | Empréstimos Atrasados         | Alta       | 5          | 5      |
| US-15 | Livros Mais Emprestados       | Média      | 5          | 5      |
| US-13 | Cancelar Reserva              | Baixa      | 2          | 5      |
| US-14 | Fila de Reservas              | Baixa      | 3          | 5      |
| US-17 | Estatísticas do Sistema       | Baixa      | 8          | 6      |

---

## Regras de Negócio (Consolidado)

| ID    | Descrição                                                     |
| ----- | ------------------------------------------------------------- |
| RN-01 | Email deve ser único no sistema                               |
| RN-02 | Senha deve ter no mínimo 6 caracteres                         |
| RN-03 | Após 3 tentativas falhas de login, bloquear temporariamente   |
| RN-04 | CPF deve ser válido e único                                   |
| RN-05 | Email deve ser válido e único                                 |
| RN-06 | Apenas bibliotecários e admins podem cadastrar usuários       |
| RN-07 | ISBN deve ser único no sistema                                |
| RN-08 | Quantidade disponível ≤ quantidade total                      |
| RN-09 | Quantidade total deve ser > 0                                 |
| RN-10 | Não remover livro com empréstimo ativo                        |
| RN-11 | Não remover livro com reserva ativa                           |
| RN-12 | Livro deve ter quantidade disponível > 0 para empréstimo      |
| RN-13 | Usuário não pode ter mais de 3 empréstimos ativos             |
| RN-14 | Usuário com empréstimo atrasado não pode emprestar novo livro |
| RN-15 | Prazo padrão de devolução: 14 dias                            |
| RN-16 | Empréstimo deve estar ativo para ser devolvido                |
| RN-17 | Multa de R$ 2,00 por dia de atraso (futuro)                   |
| RN-18 | Notificar próximo na fila de reservas após devolução (futuro) |
| RN-19 | Reservar apenas livros com quantidade disponível = 0          |
| RN-20 | Usuário não pode reservar livro que já tem emprestado         |
| RN-21 | Máximo de 2 reservas ativas por usuário                       |

---

## Glossário

- **Acervo**: Conjunto de todos os livros da biblioteca
- **Empréstimo**: Registro de livro emprestado a um usuário
- **Reserva**: Solicitação de livro indisponível
- **Disponibilidade**: Quantidade de exemplares disponíveis para empréstimo
- **Atraso**: Empréstimo cuja data de devolução prevista já passou
- **FIFO**: First In, First Out (primeiro a entrar, primeiro a sair)
- **JWT**: JSON Web Token (padrão de autenticação)

---

**Documento criado para:** LibShow - Sistema de Gerenciamento de Biblioteca  
**Data:** Novembro 2024  
**Disciplina:** Engenharia de Software 2 - PUC Minas
