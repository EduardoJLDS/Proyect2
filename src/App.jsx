import { Children, useState } from "react";
import "./App.css"
import confetti from 'canvas-confetti';
import { Square } from "./componets/Square.jsx";
import { TURNS, WinnerCombos } from "./Constans.jsx";
import { checkWinner } from "./logic/boards";
import { WinnerModal } from "./componets/WinnerModal.jsx";
import { chekEndGame } from "./logic/boards";
function App() {
  const [board, setBoard]= useState (Array(9).fill(null))

  const [turn, setTurn]= useState(TURNS.x)

  const [winner, setWinner]= useState(null)

    const updateBoard = (index) =>{

      if(board[index] || winner) return

      const newBoard = [...board]
      newBoard[index] = turn    
      setBoard(newBoard) 

      const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x
      setTurn(newTurn)

     

      const newWinner = checkWinner(newBoard)
      if(newWinner){
        confetti();
        setWinner(newWinner)
      } else if (chekEndGame(newBoard)){
        setWinner(false)
      }
    }

    const resetGame = ()=>{
      setBoard(Array(9).fill(null))
      setTurn(TURNS.x)
      setWinner(null)
    }

  return (
    <main className="board">
       <h1>3 En Raya</h1>
       <button onClick= {resetGame}>Reiniciar</button>
       <section className="game">
          {
            board.map((square, index) => {
              return(
                <Square 
                key={index}
                index={index}
                updateBoard={updateBoard}
                        >
                  {square}
                </Square>
              )
            })
          }
       </section>
       <section className="turn">
            <Square isSelected={turn == TURNS.x}>
              {TURNS.x}
            </Square>
            <Square isSelected={turn == TURNS.o}>
              {TURNS.o}
            </Square>
          </section>
          <section>
            <WinnerModal winner={winner} resetGame={resetGame}></WinnerModal>
          </section>
    </main>
  )
}

export default App