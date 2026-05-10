#!/bin/bash
###############################################################################
# DEPLOY MASTER - Voz Mágica
# Script principal para deploy em Web, Android e iOS
###############################################################################

set -e

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

# Banner
clear
echo -e "${MAGENTA}"
cat << 'EOF'
╦  ╦╔═╗╔═╗  ╔╦╗┌─┐┌─┐┬┌─┐┌─┐
╚╗╔╝║ ║╔═╝  ║║║├─┤│ ┬││  ├─┤
 ╚╝ ╚═╝╚═╝  ╩ ╩┴ ┴└─┘┴└─┘┴ ┴
    🎤 Sistema de Deploy 🎤
EOF
echo -e "${NC}"

# Informações
echo -e "${CYAN}════════════════════════════════════════════${NC}"
echo -e "${CYAN}  Desenvolvendo a Comunicação 🗣️${NC}"
echo -e "${CYAN}  Versão: 2.0.0 Enterprise${NC}"
echo -e "${CYAN}  Host: 192.168.0.115${NC}"
echo -e "${CYAN}════════════════════════════════════════════${NC}"
echo ""

# Menu
echo -e "${YELLOW}Selecione o tipo de deploy:${NC}"
echo ""
echo "  1) 🌐 Web (Nginx)"
echo "  2) 🤖 Android (APK)"
echo "  3) 🍎 iOS (IPA) - Requer Mac"
echo "  4) 🚀 Todos (Web + Android)"
echo "  5) 📊 Status dos serviços"
echo "  6) 🔄 Atualizar código do Git"
echo "  7) 🧹 Limpar builds anteriores"
echo "  8) ❌ Sair"
echo ""
read -p "$(echo -e ${GREEN}Escolha uma opção [1-8]: ${NC})" choice

