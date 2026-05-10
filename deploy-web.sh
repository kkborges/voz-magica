#!/bin/bash
###############################################################################
# Script de Deploy Automático - Voz Mágica Web
# Host: 192.168.0.115
# Usuário: kleber
###############################################################################

set -e  # Para na primeira falha

echo "🚀 Iniciando deploy da aplicação Voz Mágica..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configurações
PROJECT_DIR="/home/kleber/voz-magica"
WEB_DIR="$PROJECT_DIR/web"
DEPLOY_DIR="/var/www/voz-magica"
BACKUP_DIR="/home/kleber/backups"
NGINX_SITE="voz-magica"

echo -e "${YELLOW}📍 Diretórios:${NC}"
echo "  - Projeto: $PROJECT_DIR"
echo "  - Deploy: $DEPLOY_DIR"
echo "  - Backup: $BACKUP_DIR"

# Função para verificar se um comando existe
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

###############################################################################
# 1. VERIFICAR E INSTALAR DEPENDÊNCIAS
###############################################################################
echo -e "\n${YELLOW}📦 Verificando dependências...${NC}"

# Node.js
if ! command_exists node; then
    echo -e "${RED}❌ Node.js não encontrado. Instalando...${NC}"
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    echo -e "${GREEN}✅ Node.js $(node -v) instalado${NC}"
fi

# npm
if ! command_exists npm; then
    echo -e "${RED}❌ npm não encontrado${NC}"
    exit 1
else
    echo -e "${GREEN}✅ npm $(npm -v) instalado${NC}"
fi

# Git
if ! command_exists git; then
    echo -e "${YELLOW}⚠️  Git não encontrado. Instalando...${NC}"
    sudo apt-get update
    sudo apt-get install -y git
fi

# Nginx
if ! command_exists nginx; then
    echo -e "${YELLOW}⚠️  Nginx não encontrado. Instalando...${NC}"
    sudo apt-get install -y nginx
fi

# PM2
if ! command_exists pm2; then
    echo -e "${YELLOW}⚠️  PM2 não encontrado. Instalando...${NC}"
    sudo npm install -g pm2
fi

###############################################################################
# 2. CRIAR BACKUP (se já existir deploy anterior)
###############################################################################
if [ -d "$DEPLOY_DIR" ]; then
    echo -e "\n${YELLOW}💾 Criando backup...${NC}"
    mkdir -p "$BACKUP_DIR"
    BACKUP_FILE="$BACKUP_DIR/voz-magica-$(date +%Y%m%d-%H%M%S).tar.gz"
    sudo tar -czf "$BACKUP_FILE" -C "$DEPLOY_DIR" . 2>/dev/null || true
    echo -e "${GREEN}✅ Backup criado: $BACKUP_FILE${NC}"
fi

###############################################################################
# 3. VERIFICAR/CRIAR DIRETÓRIO DO PROJETO
###############################################################################
echo -e "\n${YELLOW}📥 Verificando código fonte...${NC}"

# Se o diretório não existe, criá-lo
if [ ! -d "$PROJECT_DIR" ]; then
    echo -e "${YELLOW}⚠️  Diretório do projeto não encontrado em $PROJECT_DIR${NC}"
    echo -e "${YELLOW}Por favor, copie o código para $PROJECT_DIR ou ajuste a variável PROJECT_DIR${NC}"
    echo ""
    read -p "Digite o caminho do diretório com o código (ou ENTER para sair): " custom_dir

    if [ -z "$custom_dir" ]; then
        echo "Deploy cancelado."
        exit 1
    fi

    PROJECT_DIR="$custom_dir"
    WEB_DIR="$PROJECT_DIR/web"
fi

if [ ! -d "$WEB_DIR" ]; then
    echo -e "${RED}❌ Diretório web não encontrado em $WEB_DIR${NC}"
    exit 1
fi

cd "$WEB_DIR"
echo -e "${GREEN}✅ Código fonte encontrado em $WEB_DIR${NC}"

# Se tem .git, pode atualizar
if [ -d "$PROJECT_DIR/.git" ]; then
    echo "Atualizando via Git..."
    cd "$PROJECT_DIR"
    git pull 2>/dev/null || echo -e "${YELLOW}⚠️  Não foi possível atualizar via Git (continuando mesmo assim)${NC}"
    cd "$WEB_DIR"
fi

###############################################################################
# 4. CONFIGURAR VARIÁVEIS DE AMBIENTE
###############################################################################
echo -e "\n${YELLOW}⚙️  Configurando variáveis de ambiente...${NC}"

if [ ! -f ".env" ]; then
    cat > .env << 'EOF'
# Voz Mágica - Variáveis de Ambiente (Produção)

# Gemini AI (obrigatório)
VITE_GEMINI_API_KEY=your-gemini-api-key-here

# Microsoft Copilot (backup - opcional)
VITE_COPILOT_API_KEY=your-copilot-api-key-here

# Configurações da API
VITE_API_URL=http://192.168.0.115:3000

# Ambiente
NODE_ENV=production

