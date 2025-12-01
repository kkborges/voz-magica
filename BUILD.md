# 🚀 Guia de Build e Deploy - Voz Mágica

## 📋 Pré-requisitos

### Para desenvolvimento:
- **Node.js** >= 18 ([Download](https://nodejs.org/))
- **npm** >= 9 ou **Yarn**
- **Git**

### Para Android:
- **Java Development Kit (JDK)** 17
- **Android Studio** com:
  - Android SDK Platform 33 (Android 13)
  - Android SDK Build-Tools
  - Android Emulator (opcional, para testes)
- **ANDROID_HOME** configurado nas variáveis de ambiente

### Para iOS (apenas macOS):
- **Xcode** >= 14
- **CocoaPods** (`sudo gem install cocoapods`)
- **Xcode Command Line Tools**

---

## 🔧 Configuração Inicial

### 1. Instalação das Dependências

```bash
# Instalar dependências do Node
npm install

# OU com Yarn
yarn install
```

### 2. Inicializar Projeto React Native

Como o projeto foi criado manualmente com TypeScript, precisamos inicializar as pastas nativas:

**Opção A: Usando React Native CLI (Recomendado)**

```bash
# Instalar React Native CLI globalmente
npm install -g react-native-cli

# Criar estrutura nativa (isso vai preencher android/ e ios/)
npx react-native init VozMagicaTemp --template react-native-template-typescript

# Copiar pastas nativas para nosso projeto
cp -r VozMagicaTemp/android/* ./android/
cp -r VozMagicaTemp/ios/* ./ios/

# Remover projeto temporário
rm -rf VozMagicaTemp
```

**Opção B: Script Automático (Criado abaixo)**

```bash
# Executar script de setup
npm run setup:native
```

### 3. Configurar Permissões

#### Android (`android/app/src/main/AndroidManifest.xml`):
```xml
<manifest>
  <!-- Adicionar permissão de microfone -->
  <uses-permission android:name="android.permission.RECORD_AUDIO" />
  <uses-permission android:name="android.permission.INTERNET" />

  <application>
    ...
  </application>
</manifest>
```

#### iOS (`ios/VozMagica/Info.plist`):
```xml
<dict>
  <!-- Adicionar descrição de uso do microfone -->
  <key>NSMicrophoneUsageDescription</key>
  <string>Voz Mágica precisa do microfone para reconhecer sua fala e ajudar no aprendizado!</string>
</dict>
```

---

## 📱 Rodando o Aplicativo

### Android

```bash
# Opção 1: Usando npm scripts
npm run android

# Opção 2: Comandos separados
# Terminal 1 - Metro Bundler
npm start

# Terminal 2 - Build e instalação
npx react-native run-android
```

**Requisitos:**
- Dispositivo físico conectado via USB com depuração USB ativada
- OU Emulador Android rodando (abra pelo Android Studio)

**Troubleshooting:**
```bash
# Limpar cache se houver problemas
cd android && ./gradlew clean && cd ..
npm start -- --reset-cache
```

### iOS (apenas macOS)

```bash
# Instalar CocoaPods dependencies
cd ios && pod install && cd ..

# Rodar no simulador
npm run ios

# OU especificar dispositivo
npx react-native run-ios --device "iPhone 15"
```

**Troubleshooting:**
```bash
# Atualizar pods
cd ios && pod install --repo-update && cd ..

# Limpar build
cd ios && xcodebuild clean && cd ..
```

---

## 🏗️ Build de Produção

### Android APK/AAB

#### Debug APK (para testes):
```bash
cd android
./gradlew assembleDebug
cd ..

# APK estará em: android/app/build/outputs/apk/debug/app-debug.apk
```

#### Release APK (assinado):
```bash
# 1. Gerar keystore (apenas primeira vez)
keytool -genkeypair -v -storetype PKCS12 -keystore voz-magica-release.keystore \
  -alias voz-magica -keyalg RSA -keysize 2048 -validity 10000

# 2. Configurar gradle.properties (adicionar):
# MYAPP_RELEASE_STORE_FILE=voz-magica-release.keystore
# MYAPP_RELEASE_KEY_ALIAS=voz-magica
# MYAPP_RELEASE_STORE_PASSWORD=***
# MYAPP_RELEASE_KEY_PASSWORD=***

# 3. Build release
cd android
./gradlew assembleRelease
cd ..

# APK estará em: android/app/build/outputs/apk/release/app-release.apk
```

#### Android App Bundle (para Play Store):
```bash
cd android
./gradlew bundleRelease
cd ..

# AAB estará em: android/app/build/outputs/bundle/release/app-release.aab
```

### iOS IPA (apenas macOS)

#### Através do Xcode:
1. Abra `ios/VozMagica.xcworkspace` no Xcode
2. Selecione "Generic iOS Device" ou seu dispositivo
3. Product → Archive
4. Distribute App → Ad Hoc/App Store
5. Siga o assistente para assinar e exportar

#### Via linha de comando:
```bash
# Build para release
cd ios
xcodebuild -workspace VozMagica.xcworkspace \
  -scheme VozMagica \
  -configuration Release \
  -archivePath build/VozMagica.xcarchive \
  archive

# Exportar IPA
xcodebuild -exportArchive \
  -archivePath build/VozMagica.xcarchive \
  -exportPath build \
  -exportOptionsPlist ExportOptions.plist
cd ..
```

---

## 📤 Publicação

### Google Play Store

1. **Preparação:**
   - Criar conta de desenvolvedor ($25 única vez)
   - Preparar assets (ícone, screenshots, descrição)
   - Gerar AAB assinado

2. **Upload:**
   - Acessar [Play Console](https://play.google.com/console)
   - Criar novo app
   - Fazer upload do AAB
   - Preencher informações da loja
   - Submeter para revisão

3. **Requisitos:**
   - Ícone: 512x512 PNG
   - Feature Graphic: 1024x500 PNG
   - Screenshots: Pelo menos 2 por tipo de dispositivo
   - Política de Privacidade (URL)

### Apple App Store

1. **Preparação:**
   - Conta Apple Developer ($99/ano)
   - Certificados e provisioning profiles
   - App icons em todos os tamanhos

2. **Upload:**
   - Usar Xcode ou Application Loader
   - Preencher info em [App Store Connect](https://appstoreconnect.apple.com)
   - Submeter para revisão

3. **Requisitos:**
   - Ícone: 1024x1024 PNG (sem transparência)
   - Screenshots para diferentes tamanhos de iPhone/iPad
   - Descrição, palavras-chave
   - Política de Privacidade

---

## 🧪 Testes

### Testes Unitários:
```bash
npm test

# Com coverage
npm test -- --coverage

# Watch mode
npm test -- --watch
```

### Testes E2E (Quando implementados):
```bash
# Android
npm run e2e:android

# iOS
npm run e2e:ios
```

---

## 🔍 Debug

### React Native Debugger:
```bash
# Instalar
brew install --cask react-native-debugger  # macOS
# Windows: baixar do GitHub

# No app, shake o dispositivo e selecione "Debug"
```

### Flipper:
```bash
# Instalar Flipper
brew install --cask flipper  # macOS

# Já vem integrado com React Native 0.62+
# Abra o Flipper e conecte o app
```

### Logs:
```bash
# Android Logcat
npx react-native log-android

# iOS Logs
npx react-native log-ios
```

---

## 📊 Performance

### Bundle Size:
```bash
# Analisar bundle
npx react-native bundle \
  --platform android \
  --dev false \
  --entry-file index.js \
  --bundle-output bundle.js \
  --sourcemap-output bundle.map

# Analisar com source-map-explorer
npm install -g source-map-explorer
source-map-explorer bundle.js bundle.map
```

### Hermes (JavaScript Engine):
- Já habilitado por padrão no React Native 0.70+
- Melhora performance e reduz tamanho do APK

---

## ⚠️ Troubleshooting Comum

### Erro: "SDK location not found"
```bash
# Criar/editar android/local.properties
echo "sdk.dir=/Users/SEU_USUARIO/Library/Android/sdk" > android/local.properties
# No Windows: C:\\Users\\SEU_USUARIO\\AppData\\Local\\Android\\Sdk
```

### Erro: "Unable to load script"
```bash
npm start -- --reset-cache
```

### Erro: "Error: EMFILE: too many open files"
```bash
# macOS/Linux
echo kern.maxfiles=65536 | sudo tee -a /etc/sysctl.conf
echo kern.maxfilesperproc=65536 | sudo tee -a /etc/sysctl.conf
sudo sysctl -w kern.maxfiles=65536
sudo sysctl -w kern.maxfilesperproc=65536
```

### Build lento no Android:
```bash
# Habilitar Gradle Daemon
echo "org.gradle.daemon=true" >> android/gradle.properties
echo "org.gradle.parallel=true" >> android/gradle.properties
echo "org.gradle.configureondemand=true" >> android/gradle.properties
```

---

## 🔗 Links Úteis

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Android Studio](https://developer.android.com/studio)
- [Xcode](https://developer.apple.com/xcode/)
- [Play Console](https://play.google.com/console)
- [App Store Connect](https://appstoreconnect.apple.com)
- [React Native Community](https://github.com/react-native-community)

---

**Última atualização**: 2025-12-01
