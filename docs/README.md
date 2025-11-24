# 📚 Documentação do LibShow

Esta pasta contém toda a documentação técnica e acadêmica do projeto LibShow.

## 📂 Estrutura Organizada

```
docs/
├── README.md                    # Este arquivo
│
├── 📊 apresentacao/            # Apresentação do projeto
│   ├── APRESENTACAO.md         # Slides em Markdown
│   └── apresentacao.tex        # Slides em LaTeX (Beamer)
│
├── 🏗️ projeto/                 # Documentação do projeto
│   ├── ARQUITETURA.md          # Arquitetura do sistema
│   ├── DATABASE.md             # Schema e queries do banco
│   └── USER_STORIES.md         # User Stories detalhadas
│
├── 🔧 desenvolvimento/         # CI/CD e DevOps
│   ├── CI_CD.md                # Pipeline de CI/CD
│   └── README_CICD.md          # Guia de CI/CD
│
└── 📖 guias/                   # Guias práticos
    ├── QUICKSTART.md           # Início rápido
    ├── VIDEO_ROTEIRO.md        # Roteiro para vídeo demo
    ├── LATEX_INSTRUCOES.md     # Como compilar LaTeX
    └── CHECKLIST_ENTREGA.md    # Checklist de entrega
```

---

## 📊 Apresentação

### [APRESENTACAO.md](./apresentacao/APRESENTACAO.md)

Slides completos da apresentação final do projeto em formato Markdown.

### [apresentacao.tex](./apresentacao/apresentacao.tex)

Versão LaTeX (Beamer) dos slides para gerar PDF profissional.

**Como compilar:**

```bash
cd apresentacao
pdflatex apresentacao.tex
```

---

## 🏗️ Projeto

### [ARQUITETURA.md](./projeto/ARQUITETURA.md)

Documentação completa da arquitetura do sistema:

- Diagrama de arquitetura em 3 camadas
- Padrões de design utilizados
- Decisões técnicas e justificativas
- Stack tecnológica detalhada

### [DATABASE.md](./projeto/DATABASE.md)

Documentação do banco de dados:

- Schema completo (DDL)
- Relacionamentos entre tabelas
- Scripts SQL de criação
- Queries de exemplo
- Dados de teste (DML)

### [USER_STORIES.md](./projeto/USER_STORIES.md)

User Stories detalhadas por épico:

- Gestão de Livros
- Controle de Empréstimos
- Sistema de Reservas
- Gerenciamento de Usuários
- Relatórios Administrativos

---

## 🔧 Desenvolvimento

### [CI_CD.md](./desenvolvimento/CI_CD.md)

Pipeline de CI/CD completo:

- GitHub Actions workflows
- Testes automatizados
- Build e deploy
- Qualidade de código

### [README_CICD.md](./desenvolvimento/README_CICD.md)

Guia prático de CI/CD para desenvolvedores.

---

## 📖 Guias

### [QUICKSTART.md](./guias/QUICKSTART.md)

Guia de início rápido para executar o projeto localmente.

### [VIDEO_ROTEIRO.md](./guias/VIDEO_ROTEIRO.md)

Roteiro completo para gravação do vídeo de demonstração.

### [LATEX_INSTRUCOES.md](./guias/LATEX_INSTRUCOES.md)

Instruções para compilar documentos LaTeX do projeto.

### [CHECKLIST_ENTREGA.md](./guias/CHECKLIST_ENTREGA.md)

Checklist de itens obrigatórios para entrega final.

---

## 🚀 Acesso Rápido

| Precisa de...                   | Vá para                                              |
| ------------------------------- | ---------------------------------------------------- |
| Rodar o projeto                 | [QUICKSTART.md](./guias/QUICKSTART.md)               |
| Entender a arquitetura          | [ARQUITETURA.md](./projeto/ARQUITETURA.md)           |
| Ver o schema do banco           | [DATABASE.md](./projeto/DATABASE.md)                 |
| Conhecer as funcionalidades     | [USER_STORIES.md](./projeto/USER_STORIES.md)         |
| Configurar CI/CD                | [CI_CD.md](./desenvolvimento/CI_CD.md)               |
| Gravar vídeo de demonstração    | [VIDEO_ROTEIRO.md](./guias/VIDEO_ROTEIRO.md)         |
| Conferir itens antes da entrega | [CHECKLIST_ENTREGA.md](./guias/CHECKLIST_ENTREGA.md) |

---

## 📝 Notas

- Todos os arquivos estão em formato Markdown (`.md`) para fácil visualização no GitHub
- A apresentação também está disponível em LaTeX para gerar PDF
- Mantenha a documentação atualizada conforme o projeto evolui

---

<p align="center">
  <i>Documentação do projeto LibShow - PUC Minas</i>
</p>
