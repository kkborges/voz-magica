# ⚡ Quick Start - Voz Mágica

Guia rápido para começar a desenvolver em 5 minutos!

---

## 🎯 Setup Rápido

### 1️⃣ Instalar Dependências

```bash
# Clone o repositório (se ainda não fez)
git clone https://github.com/kkborges/voz-magica.git
cd voz-magica

# Instale as dependências do Node
npm install
```

### 2️⃣ Configurar Pastas Nativas

As pastas `android/` e `ios/` precisam ser inicializadas com o código nativo do React Native.

**Opção Automática (Recomendado):**
```bash
npm run setup:native
```

Este script vai:
- ✅ Criar um projeto React Native temporário
- ✅ Copiar as pastas android/ e ios/
- ✅ Configurar permissões do microfone
- ✅ Renomear tudo para "VozMagica"
- ✅ Limpar arquivos temporários

**Opção Manual:**

Se o script automático não funcionar, siga as instruções detalhadas em [BUILD.md](BUILD.md).

### 3️⃣ Rodar o App

#### 🤖 Android

```bash
# Certifique-se de ter um emulador rodando ou dispositivo conectado
npm run android
```

**Requisitos Android:**
- Android Studio instalado
- SDK Platform 33 (Android 13)
- Emulador configurado OU dispositivo físico com USB debugging

#### 🍎 iOS (apenas macOS)

```bash
# Instalar CocoaPods dependencies
npm run pods

# Rodar no simulador
npm run ios
```

**Requisitos iOS:**
- macOS
- Xcode 14+
- CocoaPods instalado (`sudo gem install cocoapods`)

---

## 🐛 Problemas Comuns

### Erro: "SDK location not found" (Android)

```bash
# Criar arquivo local.properties
echo "sdk.dir=$ANDROID_HOME" > android/local.properties

# No macOS/Linux (exemplo):
# sdk.dir=/Users/seu-usuario/Library/Android/sdk

# No Windows:
# sdk.dir=C:\\Users\\seu-usuario\\AppData\\Local\\Android\\Sdk
```

### Erro: "Unable to load script"

```bash
# Limpar cache e reiniciar
npm run clean:cache
npm start
```

### Build lento

```bash
# Limpar tudo e reconstruir
npm run clean
npm install
npm run android  # ou ios
```

### iOS: Erro com Pods

```bash
# Atualizar pods
cd ios
pod deintegrate
pod install
cd ..
npm run ios
```

---

## 📱 Testando o Fluxo do App

1. **Welcome Screen** → Toque em "Começar a Aventura"
2. **Create Profile** → Digite nome, escolha avatar e idade
3. **Home Screen** → Clique em "Mundo Animal"
4. **Game Screen** → Toque no microfone 🎤 e fale!

**Palavras para testar:**
- GATO 🐱
- CÃO 🐕
- PATO 🦆
- URSO 🐻
- CAVALO 🐴

---

## 🛠️ Comandos Úteis

```bash
# Desenvolvimento
npm start              # Inicia Metro bundler
npm run android        # Roda no Android
npm run ios           # Roda no iOS
npm run pods          # Atualiza CocoaPods (iOS)

# Qualidade de código
npm run lint          # Roda ESLint
npm run type-check    # Verifica tipos TypeScript
npm test              # Roda testes

# Build de produção
npm run android:build    # APK debug
npm run android:release  # APK release
npm run android:bundle   # AAB para Play Store

# Limpeza
npm run clean            # Remove builds
npm run clean:cache      # Limpa cache do Metro
npm run android:clean    # Limpa build Android
```

---

## 📚 Próximos Passos

Agora que o app está rodando:

1. **Leia a documentação completa**: [README.md](README.md)
2. **Entenda a arquitetura**: [PROJETO.md](PROJETO.md)
3. **Builds de produção**: [BUILD.md](BUILD.md)
4. **Contribua**: Veja nosso [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 💡 Dicas

### Debug
```bash
# Ver logs Android
npx react-native log-android

# Ver logs iOS
npx react-native log-ios

# Abrir menu de desenvolvedor no app
# Android: Cmd+M (Mac) ou Ctrl+M (Windows/Linux)
# iOS: Cmd+D
```

### Performance
- Use **Hermes** (já habilitado por padrão)
- Minimize re-renders com `React.memo`
- Use `useMemo` e `useCallback` quando necessário

### Hot Reload
- **Fast Refresh** está habilitado por padrão
- Salve o arquivo e veja mudanças instantaneamente
- Se não funcionar, pressione `R` no terminal do Metro

---

## 🆘 Precisa de Ajuda?

- 📖 [Documentação React Native](https://reactnative.dev/docs/getting-started)
- 💬 [Stack Overflow](https://stackoverflow.com/questions/tagged/react-native)
- 🐛 [Issues do Projeto](https://github.com/kkborges/voz-magica/issues)

---

**Pronto para começar! 🚀**

Se tudo está funcionando, você deve ver a tela de boas-vindas do Voz Mágica no seu dispositivo/emulador.
