#!/bin/bash

# Script de inicialização rápida do Voz Mágica

echo "╔════════════════════════════════════════╗"
echo "║   🎤 Voz Mágica - Inicializando...     ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Verifica se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado!"
    echo "   Instale Node.js 18+ em: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js $(node --version) detectado"
echo ""

# Verifica se as dependências foram instaladas
if [ ! -d "web/node_modules" ]; then
    echo "📦 Instalando dependências do frontend..."
    cd web
    npm install
    cd ..
    echo "✅ Dependências instaladas!"
    echo ""
fi

# Verifica se o arquivo .env existe
if [ ! -f "web/.env" ]; then
    echo "⚠️  Arquivo .env não encontrado!"
    echo "   Copiando .env.example para .env..."
    cp web/.env.example web/.env
    echo ""
    echo "🔑 IMPORTANTE: Configure sua chave Gemini AI em web/.env"
    echo "   Obtenha em: https://makersuite.google.com/app/apikey"
    echo ""
    read -p "Pressione ENTER para continuar ou Ctrl+C para sair..."
fi

# Pergunta se quer iniciar o backend
echo "❓ Deseja iniciar o backend também? (s/N)"
read -r start_backend

if [[ $start_backend =~ ^[Ss]$ ]]; then
    # Verifica dependências do backend
    if [ ! -d "server/node_modules" ]; then
        echo "📦 Instalando dependências do backend..."
        cd server
        npm install
        cd ..
        echo "✅ Dependências do backend instaladas!"
        echo ""
    fi

    echo "🚀 Iniciando frontend e backend..."
    echo ""
    echo "Frontend: http://localhost:3000"
    echo "Backend:  http://localhost:3001"
    echo ""
    echo "Pressione Ctrl+C para parar"
    echo ""

    # Inicia ambos em paralelo
    trap 'kill 0' EXIT
    cd web && npm run dev &
    cd server && npm run dev &
    wait
else
    echo "🚀 Iniciando apenas o frontend..."
    echo ""
    echo "Frontend: http://localhost:3000"
    echo ""
    echo "Pressione Ctrl+C para parar"
    echo ""

    cd web && npm run dev
fi
