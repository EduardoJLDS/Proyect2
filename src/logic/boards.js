import { WinnerCombos } from "../Constans"


export const checkWinner = (boardtoCheck) => {
    for (const combo of WinnerCombos) {
      const [a, b, c] = combo
      if (boardtoCheck[a] && boardtoCheck[a] === boardtoCheck[b] && 
          boardtoCheck[a] === boardtoCheck[c]) {
        return boardtoCheck[a]
      }
    }
    return null
  }


  export const chekEndGame = (newBoard) =>{
    return newBoard.every(Square => Square !== null)
  }