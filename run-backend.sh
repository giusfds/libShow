#!/bin/bash

echo "🚀 Iniciando LibShow Backend..."
echo ""

cd backend

# Verifica se o JAR existe
if [ ! -f "target/libshow-0.0.1-SNAPSHOT.jar" ]; then
    echo "📦 JAR não encontrado. Compilando o projeto..."
    ./mvnw clean package -DskipTests
fi

echo ""
echo "▶️  Executando o servidor Spring Boot..."
echo "   Backend rodará em: http://localhost:8080"
echo "   Console H2: http://localhost:8080/h2-console"
echo ""
echo "Pressione Ctrl+C para parar"
echo ""

# Executa o JAR
java -jar target/libshow-0.0.1-SNAPSHOT.jar
