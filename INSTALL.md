# 🚀 Instalação Rápida - Voz Mágica

## ⚡ Início Ultra-Rápido (5 minutos)

### 1. Pré-requisitos

- Node.js 18+ instalado
- Navegador Chrome ou Edge (recomendado)
- Chave do Google Gemini AI ([obtenha aqui](https://makersuite.google.com/app/apikey))

### 2. Instalação

```bash
# Clone ou navegue até o projeto
cd voz-magica

# Instale dependências do frontend
cd web
npm install

# Configure a chave do Gemini AI
cp .env.example .env
# Edite o arquivo .env e adicione: VITE_GEMINI_API_KEY=sua_chave_aqui

# (Opcional) Instale backend
cd ../server
npm install
```

### 3. Executar

```bash
# Frontend
cd web
npm run dev

# Acesse: http://localhost:3000
```

### 4. (Opcional) Backend

```bash
# Em outro terminal
cd server
npm run dev

# API disponível em: http://localhost:3001
```

## 🎮 Primeiros Passos

1. **Crie um Perfil**
   - Digite o nome da criança
   - Escolha um avatar divertido
   - Selecione a faixa etária (4-5 ou 6-8 anos)

2. **Escolha um Jogo**
   - Comece com "🦁 Mundo Animal" (mais fácil)
   - Depois experimente outros jogos

3. **Permita o Microfone**
   - O navegador vai pedir permissão
   - Clique em "Permitir" para usar reconhecimento de voz

4. **Comece a Jogar!**
   - Clique no botão do microfone 🎤
   - Fale a palavra que aparece
   - Receba feedback e ganhe estrelas ⭐

## ⚙️ Configuração Detalhada

### Obter Chave Gemini AI (Grátis)

1. Acesse: https://makersuite.google.com/app/apikey
2. Faça login com Google
3. Clique em "Create API Key"
4. Copie a chave gerada
5. Cole no arquivo `web/.env`:

```env
VITE_GEMINI_API_KEY=AIzaSy...sua_chave_aqui
```

### Configuração do Microfone

**Windows:**
- Configurações > Privacidade > Microfone
- Permita acesso para navegadores

**macOS:**
- Preferências do Sistema > Segurança > Privacidade
- Microfone > Marque seu navegador

**Linux:**
- Geralmente já funciona
- Se não: `sudo usermod -a -G audio $USER`

### Teste de Compatibilidade

Execute no console do navegador:

```javascript
// Teste Web Speech API
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  console.log('✅ Reconhecimento de voz suportado!');
} else {
  console.log('❌ Use Chrome, Edge ou Safari');
}

// Teste microfone
navigator.mediaDevices.getUserMedia({ audio: true })
  .then(() => console.log('✅ Microfone OK!'))
  .catch(() => console.log('❌ Problema com microfone'));
```

## 🐛 Solução de Problemas

### Erro: "Microfone não encontrado"

**Solução:**
- Conecte um microfone ou headset
- Verifique permissões do navegador
- Reinicie o navegador

### Erro: "Gemini API key inválida"

**Solução:**
- Verifique se copiou a chave corretamente
- Certifique-se que está no arquivo `.env` (não `.env.example`)
- Reinicie o servidor de desenvolvimento

### Erro: "Nenhuma fala detectada"

**Solução:**
- Fale mais alto e próximo ao microfone
- Reduza ruído de fundo
- Teste o microfone em outras aplicações
- Ajuste sensibilidade nas configurações do perfil

### Voz não é reconhecida corretamente

**Solução:**
- Use Chrome ou Edge (melhor suporte)
- Fale pausadamente
- Configure velocidade de fala para "lenta"
- Evite sotaques muito fortes no início

### Backend não conecta

**Solução:**
- Verifique se está rodando em `http://localhost:3001`
- Confira se a porta 3001 não está em uso
- Reinstale dependências: `rm -rf node_modules && npm install`

## 📦 Instalação Offline

Para usar sem internet (apenas frontend, sem Gemini AI):

```bash
# 1. Build do frontend
cd web
npm run build

# 2. Servir arquivos estáticos
npx serve dist
```

O app funcionará com análise básica de pronúncia (sem IA).

## 🔧 Configuração Avançada

### Alterar Portas

**Frontend:**

```javascript
// web/vite.config.ts
export default defineConfig({
  server: {
    port: 3000, // Altere aqui
  },
});
```

**Backend:**

```bash
# server/.env
PORT=3001  # Altere aqui
```

### Modo Produção

```bash
# Build frontend
cd web
npm run build

# Servir com backend
cd ../server
npm start

# Configurar Nginx ou Apache para servir web/dist
```

### Docker (Opcional)

```dockerfile
# Futuro: Dockerfile será adicionado
```

## 📱 Instalação em Tablet/Mobile

1. Acesse a URL do servidor no tablet
2. Adicione à tela inicial (PWA)
3. Use em modo fullscreen

## ✅ Checklist de Instalação

- [ ] Node.js 18+ instalado
- [ ] Dependências instaladas (`npm install`)
- [ ] Chave Gemini AI configurada
- [ ] Frontend rodando em http://localhost:3000
- [ ] Backend rodando em http://localhost:3001 (opcional)
- [ ] Permissão do microfone concedida
- [ ] Perfil criado
- [ ] Primeiro jogo testado

## 🆘 Suporte

Se encontrar problemas:

1. Verifique os logs no console do navegador (F12)
2. Leia a documentação completa em `PROJECT_GUIDE.md`
3. Consulte os READMEs específicos:
   - `web/README.md` - Frontend
   - `server/README.md` - Backend

## 🎓 Tutorial em Vídeo

_(Em breve: link para vídeo tutorial)_

---

**Pronto para começar a mágica?** 🎤✨

Execute `npm run dev` e abra http://localhost:3000!
