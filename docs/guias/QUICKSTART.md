# 🚀 Guia Rápido - LibShow CI/CD

## Início Rápido em 5 Minutos

### 1. Clone o Repositório
```bash
git clone https://github.com/andreeluis/libshow.git
cd libshow
```

### 2. Execute com Docker Compose
```bash
# Copiar variáveis de ambiente
cp .env.example .env

# Subir aplicação completa
docker-compose up -d

# Aguardar ~60 segundos para inicialização
docker-compose logs -f backend
```

### 3. Acesse a Aplicação
- 🌐 **Frontend**: http://localhost
- 🔌 **API**: http://localhost:8080
- 📊 **Swagger**: http://localhost:8080/swagger-ui.html
- 💓 **Health**: http://localhost:8080/actuator/health

### 4. Login de Teste
```
Email: admin@pucminas.br
Senha: senha123
```

---

## 🔧 Comandos Úteis

### Docker Compose

```bash
# Subir serviços
docker-compose up -d

# Ver logs
docker-compose logs -f [service]

# Parar tudo
docker-compose down

# Rebuild
docker-compose up -d --build

# Limpar tudo (cuidado!)
docker-compose down -v
```

### Git Workflow

```bash
# Criar nova feature
git checkout -b feature/minha-feature

# Commit (seguindo Conventional Commits)
git commit -m "feat: adiciona nova funcionalidade"

# Push (CI executa automaticamente)
git push origin feature/minha-feature

# Criar PR via GitHub UI
```

### Backend Local

```bash
cd backend
./mvnw spring-boot:run

# Ou com testes
./mvnw clean test

# Ou build completo
./mvnw clean package
java -jar target/libshow-0.0.1-SNAPSHOT.jar
```

### Frontend Local

```bash
cd frontend
npm install
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview
```

---

## 🧪 Testes

### Backend
```bash
cd backend
./mvnw test                    # Testes unitários
./mvnw verify                  # Testes de integração
./mvnw test jacoco:report      # Cobertura
```

### Frontend
```bash
cd frontend
npm test                       # Testes
npm run lint                   # Linting
npm run build                  # Build
```

---

## 🔄 CI/CD

### Triggers Automáticos

**Push para main/develop:**
- ✅ Backend CI executa
- ✅ Frontend CI executa
- ✅ Code Quality executa
- 🚀 Deploy para Staging (apenas main)

**Pull Request:**
- ✅ PR Validation
- ✅ Backend CI
- ✅ Frontend CI
- ✅ Code Quality

**Tag `v*.*.*`:**
- 🚀 Deploy para Production

### Workflows Disponíveis

```bash
# Ver workflows
ls -la .github/workflows/

backend-ci.yml       # CI do backend
frontend-ci.yml      # CI do frontend
code-quality.yml     # Análise de qualidade
deploy.yml           # Deploy automático
pr-validation.yml    # Validação de PRs
```

---

## 📊 Monitoramento

### Health Checks

```bash
# Backend
curl http://localhost:8080/actuator/health

# Frontend
curl http://localhost/health

# PostgreSQL
docker-compose exec postgres pg_isready
```

### Métricas (com profile monitoring)

```bash
# Subir com monitoramento
docker-compose --profile monitoring up -d

# Acessar Prometheus
open http://localhost:9090

# Acessar Grafana
open http://localhost:3000
# Login: admin / admin
```

---

## 🐛 Troubleshooting

### Backend não inicia

```bash
# Ver logs detalhados
docker-compose logs backend

# Verificar Java
java -version

# Limpar e rebuildar
cd backend
./mvnw clean
./mvnw package
```

### Frontend não carrega

```bash
# Ver logs
docker-compose logs frontend

# Limpar cache
cd frontend
rm -rf node_modules dist
npm install
npm run build
```

### Porta já em uso

```bash
# Verificar processos
lsof -i :8080  # Backend
lsof -i :80    # Frontend
lsof -i :5432  # PostgreSQL

# Matar processo
kill -9 <PID>
```

### Docker issues

```bash
# Limpar containers parados
docker container prune

# Limpar imagens não usadas
docker image prune

# Limpar volumes (CUIDADO!)
docker volume prune

# Reset completo do Docker
docker system prune -a --volumes
```

---

## 📝 Checklist de Deploy

### Antes do Deploy

- [ ] Todos os testes passando
- [ ] Cobertura de testes > 70%
- [ ] Code Quality aprovado
- [ ] PR aprovado e merged
- [ ] Tag criada (para produção)
- [ ] Variáveis de ambiente configuradas
- [ ] Secrets do GitHub configurados

### Após Deploy

- [ ] Health check passou
- [ ] Smoke tests executados
- [ ] Logs verificados
- [ ] Métricas verificadas
- [ ] Rollback plan disponível

---

## 🔐 Secrets Necessários

Configure no GitHub (Settings → Secrets):

```bash
DOCKER_USERNAME        # Docker Hub username
DOCKER_PASSWORD        # Docker Hub password
SONAR_TOKEN           # SonarCloud token (opcional)
STAGING_API_URL       # URL da API de staging
PROD_API_URL          # URL da API de produção
```

---

## 📚 Documentação Completa

- **[CI_CD.md](./CI_CD.md)** - Documentação completa do CI/CD
- **[README.md](./README.md)** - README principal
- **[ARQUITETURA.md](./ARQUITETURA.md)** - Arquitetura do sistema
- **[USER_STORIES.md](./USER_STORIES.md)** - User stories
- **[DATABASE.md](./DATABASE.md)** - Schema do banco

---

## 🆘 Ajuda

**Problemas?**
- 📖 Consulte [CI_CD.md](./CI_CD.md)
- 🐛 Abra uma [Issue](https://github.com/andreeluis/libshow/issues)
- 💬 Pergunte no Discord do projeto

**Equipe LibShow** - PUC Minas 2024
