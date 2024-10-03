import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import Die from './Die'
import {nanoid} from 'nanoid'
import '../App.css'
import Confetti from 'react-confetti'

export default function Main(){
    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)

    //keeping two states in sync
    useEffect(() => {
        const allHeld = dice.every(die => die.isHeld === true)
        const firstVal = dice[0].value
        const allSameVal = dice.every(die => die.value === firstVal)

        allHeld && allSameVal ? setTenzies(true) : setTenzies(false)
    }, [dice])

    function allNewDice(){
       const newDice = []
       for(let i = 0; i < 10; i++){
            newDice.push(
                {value: Math.ceil(Math.random() * 6), 
                isHeld: false,
                id: nanoid()
            })
       }
        return newDice
    }


    function rollDice(){
        if(tenzies){
            setDice(allNewDice)
        }
        setDice(oldDice => oldDice.map(die => {
            return die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)}
        }))
    }

    function holdDice(id){
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? {...die, isHeld: !die.isHeld} : die
        }))
    }

    const diceElements = dice.map(die => <Die value={die.value} isHeld={die.isHeld} key={die.id} holdDice={() => holdDice(die.id)}/>)
    return(
        <main>
            <h1>Tenzies</h1>
            <p> Roll untill all dice are the same value. Click each die to freeze it at its current value between roll.</p>
            <div className="die-container">
            {diceElements}
            </div>
            {tenzies && <Confetti width={window.innerWidth} height={window.innerHeight} />}
            {<h1 className="win">{tenzies ? "YOU WON" : ""}</h1>}
            <button className="roll" onClick={rollDice}> {tenzies ? "Restart" : "Roll"} </button>
        </main>
    )
}