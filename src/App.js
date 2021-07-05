import './App.css';
import Game from './components/Game/Game';
import { io } from 'socket.io-client';
import CopyIcon from './assets/copy.svg';
import PasteIcon from './assets/paste.png';

import { useEffect, useState, useRef } from 'react';
import Modal from 'react-modal';
import { Card, CardContent, Input, Button } from '@material-ui/core';
import CreateIcon from './assets/pen.png';
import JoinIcon from './assets/link.png';

let socket = io('http://localhost:4000');
let marked = [];

function App() {
  const [modalIsOpen, setIsOpen] = useState(true);
  const [createJoin, setCreateJoin] = useState('');
  const [joinValue, setJoinValue] = useState('');
  const [RoomId, setRoomId] = useState('');
  const [name, setName] = useState('');
  const [testState, settestState] = useState('');
  const [playerPiece, setPlayerPiece] = useState('');
  const [moves, setMoves] = useState(['', '', '', '', '', '', '', '', '']);
  const [results, setResults] = useState(false);

  const [RoomDetails, setRoomDetails] = useState({
    RoomId: '',
    Player1: 'waiting for player to join',
    Player2: 'waiting for player to join',
  });

  const [messages, setMessages] = useState([]);

  const componentWillUnmount = useRef(false);

  // This is componentWillUnmount
  useEffect(() => {
    return () => {
      componentWillUnmount.current = true;
    };
  }, []);

  useEffect(() => {
    return () => {
      // This line only evaluates to true after the componentWillUnmount happens
      if (componentWillUnmount.current) {
        socket.emit('disconnecting1', RoomId);
        socket.disconnect();
      }
    };
  }, [RoomId]);

  function btn_clk(number) {
    if (!results) {
      socket.emit('onDivClick', number, RoomDetails, playerPiece);
      document.getElementById(number).style.pointerEvents = 'none';

      const newMoves = [...moves];
      newMoves[number - 1] = playerPiece;

      setMoves(newMoves);

      const els = document.getElementsByClassName('btn');
      Array.prototype.forEach.call(els, function (el) {
        // Do stuff here
        el.style.pointerEvents = 'none';
      });
      marked.push(number);
    }
  }

  const listen = () => {
    if (!results) {
      socket.on('draw', (num, piece, details) => {
        const newMoves = [...moves]; //copy the array
        newMoves[num - 1] = piece; //execute the manipulations

        setMoves(newMoves);
        setRoomDetails(details);
        if (!marked.includes(num)) {
          marked.push(num);
        }

        // console.log(document.getElementById(num));
        document.getElementById(num).style.pointerEvents = 'none';
        const els = document.getElementsByClassName('btn');
        Array.prototype.forEach.call(els, function (el, index) {
          // Do stuff here
          if (marked.includes(index + 1)) {
            el.style.pointerEvents = 'none';
          } else {
            el.style.pointerEvents = 'auto';
          }
        });
        socket.off('draw');
        // document.getElementsByClassName('btn').style.pointerEvents = 'auto';
      });
    }

    socket.off('result');
    socket.on('result', (name) => {
      console.log(name);

      document.getElementById('res').innerText = name + ' Won';
      setResults(true);
      const els = document.getElementsByClassName('btn');
      Array.prototype.forEach.call(els, function (el) {
        // Do stuff here
        el.style.pointerEvents = 'none';
      });
      socket.off('result');
    });
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const create = () => {
    setCreateJoin('create');
    socket = io('http://localhost:4000');
    socket.on('create-game', (room_id) => {
      socket.emit('join-game', room_id);
      setRoomId(room_id);
    });
    setPlayerPiece(RoomDetails.Player1Piece);
  };

  const copykey = () => {
    navigator.clipboard.writeText(RoomId);
  };

  const pastekey = () => {
    navigator.clipboard.readText().then((text) => {
      document.getElementById('paste').value = text;
      setJoinValue(document.getElementById('paste').value);
    });
  };

  const join = () => {
    socket = io('http://localhost:4000');
    socket.emit('join-game', joinValue, name);
    socket.on('validate', (valid, roomDetails) => {
      if (valid) {
        setRoomDetails(roomDetails);
        onClose();
      } else {
        alert('Enter Valid Room ID');
      }
      setPlayerPiece(roomDetails.Player2Piece);
    });
  };
  const startGame = async () => {
    socket.emit('create-game', name);
    setRoomDetails({ ...RoomDetails, Player1: name });

    onClose();
  };

  const testfunc = () => {
    socket.emit('testvalue', testState, RoomId !== '' ? RoomId : joinValue);
    setMessages([...messages, { message: testState, role: 'sender' }]);
    settestState('');
  };

  const CreateBtnClk = () => {
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
          Create a Game
        </p>
        <p style={{ fontSize: '2em', color: 'white', textAlign: 'center' }}>
          Please type your name :{' '}
        </p>
        <div className='nameInput'>
          <Input
            onChange={(e) => {
              setName(e.target.value);
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
            {RoomId}
          </p>
          <img
            className='imgCopy'
            onClick={copykey}
            width='25px'
            style={{ display: 'inline-flex', verticalAlign: 'middle' }}
            src={CopyIcon}
            alt=''
          />
        </div>
        <Button
          onClick={() => startGame()}
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
      </div>
    );
  };

  const display = () => {
    try {
      socket.off('testvalue');
      socket.on('testvalue', (val) => {
        if (val.hasOwnProperty('RoomId')) {
          setRoomDetails(val);
          setPlayerPiece(val.Player1Piece);
        } else {
          socket.off('testvalue');
          setMessages([...messages, { message: val, role: 'reciever' }]);
        }
      });
    } catch (e) {}
  };

  const JoinBtnClk = () => {
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
              setName(e.target.value);
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
              setJoinValue(e.target.value);
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
          />
        </div>
        <Button
          onClick={join}
          style={{ display: 'flex', margin: '0 auto', width: 'max-content' }}
          variant='contained'
          color='primary'
        >
          Check ID
        </Button>
      </div>
    );
  };
  return (
    <div>
      {modalIsOpen ? (
        <div className='modal-div'>
          <Modal
            style={{ backgroundColor: '#3C3F41' }}
            ariaHideApp={false}
            isOpen={modalIsOpen}
            onClose={onClose}
          >
            {createJoin === '' ? (
              <div>
                <p
                  style={{
                    fontSize: '2em',
                    color: 'white',
                    textAlign: 'center',
                  }}
                >
                  Tic Tac Toe
                </p>
                <div className='modal-cards'>
                  <Card onClick={create} className='card'>
                    <CardContent>
                      <div>
                        <img className='img' src={CreateIcon} alt={''} />
                      </div>
                      <div className='text'>
                        <p>Create a Game</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card onClick={() => setCreateJoin('join')} className='card'>
                    <CardContent>
                      <div>
                        <img className='img' src={JoinIcon} alt={''} />
                      </div>
                      <div className='text'>
                        <p>Join a Game</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : createJoin === 'create' ? (
              CreateBtnClk()
            ) : (
              JoinBtnClk()
            )}
          </Modal>
        </div>
      ) : (
        <div>
          <header className='App-header'>
            <p>Tic Tac Toe Multiplayer</p>
          </header>
          <p id='res' style={{ color: '#ffffff', textAlign: 'center' }}></p>

          <div className='gameContainer'>
            <div className='gameOuter'>
              <Game
                roomDetails={RoomDetails}
                func={(num) => btn_clk(num)}
                moves={moves}
                playerPiece={playerPiece}
                result={results}
              />
            </div>
            <div className='messagesContainer'>
              <div
                style={{
                  width: '80%',
                  height: '300px',
                  margin: '0 auto',
                  overflow: 'auto',
                  // backgroundColor: 'antiquewhite',
                }}
              >
                {display()}
                {listen()}
                {messages.map((message, index) => {
                  if (message.role === 'reciever') {
                    return (
                      <div key={'p' + index}>
                        <p
                          style={{
                            padding: '15px',
                            margin: '5px',
                            border: '2px solid',
                            borderRadius: '200px',
                            width: 'max-content',
                            backgroundColor: '#2196f3',
                          }}
                        >
                          {message.message}
                        </p>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        style={{ textAlign: '-webkit-right' }}
                        key={'p' + index}
                      >
                        <p
                          style={{
                            padding: '15px',
                            margin: '5px',
                            border: '2px solid',
                            borderRadius: '200px',
                            width: 'max-content',
                            backgroundColor: '#43a047',
                          }}
                        >
                          {message.message}
                        </p>
                      </div>
                    );
                  }
                })}
              </div>
              <div style={{ textAlign: 'center' }}>
                <Input
                  className='messageInput'
                  value={testState}
                  onChange={(e) => {
                    settestState(e.target.value);
                  }}
                ></Input>
                <Button onClick={testfunc}>Send</Button>
              </div>
            </div>
          </div>
          {results ? (
            <div>
              <button>Play Again!</button>
            </div>
          ) : null}
          <div>
            <div style={{ width: 'max-content', margin: '0 auto' }}>
              <div>
                <p
                  style={{
                    padding: '0 50px 0 50px',
                    fontSize: '2em',
                    borderBottom: '5px solid',
                    textAlign: 'center',
                    width: 'max-content',
                    margin: '0 auto',
                    marginTop: '50px',
                  }}
                >
                  Score Board
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div
                  style={{
                    padding: '15px',
                    width: '50%',
                    textAlign: 'center',
                    borderRight: '2px solid',
                  }}
                >
                  {RoomDetails.Player1}
                </div>
                <div
                  style={{
                    padding: '15px',
                    width: '50%',
                    textAlign: 'center',
                    borderLeft: '2px solid',
                  }}
                >
                  {RoomDetails.Player2}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
