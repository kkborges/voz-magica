# Voz Mágica 🎤✨

**App educacional para ensinar crianças a falarem de forma divertida!**

## Sobre o Projeto

Voz Mágica é um aplicativo móvel desenvolvido em React Native com Expo que ajuda crianças a desenvolverem habilidades de fala através de exercícios interativos de pronúncia. O app utiliza reconhecimento de voz para avaliar a pronúncia das crianças e fornece feedback visual e sonoro imediato.

## Funcionalidades Principais

### ✨ Características

- **Reconhecimento de Voz**: Usa tecnologia de reconhecimento de voz para capturar a pronúncia da criança
- **Banco de Palavras**: 28+ palavras organizadas por dificuldade (fácil, médio, difícil) e categoria
- **Feedback Interativo**: Sistema de estrelas e mensagens motivacionais
- **Sínteses de Voz**: Pronuncia palavras completas e sílabas separadas
- **Onboarding**: Tutorial interativo para novos usuários
- **Sistema de Progressão**: Acompanhamento de palavras completadas e estrelas ganhas
- **Interface Colorida**: Design atrativo e amigável para crianças

### 🎮 Níveis de Dificuldade

- **Fácil**: Palavras de 1-2 sílabas (ex: pá, casa, bola)
- **Médio**: Palavras de 2-3 sílabas (ex: boneca, sapato, macaco)
- **Difícil**: Palavras de 3-4 sílabas (ex: borboleta, chocolate, dinossauro)

### 📚 Categorias

- Objetos
- Corpo
- Natureza
- Lugares
- Brinquedos
- Animais
- Roupas
- Alimentos
- Pessoas

## Tecnologias Utilizadas

- **React Native** + **Expo**: Framework principal
- **TypeScript**: Tipagem estática
- **React Navigation**: Navegação entre telas
- **@react-native-voice/voice**: Reconhecimento de voz
- **expo-speech**: Síntese de voz (TTS)
- **expo-av**: Sistema de áudio
- **expo-haptics**: Feedback tátil
- **expo-linear-gradient**: Gradientes visuais

## Estrutura do Projeto

```
voz-magica/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Button.tsx
│   │   ├── StarRating.tsx
│   │   └── WordCard.tsx
│   ├── screens/             # Telas do aplicativo
│   │   ├── OnboardingScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   └── GameScreen.tsx
│   ├── services/            # Serviços
│   │   ├── voiceService.ts
│   │   └── feedbackService.ts
│   ├── data/                # Dados
│   │   └── words.ts
│   └── types/               # Tipos TypeScript
│       └── index.ts
├── assets/                  # Assets (imagens, sons)
├── App.tsx                  # Componente raiz
├── app.json                 # Configuração Expo
├── package.json
└── tsconfig.json
```

## Instalação e Configuração

### Pré-requisitos

- Node.js (v18 ou superior)
- npm ou yarn
- Expo CLI: `npm install -g expo-cli`
- Expo Go app no seu dispositivo móvel (iOS/Android)

### Passos de Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/voz-magica.git
   cd voz-magica
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   npm start
   # ou
   expo start
   ```

4. **Execute no dispositivo**
   - Escaneie o QR code com o app Expo Go (Android) ou câmera (iOS)
   - Ou use `npm run android` / `npm run ios` para emuladores

### Permissões Necessárias

O app requer as seguintes permissões:
- **Microfone**: Para reconhecimento de voz
- **Armazenamento**: Para salvar progresso (futuro)

## Como Usar

1. **Onboarding**: Na primeira execução, você verá um tutorial explicando como usar o app
2. **Tela Inicial**: Escolha o nível de dificuldade (Fácil, Médio ou Difícil)
3. **Jogo**:
   - Veja a palavra exibida
   - Toque em "🔊 Ouvir Palavra" para ouvir a pronúncia completa
   - Toque em "🎵 Ouvir Sílabas" para ouvir cada sílaba separadamente
   - Toque no microfone 🎤 e fale a palavra
   - Receba feedback instantâneo com estrelas e mensagens motivacionais
   - Continue para a próxima palavra

## Sistema de Pontuação

- **3 Estrelas**: 90% ou mais de precisão - "Perfeito!"
- **2 Estrelas**: 70-89% de precisão - "Muito bom!"
- **1 Estrela**: 50-69% de precisão - "Bom trabalho!"
- **0 Estrelas**: Menos de 50% - "Tente novamente!"

## Próximas Funcionalidades

- [ ] Persistência de dados (AsyncStorage)
- [ ] Sistema de conquistas
- [ ] Mais categorias de palavras
- [ ] Modo multiplayer
- [ ] Relatórios de progresso para pais/responsáveis
- [ ] Imagens ilustrativas para cada palavra
- [ ] Desafios diários
- [ ] Tema escuro

## Desenvolvimento

### Comandos Úteis

```bash
npm start          # Inicia o servidor Expo
npm run android    # Roda no emulador Android
npm run ios        # Roda no simulador iOS
npm run web        # Roda no navegador
npm test           # Executa testes
npm run lint       # Verifica código
```

### Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## Suporte

Para reportar bugs ou solicitar funcionalidades, abra uma issue no GitHub.

## Desenvolvido com ❤️

Criado para ajudar crianças a desenvolverem suas habilidades de fala de forma divertida e interativa!
