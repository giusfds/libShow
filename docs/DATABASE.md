# 🗄️ Database Schema - LibShow

## Visão Geral

O LibShow utiliza um banco de dados relacional para persistir informações sobre usuários, livros, empréstimos e reservas.

**Banco de Dados:**

- **Desenvolvimento**: H2 (embedded)
- **Produção** (sugerido): PostgreSQL

---

## Schema Diagram (ER)

```
┌─────────────────────────────────────────────────────────────┐
│                       DATABASE SCHEMA                        │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────┐
│      USUARIOS        │
├──────────────────────┤
│ id (PK)             │ BIGINT AUTO_INCREMENT
│ nome                │ VARCHAR(100) NOT NULL
│ email               │ VARCHAR(100) UNIQUE NOT NULL
│ senha               │ VARCHAR(255) NOT NULL (BCrypt)
│ cpf                 │ VARCHAR(14) UNIQUE NOT NULL
│ tipo                │ VARCHAR(20) NOT NULL
│                     │ CHECK (tipo IN ('ALUNO','BIBLIOTECARIO','ADMIN'))
└──────────┬───────────┘
           │
           │ 1
           │
           │ *
┌──────────▼───────────────────┐         ┌──────────────────────┐
│       EMPRESTIMOS            │         │       LIVROS         │
├──────────────────────────────┤         ├──────────────────────┤
│ id (PK)                     │◄───┐    │ id (PK)             │ BIGINT AUTO_INCREMENT
│ usuario_id (FK)             │    │    │ titulo              │ VARCHAR(200) NOT NULL
│ livro_id (FK)               │────┘    │ autor               │ VARCHAR(150) NOT NULL
│ data_emprestimo             │         │ isbn                │ VARCHAR(20) UNIQUE NOT NULL
│ data_devolucao_prevista     │         │ ano_publicacao      │ INT
│ data_devolucao_real         │         │ editora             │ VARCHAR(100)
│ devolvido                   │         │ quantidade_total    │ INT NOT NULL
│                             │         │ quantidade_disp     │ INT NOT NULL
└──────────────────────────────┘         │                     │
           │                              │ CHECK (quantidade_disp >= 0)
           │ 1                            │ CHECK (quantidade_disp <= quantidade_total)
           │                              └──────────┬───────────┘
           │ *                                       │
┌──────────▼───────────────────┐                    │ 1
│        RESERVAS              │                    │
├──────────────────────────────┤                    │ *
│ id (PK)                     │◄───────────────────┘
│ usuario_id (FK)             │
│ livro_id (FK)               │
│ data_reserva                │ TIMESTAMP
│ status                      │ VARCHAR(20)
│                             │ CHECK (status IN ('ATIVA','CANCELADA','ATENDIDA'))
└──────────────────────────────┘

```

---

## DDL - Data Definition Language

### Tabela: USUARIOS

```sql
CREATE TABLE usuarios (
    id                  BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome                VARCHAR(100) NOT NULL,
    email               VARCHAR(100) NOT NULL UNIQUE,
    senha               VARCHAR(255) NOT NULL,
    cpf                 VARCHAR(14) NOT NULL UNIQUE,
    tipo                VARCHAR(20) NOT NULL,

    CONSTRAINT chk_tipo CHECK (tipo IN ('ALUNO', 'BIBLIOTECARIO', 'ADMIN'))
);

CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_usuarios_cpf ON usuarios(cpf);
```

**Descrição dos Campos:**

| Campo | Tipo         | Descrição                             |
| ----- | ------------ | ------------------------------------- |
| id    | BIGINT       | Chave primária, auto-incremento       |
| nome  | VARCHAR(100) | Nome completo do usuário              |
| email | VARCHAR(100) | Email único para login                |
| senha | VARCHAR(255) | Hash BCrypt da senha                  |
| cpf   | VARCHAR(14)  | CPF único no formato 000.000.000-00   |
| tipo  | VARCHAR(20)  | Perfil: ALUNO, BIBLIOTECARIO ou ADMIN |

---

### Tabela: LIVROS

