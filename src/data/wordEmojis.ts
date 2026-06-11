/**
 * Mapa visual das palavras (emoji por palavra)
 * Solução de imagem leve e offline até a integração das ilustrações finais.
 * Ver ASSETS_SPEC.md para o plano de ilustrações profissionais.
 */

export const wordEmojis: Record<string, string> = {
  // ===== Mundo Animal =====
  animal_gato: '🐱',
  animal_cao: '🐶',
  animal_boi: '🐂',
  animal_pato: '🦆',
  animal_urso: '🐻',
  animal_cavalo: '🐴',
  animal_coelho: '🐰',
  animal_macaco: '🐵',
  animal_girafa: '🦒',
  animal_porco: '🐷',
  animal_elefante: '🐘',
  animal_borboleta: '🦋',
  animal_tartaruga: '🐢',
  animal_passaro: '🐦',
  animal_jacare: '🐊',

  // ===== Minhas Coisas =====
  object_bola: '⚽',
  object_casa: '🏠',
  object_mesa: '🍽️',
  object_cama: '🛏️',
  object_copo: '🥤',
  object_livro: '📖',
  object_sapato: '👟',
  object_janela: '🪟',
  object_boneca: '🪆',
  object_bicicleta: '🚲',
  object_travesseiro: '🛌',
  object_brinquedo: '🧸',

  // ===== Cores Mágicas =====
  color_azul: '🔵',
  color_rosa: '🌸',
  color_verde: '🟢',
  color_preto: '⚫',
  color_branco: '⚪',
  color_amarelo: '🟡',
  color_laranja: '🟠',
  color_vermelho: '🔴',
  color_roxo: '🟣',
  color_marrom: '🟤',

  // ===== Números =====
  number_um: '1️⃣',
  number_dois: '2️⃣',
  number_tres: '3️⃣',
  number_quatro: '4️⃣',
  number_cinco: '5️⃣',
  number_seis: '6️⃣',
  number_sete: '7️⃣',
  number_oito: '8️⃣',
  number_nove: '9️⃣',
  number_dez: '🔟',

  // ===== Ações =====
  action_pular: '🤸',
  action_correr: '🏃',
  action_comer: '🍽️',
  action_dormir: '😴',
  action_beber: '🥤',
  action_cantar: '🎤',
  action_dancar: '💃',
  action_brincar: '🎮',
  action_abracar: '🤗',
  action_escrever: '✍️',

  // ===== Comidas Gostosas =====
  food_pao: '🍞',
  food_uva: '🍇',
  food_bolo: '🎂',
  food_suco: '🧃',
  food_banana: '🍌',
  food_maca: '🍎',
  food_queijo: '🧀',
  food_sorvete: '🍦',
  food_chocolate: '🍫',
  food_macarrao: '🍝',

  // ===== Meu Corpo =====
  body_mao: '✋',
  body_pe: '🦶',
  body_olho: '👁️',
  body_boca: '👄',
  body_nariz: '👃',
  body_orelha: '👂',
  body_cabeca: '🗣️',
  body_barriga: '🤰',
  body_dente: '🦷',
  body_joelho: '🦵',

  // ===== Vogais =====
  vowel_a: '🇦',
  vowel_e: '🇪',
  vowel_i: '🇮',
  vowel_o: '🇴',
  vowel_u: '🇺',
  vowel_abelha: '🐝',
  vowel_escola: '🏫',
  vowel_ilha: '🏝️',
  vowel_ovo: '🥚',
  vowel_urso: '🐻',

  // ===== Sons de Animais =====
  sound_auau: '🐶',
  sound_miau: '🐱',
  sound_muu: '🐮',
  sound_quaqua: '🦆',
  sound_cocorico: '🐓',
  sound_bee: '🐑',
  sound_oinc: '🐷',
  sound_piupiu: '🐤',

  // ===== Rimas =====
  rhyme_gato_pato: '🐱🦆',
  rhyme_mao_pao: '✋🍞',
  rhyme_bola_cola: '⚽🧴',
  rhyme_anel_papel: '💍📄',
  rhyme_janela_panela: '🪟🍳',
  rhyme_sapo_papo: '🐸💬',
  rhyme_flor_amor: '🌸❤️',
  rhyme_pe_chule: '🦶🧦',

  // ===== Consoantes =====
  cons_rato: '🐭',
  cons_rua: '🛣️',
  cons_lua: '🌙',
  cons_lapis: '✏️',
  cons_sapo: '🐸',
  cons_zebra: '🦓',
  cons_chave: '🔑',
  cons_prato: '🍽️',

  // ===== Trava-Língua =====
  twister_1: '🐭👕',
  twister_2: '🌾',
  twister_3: '🐸🛍️',
  twister_4: '🕷️',
  twister_5: '🔨',
  twister_6: '🍼',

  // ===== Sequência de Palavras =====
  seq_1: '⚽🔵',
  seq_2: '🐱⚫',
  seq_3: '🏠',
  seq_4: '🧃🍇',
  seq_5: '🦆🟡',
  seq_6: '🎂',

  // ===== Memória Auditiva =====
  mem_1: '🦆🐱',
  mem_2: '⚽🏠',
  mem_3: '1️⃣2️⃣3️⃣',
  mem_4: '🔵🟢🌸',
  mem_5: '🍞🥛🎂',
  mem_6: '🧠',

  // ===== Conversa =====
  conv_oi: '👋',
  conv_bomdia: '☀️',
  conv_obrigado: '🙏',
  conv_porfavor: '🥺',
  conv_desculpa: '😔',
  conv_euteamo: '❤️',
  conv_boanoite: '🌙',
  conv_atelogo: '👋',
};

/**
 * Retorna o emoji da palavra (com fallback amigável)
 */
export function getWordEmoji(wordId: string): string {
  return wordEmojis[wordId] || '✨';
}
