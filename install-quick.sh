#!/bin/bash
###############################################################################
# INSTALAÇÃO RÁPIDA - Voz Mágica Web
# Execute este script NO DIRETÓRIO ATUAL onde você já tem o código
###############################################################################

set -e

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}🚀 Instalação Rápida - Voz Mágica${NC}"
echo ""

# Verificar se está no diretório correto
if [ ! -f "deploy-web.sh" ] || [ ! -d "web" ]; then
    echo -e "${RED}❌ Execute este script no diretório raiz do projeto (onde está o deploy-web.sh)${NC}"
    echo -e "${YELLOW}Exemplo: cd /caminho/para/voz-magica && bash install-quick.sh${NC}"
    exit 1
fi

CURRENT_DIR=$(pwd)
WEB_DIR="$CURRENT_DIR/web"

echo -e "${GREEN}✅ Diretório do projeto: $CURRENT_DIR${NC}"
echo ""

###############################################################################
# 1. INSTALAR DEPENDÊNCIAS DO SISTEMA
###############################################################################
echo -e "${YELLOW}📦 Instalando dependências do sistema...${NC}"

# Node.js
if ! command -v node >/dev/null 2>&1; then
    echo "Instalando Node.js 20.x..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    echo -e "${GREEN}✅ Node.js $(node -v) já instalado${NC}"
fi

# Nginx
if ! command -v nginx >/dev/null 2>&1; then
    echo "Instalando Nginx..."
    sudo apt-get update
    sudo apt-get install -y nginx
else
    echo -e "${GREEN}✅ Nginx já instalado${NC}"
fi

###############################################################################
# 2. CONFIGURAR AMBIENTE
###############################################################################
echo -e "\n${YELLOW}⚙️  Configurando ambiente...${NC}"

cd "$WEB_DIR"

# Criar .env se não existir
if [ ! -f ".env" ]; then
    cat > .env << 'EOF'
# Voz Mágica - Variáveis de Ambiente

# Gemini AI (OBRIGATÓRIO - CONFIGURE SUA CHAVE!)
VITE_GEMINI_API_KEY=your-gemini-api-key-here

# Configurações
VITE_API_URL=http://192.168.0.115:3000
NODE_ENV=production
VITE_APP_NAME="Voz Mágica"
VITE_APP_VERSION="2.0.0"
EOF
    echo -e "${YELLOW}⚠️  Arquivo .env criado. IMPORTANTE: Configure sua API key!${NC}"
    echo -e "${YELLOW}   Edite: nano $WEB_DIR/.env${NC}"
    echo ""
    read -p "Pressione ENTER para continuar (configure a API key depois)..."
fi

###############################################################################
# 3. INSTALAR DEPENDÊNCIAS NPM
###############################################################################
echo -e "\n${YELLOW}📦 Instalando dependências npm...${NC}"
npm install --legacy-peer-deps

###############################################################################
# 4. BUILD DA APLICAÇÃO
###############################################################################
echo -e "\n${YELLOW}🏗️  Fazendo build da aplicação...${NC}"
npm run build

if [ ! -d "dist" ]; then
    echo -e "${RED}❌ Build falhou!${NC}"
    exit 1
fi

###############################################################################
# 5. COPIAR PARA NGINX
###############################################################################
echo -e "\n${YELLOW}📁 Configurando Nginx...${NC}"

sudo mkdir -p /var/www/voz-magica
sudo rm -rf /var/www/voz-magica/*
sudo cp -r dist/* /var/www/voz-magica/
sudo chown -R www-data:www-data /var/www/voz-magica

# Configurar Nginx
sudo tee /etc/nginx/sites-available/voz-magica > /dev/null << 'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name 192.168.0.115 localhost _;

    root /var/www/voz-magica;
    index index.html;

    # Gzip
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Logs
    access_log /var/log/nginx/voz-magica-access.log;
    error_log /var/log/nginx/voz-magica-error.log;
}
EOF

# Ativar site
sudo ln -sf /etc/nginx/sites-available/voz-magica /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Testar e reiniciar
sudo nginx -t && sudo systemctl restart nginx

###############################################################################
# 6. FIREWALL
###############################################################################
echo -e "\n${YELLOW}🔥 Configurando firewall...${NC}"

if command -v ufw >/dev/null 2>&1; then
    sudo ufw allow 80/tcp
    sudo ufw allow 443/tcp
    sudo ufw --force enable
fi

###############################################################################
# SUCESSO!
###############################################################################
echo ""
echo -e "${GREEN}═══════════════════════════════════════════════════${NC}"
echo -e "${GREEN}🎉 INSTALAÇÃO CONCLUÍDA COM SUCESSO!${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════${NC}"
echo ""
echo -e "${CYAN}📍 URLs de Acesso:${NC}"
echo "   • http://localhost"
echo "   • http://192.168.0.115"
echo ""
echo -e "${CYAN}🔑 Logins de Teste:${NC}"
echo "   • Criança:       child@test.com / senha123"
echo "   • Pais:          parent@test.com / senha123"
echo "   • Fonoaudiólogo: therapist@test.com / senha123"
echo "   • Professor:     teacher@test.com / senha123"
echo "   • Admin:         admin@test.com / senha123"
echo ""
echo -e "${YELLOW}⚠️  IMPORTANTE:${NC}"
echo "   Configure sua API key do Gemini em:"
echo "   $WEB_DIR/.env"
echo ""
echo -e "${CYAN}🎮 Acesse: http://192.168.0.115/login${NC}"
echo ""