```sql
CREATE TABLE livros (
    id                      BIGINT AUTO_INCREMENT PRIMARY KEY,
    titulo                  VARCHAR(200) NOT NULL,
    autor                   VARCHAR(150) NOT NULL,
    isbn                    VARCHAR(20) NOT NULL UNIQUE,
    ano_publicacao          INT,
    editora                 VARCHAR(100),
    quantidade_total        INT NOT NULL,
    quantidade_disponivel   INT NOT NULL,

    CONSTRAINT chk_quantidade_disponivel CHECK (quantidade_disponivel >= 0),
    CONSTRAINT chk_quantidade_total CHECK (quantidade_total > 0),
    CONSTRAINT chk_quantidade_coerencia CHECK (quantidade_disponivel <= quantidade_total)
);

CREATE INDEX idx_livros_titulo ON livros(titulo);
CREATE INDEX idx_livros_autor ON livros(autor);
CREATE INDEX idx_livros_isbn ON livros(isbn);
CREATE INDEX idx_livros_disponibilidade ON livros(quantidade_disponivel);
```

**Descrição dos Campos:**

| Campo                 | Tipo         | Descrição                                       |
| --------------------- | ------------ | ----------------------------------------------- |
| id                    | BIGINT       | Chave primária, auto-incremento                 |
| titulo                | VARCHAR(200) | Título do livro                                 |
| autor                 | VARCHAR(150) | Nome do autor                                   |
| isbn                  | VARCHAR(20)  | ISBN único (International Standard Book Number) |
| ano_publicacao        | INT          | Ano de publicação                               |
| editora               | VARCHAR(100) | Nome da editora                                 |
| quantidade_total      | INT          | Total de exemplares no acervo                   |
| quantidade_disponivel | INT          | Exemplares disponíveis para empréstimo          |

---

### Tabela: EMPRESTIMOS

```sql
CREATE TABLE emprestimos (
    id                          BIGINT AUTO_INCREMENT PRIMARY KEY,
    usuario_id                  BIGINT NOT NULL,
    livro_id                    BIGINT NOT NULL,
    data_emprestimo             DATE NOT NULL,
    data_devolucao_prevista     DATE NOT NULL,
    data_devolucao_real         DATE,
    devolvido                   BOOLEAN NOT NULL DEFAULT FALSE,

    CONSTRAINT fk_emprestimos_usuario FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id) ON DELETE RESTRICT,
    CONSTRAINT fk_emprestimos_livro FOREIGN KEY (livro_id)
        REFERENCES livros(id) ON DELETE RESTRICT
);

CREATE INDEX idx_emprestimos_usuario ON emprestimos(usuario_id);
CREATE INDEX idx_emprestimos_livro ON emprestimos(livro_id);
CREATE INDEX idx_emprestimos_devolvido ON emprestimos(devolvido);
CREATE INDEX idx_emprestimos_data_devolucao ON emprestimos(data_devolucao_prevista);
```

**Descrição dos Campos:**

| Campo                   | Tipo    | Descrição                                       |
| ----------------------- | ------- | ----------------------------------------------- |
| id                      | BIGINT  | Chave primária, auto-incremento                 |
| usuario_id              | BIGINT  | FK para tabela usuarios                         |
| livro_id                | BIGINT  | FK para tabela livros                           |
| data_emprestimo         | DATE    | Data do empréstimo                              |
| data_devolucao_prevista | DATE    | Data prevista para devolução (padrão: +14 dias) |
| data_devolucao_real     | DATE    | Data real da devolução (NULL se não devolvido)  |
| devolvido               | BOOLEAN | Flag indicando se foi devolvido                 |

---

### Tabela: RESERVAS

```sql
CREATE TABLE reservas (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    usuario_id      BIGINT NOT NULL,
    livro_id        BIGINT NOT NULL,
    data_reserva    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status          VARCHAR(20) NOT NULL DEFAULT 'ATIVA',

    CONSTRAINT fk_reservas_usuario FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id) ON DELETE RESTRICT,
    CONSTRAINT fk_reservas_livro FOREIGN KEY (livro_id)
        REFERENCES livros(id) ON DELETE RESTRICT,
    CONSTRAINT chk_status CHECK (status IN ('ATIVA', 'CANCELADA', 'ATENDIDA'))
);

CREATE INDEX idx_reservas_usuario ON reservas(usuario_id);
CREATE INDEX idx_reservas_livro ON reservas(livro_id);
CREATE INDEX idx_reservas_status ON reservas(status);
CREATE INDEX idx_reservas_data ON reservas(data_reserva);
```

