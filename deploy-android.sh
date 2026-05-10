#!/bin/bash
###############################################################################
# Script de Deploy Android - Voz Mágica
# Gera APK para instalação em dispositivos Android
###############################################################################

set -e

echo "🤖 Iniciando build Android - Voz Mágica..."

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

PROJECT_DIR="/home/kleber/voz-magica"
WEB_DIR="$PROJECT_DIR/web"
OUTPUT_DIR="/home/kleber/voz-magica-releases"

cd "$WEB_DIR"

###############################################################################
# 1. VERIFICAR DEPENDÊNCIAS
###############################################################################
echo -e "\n${YELLOW}📦 Verificando dependências Android...${NC}"

# Java (necessário para Android)
if ! command -v java >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Java não encontrado. Instalando OpenJDK 17...${NC}"
    sudo apt-get update
    sudo apt-get install -y openjdk-17-jdk
    echo "export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64" >> ~/.bashrc
    export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
else
    echo -e "${GREEN}✅ Java $(java -version 2>&1 | head -n 1) instalado${NC}"
fi

# Gradle
if ! command -v gradle >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Gradle não encontrado. Será instalado via Capacitor...${NC}"
fi

# Android SDK (precisa ser instalado manualmente ou via Android Studio)
if [ ! -d "$HOME/Android/Sdk" ]; then
    echo -e "${RED}❌ Android SDK não encontrado em $HOME/Android/Sdk${NC}"
    echo -e "${YELLOW}Opções:${NC}"
    echo "  1. Instalar Android Studio: https://developer.android.com/studio"
    echo "  2. Ou instalar SDK command-line tools:"
    echo "     wget https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip"
    echo "     unzip commandlinetools-linux-*.zip -d \$HOME/Android/cmdline-tools"
    echo ""
    read -p "Deseja continuar mesmo assim? (s/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Ss]$ ]]; then
        exit 1
    fi
else
    echo -e "${GREEN}✅ Android SDK encontrado${NC}"
    export ANDROID_SDK_ROOT="$HOME/Android/Sdk"
fi

###############################################################################
# 2. INSTALAR CAPACITOR (se não estiver instalado)
###############################################################################
echo -e "\n${YELLOW}📱 Configurando Capacitor...${NC}"

# Verificar se Capacitor já está no package.json
if ! grep -q "@capacitor/core" package.json; then
    echo "Instalando Capacitor..."
    npm install @capacitor/core @capacitor/cli --save
    npm install @capacitor/android --save
fi

# Inicializar Capacitor (se necessário)
if [ ! -f "capacitor.config.ts" ] && [ ! -f "capacitor.config.json" ]; then
    echo -e "${YELLOW}Inicializando Capacitor...${NC}"
    npx cap init "Voz Mágica" "com.vozmagica.app" --web-dir=dist
fi

###############################################################################
# 3. CONFIGURAR CAPACITOR
###############################################################################
echo -e "\n${YELLOW}⚙️  Configurando Capacitor...${NC}"

# Criar/atualizar capacitor.config.ts
cat > capacitor.config.ts << 'EOF'
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.vozmagica.app',
  appName: 'Voz Mágica',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    cleartext: true,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#667eea',
      showSpinner: false,
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#667eea',
    },
  },
};

export default config;
EOF

echo -e "${GREEN}✅ Capacitor configurado${NC}"

###############################################################################
# 4. BUILD DA APLICAÇÃO WEB
###############################################################################
echo -e "\n${YELLOW}🏗️  Fazendo build da aplicação web...${NC}"

# Configurar variáveis de ambiente para mobile
if [ ! -f ".env.production" ]; then
    cat > .env.production << 'EOF'
VITE_GEMINI_API_KEY=your-gemini-api-key-here
VITE_API_URL=http://192.168.0.115:3000
NODE_ENV=production
VITE_PLATFORM=android
EOF
    echo -e "${YELLOW}⚠️  Configure as API keys em .env.production${NC}"
fi

npm run build

if [ ! -d "dist" ]; then
    echo -e "${RED}❌ Build falhou!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build web concluído${NC}"

###############################################################################
# 5. ADICIONAR PLATAFORMA ANDROID
###############################################################################
echo -e "\n${YELLOW}🤖 Adicionando plataforma Android...${NC}"

if [ ! -d "android" ]; then
    npx cap add android
else
    echo "Plataforma Android já existe, sincronizando..."
    npx cap sync android
fi

###############################################################################
# 6. CONFIGURAR PERMISSÕES (AndroidManifest.xml)
###############################################################################
echo -e "\n${YELLOW}🔐 Configurando permissões...${NC}"

MANIFEST_FILE="android/app/src/main/AndroidManifest.xml"

