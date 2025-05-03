import createBoard from './utils/tabuleiro.js';
import styles from './App.module.scss';
import React from 'react';
import createPlayer from './utils/player.js';
import getCardByTheme from './utils/deck.js';

const temas = [
  'S', // sociedade
  'V', // variedades
  'M', // mundo
  'EL', // esporte
  'CT', // cienciaTecnologia
  'AE', // artesEntretenimento
] as const;

export default function App() {
  const [tabuleiro, setTabuleiro] = React.useState(createBoard(31, 13));
  const [jogador, setJogador] = React.useState(createPlayer());
  const [pergunta, setPergunta] = React.useState<string[] | undefined>(
    undefined,
  );
  const coinRef = React.useRef(null);

  // function handleMove() {
  //   const coinValue = Number(coinRef.current?.value);
  //   if (!coinValue) return;
  //   const casaObjetivoIndex = jogador + coinValue - 1;
  //   // const themes = tabuleiro.casas[casaObjetivoIndex].theme.map(     ISSO VAI SERVIR
  //   //   (tema) => temas[tema],                                         PARA QUE O JOGADOR
  //   // );                                                               POSSA ESCOLHER O TEMA
  //   const card: ICard | undefined = baralho.shift();
  //   if (!card) return;
  //   const indexPergunta = tabuleiro.casas[casaObjetivoIndex].theme[0];
  //   const [pergunta, resposta] = Object.entries(card)[indexPergunta] || [];
  //   console.log(pergunta, resposta);
  // }

  function chooseTile() {
    const moeda = Number(coinRef.current?.value);
    const destino = jogador.planejarMovimento(moeda);

    setPergunta(getCardByTheme(temas[tabuleiro.casas[destino!].theme[0]]));
  }

  // FALTA A LÓGICA DE RESPONDER UMA PERGUNTA E AVANÇAR POSTERIORMENTE

  return (
    <div className={styles.container}>
      <input
        ref={coinRef}
        className={styles.coin}
        placeholder="Moeda"
        type="number"
        name="coin"
        id="coin"
      />
      <button onClick={chooseTile} className={styles.deck}>
        Move
      </button>

      <div className={`${styles.tabuleiro} ${styles.quadrado}`}>
        {tabuleiro.casas.map((casa, n) => (
          <div key={n} className={styles.casa}>
            {casa.theme.map((theme) => (
              <span key={theme} className={styles[temas[theme]]}>
                {temas[theme]}
                {casa.hasPowerUp ? '*' : ''}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
