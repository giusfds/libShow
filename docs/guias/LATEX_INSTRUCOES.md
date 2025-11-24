# 📊 Apresentação LaTeX Beamer - LibShow

## Arquivo Criado

**apresentacao.tex** - Apresentação completa em formato Beamer (LaTeX)

---

## 📋 Requisitos para Compilação

### Distribuição LaTeX

Você precisa ter uma distribuição LaTeX instalada:

**macOS:**

```bash
brew install --cask mactex
# ou a versão menor
brew install --cask basictex
```

**Linux (Ubuntu/Debian):**

```bash
sudo apt-get install texlive-full
```

**Windows:**

- Baixe e instale [MiKTeX](https://miktex.org/) ou [TeX Live](https://www.tug.org/texlive/)

### Pacotes LaTeX Necessários

Os seguintes pacotes são utilizados (geralmente já incluídos no texlive-full):

- beamer
- inputenc
- babel
- graphicx
- listings
- xcolor
- tikz
- fontawesome5

---

## 🚀 Como Compilar

### Método 1: Linha de Comando (Recomendado)

```bash
# Navegar para o diretório do projeto
cd /Users/giuseppesena/git/libshow

# Compilar (executar 2x para gerar índices e referências)
pdflatex apresentacao.tex
pdflatex apresentacao.tex

# Limpar arquivos auxiliares (opcional)
rm apresentacao.aux apresentacao.log apresentacao.nav apresentacao.out apresentacao.snm apresentacao.toc
```

### Método 2: Usando latexmk (Automático)

```bash
# Instalar latexmk se necessário
brew install latexmk  # macOS
sudo apt-get install latexmk  # Linux

# Compilar automaticamente
latexmk -pdf apresentacao.tex

# Limpar arquivos auxiliares
latexmk -c
```

### Método 3: Overleaf (Online)

1. Acesse [Overleaf](https://www.overleaf.com)
2. Crie novo projeto → Upload Project
3. Faça upload do arquivo `apresentacao.tex`
4. Compile online (sem instalação local)

### Método 4: VS Code com LaTeX Workshop

```bash
# Instalar extensão LaTeX Workshop no VS Code
# Abrir apresentacao.tex
# Pressionar Ctrl+Alt+B (ou Cmd+Option+B no Mac)
```

---

## 📝 Estrutura da Apresentação

A apresentação contém **~25 slides** organizados em:

### Seções Principais:

1. **Introdução e Objetivo** (3 slides)

   - Contexto do problema
   - Motivação
   - Público-alvo

2. **Requisitos e Modelagem** (3 slides)

   - User stories principais
   - Diagrama de casos de uso
   - Diagrama de classes

3. **Arquitetura do Sistema** (3 slides)

   - Arquitetura em 3 camadas
   - Padrões de design
   - Justificativa das escolhas

4. **Implementação** (4 slides)

   - Stack tecnológica
   - Exemplos de código (Controller, Service)
   - Fluxo de chamadas

5. **Testes e Qualidade** (3 slides)

   - Estratégia de testes
   - Exemplo de teste unitário
   - Ferramentas de qualidade

6. **Demonstração** (2 slides)

   - Vídeo de demonstração
   - Funcionalidades demonstradas

7. **Conclusões** (4 slides)

   - Aprendizados
   - Desafios enfrentados
   - Melhorias futuras
   - O que faríamos diferente

8. **Resumo e Agradecimentos** (2 slides)

---

## 🎨 Personalização

### Alterar Tema e Cores

No início do arquivo `apresentacao.tex`, você pode mudar:

```latex
% Temas disponíveis: Madrid, Berlin, Copenhagen, Warsaw, etc.
\usetheme{Madrid}

% Cores disponíveis: default, beaver, beetle, crane, dove, etc.
\usecolortheme{default}
```

### Adicionar Logo da Instituição

1. Adicione o arquivo de logo (ex: `logo.png`) na mesma pasta
2. Descomente a linha no arquivo:

```latex
\logo{\includegraphics[height=0.8cm]{logo.png}}
```

### Adicionar Imagens

Para os diagramas, você pode:

1. **Criar imagens** dos diagramas e salvá-las como PNG/PDF
2. **Usar TikZ** (já incluído) para desenhar diagramas diretamente no LaTeX
3. **Gerar screenshots** da aplicação

Exemplo para adicionar imagem:

```latex
\begin{frame}{Título}
\begin{center}
\includegraphics[width=0.8\textwidth]{caminho/para/imagem.png}
\end{center}
\end{frame}
```

---

## ✏️ Editando o Conteúdo

### Informações a Personalizar:

1. **Slide de Título (linha ~33-36):**

```latex
\title{LibShow}
\subtitle{Sistema de Gerenciamento de Biblioteca Acadêmica}
\author{[Nomes dos Integrantes]}  % ← EDITAR AQUI
\institute{PUC Minas - Ciência da Computação\\
           Engenharia de Software 2}
\date{Novembro 2024}
```

2. **Link do Vídeo (vários slides):**
   Procure por `[Link do vídeo será adicionado]` e substitua

3. **Emails de Contato (slide final):**

```latex
\faEnvelope & \textit{[emails dos integrantes]} % ← EDITAR AQUI
```

---

## 🖼️ Imagens Recomendadas para Criar

Para melhorar a apresentação, crie as seguintes imagens:

1. **use_cases.png** - Diagrama de casos de uso (pode ser screenshot do APRESENTACAO.md)
2. **logo.png** - Logo da PUC Minas ou do projeto
3. **screenshots/** - Capturas de tela da aplicação:
   - Login
   - Dashboard
   - Lista de livros
   - Formulário de empréstimo
   - Relatórios

---

## 📦 Arquivos Gerados

Após compilação, serão criados:

- ✅ **apresentacao.pdf** - Arquivo final da apresentação
- 📄 apresentacao.aux - Arquivo auxiliar
- 📄 apresentacao.log - Log de compilação
- 📄 apresentacao.nav - Navegação
- 📄 apresentacao.out - Outline
- 📄 apresentacao.snm - Snippets
- 📄 apresentacao.toc - Tabela de conteúdos

**Importante:** Apenas `apresentacao.pdf` precisa ser mantido. Os demais podem ser deletados.

---

## 🎯 Dicas para Apresentação

### Durante a Apresentação:

1. **Modo Apresentação:** Use o leitor PDF em tela cheia
2. **Notas:** Adicione notas de apresentação se necessário
3. **Animações:** Beamer suporta `\pause` para revelar conteúdo gradualmente
4. **Tempo:** A apresentação está planejada para 5-8 minutos

### Adicionar Animações (Opcional):

```latex
\begin{frame}{Título}
\begin{itemize}
    \item Primeiro item \pause
    \item Segundo item \pause
    \item Terceiro item
\end{itemize}
\end{frame}
```

---

## 🔧 Solução de Problemas

### Erro: "Package fontawesome5 not found"

```bash
# Instalar pacote manualmente
sudo tlmgr install fontawesome5
```

### Erro: "PdfLaTeX command not found"

Certifique-se de que o PATH está configurado:

```bash
# macOS
export PATH="/Library/TeX/texbin:$PATH"

# Linux
export PATH="/usr/local/texlive/2024/bin/x86_64-linux:$PATH"
```

### Caracteres Especiais não Aparecem

Certifique-se de que o arquivo está salvo com encoding UTF-8

### Compilação Lenta

Use `pdflatex -interaction=nonstopmode` para compilação mais rápida

---

## 📚 Recursos Adicionais

### Documentação Beamer:

- [Beamer User Guide](https://ctan.org/pkg/beamer)
- [Beamer Themes Gallery](https://deic.uab.cat/~iblanes/beamer_gallery/)

### Templates Alternativos:

- [Overleaf Beamer Templates](https://www.overleaf.com/latex/templates/tagged/presentation)

### TikZ para Diagramas:

- [TikZ Examples](https://texample.net/tikz/examples/)
- [TikZ Manual](https://ctan.org/pkg/pgf)

---

## ✅ Checklist Final

Antes de usar a apresentação:

- [ ] Compilar sem erros
- [ ] Adicionar nomes dos integrantes
- [ ] Adicionar link do vídeo
- [ ] Adicionar emails de contato
- [ ] Adicionar logo (opcional)
- [ ] Criar/adicionar imagens dos diagramas
- [ ] Revisar ortografia
- [ ] Testar em tela cheia
- [ ] Cronometrar apresentação (5-8 min)
- [ ] Fazer backup do PDF final

---

## 🎓 Resultado Final

Ao compilar, você terá uma apresentação profissional em PDF com:

- ✅ ~25 slides bem estruturados
- ✅ Design moderno (tema Madrid)
- ✅ Código formatado e destacado
- ✅ Diagramas em TikZ
- ✅ Ícones FontAwesome
- ✅ Navegação automática
- ✅ Sumário interativo

**Duração estimada:** 5-8 minutos
**Formato:** PDF (compatível com qualquer apresentador)

---

## 📞 Suporte

Se encontrar problemas:

1. Verifique se todos os pacotes LaTeX estão instalados
2. Use Overleaf como alternativa online
3. Consulte logs de compilação (`apresentacao.log`)
4. Teste com exemplo mínimo primeiro

---

**Boa apresentação! 🚀**

_Documento criado para auxiliar na compilação e uso da apresentação LaTeX Beamer._
