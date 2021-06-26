import React from 'react';
import './Game.css'

function Game(props) {
    function btn_clk(number) {
    }

    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 100px)",
            justifyContent: "center",
            alignContent: "center"
        }}>
            <button onClick={() => btn_clk(0)} className="btn"></button>
            <button className="btn"></button>
            <button className="btn"></button>
            <button className="btn"></button>
            <button className="btn"></button>
            <button className="btn"></button>
            <button className="btn"></button>
            <button className="btn"></button>
            <button className="btn"></button>
        </div>
    );
}

export default Game;