case $choice in
    1)
        echo -e "\n${BLUE}═══ Deploy Web ═══${NC}\n"
        if [ -f "deploy-web.sh" ]; then
            bash deploy-web.sh
        else
            echo -e "${RED}❌ Arquivo deploy-web.sh não encontrado${NC}"
            exit 1
        fi
        ;;

    2)
        echo -e "\n${BLUE}═══ Deploy Android ═══${NC}\n"
        if [ -f "deploy-android.sh" ]; then
            bash deploy-android.sh
        else
            echo -e "${RED}❌ Arquivo deploy-android.sh não encontrado${NC}"
            exit 1
        fi
        ;;

    3)
        echo -e "\n${BLUE}═══ Deploy iOS ═══${NC}\n"
        echo -e "${YELLOW}⚠️  O build iOS requer um Mac com Xcode${NC}"
        echo -e "${YELLOW}Consulte o arquivo deploy-ios.md para instruções${NC}"
        echo ""
        if [ -f "deploy-ios.md" ]; then
            echo "Abrindo instruções..."
            cat deploy-ios.md | head -n 50
        fi
        ;;

    4)
        echo -e "\n${BLUE}═══ Deploy Completo (Web + Android) ═══${NC}\n"

        echo -e "${YELLOW}[1/2] Iniciando deploy Web...${NC}"
        if [ -f "deploy-web.sh" ]; then
            bash deploy-web.sh
        fi

        echo -e "\n${YELLOW}[2/2] Iniciando deploy Android...${NC}"
        if [ -f "deploy-android.sh" ]; then
            bash deploy-android.sh
        fi

        echo -e "\n${GREEN}✅ Deploy completo finalizado!${NC}"
        ;;

    5)
        echo -e "\n${BLUE}═══ Status dos Serviços ═══${NC}\n"

        # Nginx
        if systemctl is-active --quiet nginx; then
            echo -e "${GREEN}✅ Nginx: Rodando${NC}"
            echo "   URL: http://192.168.0.115"
        else
            echo -e "${RED}❌ Nginx: Parado${NC}"
        fi

        # Node.js
        if command -v node >/dev/null 2>&1; then
            echo -e "${GREEN}✅ Node.js: $(node -v)${NC}"
        else
            echo -e "${RED}❌ Node.js: Não instalado${NC}"
        fi

        # Java (Android)
        if command -v java >/dev/null 2>&1; then
            echo -e "${GREEN}✅ Java: Instalado${NC}"
        else
            echo -e "${YELLOW}⚠️  Java: Não instalado (necessário para Android)${NC}"
        fi

        # Espaço em disco
        echo ""
        echo "💾 Espaço em disco:"
        df -h / | tail -n 1 | awk '{print "   Usado: "$3" / Total: "$2" ("$5" usado)"}'

        # Última build
        if [ -d "/var/www/voz-magica" ]; then
            echo ""
            echo "📁 Último deploy Web:"
            stat -c "   %y" /var/www/voz-magica | cut -d'.' -f1
        fi

        if [ -d "/home/kleber/voz-magica-releases" ]; then
            echo ""
            echo "📱 Último APK:"
            ls -t /home/kleber/voz-magica-releases/*.apk 2>/dev/null | head -n1 | \
                xargs -I {} sh -c 'echo "   $(basename {})"'
        fi
        ;;

    6)
        echo -e "\n${BLUE}═══ Atualizar Código ═══${NC}\n"

        PROJECT_DIR="/home/kleber/voz-magica"

        if [ -d "$PROJECT_DIR/.git" ]; then
            cd "$PROJECT_DIR"
            echo "📥 Buscando atualizações do Git..."
            git fetch origin

            echo "🔄 Atualizando branch..."
            git checkout claude/voz-magica-speech-game-J6jX8
            git pull origin claude/voz-magica-speech-game-J6jX8

            echo -e "${GREEN}✅ Código atualizado!${NC}"

            # Mostrar últimos commits
            echo ""
            echo "📝 Últimas atualizações:"
            git log --oneline -5
        else
            echo -e "${RED}❌ Repositório Git não encontrado em $PROJECT_DIR${NC}"
        fi
        ;;

    7)
        echo -e "\n${BLUE}═══ Limpeza de Builds ═══${NC}\n"

        read -p "$(echo -e ${YELLOW}Tem certeza que deseja limpar todos os builds? [s/N]: ${NC})" confirm

        if [[ $confirm =~ ^[Ss]$ ]]; then
            echo "🧹 Limpando..."

            # Limpar node_modules
            if [ -d "/home/kleber/voz-magica/web/node_modules" ]; then
                echo "  Removendo node_modules..."
                rm -rf /home/kleber/voz-magica/web/node_modules
            fi

            # Limpar dist
            if [ -d "/home/kleber/voz-magica/web/dist" ]; then
                echo "  Removendo dist..."
                rm -rf /home/kleber/voz-magica/web/dist
            fi

            # Limpar Android build
            if [ -d "/home/kleber/voz-magica/web/android/app/build" ]; then
                echo "  Removendo build Android..."
                rm -rf /home/kleber/voz-magica/web/android/app/build
            fi

            echo -e "${GREEN}✅ Limpeza concluída!${NC}"
            echo "Execute o deploy novamente para reconstruir."
        else
            echo "Operação cancelada."
        fi
        ;;

    8)
        echo -e "\n${CYAN}👋 Até logo!${NC}\n"
        exit 0
        ;;

    *)
        echo -e "${RED}❌ Opção inválida${NC}"
        exit 1
        ;;
esac

# Mensagem final
echo ""
echo -e "${GREEN}═══════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✨ Operação concluída!${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════${NC}"
echo ""
echo -e "${YELLOW}📚 Para mais informações:${NC}"
echo "   • README: cat /home/kleber/voz-magica/DEPLOY_README.md"
echo "   • Logs Nginx: sudo tail -f /var/log/nginx/voz-magica-*.log"
echo "   • Status: bash deploy.sh (opção 5)"
echo ""
echo -e "${CYAN}🚀 Acesse: http://192.168.0.115${NC}"
echo ""
