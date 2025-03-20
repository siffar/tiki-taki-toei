"use client";
import { useEffect, useState } from 'react';
import Square from './square';
type player = "x" | "o"|"BOTH"|null;

function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [CurrentPlayer, setCurrentPlayer] = useState<'x' | 'o'>(
        Math.round(Math.random() * 1) === 1 ? "x" : "o"
    );
    const [Winner, setWinner] = useState<Player>(null);

    function reset() {
        setSquares(Array(9).fill(null));
        setWinner(null);
        setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? "x" : "o");
    }

    function calculateWinner(squares: Player[]){
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for(let i = 0; i < lines.length; i++){
            const [a,b,c] = lines[i];
            if(squares[a] && 
               squares[a] === squares[b] && 
               squares[a] === squares[c]){
                return squares[a];
            }
            
        }return null;
    }


    function setsquarevalue(index:number) {
         const newData = squares.map((value, i) => {
               if (i===index){
                     return CurrentPlayer;
               }
               return value;
            });

             setSquares(newData)
             setCurrentPlayer(CurrentPlayer === "x" ? "o" : "x");

    }
    
    useEffect(() => {
        const w = calculateWinner(squares);
        if (w) {
            setWinner(w);
        }
        if (!w && !squares.filter((square) => !square).length) {
            setWinner("BOTH");
          }
        });
    
    
    return( 
      <div>
        {!Winner && <p> HEY,{CurrentPlayer} it's your turn.</p>}
        {Winner && Winner !== "BOTH" && <p>Congratulations {Winner}</p>}
        {Winner && Winner === "BOTH" && (
        <p>Congratulations you're both winners</p>
      )}


    <div className='grid'>
    {Array(9).fill(null).map((_, i) => {
        return (
        <Square
                Winner={Winner} 
            key={i} 
            onClick={() => setsquarevalue(i)}
            value={squares[i]}
        />
        );
    })}
    </div> 
    <button className='reset' onClick={reset}>Reset</button>
      </div>
    );
}
export default Board;