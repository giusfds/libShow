# LibShow - Backend

Como compilar e rodar
--------------------
1. Construir o projeto com Maven:
   mvn clean install

2. Rodar a aplicação:
   mvn spring-boot:run

3. A aplicação estará disponível em:
   http://localhost:8080

Estrutura do projeto
-------------------
src/main/java/com/example/libshow
  ├─ model      -> Entidades JPA (Livro, Categoria, Usuário, etc.)
  ├─ repository -> Interfaces JpaRepository para persistência
  ├─ service    -> Regras de negócio
  ├─ controller -> Endpoints REST

src/main/resources
  ├─ application.properties -> Configurações do Spring Boot
  └─ data.sql / schema.sql  -> Scripts opcionais de banco

Dependências principais
----------------------
- spring-boot-starter
- spring-boot-starter-web
- spring-boot-starter-data-jpa
- h2database
- spring-boot-starter-test