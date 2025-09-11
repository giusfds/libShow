# Documentação da Aplicação - Sistema de Gestão de Biblioteca

Este documento serve como um guia para entender a arquitetura e a estrutura do projeto.

-----

### **1. Visão Geral do Projeto**

O projeto "libshow" é um sistema de gestão de biblioteca desenvolvido com **Spring Boot**. Ele foi projetado para gerenciar o acervo de livros, usuários, empréstimos e reservas, utilizando um modelo de domínio robusto para encapsular a lógica de negócio e as regras do sistema.

-----

### **2. Tecnologias Utilizadas**

  * **Java 23+**: Linguagem de programação principal.
  * **Spring Boot**: Framework para simplificar a criação de aplicações Java.
  * **Spring Data JPA**: Facilita a interação com o banco de dados.
  * **Hibernate**: Implementação da JPA para o mapeamento objeto-relacional.
  * **Lombok**: Reduz a necessidade de código boilerplate (getters, setters, etc.).
  * **H2 Database**: Banco de dados em memória utilizado para desenvolvimento e testes.

-----

### **3. Estrutura do Projeto**

O projeto segue a estrutura padrão de uma aplicação Spring Boot, com a separação de responsabilidades em pacotes:

  * `com.example.libshow.model`: Contém as classes de entidade (`Categoria`, `Emprestimo`, `Livro`, `Reserva`, `Usuario`) que representam as tabelas do banco de dados e a lógica de negócio do domínio.
  * `com.example.libshow.repository`: Interfaces que estendem `JpaRepository`, permitindo a interação direta com o banco de dados.
  * `com.example.libshow.service`: Contém a lógica de negócio principal, que coordena as operações entre os repositórios e os controladores.
  * `com.example.libshow.controller`: Lida com as requisições HTTP e a comunicação com a camada de serviço.

-----

### **4. Padrões de Projeto Aplicados**

Nesta aplicação, foram utilizados dois padrões de projeto fundamentais para a camada de persistência e domínio.

#### **a. Domain Model (Modelo de Domínio)**

  * **Descrição:** Este padrão foca em colocar a lógica de negócio dentro das próprias classes de entidade. Em vez de serem apenas estruturas de dados passivas, as entidades possuem comportamentos e métodos que operam em seus próprios atributos.
  * **Trecho do Código:** O padrão é visível nos métodos de negócio das entidades, como `Livro.emprestarLivro()` e `Emprestimo.verificarAtraso()`.
    ```java
    // Exemplo na classe Livro
    public boolean emprestarLivro() {
        if (this.status == StatusLivro.DISPONIVEL) {
            this.status = StatusLivro.EMPRESTADO;
            return true;
        }
        return false;
    }
    ```
  * **Benefícios:**
      * **Coesão:** Centraliza a lógica em um único lugar, tornando o código mais fácil de entender e manter.
      * **Clareza:** O código se torna mais legível, pois os comportamentos estão associados diretamente aos dados que eles manipulam.

#### **b. Repository (Repositório)**

  * **Descrição:** O padrão Repository separa a lógica de acesso a dados da lógica de negócio. Ele atua como uma coleção de objetos do domínio em memória. Com o **Spring Data JPA**, este padrão é implementado automaticamente ao criar interfaces que estendem `JpaRepository`.
  * **Trecho do Código:** O padrão se manifesta em interfaces como `LivroRepository`, que o Spring Data implementa em tempo de execução.
    ```java
    // Exemplo da interface LivroRepository
    import org.springframework.data.jpa.repository.JpaRepository;
    public interface LivroRepository extends JpaRepository<Livro, Long> {
        // Métodos de consulta personalizados podem ser adicionados aqui
    }
    ```
  * **Benefícios:**
      * **Desacoplamento:** A lógica de negócio não se preocupa com os detalhes técnicos de como os dados são salvos (se é em H2, PostgreSQL, etc.), pois o repositório abstrai essa complexidade.
      * **Redução de Código:** O Spring Data JPA fornece métodos CRUD (Create, Read, Update, Delete) prontos para usar, eliminando a necessidade de escrever código repetitivo.
      * **Testabilidade:** Permite testar a lógica de negócio de forma isolada, "mockando" (simulando) o comportamento do repositório.

-----

### **5. Como Rodar a Aplicação**

1.  **Pré-requisitos:** Certifique-se de ter o **Java 17** ou superior e uma IDE como o **IntelliJ IDEA** ou **VS Code** com suporte a Spring.
2.  **Clonar o Repositório:** Clone este projeto para o seu ambiente local.
3.  **Configurar o Banco de Dados:** O H2 está configurado por padrão. A URL de conexão no arquivo `application.properties` é `jdbc:h2:~/test`. O banco de dados será criado automaticamente no diretório do seu usuário.
4.  **Executar a Aplicação:**
      * Abra o projeto em sua IDE.
      * Encontre a classe principal (geralmente `LibshowApplication.java`) e execute-a como uma aplicação Spring Boot.
5.  **Acessar o H2 Console:**
      * Após a aplicação iniciar, o console do H2 estará disponível em `http://localhost:8080/h2-console`.
      * Use a seguinte configuração para se conectar:
          * **Driver Class:** `org.h2.Driver`
          * **JDBC URL:** `jdbc:h2:~/test`
          * **User Name:** `show`
          * **Password:** (deixe em branco)
          * Clique em **"Connect"**.