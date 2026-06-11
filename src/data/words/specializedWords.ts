/**
 * Bancos de palavras - Módulos Especializados (8-15)
 * Baseados em técnicas fonoaudiológicas específicas:
 * vogais, rimas, sons de animais, trava-línguas, consoantes,
 * sequências, memória auditiva e frases de conversa
 */

import { GameWord, GameCategory, Difficulty } from '@/types';

function makeWord(
  id: string,
  word: string,
  syllables: string[],
  difficulty: Difficulty,
  hint: string,
  relatedWords: string[] = [],
): GameWord {
  return {
    id,
    word,
    category: GameCategory.CUSTOM,
    difficulty,
    syllables,
    phonemes: [],
    imageUrl: `specialized/${id}.png`,
    audioUrl: `audio/specialized/${id}.mp3`,
    relatedWords,
    hints: [{ type: 'context', content: hint }],
  };
}

// ===== MÓDULO 8: VOGAIS =====
export const vowelWords: GameWord[] = [
  makeWord('vowel_a', 'A', ['A'], Difficulty.EASY, 'A primeira letra! Abra bem a boca: Aaaa!'),
  makeWord('vowel_e', 'E', ['E'], Difficulty.EASY, 'Sorria e fale: Eeee!'),
  makeWord('vowel_i', 'I', ['I'], Difficulty.EASY, 'Estique o sorriso: Iiii!'),
  makeWord('vowel_o', 'O', ['O'], Difficulty.EASY, 'Faça a boca redondinha: Oooo!'),
  makeWord('vowel_u', 'U', ['U'], Difficulty.EASY, 'Faça biquinho: Uuuu!'),
  makeWord('vowel_abelha', 'ABELHA', ['A', 'BE', 'LHA'], Difficulty.MEDIUM, 'Começa com A e faz mel!'),
  makeWord('vowel_escola', 'ESCOLA', ['ES', 'CO', 'LA'], Difficulty.MEDIUM, 'Começa com E, onde você aprende!'),
  makeWord('vowel_ilha', 'ILHA', ['I', 'LHA'], Difficulty.MEDIUM, 'Começa com I, terra no meio do mar!'),
  makeWord('vowel_ovo', 'OVO', ['O', 'VO'], Difficulty.EASY, 'Começa com O, a galinha bota!'),
  makeWord('vowel_urso', 'URSO', ['UR', 'SO'], Difficulty.EASY, 'Começa com U, grande e peludo!'),
];

// ===== MÓDULO 9: RIMAS =====
export const rhymeWords: GameWord[] = [
  makeWord('rhyme_gato_pato', 'GATO E PATO', ['GA', 'TO', 'E', 'PA', 'TO'], Difficulty.MEDIUM, 'Duas palavras que rimam!', ['gato', 'pato']),
  makeWord('rhyme_mao_pao', 'MÃO E PÃO', ['MÃO', 'E', 'PÃO'], Difficulty.MEDIUM, 'Rimam com ÃO!'),
  makeWord('rhyme_bola_cola', 'BOLA E COLA', ['BO', 'LA', 'E', 'CO', 'LA'], Difficulty.MEDIUM, 'Rimam com OLA!'),
  makeWord('rhyme_anel_papel', 'ANEL E PAPEL', ['A', 'NEL', 'E', 'PA', 'PEL'], Difficulty.HARD, 'Rimam com EL!'),
  makeWord('rhyme_janela_panela', 'JANELA E PANELA', ['JA', 'NE', 'LA', 'E', 'PA', 'NE', 'LA'], Difficulty.HARD, 'Rimam com ELA!'),
  makeWord('rhyme_sapo_papo', 'SAPO E PAPO', ['SA', 'PO', 'E', 'PA', 'PO'], Difficulty.MEDIUM, 'Rimam com APO!'),
  makeWord('rhyme_flor_amor', 'FLOR E AMOR', ['FLOR', 'E', 'A', 'MOR'], Difficulty.HARD, 'Rimam com OR!'),
  makeWord('rhyme_pe_chule', 'PÉ E CHULÉ', ['PÉ', 'E', 'CHU', 'LÉ'], Difficulty.MEDIUM, 'Rimam com É! Que engraçado!'),
];

