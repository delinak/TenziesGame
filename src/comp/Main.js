import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import Die from './Die'
import {nanoid} from 'nanoid'
import '../App.css'

export default function Main(){
    const [dice, setDice] = useState(allNewDice())

    function allNewDice(){
       const newDice = []
       for(let i = 0; i < 10; i++){
            newDice.push(
                {value: Math.ceil(Math.random() * 6), 
                isHeld: true,
                id: nanoid()
            })
       }
        return newDice
    }

    function rollDice(){
        return setDice(allNewDice())
    }

    const diceElements = dice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld}/>)
    return(
        <main>
            <h1>Tenzies</h1>
            <div className="die-container">
            {diceElements}
            </div>
            <button className="roll" onClick={rollDice}> ROLL </button>
        </main>
    )
}