# Outras configurações
VITE_APP_NAME="Voz Mágica"
VITE_APP_VERSION="2.0.0"
EOF
    echo -e "${YELLOW}⚠️  Arquivo .env criado. IMPORTANTE: Edite e adicione suas API keys!${NC}"
    echo -e "${YELLOW}   Execute: nano $WEB_DIR/.env${NC}"
    read -p "Pressione ENTER após configurar as API keys..."
fi

###############################################################################
# 5. INSTALAR DEPENDÊNCIAS
###############################################################################
echo -e "\n${YELLOW}📦 Instalando dependências do projeto...${NC}"
npm install --legacy-peer-deps

###############################################################################
# 6. BUILD DA APLICAÇÃO
###############################################################################
echo -e "\n${YELLOW}🏗️  Fazendo build da aplicação...${NC}"
npm run build

if [ ! -d "dist" ]; then
    echo -e "${RED}❌ Build falhou! Diretório 'dist' não foi criado.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build concluído com sucesso!${NC}"

###############################################################################
# 7. COPIAR PARA DIRETÓRIO DE DEPLOY
###############################################################################
echo -e "\n${YELLOW}📁 Copiando arquivos para diretório de deploy...${NC}"

sudo mkdir -p "$DEPLOY_DIR"
sudo rm -rf "$DEPLOY_DIR"/*
sudo cp -r dist/* "$DEPLOY_DIR/"
sudo chown -R www-data:www-data "$DEPLOY_DIR"
sudo chmod -R 755 "$DEPLOY_DIR"

echo -e "${GREEN}✅ Arquivos copiados para $DEPLOY_DIR${NC}"

###############################################################################
# 8. CONFIGURAR NGINX
###############################################################################
echo -e "\n${YELLOW}🌐 Configurando Nginx...${NC}"

sudo tee "/etc/nginx/sites-available/$NGINX_SITE" > /dev/null << 'EOF'
server {
    listen 80;
    listen [::]:80;

    server_name 192.168.0.115 localhost;

    root /var/www/voz-magica;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript
               application/x-javascript application/xml+rss
               application/javascript application/json;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA routing - todas as rotas vão para index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Health check endpoint
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }

    # Logs
    access_log /var/log/nginx/voz-magica-access.log;
    error_log /var/log/nginx/voz-magica-error.log;
}
EOF

# Ativar site
sudo ln -sf "/etc/nginx/sites-available/$NGINX_SITE" "/etc/nginx/sites-enabled/$NGINX_SITE"

# Remover default se existir
sudo rm -f /etc/nginx/sites-enabled/default

# Testar configuração
echo "Testando configuração do Nginx..."
sudo nginx -t

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Configuração do Nginx válida${NC}"
    sudo systemctl reload nginx
    sudo systemctl enable nginx
    echo -e "${GREEN}✅ Nginx recarregado${NC}"
else
    echo -e "${RED}❌ Erro na configuração do Nginx${NC}"
    exit 1
fi

###############################################################################
# 9. FIREWALL (UFW)
###############################################################################
echo -e "\n${YELLOW}🔥 Configurando firewall...${NC}"

if command_exists ufw; then
    sudo ufw allow 80/tcp comment 'HTTP'
    sudo ufw allow 443/tcp comment 'HTTPS'
    sudo ufw --force enable
    echo -e "${GREEN}✅ Firewall configurado${NC}"
fi

###############################################################################
# 10. STATUS E INFORMAÇÕES FINAIS
###############################################################################
echo -e "\n${GREEN}═══════════════════════════════════════════════════${NC}"
echo -e "${GREEN}🎉 DEPLOY CONCLUÍDO COM SUCESSO!${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════${NC}"
echo ""
echo -e "${YELLOW}📍 URLs de Acesso:${NC}"
echo "   • Local:    http://localhost"
echo "   • Rede:     http://192.168.0.115"
echo ""
echo -e "${YELLOW}📂 Diretórios:${NC}"
echo "   • Deploy:   $DEPLOY_DIR"
echo "   • Projeto:  $PROJECT_DIR"
echo "   • Logs:     /var/log/nginx/voz-magica-*.log"
echo ""
echo -e "${YELLOW}🔑 Logins de Teste:${NC}"
echo "   • Criança:       child@test.com / senha123"
echo "   • Pais:          parent@test.com / senha123"
echo "   • Fonoaudiólogo: therapist@test.com / senha123"
echo "   • Professor:     teacher@test.com / senha123"
echo "   • Admin:         admin@test.com / senha123"
echo ""
echo -e "${YELLOW}⚙️  Comandos Úteis:${NC}"
echo "   • Ver logs Nginx:     sudo tail -f /var/log/nginx/voz-magica-*.log"
echo "   • Reiniciar Nginx:    sudo systemctl restart nginx"
echo "   • Status Nginx:       sudo systemctl status nginx"
echo "   • Refazer deploy:     cd ~ && bash deploy-web.sh"
echo ""
echo -e "${YELLOW}⚠️  IMPORTANTE:${NC}"
echo "   • Configure as API keys em: $WEB_DIR/.env"
echo "   • Acesse: http://192.168.0.115/login"
echo ""
echo -e "${GREEN}✨ Aplicação rodando em: http://192.168.0.115${NC}"
echo ""
