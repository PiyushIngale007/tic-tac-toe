import React from 'react';
import CopyIcon from '../../assets/copy.svg';
import { Input, Button } from '@material-ui/core';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CreateBtnClk = (props) => {
  useEffect(() => {
    return () => {
      console.log('unmounted');
    };
  }, []);

  const copykey = () => {
    navigator.clipboard.writeText(props.roomid);
    toast.info('Room ID copied to clipboard');
  };
  return (
    <div>
      <p
        style={{
          fontFamily: 'Otomanopee One',
          fontSize: '2em',
          color: 'white',
          textAlign: 'center',
        }}
      >
        Create a Game
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
        Your Game Room id is :{' '}
      </p>
      <div className='id-div'>
        <p
          id='copyId'
          style={{
            paddingLeft: '20px',
            paddingRight: '20px',
            fontSize: '2em',
            color: 'white',
            textAlign: 'center',
          }}
        >
          {props.roomid}
        </p>
        <div className='imgCopy'>
          <img
            onClick={copykey}
            width='25px'
            style={{ display: 'inline-flex', verticalAlign: 'middle' }}
            src={CopyIcon}
            alt=''
          />
        </div>
      </div>
      <Button
        onClick={() => props.BtnClk()}
        style={{
          display: 'flex',
          margin: '0 auto',
          marginTop: '50px',
          width: 'max-content',
        }}
        variant='contained'
        color='primary'
      >
        Start Game
      </Button>
      <ToastContainer />
    </div>
  );
};

export default CreateBtnClk;
