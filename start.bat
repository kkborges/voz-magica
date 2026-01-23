@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

echo ╔════════════════════════════════════════╗
echo ║   🎤 Voz Mágica - Inicializando...     ║
echo ╚════════════════════════════════════════╝
echo.

REM Verifica se Node.js está instalado
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js não encontrado!
    echo    Instale Node.js 18+ em: https://nodejs.org
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js %NODE_VERSION% detectado
echo.

REM Verifica se as dependências foram instaladas
if not exist "web\node_modules" (
    echo 📦 Instalando dependências do frontend...
    cd web
    call npm install
    cd ..
    echo ✅ Dependências instaladas!
    echo.
)

REM Verifica se o arquivo .env existe
if not exist "web\.env" (
    echo ⚠️  Arquivo .env não encontrado!
    echo    Copiando .env.example para .env...
    copy web\.env.example web\.env > nul
    echo.
    echo 🔑 IMPORTANTE: Configure sua chave Gemini AI em web\.env
    echo    Obtenha em: https://makersuite.google.com/app/apikey
    echo.
    pause
)

REM Pergunta se quer iniciar o backend
echo ❓ Deseja iniciar o backend também? (S/N)
set /p start_backend=

if /i "%start_backend%"=="S" (
    REM Verifica dependências do backend
    if not exist "server\node_modules" (
        echo 📦 Instalando dependências do backend...
        cd server
        call npm install
        cd ..
        echo ✅ Dependências do backend instaladas!
        echo.
    )

    echo 🚀 Iniciando frontend e backend...
    echo.
    echo Frontend: http://localhost:3000
    echo Backend:  http://localhost:3001
    echo.
    echo Pressione Ctrl+C para parar
    echo.

    REM Inicia ambos em paralelo
    start "Voz Mágica - Frontend" cmd /k "cd web && npm run dev"
    start "Voz Mágica - Backend" cmd /k "cd server && npm run dev"

    echo.
    echo ✅ Servidores iniciados em janelas separadas!
    echo    Feche as janelas para parar os servidores.
    pause
) else (
    echo 🚀 Iniciando apenas o frontend...
    echo.
    echo Frontend: http://localhost:3000
    echo.
    echo Pressione Ctrl+C para parar
    echo.

    cd web
    call npm run dev
)
