# 🔧 Setup Nativo - Arquivos Criados Manualmente

Os arquivos nativos do Android e iOS foram criados manualmente para este projeto.

## ✅ O que foi criado

### Android (`android/`)
```
android/
├── build.gradle              # Configuração principal do Gradle
├── settings.gradle           # Módulos do projeto
├── gradle.properties         # Propriedades do Gradle
├── gradlew                   # Wrapper do Gradle (executável)
└── app/
    ├── build.gradle          # Configuração do app
    ├── proguard-rules.pro    # Regras de minificação
    └── src/main/
        ├── AndroidManifest.xml
        ├── java/com/vozmagica/
        │   ├── MainActivity.java
        │   └── MainApplication.java
        └── res/
            └── values/
                ├── strings.xml
                └── styles.xml
```

### iOS (`ios/`)
```
ios/
├── Podfile                   # Dependências CocoaPods
└── VozMagica/
    ├── Info.plist           # Configuração do app
    ├── AppDelegate.h        # Header do delegate
    ├── AppDelegate.mm       # Implementação do delegate
    ├── main.m               # Entry point
    └── LaunchScreen.storyboard  # Tela de splash
```

## 🚀 Como usar

### 1. Instalar dependências

```bash
npm install
```

### 2. Para Android

```bash
# Rodar direto
npm run android

# Ou gerar APK
npm run android:build
```

**Requisitos:**
- Android Studio instalado
- SDK Platform 33
- JDK 17
- `ANDROID_HOME` configurado

### 3. Para iOS (macOS apenas)

```bash
# Instalar pods
npm run pods

# Rodar no simulador
npm run ios
```

**Requisitos:**
- Xcode 14+
- CocoaPods (`sudo gem install cocoapods`)

## ⚠️ Notas Importantes

### Gradle Wrapper
O arquivo `gradlew` está presente, mas você precisa baixar o Gradle wrapper na primeira vez que rodar:

```bash
cd android
./gradlew wrapper --gradle-version=8.3
cd ..
```

### Debug Keystore
Para builds de debug, você precisa gerar o keystore:

```bash
cd android/app
keytool -genkey -v -keystore debug.keystore -storepass android \
  -alias androiddebugkey -keypass android -keyalg RSA \
  -keysize 2048 -validity 10000
cd ../..
```

Ou use qualquer keystore debug existente copiando para `android/app/debug.keystore`.

### CocoaPods (iOS)
Na primeira vez, rode:

```bash
cd ios
pod install
cd ..
```

Isso vai criar o arquivo `.xcworkspace` que você deve usar para abrir no Xcode.

## 🐛 Problemas Comuns

### Android: "SDK location not found"

```bash
# Criar android/local.properties
echo "sdk.dir=$ANDROID_HOME" > android/local.properties
```

### Android: "Gradle sync failed"

```bash
cd android
./gradlew clean
cd ..
npm run android
```

### iOS: "Pod install failed"

```bash
cd ios
pod deintegrate
pod install
cd ..
```

### Permissões negadas no gradlew

```bash
chmod +x android/gradlew
```

## 📦 Build para Produção

### Android Release APK

1. Gerar keystore de release:
```bash
keytool -genkey -v -keystore voz-magica-release.keystore \
  -alias voz-magica -keyalg RSA -keysize 2048 -validity 10000
```

2. Configurar em `android/gradle.properties`:
```properties
MYAPP_RELEASE_STORE_FILE=voz-magica-release.keystore
MYAPP_RELEASE_KEY_ALIAS=voz-magica
MYAPP_RELEASE_STORE_PASSWORD=SUA_SENHA
MYAPP_RELEASE_KEY_PASSWORD=SUA_SENHA
```

3. Atualizar `android/app/build.gradle`:
```gradle
signingConfigs {
    release {
        if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
            storeFile file(MYAPP_RELEASE_STORE_FILE)
            storePassword MYAPP_RELEASE_STORE_PASSWORD
            keyAlias MYAPP_RELEASE_KEY_ALIAS
            keyPassword MYAPP_RELEASE_KEY_PASSWORD
        }
    }
}
```

4. Build:
```bash
npm run android:release
```

### iOS Release

1. Abra `ios/VozMagica.xcworkspace` no Xcode
2. Configure provisioning profiles e certificados
3. Product → Archive
4. Distribute App

## ✅ Verificação

Para verificar se tudo está configurado:

```bash
# Verificar estrutura Android
ls -la android/app/src/main/java/com/vozmagica/

# Verificar estrutura iOS
ls -la ios/VozMagica/

# Testar build
npm run android  # ou npm run ios
```

## 📚 Documentação Adicional

- [BUILD.md](BUILD.md) - Guia completo de build
- [QUICKSTART.md](QUICKSTART.md) - Guia rápido
- [React Native Docs](https://reactnative.dev)

---

**Status**: Arquivos nativos criados manualmente e prontos para uso! 🎉
