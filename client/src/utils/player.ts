class Moeda {
  moedas: Record<number, number>;

  constructor(moeda?: Moeda | Partial<Moeda>) {
    if (moeda instanceof Moeda) {
      this.moedas = { ...moeda.moedas };
    } else if (moeda?.moedas) {
      this.moedas = { ...moeda.moedas };
    } else {
      this.moedas = {
        1: 1,
        2: 1,
        3: 1,
        4: 1,
        5: 1,
      };
    }
  }

  adicionar(valor: number, quantidade: number = 1) {
    this.moedas[valor] += quantidade;
  }

  remover(valor: number, quantidade: number = 1) {
    if (this.moedas[valor] >= quantidade) {
      this.moedas[valor] -= quantidade;
    }
    if (quantidade === 1) return valor;
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
  movimentoPlanejado: number | undefined;

  constructor(jogador?: Partial<Jogador>) {
    this.counter = jogador?.counter ?? 0;
    this.posicao = jogador?.posicao ?? -1;
    this.moedas = jogador?.moedas ? new Moeda(jogador.moedas) : new Moeda();
    this.respostaCorreta = jogador?.respostaCorreta ?? false;
    this.movimentoPlanejado = jogador?.movimentoPlanejado;
  }

  planejarMovimento(valorDaMoeda: number): number | null {
    this.movimentoPlanejado = this.posicao + this.moedas.remover(valorDaMoeda)!;
    return this.movimentoPlanejado;
  }

  responderPergunta(respostaPadrão: string, resposta: string) {
    this.respostaCorreta = respostaPadrão === resposta;
    return this.respostaCorreta;
  }

  confirmarMovimento() {
    this.counter += 1;
    if (this.counter % 5 === 0) this.moedas.adicionarTodas();
    if (!this.respostaCorreta || this.movimentoPlanejado === undefined) return;

    this.posicao = this.movimentoPlanejado;
    this.counter += 1;

    this.respostaCorreta = false;
    this.movimentoPlanejado = undefined;
  }
}

export function createPlayer() {
  return new Jogador();
}

export function updatePlayer(data: Partial<Jogador>) {
  return new Jogador(data);
}
