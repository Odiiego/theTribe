import createBoard from './utils/tabuleiro.js';
import styles from './App.module.scss';
import React from 'react';
import { createPlayer, updatePlayer } from './utils/player.js';
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
  const [tabuleiro] = React.useState(createBoard(31, 13));
  const [jogador, setJogador] = React.useState(createPlayer());
  const [pergunta, setPergunta] = React.useState<string[] | undefined>(
    undefined,
  );
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const coinRef = React.useRef<HTMLInputElement>(null);

  function chooseTile() {
    const moeda = Number(coinRef.current?.value);
    const destino = jogador.planejarMovimento(moeda);

    setPergunta(getCardByTheme(temas[tabuleiro.casas[destino!].theme[0]]));
    dialogRef.current?.showModal();
  }

  function acertarPergunta() {
    if (!pergunta) return;
    jogador.responderPergunta(pergunta[1], 'resposta');
    dialogRef.current?.close();
    jogador.confirmarMovimento();
    setJogador(updatePlayer(jogador));
  }
  function errarPergunta() {
    if (!pergunta) return undefined;
    jogador.responderPergunta(pergunta[1], '');
    dialogRef.current?.close();
    jogador.confirmarMovimento();
    setJogador(updatePlayer(jogador));
  }

  return (
    <div className={styles.container}>
      <>
        <dialog className={styles.dialog} ref={dialogRef}>
          <h2>{pergunta ? pergunta[0] : 'titulo'}</h2>
          <button onClick={acertarPergunta}> Acertar</button>
          <button onClick={errarPergunta}>Errar</button>
        </dialog>
      </>
      <div className={styles.mesa}>
        <input
          ref={coinRef}
          className={styles.coin}
          placeholder=""
          type="number"
          name="coin"
          id="coin"
        />
        <button onClick={chooseTile} className={styles.deck}>
          Deck
        </button>

        <div className={`${styles.tabuleiro} ${styles.quadrado}`}>
          {tabuleiro.casas.map((casa, n) => (
            <div key={n} className={styles.casa}>
              {casa.theme.map((theme) => (
                <span key={theme} className={styles[temas[theme]]}>
                  {jogador.posicao == n ? '🐭' : temas[theme]}
                  {casa.hasPowerUp ? '⭐' : ''}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