if [ -f "$MANIFEST_FILE" ]; then
    # Backup do manifest
    cp "$MANIFEST_FILE" "${MANIFEST_FILE}.backup"

    # Adicionar permissões necessárias
    cat > "$MANIFEST_FILE" << 'EOF'
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme"
        android:usesCleartextTraffic="true">

        <activity
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|smallestScreenSize|screenLayout|uiMode"
            android:name=".MainActivity"
            android:label="@string/title_activity_main"
            android:theme="@style/AppTheme.NoActionBarLaunch"
            android:launchMode="singleTask"
            android:exported="true">

            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>

        </activity>
    </application>

    <!-- Permissões necessárias -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
    <uses-permission android:name="android.permission.VIBRATE" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />

    <!-- Para microfone (necessário para análise de voz) -->
    <uses-feature android:name="android.hardware.microphone" android:required="false" />

</manifest>
EOF
    echo -e "${GREEN}✅ Permissões configuradas${NC}"
fi

###############################################################################
# 7. BUILD DO APK
###############################################################################
echo -e "\n${YELLOW}🏗️  Gerando APK...${NC}"

cd android

# Limpar builds anteriores
./gradlew clean

# Gerar APK Debug (mais rápido, para testes)
echo -e "${YELLOW}Gerando APK de Debug...${NC}"
./gradlew assembleDebug

# Gerar APK Release (otimizado, para produção)
echo -e "${YELLOW}Gerando APK de Release...${NC}"

# Criar keystore se não existir (para assinar o APK)
KEYSTORE_FILE="$HOME/voz-magica-release.keystore"
if [ ! -f "$KEYSTORE_FILE" ]; then
    echo -e "${YELLOW}Criando keystore para assinatura...${NC}"
    keytool -genkey -v -keystore "$KEYSTORE_FILE" \
        -alias voz-magica -keyalg RSA -keysize 2048 -validity 10000 \
        -storepass master77 -keypass master77 \
        -dname "CN=Voz Magica, OU=Dev, O=VozMagica, L=City, ST=State, C=BR"
fi

# Configurar gradle para assinar
cat > gradle.properties << EOF
android.useAndroidX=true
android.enableJetifier=true
RELEASE_STORE_FILE=$KEYSTORE_FILE
RELEASE_STORE_PASSWORD=master77
RELEASE_KEY_ALIAS=voz-magica
RELEASE_KEY_PASSWORD=master77
EOF

# Build release
./gradlew assembleRelease

cd ..

###############################################################################
# 8. COPIAR APKS PARA DIRETÓRIO DE OUTPUT
###############################################################################
echo -e "\n${YELLOW}📁 Copiando APKs...${NC}"

mkdir -p "$OUTPUT_DIR"

# APK Debug
if [ -f "android/app/build/outputs/apk/debug/app-debug.apk" ]; then
    cp "android/app/build/outputs/apk/debug/app-debug.apk" \
       "$OUTPUT_DIR/voz-magica-debug-$(date +%Y%m%d).apk"
    echo -e "${GREEN}✅ APK Debug copiado${NC}"
fi

# APK Release
if [ -f "android/app/build/outputs/apk/release/app-release.apk" ]; then
    cp "android/app/build/outputs/apk/release/app-release.apk" \
       "$OUTPUT_DIR/voz-magica-release-$(date +%Y%m%d).apk"
    echo -e "${GREEN}✅ APK Release copiado${NC}"
fi

###############################################################################
# 9. GERAR QR CODE PARA DOWNLOAD (opcional)
###############################################################################
if command -v qrencode >/dev/null 2>&1; then
    echo -e "\n${YELLOW}📱 Gerando QR Code para download...${NC}"
    # Assumindo que você tem um servidor web rodando
    qrencode -t UTF8 "http://192.168.0.115/downloads/voz-magica-release-$(date +%Y%m%d).apk"
fi

###############################################################################
# 10. RESULTADO FINAL
###############################################################################
echo -e "\n${GREEN}═══════════════════════════════════════════════════${NC}"
echo -e "${GREEN}🎉 BUILD ANDROID CONCLUÍDO!${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════${NC}"
echo ""
echo -e "${YELLOW}📱 APKs Gerados:${NC}"
ls -lh "$OUTPUT_DIR"/*.apk 2>/dev/null || echo "Nenhum APK encontrado"
echo ""
echo -e "${YELLOW}📍 Localização:${NC}"
echo "   $OUTPUT_DIR"
echo ""
echo -e "${YELLOW}📲 Como Instalar:${NC}"
echo "   1. Copie o APK para seu dispositivo Android"
echo "   2. Ative 'Fontes desconhecidas' nas configurações"
echo "   3. Abra o arquivo APK no dispositivo"
echo "   4. Siga as instruções de instalação"
echo ""
echo -e "${YELLOW}🔗 Ou use ADB:${NC}"
echo "   adb install $OUTPUT_DIR/voz-magica-release-$(date +%Y%m%d).apk"
echo ""
echo -e "${YELLOW}⚙️  Para abrir no Android Studio:${NC}"
echo "   npx cap open android"
echo ""
