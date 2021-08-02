import React from 'react';
import { Input, Button } from '@material-ui/core';
import PasteIcon from '../../assets/paste.png';
const JoinBtnClk = (props) => {
  const pastekey = () => {
    navigator.clipboard.readText().then((text) => {
      document.getElementById('paste').value = text;
      props.setjoinvalue(document.getElementById('paste').value);
    });
  };
  return (
    <div>
      <p
        style={{
          fontFamily: 'Fira Sans',
          fontSize: '2em',
          color: 'white',
          textAlign: 'center',
        }}
      >
        Join a Game
      </p>
      <p style={{ fontSize: '2em', color: 'white', textAlign: 'center' }}>
        Please type your name :{' '}
      </p>
      <div className='nameInput'>
        <Input
          onChange={(e) => {
            props.setname(e.target.value);
          }}
          style={{ margin: '25px' }}
          placeholder={'Name'}
        />
      </div>
      <p style={{ fontSize: '2em', color: 'white', textAlign: 'center' }}>
        Enter the Game Room id :{' '}
      </p>

      <div
        className='nameInput'
        style={{
          marginTop: '100px',
          textAlign: 'center',
        }}
      >
        <Input
          onChange={(e) => {
            props.setjoinvalue(e.target.value);
          }}
          id='paste'
          style={{ margin: '25px' }}
          placeholder={'ROOM ID'}
        />
        <img
          onClick={pastekey}
          style={{
            display: 'inline-flex',
            verticalAlign: 'middle',
            cursor: 'pointer',
          }}
          src={PasteIcon}
          alt=''
          title='paste'
        />
      </div>
      <Button
        onClick={props.BtnClk}
        style={{ display: 'flex', margin: '0 auto', width: 'max-content' }}
        variant='contained'
        color='primary'
      >
        Check ID
      </Button>
    </div>
  );
};

export default JoinBtnClk;
