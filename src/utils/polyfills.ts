/**
 * Polyfills para garantir compatibilidade entre ambientes
 */

/**
 * Polyfill para crypto.randomUUID()
 * Garante compatibilidade em ambientes que não suportam a API nativa
 */
if (typeof crypto !== 'undefined' && !crypto.randomUUID) {
  // @ts-ignore - Adicionando polyfill
  crypto.randomUUID = function randomUUID() {
    // Implementação baseada em RFC 4122 versão 4 (UUID aleatório)
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };
}

/**
 * Fallback para ambientes onde crypto não existe
 */
if (typeof global !== 'undefined' && typeof global.crypto === 'undefined') {
  // @ts-ignore - Criando objeto crypto para ambientes que não têm
  global.crypto = {
    randomUUID: function randomUUID() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    },
  } as Crypto;
}
