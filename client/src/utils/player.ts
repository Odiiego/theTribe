class Moeda {
  moedas: Record<number, number>;
  constructor() {
    this.moedas = {
      1: 1,
      2: 1,
      3: 1,
      4: 1,
      5: 1,
    };
  }

  adicionar(valor: number, quantidade: number = 1) {
    this.moedas[valor] += quantidade;
  }

  remover(valor: number, quantidade: number = 1) {
    if (this.moedas[valor] >= quantidade) {
      this.moedas[valor] -= quantidade;
    }
    if (quantidade == 1) return valor;
  }

  adicionarTodas() {
    for (const valor in this.moedas) {
      this.moedas[valor] += 1;
    }
  }
}

class Jogador {
  counter: number;
  posicao: number;
  moedas: Moeda;
  respostaCorreta: boolean;
  movimentoPlanejado: number | null;

  constructor() {
    this.counter = 0;
    this.posicao = 0;
    this.moedas = new Moeda();
    this.respostaCorreta = false;
    this.movimentoPlanejado = null;
  }

  planejarMovimento(valorDaMoeda: number): number | null {
    this.movimentoPlanejado =
      this.posicao + this.moedas.remover(valorDaMoeda)! - 1;
    return this.movimentoPlanejado;
  }

  responderPergunta(respostaPadrão: string, resposta: string) {
    this.respostaCorreta = respostaPadrão == resposta;
    return this.respostaCorreta;
  }

  confirmarMovimento() {
    this.counter += 1;
    if (this.counter % 5 == 0) this.moedas.adicionarTodas();
    if (!this.respostaCorreta || !this.movimentoPlanejado) return;

    this.posicao = this.movimentoPlanejado + 1;
    this.counter += 1;
    console.log(`Jogador avançou para a posição ${this.posicao}`);

    this.respostaCorreta = false;
    this.movimentoPlanejado = null;
  }
}

export default function createPlayer() {
  return new Jogador();
}
