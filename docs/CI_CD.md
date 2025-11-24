# 🚀 CI/CD Pipeline - LibShow

## Visão Geral

Este projeto implementa um pipeline completo de **CI/CD** usando **GitHub Actions** para automação de build, testes, análise de qualidade e deploy do sistema LibShow.

---

## 📋 Workflows Implementados

### 1. **Backend CI** (`backend-ci.yml`)
Pipeline de integração contínua para o backend Spring Boot.

**Triggers:**
- Push para `main` ou `develop`
- Pull requests para `main` ou `develop`
- Modificações em arquivos do backend

**Jobs:**
- ✅ **Build and Test**: Compila, executa testes, gera cobertura (JaCoCo)
- 🔒 **Security Scan**: Trivy + OWASP Dependency Check
- 🐳 **Docker Build**: Cria imagem Docker do backend
- 📢 **Notification**: Notifica status do build

**Matriz de Testes:** Java 21

---

### 2. **Frontend CI** (`frontend-ci.yml`)
Pipeline de integração contínua para o frontend React.

**Triggers:**
- Push para `main` ou `develop`
- Pull requests para `main` ou `develop`
- Modificações em arquivos do frontend

**Jobs:**
- ✅ **Build and Test**: Instala dependências, executa lint, testes e build
- 🔍 **Lighthouse**: Análise de performance (apenas em push para main)
- 🐳 **Docker Build**: Cria imagem Docker do frontend
- 📢 **Notification**: Notifica status do build

**Matriz de Testes:** Node.js 18, 20

---

### 3. **Code Quality** (`code-quality.yml`)
Análise detalhada de qualidade de código.

**Triggers:**
- Push para `main` ou `develop`
- Pull requests
- Agendamento semanal (domingos à meia-noite)

**Análises:**

**Backend:**
- SpotBugs (detecção de bugs)
- PMD (análise estática)
- Checkstyle (estilo de código)
- JaCoCo (cobertura de testes)
- SonarCloud (qualidade geral)
- Verificação de dependências desatualizadas

**Frontend:**
- ESLint (linting)
- Prettier (formatação)
- TypeScript compiler check
- Bundle size analysis
- SonarCloud
- Verificação de dependências desatualizadas

**Segurança:**
- Dependency Review (PRs)
- CodeQL Analysis (Java + JavaScript)

---

### 4. **Deploy** (`deploy.yml`)
Pipeline de deploy para staging e produção.

**Triggers:**
- Push para `main` (staging)
- Tags `v*.*.*` (produção)
- Dispatch manual

**Ambientes:**
- 🧪 **Staging**: Deploy automático de commits na main
- 🚀 **Production**: Deploy de tags versionadas

**Jobs:**
1. **Prepare**: Define ambiente e versão
2. **Build Backend**: Constrói e publica imagem Docker
3. **Build Frontend**: Constrói e publica imagem Docker
4. **Deploy Staging/Production**: Deploy nos ambientes
5. **Notify**: Notificações do deploy
6. **Rollback**: Rollback automático em falhas (produção)

---

### 5. **PR Validation** (`pr-validation.yml`)
Validação automática de Pull Requests.

**Verificações:**
- ✅ Título do PR (Conventional Commits)
- 🔀 Detecção de merge conflicts
- 🌿 Validação do nome da branch (`feature/*`, `bugfix/*`, etc.)
- 📏 Tamanho do PR (adiciona labels size/XS até size/XL)
- 📝 Lista de arquivos modificados
- ⚠️ Detecção de arquivos sensíveis (.env, etc.)
- 📋 Validação de mensagens de commit (commitlint)
- 👥 Auto-assign de reviewers

---

## 🐳 Containerização

### Dockerfiles

#### **Backend** (`backend/Dockerfile`)
Multi-stage build para otimização:
1. **Build Stage**: Maven + JDK 21 para compilar
2. **Runtime Stage**: JRE 21 Alpine (imagem leve)

Recursos:
- Non-root user (segurança)
- Health check integrado
- Variáveis de ambiente configuráveis

#### **Frontend** (`frontend/Dockerfile`)
Multi-stage build:
1. **Build Stage**: Node 20 para construir app
2. **Runtime Stage**: Nginx Alpine para servir estático

Recursos:
- Configuração Nginx otimizada
- Compressão Gzip
- Cache headers
- Health check endpoint
- SPA fallback routing

---

### Docker Compose (`docker-compose.yml`)

Orquestração completa da aplicação:

**Serviços Principais:**
- 🗄️ **PostgreSQL**: Banco de dados (porta 5432)
- ☕ **Backend**: Spring Boot (porta 8080)
- ⚛️ **Frontend**: React + Nginx (porta 80)

**Serviços Opcionais (Profiles):**
- 🔐 **Nginx Reverse Proxy**: SSL/TLS (`production`)
- 🔴 **Redis**: Cache de sessões (`cache`)
- 📊 **Prometheus**: Métricas (`monitoring`)
- 📈 **Grafana**: Dashboard (`monitoring`)

