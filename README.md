# 🎤 Voz Mágica

> Aplicativo de apoio à fala infantil - Ajudando crianças a desenvolver a fala de forma divertida e interativa

[![React Native](https://img.shields.io/badge/React%20Native-0.73-blue.svg)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## 📖 Sobre o Projeto

**Voz Mágica** é um aplicativo móvel desenvolvido para crianças de 4 a 8 anos com dificuldades de fala. Através de jogos interativos, reconhecimento de voz e um sistema de feedback inteligente, o aplicativo estimula e auxilia na pronúncia correta de palavras, fonemas e frases de forma divertida e engajadora.

### 🎯 Objetivos

- **Objetivo Principal**: Criar uma ferramenta de apoio terapêutico que auxilie crianças a melhorar a clareza e a confiança na sua fala
- **Objetivos Secundários**:
  - Oferecer uma experiência de aprendizado lúdica e positiva
  - Fornecer um painel de acompanhamento para pais e fonoaudiólogos
  - Tornar o exercício da fala uma atividade divertida e diária
  - Construir uma base de palavras e desafios expansível

## ✨ Funcionalidades Principais

### 🧒 Para Crianças

- **Perfil Personalizado**: Avatar customizável e configurações adaptadas à idade
- **Jogos Interativos**:
  - Mundo Animal
  - Minhas Coisas
  - Números e Cores
  - Ações Simples
  - Categorias customizadas
- **Reconhecimento de Voz**: Análise precisa da pronúncia com feedback em tempo real
- **Feedback Inteligente**:
  - Reforço positivo para acertos
  - Sugestões visuais para palavras similares
  - Divisão silábica para palavras difíceis
  - Músicas e ritmos para memorização
- **Gamificação**:
  - Sistema de estrelas e moedas
  - Níveis de experiência
  - Conquistas e badges
  - Avatares, adesivos e temas desbloqueáveis
  - Desafios diários
  - Sistema de streaks (dias consecutivos)

### 👨‍👩‍👧 Para Pais e Terapeutas

- **Painel de Progresso**: Visualização detalhada do desenvolvimento da criança
- **Relatórios Completos**:
  - Palavras mais praticadas
  - Taxa de acerto por categoria
  - Fonemas com maior dificuldade
  - Gráficos de evolução
- **Modo Terapeuta**:
  - Criação de listas personalizadas de palavras
  - Planos de exercícios customizados
  - Exportação de relatórios em PDF
- **Controle Parental**: Área protegida por senha
- **Privacidade**: Opção de habilitar/desabilitar gravações

## 🏗️ Arquitetura do Projeto

```
voz-magica/
├── src/
│   ├── components/        # Componentes reutilizáveis
│   │   ├── common/       # Botões, cards, inputs, etc.
│   │   ├── game/         # Componentes específicos do jogo
│   │   ├── profile/      # Componentes de perfil
│   │   ├── feedback/     # Componentes de feedback
│   │   └── rewards/      # Componentes de recompensas
│   ├── screens/          # Telas do aplicativo
│   │   ├── onboarding/   # Telas de primeiro uso
│   │   ├── home/         # Tela principal
│   │   ├── profile/      # Gerenciamento de perfil
│   │   ├── game/         # Telas de jogo
│   │   ├── progress/     # Visualização de progresso
│   │   ├── settings/     # Configurações
│   │   └── parent/       # Painel dos pais
│   ├── services/         # Serviços e lógica de negócio
│   │   ├── voice/        # Reconhecimento de voz
│   │   ├── audio/        # Reprodução de áudio
│   │   ├── storage/      # Armazenamento local
│   │   ├── api/          # Comunicação com backend
│   │   └── analytics/    # Analytics e tracking
│   ├── store/            # Gerenciamento de estado (Zustand)
│   ├── types/            # TypeScript types e interfaces
│   ├── utils/            # Funções auxiliares
│   ├── assets/           # Imagens, sons, animações
│   ├── config/           # Configurações do app
│   ├── navigation/       # Navegação
│   ├── hooks/            # Custom hooks
│   └── constants/        # Constantes e temas
├── android/              # Código nativo Android
├── ios/                  # Código nativo iOS
└── __tests__/           # Testes
```

## 🛠️ Tecnologias Utilizadas

### Core
- **React Native 0.73**: Framework para desenvolvimento móvel multiplataforma
- **TypeScript 5.3**: Tipagem estática para maior segurança
- **React Navigation 6**: Navegação entre telas

### Estado e Dados
- **Zustand 4**: Gerenciamento de estado simples e eficiente
- **AsyncStorage**: Persistência de dados local

### Funcionalidades Específicas
- **@react-native-voice/voice**: Reconhecimento de voz (Speech-to-Text)
- **react-native-sound**: Reprodução de áudio e efeitos sonoros
- **react-native-svg**: Gráficos vetoriais
- **date-fns**: Manipulação de datas

### UI/UX
- **react-native-reanimated**: Animações fluidas
- **react-native-linear-gradient**: Gradientes
- **react-native-gesture-handler**: Gestos avançados

### Desenvolvimento
- **ESLint**: Linting de código
- **Prettier**: Formatação de código
- **Jest**: Testes unitários
- **React Native Testing Library**: Testes de componentes

## 🚀 Como Começar

### Pré-requisitos

- Node.js >= 18
- npm >= 9
- React Native CLI
- Xcode (para iOS) ou Android Studio (para Android)

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/voz-magica.git
cd voz-magica
```

2. Instale as dependências:
```bash
npm install
```

3. Para iOS, instale os pods:
```bash
cd ios && pod install && cd ..
```

### Executando o Projeto

#### Android
```bash
npm run android
```

#### iOS
```bash
npm run ios
```

### Scripts Disponíveis

```bash
npm start          # Inicia o Metro bundler
npm run android    # Roda no Android
npm run ios        # Roda no iOS
npm test           # Executa os testes
npm run lint       # Executa o linter
npm run type-check # Verifica tipos TypeScript
```

## 🎨 Design e UX

### Princípios de Design

1. **Simplicidade**: Interface minimalista e intuitiva para crianças
2. **Colorido e Alegre**: Paleta de cores vibrantes e atrativas
3. **Feedback Visual**: Animações e efeitos visuais claros
4. **Acessibilidade**: Suporte para daltonismo, alto contraste e fontes ajustáveis
5. **Sem Frustração**: Sistema de feedback sempre positivo e encorajador

### Paleta de Cores

- **Primária**: Rosa Vibrante (#FF6B9D)
- **Secundária**: Laranja (#FFA94D)
- **Acento**: Amarelo (#FFD93D)
- **Sucesso**: Verde (#6BCF7F)
- **Informação**: Azul Turquesa (#4ECDC4)

## 📊 Sistema de Feedback Inteligente

### Fluxo de Interação

1. **Estímulo**: App apresenta uma imagem e pronúncia clara
2. **Resposta**: Criança tenta falar a palavra
3. **Análise**: Reconhecimento de voz + comparação com palavra-alvo
4. **Feedback**: Baseado no resultado:
   - ✅ **Acerto Perfeito**: Celebração com efeitos visuais e sonoros
   - 🎯 **Pronúncia Parecida**: "Você disse X ou Y?" com apoio visual
   - 💪 **Precisa Praticar**: Divisão silábica ou música de ritmo
   - 🌟 **Encorajamento**: Sempre positivo, sem críticas negativas

## 🔐 Privacidade e Segurança

- **LGPD/GDPR Compliant**: Conformidade com leis de proteção de dados
- **Criptografia**: Dados sensíveis são criptografados
- **Controle Parental**: Acesso aos dados da criança protegido por PIN
- **Gravações Opcionais**: Pais podem desabilitar gravações de áudio
- **Dados Locais**: Informações armazenadas localmente por padrão
- **Anonimização**: Dados de uso podem ser compartilhados de forma anônima (opt-in)

## 🗺️ Roadmap

### Fase 1: MVP (3-4 meses) ✅
- [x] Estrutura base do projeto
- [x] Sistema de tipos e interfaces
- [x] Serviços core (voz, áudio, storage)
- [x] Gerenciamento de estado
- [ ] Cadastro de perfil
- [ ] Módulo "Mundo Animal" (10-15 palavras)
- [ ] Sistema de reconhecimento de voz
- [ ] Feedback básico
- [ ] Sistema de recompensas (estrelas)

### Fase 2: Expansão (2-3 meses)
- [ ] Módulos adicionais (Números, Cores, Objetos, Ações)
- [ ] Painel dos pais
- [ ] Relatórios de progresso
- [ ] Sistema de conquistas
- [ ] Loja de recompensas
- [ ] Desafios diários

### Fase 3: Modo Terapeuta (2 meses)
- [ ] Criação de listas personalizadas
- [ ] Planos de exercícios
- [ ] Análise fonética avançada
- [ ] Exportação de relatórios
- [ ] API para integração com clínicas

### Fase 4: Melhorias com IA (3 meses)
- [ ] Análise fonética com IA
- [ ] Dificuldade adaptativa
- [ ] Recomendações personalizadas
- [ ] Detecção de padrões de erro

### Fase 5: Social e Comunidade (2 meses)
- [ ] Compartilhamento de conquistas
- [ ] Desafios entre amigos
- [ ] Ranking (opcional)

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, leia o [CONTRIBUTING.md](CONTRIBUTING.md) para detalhes sobre nosso código de conduta e processo de pull requests.

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👥 Autores

- **Equipe Voz Mágica** - *Desenvolvimento inicial*

## 🙏 Agradecimentos

- Fonoaudiólogos consultores
- Pais e famílias que participaram dos testes
- Comunidade React Native
- Todos os colaboradores do projeto

## 📞 Contato

- Website: [vozmagica.com](https://vozmagica.com)
- Email: contato@vozmagica.com
- Instagram: [@vozmagicaapp](https://instagram.com/vozmagicaapp)

---

**Feito com ❤️ para ajudar crianças a encontrarem sua voz**
