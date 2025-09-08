<h1 align="center">
   📚 LibShow
</h1>

<p align="center">
  <img alt="Spring Boot Badge" src="https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
  <img alt="React Badge" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img alt="SQL Badge" src="https://img.shields.io/badge/SQL-336791?style=for-the-badge&logo=postgresql&logoColor=white">
</p>

O **LibShow** é um sistema de gerenciamento de biblioteca acadêmica desenvolvido para facilitar o **empréstimo de livros, controle de usuários e visualização de acervo**.  
Ele foi criado como parte da disciplina de **Engenharia de Software 2** no curso de Ciência da Computação da PUC Minas.

---

##  Funcionalidades
- Cadastro e autenticação de usuários
- Registro e controle de empréstimos
- Consulta ao acervo disponível
- Painel administrativo para gestão
- Ver livros já emprestados

---

##  Tecnologias Utilizadas

- **Spring Boot** para o backend (API REST)  
- **React** para o frontend (UI/UX)  
- **PostgreSQL** para persistência de dados  

---

##  Como Rodar o Projeto

> [!WARNING]  
> Certifique-se de ter **Java 17+, Node.js (LTS)** e **PostgreSQL** instalados.

### Backend (Spring Boot)

```bash
cd backend
./mvnw spring-boot:run
```

### Frontend (React)

```bash
cd frontend
npm install
npm start
```

---

##  Banco de Dados

> [!TIP]  
> Configure o arquivo `application.properties` no backend com as credenciais do seu banco PostgreSQL:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/libshow
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
```

---

##  Integrantes

- [André Luís Silva de Paula](https://github.com/andreeluis)  
- [Breno Pires Santos](https://github.com/brenodft)  
- [Caio Faria Diniz](https://github.com/CaioFD)  
- [Giuseppe Sena Cordeiro](https://github.com/giusfds)  
- [Vinícius Miranda de Araújo](https://github.com/vinimiraa)


---

##  Licença
Este projeto é distribuído sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