// ===== MÓDULO 10: SONS DE ANIMAIS =====
export const animalSoundWords: GameWord[] = [
  makeWord('sound_auau', 'AU AU', ['AU', 'AU'], Difficulty.EASY, 'O som do cachorro!'),
  makeWord('sound_miau', 'MIAU', ['MI', 'AU'], Difficulty.EASY, 'O som do gato!'),
  makeWord('sound_muu', 'MUU', ['MUU'], Difficulty.EASY, 'O som da vaca!'),
  makeWord('sound_quaqua', 'QUÁ QUÁ', ['QUÁ', 'QUÁ'], Difficulty.EASY, 'O som do pato!'),
  makeWord('sound_cocorico', 'COCORICÓ', ['CO', 'CO', 'RI', 'CÓ'], Difficulty.MEDIUM, 'O som do galo de manhã!'),
  makeWord('sound_bee', 'BÉÉÉ', ['BÉÉÉ'], Difficulty.EASY, 'O som da ovelha!'),
  makeWord('sound_oinc', 'OINC OINC', ['OINC', 'OINC'], Difficulty.MEDIUM, 'O som do porco!'),
  makeWord('sound_piupiu', 'PIU PIU', ['PIU', 'PIU'], Difficulty.EASY, 'O som do passarinho!'),
];

// ===== MÓDULO 11: CONSOANTES DIFÍCEIS =====
export const consonantWords: GameWord[] = [
  makeWord('cons_rato', 'RATO', ['RA', 'TO'], Difficulty.MEDIUM, 'Treine o R! Rrrrato!', ['gato', 'pato']),
  makeWord('cons_rua', 'RUA', ['RU', 'A'], Difficulty.MEDIUM, 'Treine o R! Onde os carros passam!'),
  makeWord('cons_lua', 'LUA', ['LU', 'A'], Difficulty.EASY, 'Treine o L! Brilha à noite!', ['rua']),
  makeWord('cons_lapis', 'LÁPIS', ['LÁ', 'PIS'], Difficulty.MEDIUM, 'Treine o L! Para desenhar!'),
  makeWord('cons_sapo', 'SAPO', ['SA', 'PO'], Difficulty.EASY, 'Treine o S! Pula na lagoa!'),
  makeWord('cons_zebra', 'ZEBRA', ['ZE', 'BRA'], Difficulty.HARD, 'Treine o Z! Listrada!'),
  makeWord('cons_chave', 'CHAVE', ['CHA', 'VE'], Difficulty.MEDIUM, 'Treine o CH! Abre a porta!'),
  makeWord('cons_prato', 'PRATO', ['PRA', 'TO'], Difficulty.HARD, 'Treine o PR! Onde fica a comida!', ['rato', 'pato']),
];

// ===== MÓDULO 12: TRAVA-LÍNGUA =====
export const tongueTwisterWords: GameWord[] = [
  makeWord('twister_1', 'O RATO ROEU A ROUPA', ['O', 'RA', 'TO', 'RO', 'EU', 'A', 'ROU', 'PA'], Difficulty.HARD, 'O famoso trava-língua do R!'),
  makeWord('twister_2', 'TRÊS PRATOS DE TRIGO', ['TRÊS', 'PRA', 'TOS', 'DE', 'TRI', 'GO'], Difficulty.HARD, 'Devagar e com calma!'),
  makeWord('twister_3', 'O SAPO DENTRO DO SACO', ['O', 'SA', 'PO', 'DEN', 'TRO', 'DO', 'SA', 'CO'], Difficulty.HARD, 'Cuidado para não trocar as letras!'),
  makeWord('twister_4', 'A ARANHA ARRANHA A RÃ', ['A', 'A', 'RA', 'NHA', 'AR', 'RA', 'NHA', 'A', 'RÃ'], Difficulty.HARD, 'Bem devagar: a aranha... arranha!'),
  makeWord('twister_5', 'PEDRO PREGOU UM PREGO', ['PE', 'DRO', 'PRE', 'GOU', 'UM', 'PRE', 'GO'], Difficulty.HARD, 'Treine o PR bem devagar!'),
  makeWord('twister_6', 'A BABÁ BOBA BEBEU', ['A', 'BA', 'BÁ', 'BO', 'BA', 'BE', 'BEU'], Difficulty.HARD, 'Quantos B! Babá boba!'),
];

