# 🚀 Guia Completo de Deploy - Voz Mágica

**Versão:** 2.0.0 Enterprise  
**Host:** 192.168.0.115  
**Usuário:** kleber  
**Data:** Maio 2026

---

## 📋 Índice

1. [Início Rápido](#-início-rápido)
2. [Deploy Web](#-deploy-web)
3. [Deploy Android](#-deploy-android)
4. [Deploy iOS](#-deploy-ios)
5. [Configuração Avançada](#-configuração-avançada)
6. [Troubleshooting](#-troubleshooting)
7. [Manutenção](#-manutenção)

---

## 🚀 Início Rápido

### Executar Deploy Completo

```bash
# Conectar ao servidor via SSH
ssh kleber@192.168.0.115

# Navegar para o diretório
cd ~

# Copiar scripts de deploy (se ainda não copiou)
# Os scripts estão no repositório: /home/user/voz-magica/

# Dar permissão de execução
chmod +x deploy.sh deploy-web.sh deploy-android.sh

# Executar script master
./deploy.sh
```

### Menu Interativo

O script `deploy.sh` oferece um menu interativo:

```
1) 🌐 Web (Nginx)                    - Deploy da aplicação web
2) 🤖 Android (APK)                  - Gerar APK para Android
3) 🍎 iOS (IPA)                      - Instruções para iOS
4) 🚀 Todos (Web + Android)          - Deploy completo
5) 📊 Status dos serviços            - Ver status do sistema
6) 🔄 Atualizar código do Git        - Pull latest changes
7) 🧹 Limpar builds anteriores       - Limpeza de cache
8) ❌ Sair
```

---

## 🌐 Deploy Web

### Método 1: Script Automático (Recomendado)

```bash
# Executar script de deploy web
./deploy-web.sh
```

**O script faz automaticamente:**
- ✅ Verifica e instala dependências (Node.js, Nginx, PM2)
- ✅ Clona/atualiza repositório
- ✅ Instala pacotes npm
- ✅ Faz build da aplicação
- ✅ Configura Nginx
- ✅ Copia arquivos para /var/www/voz-magica
- ✅ Reinicia serviços
- ✅ Configura firewall

### Método 2: Manual

```bash
# 1. Clonar repositório
cd ~
git clone -b claude/voz-magica-speech-game-J6jX8 \
    http://127.0.0.1:45989/git/kkborges/voz-magica

# 2. Instalar dependências
cd voz-magica/web
npm install --legacy-peer-deps

# 3. Configurar variáveis de ambiente
cat > .env << EOF
VITE_GEMINI_API_KEY=your-api-key-here
VITE_API_URL=http://192.168.0.115:3000
NODE_ENV=production
EOF

# 4. Build
npm run build

# 5. Copiar para Nginx
sudo mkdir -p /var/www/voz-magica
sudo cp -r dist/* /var/www/voz-magica/
sudo chown -R www-data:www-data /var/www/voz-magica

# 6. Configurar Nginx (ver seção Nginx abaixo)

# 7. Reiniciar Nginx
sudo systemctl restart nginx
```

### Acessar Aplicação Web

- **Local:** http://localhost
- **Rede:** http://192.168.0.115
- **Login:** Use os logins de teste (ver seção Logins)

### Configuração Nginx

O arquivo de configuração está em: `/etc/nginx/sites-available/voz-magica`

```nginx
server {
    listen 80;
    server_name 192.168.0.115 localhost;

    root /var/www/voz-magica;
    index index.html;

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
}
```

---

## 🤖 Deploy Android

### Método 1: Script Automático (Recomendado)

```bash
# Executar script de deploy Android
./deploy-android.sh
```

**O script faz automaticamente:**
- ✅ Verifica e instala dependências (Java, Gradle)
- ✅ Instala Capacitor
- ✅ Configura projeto Android
- ✅ Faz build da aplicação web
- ✅ Gera APK Debug e Release
- ✅ Assina APK com keystore
- ✅ Copia APKs para ~/voz-magica-releases/

### Método 2: Manual

```bash
cd ~/voz-magica/web

# 1. Instalar Capacitor
npm install @capacitor/core @capacitor/cli @capacitor/android

# 2. Inicializar Capacitor
npx cap init "Voz Mágica" "com.vozmagica.app" --web-dir=dist

# 3. Adicionar plataforma Android
npx cap add android

# 4. Build web
npm run build

# 5. Sync com Android
npx cap sync android

# 6. Build APK
cd android
./gradlew assembleDebug      # APK Debug
./gradlew assembleRelease    # APK Release (requer assinatura)
```

### APKs Gerados

Os APKs ficam em: `~/voz-magica-releases/`

- **Debug:** `voz-magica-debug-YYYYMMDD.apk` (para desenvolvimento)
- **Release:** `voz-magica-release-YYYYMMDD.apk` (para produção)

### Instalar APK no Dispositivo

**Opção 1: Via ADB (USB)**
```bash
# Instalar ADB
sudo apt install android-tools-adb

# Conectar dispositivo via USB (ativar "Depuração USB")
adb devices

# Instalar APK
adb install ~/voz-magica-releases/voz-magica-release-*.apk
```

**Opção 2: Download Direto**
```bash
# Copiar APK para diretório web
sudo cp ~/voz-magica-releases/voz-magica-release-*.apk \
    /var/www/voz-magica/downloads/

# Acessar do celular: http://192.168.0.115/downloads/
# Baixar e instalar (ativar "Fontes desconhecidas")
```

**Opção 3: QR Code**
```bash
# Instalar qrencode
sudo apt install qrencode

# Gerar QR Code
qrencode -t UTF8 "http://192.168.0.115/downloads/voz-magica-release.apk"

# Escanear com celular e baixar
```

### Permissões Android

O app requer as seguintes permissões:
- 🎤 **RECORD_AUDIO** - Para análise de voz
- 🌐 **INTERNET** - Para comunicação com servidor
- 📶 **ACCESS_NETWORK_STATE** - Para verificar conectividade
- 📳 **VIBRATE** - Para feedback háptico

---

## 🍎 Deploy iOS

### ⚠️ Requisitos

**iOS só pode ser compilado em Mac** com:
- macOS 11.0+
- Xcode 13.0+
- Apple Developer Account ($99/ano para App Store)
- CocoaPods

### Opções de Deploy iOS

#### Opção 1: Build Local (Requer Mac)

Ver arquivo `deploy-ios.md` para instruções completas.

#### Opção 2: Cloud Build Services (Sem Mac)

**a) Expo Application Services (EAS)**
```bash
npm install -g eas-cli
eas login
eas build --platform ios
```

**b) Codemagic**
- Conecte repositório Git em https://codemagic.io
- Configure workflow iOS
- Build automático em Mac na nuvem

**c) Bitrise**
- https://bitrise.io
- CI/CD com máquinas Mac
- Workflow iOS pré-configurado

#### Opção 3: Contratar Desenvolvedor iOS

Se você não tem Mac e precisa de build iOS urgente:
- Freelancer no Upwork/Fiverr
- Custo aproximado: $50-200 por build
- Eles fazem o build e te enviam o IPA

### Distribuição iOS

1. **App Store** - Publicação oficial ($99/ano)
2. **TestFlight** - Beta testing (até 10.000 testadores)
3. **Ad Hoc** - Distribuição limitada (até 100 dispositivos)
4. **Enterprise** - Distribuição interna ($299/ano)

---

## ⚙️ Configuração Avançada

### Variáveis de Ambiente

Edite o arquivo `.env` em `~/voz-magica/web/.env`:

```bash
# Gemini AI (Obrigatório)
VITE_GEMINI_API_KEY=AIza...your-key-here

# Microsoft Copilot (Opcional - backup)
VITE_COPILOT_API_KEY=your-copilot-key

# URL da API (se tiver backend)
VITE_API_URL=http://192.168.0.115:3000

# Ambiente
NODE_ENV=production

# Configurações adicionais
VITE_APP_NAME="Voz Mágica"
VITE_APP_VERSION="2.0.0"
VITE_ENABLE_ANALYTICS=true
```

### SSL/HTTPS (Recomendado para Produção)

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx

# Obter certificado (se tiver domínio)
sudo certbot --nginx -d seu-dominio.com

# Renovação automática
sudo certbot renew --dry-run
```

### Banco de Dados (Se necessário)

```bash
# PostgreSQL
sudo apt install postgresql postgresql-contrib
sudo -u postgres createdb vozmagica

# MongoDB
sudo apt install mongodb
sudo systemctl start mongodb

# MySQL
sudo apt install mysql-server
sudo mysql_secure_installation
```

### PM2 para Backend (Se tiver API Node.js)

```bash
# Instalar PM2
sudo npm install -g pm2

# Iniciar aplicação
pm2 start server/index.js --name "voz-magica-api"

# Configurar autostart
pm2 startup
pm2 save

# Monitorar
pm2 monit
```

---

## 🐛 Troubleshooting

### Web não carrega

```bash
# Verificar status do Nginx
sudo systemctl status nginx

# Ver logs de erro
sudo tail -f /var/log/nginx/voz-magica-error.log

# Testar configuração Nginx
sudo nginx -t

# Reiniciar Nginx
sudo systemctl restart nginx

# Verificar permissões
ls -la /var/www/voz-magica/
```

### Build falha

```bash
# Limpar cache npm
rm -rf node_modules package-lock.json
npm cache clean --force
npm install --legacy-peer-deps

# Verificar versão Node.js (deve ser 18+)
node -v

# Instalar versão correta se necessário
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Android build falha

```bash
# Verificar Java
java -version

# Instalar OpenJDK 17
sudo apt install openjdk-17-jdk

# Limpar build Android
cd ~/voz-magica/web/android
./gradlew clean

# Rebuild
./gradlew assembleDebug
```

### Porta 80 já em uso

```bash
# Verificar o que está usando a porta
sudo lsof -i :80

# Parar Apache se estiver rodando
sudo systemctl stop apache2
sudo systemctl disable apache2

# Reiniciar Nginx
sudo systemctl restart nginx
```

### Sem espaço em disco

```bash
# Verificar espaço
df -h

# Limpar cache do apt
sudo apt clean
sudo apt autoremove

# Limpar logs antigos
sudo journalctl --vacuum-time=7d

# Limpar builds antigos
rm -rf ~/voz-magica/web/node_modules
rm -rf ~/voz-magica/web/android/app/build
```

---

## 🔧 Manutenção

### Atualizar Aplicação

```bash
# Via script master
./deploy.sh
# Escolher opção 6 (Atualizar código)

# Ou manualmente
cd ~/voz-magica
git pull origin claude/voz-magica-speech-game-J6jX8
cd web
npm install --legacy-peer-deps
npm run build
sudo cp -r dist/* /var/www/voz-magica/
sudo systemctl reload nginx
```

### Backup

```bash
# Backup completo
mkdir -p ~/backups
tar -czf ~/backups/voz-magica-$(date +%Y%m%d).tar.gz \
    /var/www/voz-magica \
    ~/voz-magica \
    /etc/nginx/sites-available/voz-magica

# Restaurar backup
tar -xzf ~/backups/voz-magica-YYYYMMDD.tar.gz -C /
```

### Monitoramento

```bash
# Logs em tempo real
sudo tail -f /var/log/nginx/voz-magica-access.log

# Status dos serviços
systemctl status nginx
systemctl status pm2-kleber  # Se usar PM2

# Uso de recursos
htop
df -h
free -h
```

### Limpeza Periódica

```bash
# Executar mensalmente
./deploy.sh
# Escolher opção 7 (Limpar builds)

# Limpar logs antigos
sudo find /var/log/nginx/ -name "*.log.*" -mtime +30 -delete

# Limpar backups antigos (manter últimos 7 dias)
find ~/backups/ -name "*.tar.gz" -mtime +7 -delete
```

---

## 👥 Logins de Teste

Acesse: http://192.168.0.115/login

| Perfil          | Email                  | Senha    | Descrição                    |
|-----------------|------------------------|----------|------------------------------|
| 👧 Criança      | child@test.com         | senha123 | Interface de jogos           |
| 👨 Pais         | parent@test.com        | senha123 | Acompanhamento do filho      |
| 👨‍⚕️ Fonoaudiólogo | therapist@test.com   | senha123 | Gestão de pacientes          |
| 👩‍🏫 Professor    | teacher@test.com       | senha123 | Gestão de turmas             |
| 👨‍💼 Admin       | admin@test.com         | senha123 | Administração da clínica     |

---

## 📚 Recursos Adicionais

### Documentação

- [Capacitor Docs](https://capacitorjs.com/docs)
- [Nginx Docs](https://nginx.org/en/docs/)
- [React + Vite](https://vitejs.dev/guide/)
- [Framer Motion](https://www.framer.com/motion/)

### Suporte

- **GitHub Issues:** [repositório]/issues
- **Email:** suporte@vozmagica.com
- **Documentação:** http://192.168.0.115/docs

### Estrutura do Projeto

```
voz-magica/
├── web/                          # Aplicação React
│   ├── src/
│   │   ├── pages/
│   │   │   ├── dashboards/      # 5 Dashboards implementados
│   │   │   └── Login.tsx        # Página de login
│   │   ├── design-system/       # Componentes reutilizáveis
│   │   │   ├── atoms/           # Botões, inputs, etc
│   │   │   ├── molecules/       # Cards, forms, etc
│   │   │   └── organisms/       # Charts, listas complexas
│   │   ├── contexts/            # Auth, Theme, etc
│   │   └── utils/               # Helpers, sound, haptics
│   ├── public/                  # Assets estáticos
│   ├── dist/                    # Build (gerado)
│   └── android/                 # Projeto Android (gerado)
├── server/                      # Backend (futuro)
├── docs/                        # Documentação
└── deploy scripts               # Scripts de deploy
```

---

## 🎯 Checklist de Deploy

### Pré-Deploy
- [ ] Node.js 18+ instalado
- [ ] Git configurado
- [ ] Variáveis de ambiente configuradas (.env)
- [ ] API keys obtidas (Gemini AI)
- [ ] Firewall configurado (portas 80, 443)

### Deploy Web
- [ ] Script executado com sucesso
- [ ] Nginx rodando (`systemctl status nginx`)
- [ ] Site acessível em http://192.168.0.115
- [ ] Todos os dashboards funcionando
- [ ] Login funcionando com todos os perfis

### Deploy Android
- [ ] Java instalado
- [ ] Android SDK configurado (opcional)
- [ ] APK gerado com sucesso
- [ ] APK instalado e testado em dispositivo real
- [ ] Todas as funcionalidades testadas

### Pós-Deploy
- [ ] Backup realizado
- [ ] Logs verificados (sem erros)
- [ ] Performance testada
- [ ] Documentação atualizada
- [ ] Usuários notificados

---

## 📞 Contato

**Desenvolvedor:** Claude AI Assistant  
**Projeto:** Voz Mágica 2.0 Enterprise  
**Data:** Maio 2026  
**Versão:** 2.0.0

---

**🎉 Parabéns! Seu sistema Voz Mágica está pronto para uso!**

Para dúvidas ou problemas, consulte a seção de [Troubleshooting](#-troubleshooting) ou abra uma issue no GitHub.
