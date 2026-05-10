# 🍎 Deploy iOS - Voz Mágica

## ⚠️ REQUISITOS IMPORTANTES

**O build para iOS só pode ser feito em um Mac** com:
- macOS 11.0 ou superior
- Xcode 13.0 ou superior
- Conta Apple Developer (para distribuição)
- CocoaPods instalado

## 📋 Processo de Build iOS

### 1. Preparar Ambiente Mac

```bash
# Instalar Xcode via App Store
# https://apps.apple.com/us/app/xcode/id497799835

# Instalar Command Line Tools
xcode-select --install

# Instalar CocoaPods
sudo gem install cocoapods

# Instalar Node.js (se não tiver)
brew install node
```

### 2. Clonar Projeto no Mac

```bash
# Clonar repositório
git clone -b claude/voz-magica-speech-game-J6jX8 \
    [URL_DO_REPOSITORIO] ~/voz-magica

cd ~/voz-magica/web
```

### 3. Instalar Dependências

```bash
# Instalar dependências npm
npm install --legacy-peer-deps

# Instalar Capacitor iOS
npm install @capacitor/ios
```

### 4. Configurar Capacitor

```bash
# Se ainda não configurou
npx cap init "Voz Mágica" "com.vozmagica.app" --web-dir=dist

# Adicionar plataforma iOS
npx cap add ios
```

### 5. Build da Aplicação Web

```bash
# Criar .env.production
cat > .env.production << 'EOF'
VITE_GEMINI_API_KEY=your-api-key-here
VITE_API_URL=https://api.vozmagica.com
NODE_ENV=production
VITE_PLATFORM=ios
EOF

# Build
npm run build

# Sync com iOS
npx cap sync ios
```

### 6. Configurar Permissões (Info.plist)

Edite `ios/App/App/Info.plist` e adicione:

```xml
<key>NSMicrophoneUsageDescription</key>
<string>Voz Mágica precisa acessar o microfone para análise de voz e exercícios de pronúncia.</string>

<key>NSCameraUsageDescription</key>
<string>Voz Mágica pode usar a câmera para recursos interativos.</string>

<key>NSSpeechRecognitionUsageDescription</key>
<string>Voz Mágica usa reconhecimento de fala para análise de pronúncia.</string>

<key>UIBackgroundModes</key>
<array>
    <string>audio</string>
</array>
```

### 7. Abrir no Xcode

```bash
# Abrir projeto no Xcode
npx cap open ios
```

### 8. Configurar no Xcode

1. **Team & Signing:**
   - Selecione o target "App"
   - Em "Signing & Capabilities"
   - Escolha seu Team (Apple Developer Account)
   - Configure o Bundle Identifier: `com.vozmagica.app`

2. **Build Settings:**
   - Defina "iOS Deployment Target" para 13.0 ou superior
   - Configure o "Product Name": Voz Mágica

3. **Capabilities:**
   - Adicione "Audio" em Background Modes
   - Configure permissões de microfone

### 9. Build para Dispositivo

**Para Teste (Debug):**
```bash
# Conecte um iPhone via USB
# No Xcode: Product > Destination > Seu iPhone
# Product > Run (⌘R)
```

**Para Distribuição (Release):**
1. No Xcode: Product > Archive
2. Aguarde o build completar
3. Window > Organizer
4. Selecione o arquivo e clique "Distribute App"
5. Escolha método:
   - **App Store Connect**: Para publicar na App Store
   - **Ad Hoc**: Para distribuição limitada (TestFlight)
   - **Enterprise**: Para distribuição interna
   - **Development**: Para testes

### 10. TestFlight (Recomendado para Testes)

```bash
# Via Xcode
# 1. Archive o app (Product > Archive)
# 2. Upload para App Store Connect
# 3. Aguarde processamento (~15 minutos)
# 4. Convide testadores via App Store Connect
# 5. Testadores baixam via TestFlight app
```

## 🔄 Build Alternativo: Usando Serviço de Cloud Build

Se não tiver Mac, pode usar serviços online:

### Opção 1: Expo Application Services (EAS)
```bash
npm install -g eas-cli
eas login
eas build --platform ios
```

### Opção 2: Ionic AppFlow
```bash
# Requer conta Ionic
ionic link
ionic build ios --prod
```

### Opção 3: Codemagic (CI/CD)
- https://codemagic.io
- Conecte seu repositório Git
- Configure workflow para iOS
- Build automático em Mac na nuvem

### Opção 4: Bitrise
- https://bitrise.io
- Integração com GitHub
- Workflow iOS pré-configurado

## 📱 Distribuição

### App Store (Oficial):
1. Conta Apple Developer ($99/ano)
2. Criar app no App Store Connect
3. Upload do IPA
4. Submeter para revisão
5. Aguardar aprovação (1-7 dias)

### TestFlight (Beta Testing):
- Até 10.000 testadores
- Builds expiram em 90 dias
- Não precisa revisão completa

### Enterprise Distribution:
- Requer Apple Developer Enterprise ($299/ano)
- Distribuição interna ilimitada
- Não passa pela App Store

### Ad Hoc:
- Até 100 dispositivos por ano
- Precisa adicionar UDIDs manualmente
- Para testes internos

## 🔧 Scripts Úteis

### Automatizar Build iOS:
```bash
#!/bin/bash
# deploy-ios-auto.sh

cd ~/voz-magica/web

# Build web
npm run build

# Sync
npx cap sync ios

# Build iOS (usando xcodebuild)
cd ios/App
xcodebuild -workspace App.xcworkspace \
           -scheme App \
           -configuration Release \
           -archivePath App.xcarchive \
           archive

# Exportar IPA
xcodebuild -exportArchive \
           -archivePath App.xcarchive \
           -exportPath ./build \
           -exportOptionsPlist exportOptions.plist
```

### exportOptions.plist:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>method</key>
    <string>app-store</string>
    <key>teamID</key>
    <string>YOUR_TEAM_ID</string>
    <key>uploadBitcode</key>
    <false/>
    <key>uploadSymbols</key>
    <true/>
</dict>
</plist>
```

## 🐛 Troubleshooting

### Erro: "Code Signing Error"
```bash
# Limpar derived data
rm -rf ~/Library/Developer/Xcode/DerivedData

# Reabrir Xcode e tentar novamente
```

### Erro: "Pod install failed"
```bash
cd ios/App
pod install --repo-update
```

### Erro: "Module not found"
```bash
# Limpar e reinstalar
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npx cap sync ios
```

## 📚 Recursos

- [Capacitor iOS](https://capacitorjs.com/docs/ios)
- [Apple Developer](https://developer.apple.com)
- [TestFlight](https://developer.apple.com/testflight/)
- [App Store Connect](https://appstoreconnect.apple.com)

## 💡 Recomendação

**Para o seu caso específico (servidor Linux 192.168.0.115):**

1. ✅ **Web**: Use o script `deploy-web.sh` (funciona perfeitamente)
2. ✅ **Android**: Use o script `deploy-android.sh` (gera APK no Linux)
3. ❌ **iOS**: Precisa de Mac ou serviço cloud build

**Melhor solução para iOS sem Mac:**
- Use **Expo Application Services (EAS)** - build iOS na nuvem
- Ou **Codemagic** - CI/CD com máquinas Mac
- Ou contrate um desenvolvedor iOS freelancer para fazer o build inicial