**Descrição dos Campos:**

| Campo        | Tipo        | Descrição                            |
| ------------ | ----------- | ------------------------------------ |
| id           | BIGINT      | Chave primária, auto-incremento      |
| usuario_id   | BIGINT      | FK para tabela usuarios              |
| livro_id     | BIGINT      | FK para tabela livros                |
| data_reserva | TIMESTAMP   | Data e hora da reserva               |
| status       | VARCHAR(20) | Status: ATIVA, CANCELADA ou ATENDIDA |

---

## DML - Data Manipulation Language (Dados de Exemplo)

### Inserir Usuários

```sql
-- Senha: "senha123" (BCrypt hash)
INSERT INTO usuarios (nome, email, senha, cpf, tipo) VALUES
('João Silva', 'joao.silva@puc.br', '$2a$10$YgU8WL.h3lXhJDZLk9ZZRO6mhGzf.g4kVYvO/9xOZN5K8EwXZRuWu', '111.111.111-11', 'ALUNO'),
('Maria Santos', 'maria.santos@puc.br', '$2a$10$YgU8WL.h3lXhJDZLk9ZZRO6mhGzf.g4kVYvO/9xOZN5K8EwXZRuWu', '222.222.222-22', 'ALUNO'),
('Carlos Oliveira', 'carlos.oliveira@puc.br', '$2a$10$YgU8WL.h3lXhJDZLk9ZZRO6mhGzf.g4kVYvO/9xOZN5K8EwXZRuWu', '333.333.333-33', 'BIBLIOTECARIO'),
('Ana Paula', 'ana.paula@puc.br', '$2a$10$YgU8WL.h3lXhJDZLk9ZZRO6mhGzf.g4kVYvO/9xOZN5K8EwXZRuWu', '444.444.444-44', 'ADMIN');
```

---

### Inserir Livros

```sql
INSERT INTO livros (titulo, autor, isbn, ano_publicacao, editora, quantidade_total, quantidade_disponivel) VALUES
('Clean Code', 'Robert C. Martin', '978-0132350884', 2008, 'Prentice Hall', 5, 3),
('Design Patterns', 'Erich Gamma', '978-0201633610', 1994, 'Addison-Wesley', 3, 1),
('Refactoring', 'Martin Fowler', '978-0134757599', 2018, 'Addison-Wesley', 4, 4),
('Domain-Driven Design', 'Eric Evans', '978-0321125217', 2003, 'Addison-Wesley', 2, 0),
('The Pragmatic Programmer', 'David Thomas', '978-0135957059', 2019, 'Addison-Wesley', 6, 5),
('Introduction to Algorithms', 'Thomas H. Cormen', '978-0262033848', 2009, 'MIT Press', 4, 2),
('Code Complete', 'Steve McConnell', '978-0735619678', 2004, 'Microsoft Press', 3, 3),
('Test Driven Development', 'Kent Beck', '978-0321146533', 2002, 'Addison-Wesley', 2, 1),
('Patterns of Enterprise Application', 'Martin Fowler', '978-0321127426', 2002, 'Addison-Wesley', 3, 2),
('Working Effectively with Legacy Code', 'Michael Feathers', '978-0131177055', 2004, 'Prentice Hall', 2, 1);
```

---

### Inserir Empréstimos

```sql
INSERT INTO emprestimos (usuario_id, livro_id, data_emprestimo, data_devolucao_prevista, data_devolucao_real, devolvido) VALUES
-- João Silva emprestou Clean Code (ainda não devolveu)
(1, 1, '2024-11-10', '2024-11-24', NULL, FALSE),

-- Maria Santos emprestou Design Patterns (já devolveu)
(2, 2, '2024-11-05', '2024-11-19', '2024-11-18', TRUE),

-- João Silva emprestou Introduction to Algorithms (ainda não devolveu)
(1, 6, '2024-11-15', '2024-11-29', NULL, FALSE);
```

