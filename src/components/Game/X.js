import React from 'react';
import './Game.css';
const beforeStyle = {
  // background: '#fbe57d',
  // width: '93%',
  // height: '13%',
  // position: 'absolute',
  // transform: 'rotate(45deg)',
  // top: '70px',
  // left: '8px',
};
const afterStyle = {
  // background: '#fbe57d',
  // width: '93%',
  // height: '13%',
  // position: 'absolute',
  // transform: 'rotate(-45deg)',
  // top: '70px',
  // left: '8px',
};

const X = () => {
  return (
    <>
      <div className='before beforeX' style={beforeStyle}></div>
      <div className='after afterX' style={afterStyle}></div>
    </>
  );
};

export default X;