// ===== MÓDULO 13: SEQUÊNCIAS DE PALAVRAS =====
export const sequenceWords: GameWord[] = [
  makeWord('seq_1', 'BOLA AZUL', ['BO', 'LA', 'A', 'ZUL'], Difficulty.MEDIUM, 'Fale as duas palavras juntas!'),
  makeWord('seq_2', 'GATO PRETO', ['GA', 'TO', 'PRE', 'TO'], Difficulty.MEDIUM, 'Um gato da cor da noite!'),
  makeWord('seq_3', 'CASA GRANDE', ['CA', 'SA', 'GRAN', 'DE'], Difficulty.MEDIUM, 'Uma casa enorme!'),
  makeWord('seq_4', 'SUCO DE UVA', ['SU', 'CO', 'DE', 'U', 'VA'], Difficulty.MEDIUM, 'Uma bebida deliciosa!'),
  makeWord('seq_5', 'PATO AMARELO NADA', ['PA', 'TO', 'A', 'MA', 'RE', 'LO', 'NA', 'DA'], Difficulty.HARD, 'Três palavras! O pato na lagoa!'),
  makeWord('seq_6', 'EU GOSTO DE BOLO', ['EU', 'GOS', 'TO', 'DE', 'BO', 'LO'], Difficulty.HARD, 'Uma frase inteira! Quem não gosta?'),
];

// ===== MÓDULO 14: MEMÓRIA AUDITIVA =====
export const memoryWords: GameWord[] = [
  makeWord('mem_1', 'PATO E GATO', ['PA', 'TO', 'E', 'GA', 'TO'], Difficulty.MEDIUM, 'Ouça e repita os dois animais!'),
  makeWord('mem_2', 'BOLA E CASA', ['BO', 'LA', 'E', 'CA', 'SA'], Difficulty.MEDIUM, 'Repita as duas coisas!'),
  makeWord('mem_3', 'UM DOIS TRÊS', ['UM', 'DOIS', 'TRÊS'], Difficulty.MEDIUM, 'Repita os três números na ordem!'),
  makeWord('mem_4', 'AZUL VERDE ROSA', ['A', 'ZUL', 'VER', 'DE', 'RO', 'SA'], Difficulty.HARD, 'Três cores na ordem certa!'),
  makeWord('mem_5', 'PÃO LEITE E BOLO', ['PÃO', 'LEI', 'TE', 'E', 'BO', 'LO'], Difficulty.HARD, 'Três comidas! Consegue lembrar?'),
  makeWord('mem_6', 'GATO BOLA CASA PÉ', ['GA', 'TO', 'BO', 'LA', 'CA', 'SA', 'PÉ'], Difficulty.HARD, 'Quatro palavras! Desafio de mestre!'),
];

// ===== MÓDULO 15: CONVERSA (FRASES SOCIAIS) =====
export const conversationWords: GameWord[] = [
  makeWord('conv_oi', 'OI, TUDO BEM?', ['OI', 'TU', 'DO', 'BEM'], Difficulty.MEDIUM, 'Como você cumprimenta um amigo!'),
  makeWord('conv_bomdia', 'BOM DIA', ['BOM', 'DI', 'A'], Difficulty.EASY, 'O que falamos de manhã!'),
  makeWord('conv_obrigado', 'OBRIGADO', ['O', 'BRI', 'GA', 'DO'], Difficulty.MEDIUM, 'Palavrinha mágica de agradecer!'),
  makeWord('conv_porfavor', 'POR FAVOR', ['POR', 'FA', 'VOR'], Difficulty.MEDIUM, 'Palavrinha mágica de pedir!'),
  makeWord('conv_desculpa', 'DESCULPA', ['DES', 'CUL', 'PA'], Difficulty.MEDIUM, 'Quando fazemos algo sem querer!'),
  makeWord('conv_euteamo', 'EU TE AMO', ['EU', 'TE', 'A', 'MO'], Difficulty.MEDIUM, 'Para quem você ama muito!'),
  makeWord('conv_boanoite', 'BOA NOITE', ['BO', 'A', 'NOI', 'TE'], Difficulty.EASY, 'Antes de dormir!'),
  makeWord('conv_atelogo', 'ATÉ LOGO', ['A', 'TÉ', 'LO', 'GO'], Difficulty.MEDIUM, 'Quando vamos embora!'),
];
