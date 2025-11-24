#!/bin/bash

echo "🎨 Iniciando LibShow Frontend..."
echo ""

cd frontend

# Verifica se node_modules existe
if [ ! -d "node_modules" ]; then
    echo "📦 Dependências não encontradas. Instalando..."
    if command -v pnpm &> /dev/null; then
        pnpm install
    else
        npm install
    fi
fi

echo ""
echo "▶️  Executando o servidor Vite..."
echo "   Frontend rodará em: http://localhost:5173"
echo ""
echo "Pressione Ctrl+C para parar"
echo ""

# Executa o Vite
if command -v pnpm &> /dev/null; then
    pnpm dev
else
    npm run dev
fi
