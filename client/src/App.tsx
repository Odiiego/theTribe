import createDeck from './utils/deck.js';
import createBoard from './utils/tabuleiro.js';
import styles from './App.module.scss';
import React from 'react';

interface ICard {
  pergunta1: string;
  pergunta2: string;
  pergunta3: string;
  pergunta4: string;
  pergunta5: string;
  pergunta6: string;
}

const temas = [
  'S', // sociedade
  'V', // variedades
  'M', // mundo
  'EL', // esporte
  'CT', // cienciaTecnologia
  'AE', // artesEntretenimento
];

export default function App() {
  const [tabuleiro, setTabuleiro] = React.useState(createBoard(31, 13));
  const [jogador, setJogador] = React.useState(0);
  const [card, setCard] = React.useState(null);
  const baralho = createDeck();
  const coinRef = React.useRef(null);

  function handleMove() {
    const coinValue = Number(coinRef.current?.value);
    if (!coinValue) return;
    const casaObjetivoIndex = jogador + coinValue - 1;
    // const themes = tabuleiro.casas[casaObjetivoIndex].theme.map(     ISSO VAI SERVIR
    //   (tema) => temas[tema],                                         PARA QUE O JOGADOR
    // );                                                               POSSA ESCOLHER O TEMA
    const card: ICard | undefined = baralho.shift();
    if (!card) return;
    const indexPergunta = tabuleiro.casas[casaObjetivoIndex].theme[0];
    const [pergunta, resposta] = Object.entries(card)[indexPergunta] || [];
    console.log(pergunta, resposta);
  }

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
      <button onClick={handleMove} className={styles.deck}>
        Move
      </button>

      <div className={`${styles.tabuleiro} ${styles.quadrado}`}>
        {card ? <p className={styles.card}>{card}</p> : ''}
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
