# Camada de Domínio - LibShow

- Este módulo contém as classes que compõem a camada de domínio do sistema LibShow. Elas representam as entidades e as regras de negócio centrais da aplicação, baseadas no Diagrama de Domínio do documento de arquitetura.

Classes Principais:

**Usuario**: Gerencia as informações dos usuários do sistema, como alunos, professores, bibliotecários e administradores. A classe armazena dados como ID, nome, matrícula e tipo de usuário.

**Livro**: Representa um item no acervo da biblioteca. Contém atributos como ID, título, autor, ano e status, que indica se o livro está disponível **ou não.

**Emprestimo**: Controla os empréstimos de livros para os usuários. A classe gerencia os dados do empréstimo, incluindo a data de empréstimo, a data de devolução e o status atual.

**Reserva**: Lida com a funcionalidade de reserva de livros. Esta classe armazena o ID da reserva, a data e o status para controlar a disponibilidade do item para um usuário específico.

**Categoria**: Organiza os livros em diferentes categorias, como ficção, não-ficção ou tecnologia.