**Volumes Persistentes:**
- `postgres_data`: Dados do banco
- `backend_logs`: Logs da aplicação
- `redis_data`: Cache Redis
- `prometheus_data`: Métricas
- `grafana_data`: Dashboards

---

## ⚙️ Configuração

### Secrets Necessários

Configure os seguintes secrets no GitHub:

```bash
# Docker Hub
DOCKER_USERNAME=seu-usuario
DOCKER_PASSWORD=sua-senha

# SonarCloud (opcional)
SONAR_TOKEN=seu-token-sonarcloud

# Ambientes
STAGING_API_URL=https://staging-api.libshow.com
PROD_API_URL=https://api.libshow.com

# Grafana
GRAFANA_PASSWORD=senha-segura
```

### Variáveis de Ambiente

Crie arquivo `.env` para Docker Compose:

```bash
# Database
DB_USER=libshow
DB_PASSWORD=libshow123

# JWT
JWT_SECRET=sua-chave-secreta-jwt-aqui

# Grafana
GRAFANA_PASSWORD=admin
```

---

## 🚀 Como Usar

### Deploy Local com Docker Compose

```bash
# Subir todos os serviços
docker-compose up -d

# Apenas serviços principais
docker-compose up -d postgres backend frontend

# Com cache Redis
docker-compose --profile cache up -d

# Com monitoramento
docker-compose --profile monitoring up -d

# Ver logs
docker-compose logs -f backend

# Parar todos os serviços
docker-compose down

# Limpar volumes (cuidado!)
docker-compose down -v
```

### Acessar Serviços

- 🌐 **Frontend**: http://localhost
- 🔌 **Backend API**: http://localhost:8080
- 💾 **PostgreSQL**: localhost:5432
- 📊 **Prometheus**: http://localhost:9090 (profile monitoring)
- 📈 **Grafana**: http://localhost:3000 (profile monitoring)

---

## 🔄 Fluxo de Trabalho

### Desenvolvimento

```bash
# 1. Criar branch
git checkout -b feature/nova-funcionalidade

# 2. Fazer alterações
git add .
git commit -m "feat: adiciona nova funcionalidade"

# 3. Push (CI executa automaticamente)
git push origin feature/nova-funcionalidade

# 4. Abrir Pull Request (PR Validation executa)
# GitHub Actions valida PR automaticamente

# 5. Após aprovação e merge
# Deploy automático para staging
```

### Release para Produção

```bash
# 1. Criar tag de versão
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0

# 2. GitHub Actions detecta tag
# Deploy automático para produção

# 3. Rollback se necessário (manual)
git tag -d v1.0.0
git push origin :refs/tags/v1.0.0
```

---

## 📊 Métricas e Monitoramento

### Cobertura de Testes

- **Backend**: JaCoCo (relatório em `target/site/jacoco/`)
- **Frontend**: Coverage report (se configurado)
- Upload automático para Codecov

### Análise de Qualidade

- **SonarCloud**: Análise estática de código
- **CodeQL**: Detecção de vulnerabilidades
- **Dependency Check**: CVEs em dependências

### Health Checks

Todos os serviços possuem health checks:

```bash
# Backend
curl http://localhost:8080/actuator/health

# Frontend
curl http://localhost/health

# PostgreSQL
docker-compose exec postgres pg_isready
```

---

## 🔧 Troubleshooting

### Build Falhando

```bash
# Limpar cache do Maven
cd backend
./mvnw clean

# Limpar node_modules
cd frontend
rm -rf node_modules
npm ci
```

### Docker Issues

```bash
# Reconstruir imagens sem cache
docker-compose build --no-cache

# Ver logs detalhados
docker-compose logs -f --tail=100 backend

# Verificar saúde dos containers
docker-compose ps
```

### Testes Falhando

```bash
# Backend - executar testes localmente
cd backend
./mvnw test

# Frontend - executar testes localmente
cd frontend
npm test
```

---

## 🎯 Próximos Passos

- [ ] Configurar Slack/Discord para notificações
- [ ] Implementar deploy para Kubernetes
- [ ] Adicionar testes E2E (Cypress/Playwright)
- [ ] Configurar Blue-Green deployment
- [ ] Implementar feature flags
- [ ] Adicionar APM (Application Performance Monitoring)
- [ ] Configurar backup automático do banco
- [ ] Implementar disaster recovery

---

## 📚 Referências

- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Spring Boot with Docker](https://spring.io/guides/gs/spring-boot-docker/)
- [React Docker Deployment](https://create-react-app.dev/docs/deployment/)
- [SonarCloud](https://sonarcloud.io/)
- [CodeQL](https://codeql.github.com/)

---

## 👥 Equipe

Desenvolvido pela equipe LibShow - PUC Minas
- Engenharia de Software 2
- Professor: [Nome do Professor]

---

## 📄 Licença

Este projeto é parte do trabalho acadêmico da disciplina de Engenharia de Software 2.
