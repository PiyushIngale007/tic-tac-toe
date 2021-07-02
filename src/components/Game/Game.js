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
      {props.func1()}
      <div onClick={() => props.func(1)} id='1' className='btn placeHolder'>
        <X />
      </div>
      <div onClick={() => props.func(2)} id='2' className='btn'>
        <O />
      </div>
      <div onClick={() => props.func(3)} id='3' className='btn'></div>
      <div onClick={() => props.func(4)} id='4' className='btn'></div>
      <div onClick={() => props.func(5)} id='5' className='btn'></div>
      <div onClick={() => props.func(6)} id='6' className='btn'></div>
      <div onClick={() => props.func(7)} id='7' className='btn'></div>
      <div onClick={() => props.func(8)} id='8' className='btn'></div>
      <div onClick={() => props.func(9)} id='9' className='btn'></div>
    </div>
  );
}

export default Game;
