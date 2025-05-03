// const temas = [
//   'S', // sociedade
//   'V', // variedades
//   'M', // mundo
//   'EL', // esporte
//   'CT', // cienciaTecnologia
//   'AE', // artesEntretenimento
// ];

class Casa {
  counter: number;
  hasPlayer: boolean;
  hasPowerUp: boolean;
  theme: number[];

  constructor(hasPowerUp: boolean = false) {
    this.counter = 0;
    this.hasPlayer = false;
    this.hasPowerUp = hasPowerUp;
    this.theme = this.getThemes();
  }

  getThemes() {
    const numThemes = Math.random() < 0.8 ? 1 : 2;
    const themes: number[] = [];

    while (themes.length < numThemes) {
      const numero = Math.floor(Math.random() * 6);
      if (!themes.includes(numero)) {
        themes.push(numero);
      }
    }

    return themes;
  }
}

class Tabuleiro {
  nPowerUps: number;
  boardSize: number;
  directions: string[];
  casas: Casa[];

  constructor(boardSize: number, nPowerUps: number) {
    this.boardSize = boardSize;
    this.nPowerUps = nPowerUps;
    this.directions = [];
    this.casas = [];

    const powerUpIndices = this.getUniqueRandomIndices(nPowerUps, boardSize);

    for (let i = 0; i < boardSize; i++) {
      const temPowerUp = powerUpIndices.includes(i);
      const casa = new Casa(temPowerUp);
      this.casas.push(casa);
    }
  }

  private getUniqueRandomIndices(n: number, max: number): number[] {
    const indices = new Set<number>();
    while (indices.size < n) {
      const randomIndex = Math.floor(Math.random() * max);
      indices.add(randomIndex);
    }
    return Array.from(indices);
  }
}

export default function createBoard(boardSize: number, nPowerSize: number) {
  return new Tabuleiro(boardSize, nPowerSize);
}
