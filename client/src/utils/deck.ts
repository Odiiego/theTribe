const deck = {
  S: [
    ['pergunta', 'resposta'],
    ['pergunta', 'resposta'],
    ['pergunta', 'resposta'],
    ['pergunta', 'resposta'],
    ['pergunta', 'resposta'],
  ],
  V: [
    ['pergunta', 'resposta'],
    ['pergunta', 'resposta'],
    ['pergunta', 'resposta'],
    ['pergunta', 'resposta'],
    ['pergunta', 'resposta'],
  ],
  M: [
    ['pergunta', 'resposta'],
    ['pergunta', 'resposta'],
    ['pergunta', 'resposta'],
    ['pergunta', 'resposta'],
    ['pergunta', 'resposta'],
  ],
  EL: [
    ['pergunta', 'resposta'],
    ['pergunta', 'resposta'],
    ['pergunta', 'resposta'],
    ['pergunta', 'resposta'],
    ['pergunta', 'resposta'],
  ],
  CT: [
    ['pergunta', 'resposta'],
    ['pergunta', 'resposta'],
    ['pergunta', 'resposta'],
    ['pergunta', 'resposta'],
    ['pergunta', 'resposta'],
  ],
  AE: [
    ['pergunta', 'resposta'],
    ['pergunta', 'resposta'],
    ['pergunta', 'resposta'],
    ['pergunta', 'resposta'],
    ['pergunta', 'resposta'],
  ],
};

export default function getCardByTheme(
  theme: 'S' | 'V' | 'M' | 'EL' | 'CT' | 'AE',
): string[] | undefined {
  return deck[theme]?.shift();
}