---

### Inserir Reservas

```sql
INSERT INTO reservas (usuario_id, livro_id, data_reserva, status) VALUES
-- Maria Santos reservou Domain-Driven Design (indisponível)
(2, 4, '2024-11-20 10:30:00', 'ATIVA'),

-- João Silva também reservou Domain-Driven Design
(1, 4, '2024-11-21 14:15:00', 'ATIVA');
```

---

## Queries Úteis

### Listar livros disponíveis

```sql
SELECT titulo, autor, quantidade_disponivel
FROM livros
WHERE quantidade_disponivel > 0
ORDER BY titulo;
```

---

### Listar empréstimos ativos

```sql
SELECT
    u.nome AS usuario,
    l.titulo AS livro,
    e.data_emprestimo,
    e.data_devolucao_prevista,
    DATEDIFF(CURRENT_DATE, e.data_devolucao_prevista) AS dias_atraso
FROM emprestimos e
JOIN usuarios u ON e.usuario_id = u.id
JOIN livros l ON e.livro_id = l.id
WHERE e.devolvido = FALSE
ORDER BY e.data_devolucao_prevista;
```

---

### Listar empréstimos atrasados

```sql
SELECT
    u.nome AS usuario,
    l.titulo AS livro,
    e.data_devolucao_prevista,
    DATEDIFF(CURRENT_DATE, e.data_devolucao_prevista) AS dias_atraso
FROM emprestimos e
JOIN usuarios u ON e.usuario_id = u.id
JOIN livros l ON e.livro_id = l.id
WHERE e.devolvido = FALSE
  AND e.data_devolucao_prevista < CURRENT_DATE
ORDER BY dias_atraso DESC;
```

---

### Livros mais emprestados

```sql
SELECT
    l.titulo,
    l.autor,
    COUNT(e.id) AS total_emprestimos
FROM livros l
LEFT JOIN emprestimos e ON l.id = e.livro_id
GROUP BY l.id, l.titulo, l.autor
ORDER BY total_emprestimos DESC
LIMIT 10;
```

---

### Fila de reservas de um livro

```sql
SELECT
    r.id,
    u.nome AS usuario,
    r.data_reserva,
    r.status,
    ROW_NUMBER() OVER (ORDER BY r.data_reserva) AS posicao_fila
FROM reservas r
JOIN usuarios u ON r.usuario_id = u.id
WHERE r.livro_id = 4  -- Domain-Driven Design
  AND r.status = 'ATIVA'
ORDER BY r.data_reserva;
```

---

### Histórico de empréstimos de um usuário

```sql
SELECT
    l.titulo,
    e.data_emprestimo,
    e.data_devolucao_prevista,
    e.data_devolucao_real,
    CASE
        WHEN e.devolvido THEN 'DEVOLVIDO'
        WHEN e.data_devolucao_prevista < CURRENT_DATE THEN 'ATRASADO'
        ELSE 'ATIVO'
    END AS status
FROM emprestimos e
JOIN livros l ON e.livro_id = l.id
WHERE e.usuario_id = 1  -- João Silva
ORDER BY e.data_emprestimo DESC;
```

---

### Estatísticas gerais do sistema

```sql
SELECT
    (SELECT COUNT(*) FROM livros) AS total_livros,
    (SELECT SUM(quantidade_total) FROM livros) AS total_exemplares,
    (SELECT SUM(quantidade_disponivel) FROM livros) AS exemplares_disponiveis,
    (SELECT COUNT(*) FROM usuarios WHERE tipo = 'ALUNO') AS total_alunos,
    (SELECT COUNT(*) FROM emprestimos WHERE devolvido = FALSE) AS emprestimos_ativos,
    (SELECT COUNT(*) FROM reservas WHERE status = 'ATIVA') AS reservas_ativas;
```

---

## Triggers e Procedures (Opcional - Futuro)

### Trigger: Atualizar quantidade disponível após empréstimo

