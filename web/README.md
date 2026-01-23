# Voz Mágica - Frontend Web 🎮✨

Aplicativo web interativo de terapia de fala para crianças de 4 a 8 anos.

## 🚀 Tecnologias

- **React 18** + **TypeScript 5**
- **Vite** - Build tool rápido
- **Zustand** - Gerenciamento de estado
- **React Router** - Navegação
- **Framer Motion** - Animações
- **Google Gemini AI** - Análise inteligente de pronúncia
- **Web Speech API** - Reconhecimento de voz

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env

# Adicionar sua chave do Gemini AI no arquivo .env
# VITE_GEMINI_API_KEY=sua_chave_aqui
```

## 🎯 Como obter a chave do Gemini AI

1. Acesse: https://makersuite.google.com/app/apikey
2. Faça login com sua conta Google
3. Clique em "Create API Key"
4. Copie a chave e cole no arquivo `.env`

## 🏃 Executar

```bash
# Modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

O aplicativo estará disponível em `http://localhost:3000`

## 🎮 Funcionalidades

### 5 Mini-Jogos Interativos

1. **🦁 Mundo Animal** - Aprenda os nomes dos animais
2. **🎨 Minhas Coisas** - Descubra objetos do dia a dia
3. **🌈 Cores Mágicas** - Aprenda as cores brincando
4. **🔢 Números Divertidos** - Conte e fale os números
5. **🍎 Hora da Comida** - Fale o nome das comidas

### Recursos Principais

- ✅ Reconhecimento de voz em português (BR)
- ✅ Análise inteligente de pronúncia com Gemini AI
- ✅ Feedback personalizado e encorajador
- ✅ Sistema de gamificação (estrelas, níveis, XP)
- ✅ Perfis personalizáveis com avatares
- ✅ Banco de dados com 75+ palavras
- ✅ Design responsivo e amigável para crianças
- ✅ Animações e efeitos visuais
- ⏳ Painel dos pais (em desenvolvimento)
- ⏳ Relatórios de progresso (em desenvolvimento)

## 📱 Compatibilidade

- ✅ Chrome/Edge (recomendado)
- ✅ Safari (iOS/macOS)
- ⚠️ Firefox (suporte limitado ao Web Speech API)

## 🎨 Estrutura do Projeto

```
web/
├── public/              # Arquivos estáticos
├── src/
│   ├── components/      # Componentes reutilizáveis
│   │   ├── Button.tsx
│   │   └── GameCard.tsx
│   ├── pages/          # Páginas principais
│   │   ├── Home.tsx
│   │   ├── Profile.tsx
│   │   └── GamePlay.tsx
│   ├── services/       # Lógica de negócio
│   │   ├── geminiService.ts    # Integração Gemini AI
│   │   └── voiceService.ts     # Reconhecimento de voz
│   ├── stores/         # Gerenciamento de estado
│   │   └── useAppStore.ts
│   ├── data/           # Banco de dados de palavras
│   │   └── words.ts
│   ├── types/          # TypeScript interfaces
│   ├── styles/         # Estilos globais
│   ├── App.tsx         # Componente principal
│   └── main.tsx        # Entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🔧 Configuração

### Sensibilidade do Microfone

Ajuste nas configurações do perfil da criança.

### Velocidade da Fala

Opções: lenta, normal, rápida

### Som e Música

Ative/desative efeitos sonoros e música de fundo.

## 🧪 Testes

```bash
# Executar testes (quando implementados)
npm test
```

## 📝 Licença

Este projeto é parte do aplicativo "Voz Mágica" para terapia de fala infantil.

## 👨‍👩‍👧 Suporte

Para dúvidas ou sugestões, entre em contato através dos issues do GitHub.

---

Desenvolvido com ❤️ para ajudar crianças a desenvolver suas habilidades de fala! 🎤✨
