import './App.css';
import PlayerHand from './PlayerHand';
import { useEffect, useState } from 'react';
import { calcScore, isOver21, updateStatus } from './AppFunctions.js'
import { fetchGetRequest } from './ServerRequestFunctions.js'

//phase 1 - start/restart,shuffle and player turn | phase 2 - dealer turn |phase 3 - win/lose screen+play again button(return to phase 1)
function App() {
  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [gamePhase, setGamePhase] = useState(1);
  const [DeckLength, setLength] = useState(0);
  const [status, setStatus] = useState(null);



  function newGame() {
    reset();
    fetchGetRequest("DrawInit") .then(obj => {  setPlayerCards(arr => arr.concat(arr, obj));});
    fetchGetRequest("DealerCards") .then(obj => { setDealerCards(arr => arr.concat(arr, obj));});
    fetchGetRequest("DeckLength").then(obj => {setLength(obj);});
  }

  function draw() {
    if (gamePhase === 1 && !isOver21()) {
      {
        fetchGetRequest("Draw").then(obj => {setPlayerCards(arr => [...arr, obj]);});
        setLength(len => len - 1);
      }
    }
  }

  function dealerTurn() {
    fetchGetRequest("DealerPlay").then(obj => {setDealerCards(obj);});
    fetchGetRequest("DeckLength").then(obj => {setLength(obj);});
  }

  function stand() {
    if (gamePhase === 1) {
      setGamePhase(2);
      dealerTurn();//does not update dealerCards state instantly
      setGamePhase(3);
    }
  }
  function reset() {
    fetchGetRequest("Reset");
    setGamePhase(1);
    setDealerCards([]);
    setPlayerCards([]);
    setStatus(null);
  }

  function setGameEnd(isVictory) {
    isVictory ? setStatus("YOU WIN!") : setStatus("YOU LOSE!");
  }

  useEffect(() => {
    if (gamePhase === 1) {
      newGame();
    }
  }, [])

  useEffect(() => {
    if (isOver21(playerCards)) {
      setGameEnd(false);
      setGamePhase(3);
    }
  }, [playerCards]);

  useEffect(() => {
    if (gamePhase === 3)
      if (isOver21(dealerCards)) {
        setGameEnd(true);
      }
      else
        calcScore(playerCards) > calcScore(dealerCards) ? setGameEnd(true) : setGameEnd(false);
  }, [dealerCards])

  return (
    <div className="App">
      <h2 className="label" >Dealer Cards</h2>
      <PlayerHand cards={dealerCards} hideLeft={status != null ? false : true} />
      <p className="label">Dealer's Score:{updateStatus(status, dealerCards)}</p>
      <h2 className="label" >Your Cards</h2>
      <PlayerHand cards={playerCards} />
      <p className="label">Your Score:{calcScore(playerCards)}</p>
      <button className="optionButton" onClick={draw}>Hit</button>
      <button className="optionButton" onClick={stand}>Stand</button>
      <button className="optionButton" onClick={newGame}>Reset</button>
      <p className="topLeftLabel label"> Cards left in deck:{DeckLength}</p>
      <h1 className="gameEnd">{status}</h1>
    </div>
  );
}


export default App;