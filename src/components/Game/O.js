import React from 'react';

const beforeStyle = {
  // background: '#8ac3ed',
  // width: '90%',
  // height: '90%',
  // position: 'absolute',
  // borderRadius: '50%',
  // left: '8px',
  // top: '8px',
  // transform: 'rotate(45deg)'
};
const afterStyle = {
  // background: '#252526',
  // width: '70%',
  // height: '70%',
  // position: 'absolute',
  // borderRadius: '50%',
  // left: '23px',
  // top: '23px',
  // transform: 'rotate(45deg)'
};

const O = () => {
  return (
    <>
      <div className='before beforeO' style={beforeStyle}></div>
      <div className='after afterO' style={afterStyle}></div>
    </>
  );
};

export default O;
