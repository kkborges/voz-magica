#!/bin/bash
###############################################################################
# QUICK BUILD - Build rápido ignorando erros TypeScript
###############################################################################

echo "🚀 Build rápido (ignorando warnings TypeScript)..."

cd "$(dirname "$0")/web"

# Build apenas com Vite (pula verificação TypeScript)
echo "📦 Building com Vite..."
npx vite build --mode production

if [ -d "dist" ]; then
    echo "✅ Build concluído!"
    echo "📁 Arquivos em: $(pwd)/dist"
    ls -lh dist/ | head -10
    exit 0
else
    echo "❌ Erro no build"
    exit 1
fi
