import React from 'react';
import './Game.css';
import X from './X';
import O from './O';

function Game(props) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto auto auto',
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      {props.moves.map((move, index) => {
        if (move === '') {
          return (
            <div
              onClick={() => props.func(index + 1)}
              id={index + 1}
              className='btn '
              key={index + '1'}
            >
              <div className='placeholder'>
                {props.playerPiece === 'X' && !props.result ? (
                  <X />
                ) : props.playerPiece === 'O' && !props.result ? (
                  <O />
                ) : null}
              </div>
            </div>
          );
        } else if (move === 'X') {
          return (
            <div
              onClick={() => props.func(index + 1)}
              id={index + 1}
              key={index + '1'}
              className='btn'
            >
              <X />
            </div>
          );
        } else {
          return (
            <div
              onClick={() => props.func(index + 1)}
              id={index + 1}
              key={index + '1'}
              className='btn'
            >
              <O />
            </div>
          );
        }
      })}
    </div>
  );
}

export default Game;
