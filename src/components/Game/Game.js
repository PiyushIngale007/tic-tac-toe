import React from 'react';
import './Game.css'

function Game(props) {
    function btn_clk(number) {
    }

    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "auto auto auto",
            justifyContent: "center",
            alignContent: "center"
        }}>
            <div onClick={() => btn_clk(0)} className="btn"></div>
            <div className="btn"></div>
            <div className="btn"></div>
            <div className="btn"></div>
            <div className="btn"></div>
            <div className="btn"></div>
            <div className="btn"></div>
            <div className="btn"></div>
            <div className="btn"></div>
        </div>
    );
}

export default Game;
