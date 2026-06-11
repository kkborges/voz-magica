# 🎨 Especificação de Assets - Voz Mágica

Briefing para designer/ilustrador contratado. O app já funciona com emojis
como placeholders (ver `src/data/wordEmojis.ts`) — estes assets substituem
os emojis gradualmente, sem bloquear o lançamento.

## Identidade Visual

- **Paleta**: Rosa #FF6B9D · Laranja #FFA94D · Amarelo #FFD93D · Verde #6BCF7F · Turquesa #4ECDC4
- **Estilo**: flat/cartoon, contornos arredondados, alegre, traço grosso
- **Público**: crianças de 4-8 anos
- **Referências**: Duolingo ABC, Khan Academy Kids, LingoKids

## Prioridade 1 — Ilustrações das Palavras (137 itens)

| Spec | Valor |
|------|-------|
| Formato | PNG com fundo transparente (+ fonte vetorial SVG/AI) |
| Tamanho | 512x512 px |
| Nomenclatura | igual ao `id` da palavra: `animal_gato.png`, `food_pao.png`... |
| Destino | `src/assets/images/words/` |

Lista completa de IDs e palavras: ver `src/data/words/*.ts`.
Lotes sugeridos (por ordem de visibilidade no app):
1. **Lote 1 (40 itens)**: Mundo Animal (15), Vogais (10), Sons de Animais (8) + 7 objetos
2. **Lote 2 (47 itens)**: Objetos restantes, Cores, Números, Ações
3. **Lote 3 (50 itens)**: Comidas, Corpo, módulos especializados

## Prioridade 2 — Avatares (8 personagens)

Personagens com personalidade (ver `src/data/avatars.ts`):

| Avatar | Personalidade | Cor base |
|--------|---------------|----------|
| Raposa Rosada | Animada, encorajadora | #FF6B9D |
| Gatinha Mágica | Curiosa, carinhosa | #A29BFE |
| Ursinho Carinhoso | Afetuoso, paciente | #6BCF7F |
| Pandinha Divertida | Alegre, engraçada | #4ECDC4 |
| Leão Corajoso | Valente, confiante | #FFA94D |
| Sapinha Saltitante | Ativa, brincalhona | #95E1D3 |
| Unicórnio Mágico | Mágica, sonhadora | #E056FD |
| Dragãozinho Amigável | Aventureiro, épico | #F97E72 |

**Poses por avatar** (4 cada = 32 ilustrações):
1. Neutro/feliz (seleção de perfil)
2. Celebrando (acertos)
3. Pensativo/apoiando (dicas)
4. Falando (boca aberta — para animação de divisão silábica)

Spec: PNG transparente 1024x1024, nomenclatura `raposa_neutral.png`,
`raposa_celebrate.png`, `raposa_think.png`, `raposa_talk.png`...

## Prioridade 3 — UI e Lojas

- [ ] Splash screen: 1242x2688 (fundo gradiente + logo + mascote)
- [ ] Feature Graphic Play Store: 1024x500
- [ ] 6-8 Screenshots decorados (molduras + textos) — ver store/STORE_LISTING.md
- [ ] Ícones dos 15 módulos (substituir emojis): 256x256 PNG
- [ ] Refinamento do ícone do app (atual em `store/icons/` foi gerado proceduralmente)

## Prioridade 4 — Áudio (com fonoaudiólogo/locutor)

- [ ] 137 pronúncias das palavras (voz feminina clara, pt-BR, WAV 44.1kHz → MP3 64kbps)
- [ ] 137 versões silábicas pausadas ("GA... TO")
- [ ] 6 efeitos sonoros: sucesso, estrela, conquista, level-up, clique, incentivo
- Destino: `src/assets/audio/`
- **Nota**: o TTS nativo já cobre 100% do app — áudios gravados são um upgrade
  de qualidade, não um bloqueador.

## Orçamento Estimado (mercado BR, 2026)

| Item | Faixa |
|------|-------|
| 137 ilustrações de palavras | R$ 2.000 - 5.500 |
| 8 avatares × 4 poses | R$ 1.600 - 4.000 |
| UI/lojas/splash | R$ 800 - 2.000 |
| Locução 137 palavras + efeitos | R$ 1.200 - 3.000 |
| **Total** | **R$ 5.600 - 14.500** |

Onde contratar: Workana, 99designs, Fiverr (ilustração), ou parceria com
estudante de fonoaudiologia para locução supervisionada.