```sql
CREATE TRIGGER trg_after_insert_emprestimo
AFTER INSERT ON emprestimos
FOR EACH ROW
BEGIN
    UPDATE livros
    SET quantidade_disponivel = quantidade_disponivel - 1
    WHERE id = NEW.livro_id;
END;
```

---

### Trigger: Atualizar quantidade disponível após devolução

```sql
CREATE TRIGGER trg_after_update_emprestimo
AFTER UPDATE ON emprestimos
FOR EACH ROW
BEGIN
    IF NEW.devolvido = TRUE AND OLD.devolvido = FALSE THEN
        UPDATE livros
        SET quantidade_disponivel = quantidade_disponivel + 1
        WHERE id = NEW.livro_id;
    END IF;
END;
```

---

### Stored Procedure: Processar Reserva

```sql
CREATE PROCEDURE processar_reserva(
    IN p_livro_id BIGINT,
    IN p_usuario_id BIGINT
)
BEGIN
    DECLARE v_primeira_reserva_id BIGINT;

    -- Buscar primeira reserva ativa (FIFO)
    SELECT id INTO v_primeira_reserva_id
    FROM reservas
    WHERE livro_id = p_livro_id
      AND status = 'ATIVA'
    ORDER BY data_reserva ASC
    LIMIT 1;

    -- Atualizar status para ATENDIDA
    UPDATE reservas
    SET status = 'ATENDIDA'
    WHERE id = v_primeira_reserva_id;

    -- Criar empréstimo para o usuário
    INSERT INTO emprestimos (
        usuario_id,
        livro_id,
        data_emprestimo,
        data_devolucao_prevista,
        devolvido
    ) VALUES (
        p_usuario_id,
        p_livro_id,
        CURRENT_DATE,
        DATE_ADD(CURRENT_DATE, INTERVAL 14 DAY),
        FALSE
    );
END;
```

---

## Configuração H2 (application.properties)

```properties
spring.application.name=libshow

# DATASOURCE
spring.datasource.url=jdbc:h2:file:./data/db;IFEXISTS=FALSE
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=show
spring.datasource.password=1234

# H2 Console
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# SQL
spring.jpa.show-sql=true

# JPA
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=update
```

**Acesso ao H2 Console:**

- URL: http://localhost:8080/h2-console
- JDBC URL: jdbc:h2:file:./data/db
- Username: show
- Password: 1234

---

## Migration para PostgreSQL (Produção)

### Configuração PostgreSQL (application-prod.properties)

```properties
spring.application.name=libshow

# DATASOURCE PostgreSQL
spring.datasource.url=jdbc:postgresql://localhost:5432/libshow_db
spring.datasource.username=postgres
spring.datasource.password=postgres
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false

# Flyway (migrations)
spring.flyway.enabled=true
spring.flyway.locations=classpath:db/migration
```

### Dependência PostgreSQL (pom.xml)

```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

---

## Índices para Performance

```sql
-- Índices principais já criados nas definições DDL acima
-- Índices adicionais para queries complexas:

-- Index para buscar empréstimos por período
CREATE INDEX idx_emprestimos_periodo
ON emprestimos(data_emprestimo, data_devolucao_prevista);

-- Index composto para relatórios
CREATE INDEX idx_emprestimos_usuario_devolvido
ON emprestimos(usuario_id, devolvido);

-- Index para fila de reservas
CREATE INDEX idx_reservas_livro_status_data
ON reservas(livro_id, status, data_reserva);
```

---

## Backup e Restore

### Backup H2

```bash
# Exportar dados
java -cp h2*.jar org.h2.tools.Script \
  -url jdbc:h2:file:./data/db \
  -user show \
  -password 1234 \
  -script backup.sql
```

### Restore H2

```bash
# Importar dados
java -cp h2*.jar org.h2.tools.RunScript \
  -url jdbc:h2:file:./data/db \
  -user show \
  -password 1234 \
  -script backup.sql
```

---

**Documento criado para:** LibShow - Sistema de Gerenciamento de Biblioteca  
**Data:** Novembro 2024  
**Disciplina:** Engenharia de Software 2 - PUC Minas
