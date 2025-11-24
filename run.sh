#!/bin/bash

echo "🚀 Iniciando LibShow (Backend + Frontend)..."
echo ""

# Função para cleanup
cleanup() {
    echo ""
    echo "🛑 Parando todos os serviços..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

trap cleanup SIGINT SIGTERM

# Backend
echo "📦 Iniciando Backend..."
cd backend
if [ ! -f "target/libshow-0.0.1-SNAPSHOT.jar" ]; then
    echo "   Compilando projeto..."
    ./mvnw clean package -DskipTests -q
fi
java -jar target/libshow-0.0.1-SNAPSHOT.jar > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

echo "   ✅ Backend iniciado (PID: $BACKEND_PID)"
echo "   📝 Logs: tail -f backend.log"
echo ""

# Aguarda backend inicializar
echo "⏳ Aguardando backend inicializar (15s)..."
sleep 15

# Frontend
echo "🎨 Iniciando Frontend..."
cd frontend
if [ ! -d "node_modules" ]; then
    echo "   Instalando dependências..."
    if command -v pnpm &> /dev/null; then
        pnpm install -s
    else
        npm install --silent
    fi
fi

if command -v pnpm &> /dev/null; then
    pnpm dev > ../frontend.log 2>&1 &
else
    npm run dev > ../frontend.log 2>&1 &
fi
FRONTEND_PID=$!
cd ..

echo "   ✅ Frontend iniciado (PID: $FRONTEND_PID)"
echo "   📝 Logs: tail -f frontend.log"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ LibShow está rodando!"
echo ""
echo "   🌐 Frontend: http://localhost:5173"
echo "   🔌 Backend:  http://localhost:8080"
echo "   💾 H2 Console: http://localhost:8080/h2-console"
echo ""
echo "📊 Ver logs em tempo real:"
echo "   tail -f backend.log"
echo "   tail -f frontend.log"
echo ""
echo "Pressione Ctrl+C para parar todos os serviços"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Mantém o script rodando
wait
