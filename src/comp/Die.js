import React from 'react';
import ReactDOM from 'react-dom/client';
import '../App.css'

export default function Die(props){
    const styles = {
        backgroundColor : props.isHeld ? "#59E391" : "white"
    }

    return(
        <div className="die-face" style={styles} onClick={props.holdDice}>
            <h4 className="die">{props.value}</h4>
        </div>
    )
}