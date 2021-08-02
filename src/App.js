import './App.css';
import Game from './components/Game/Game';
import { io } from 'socket.io-client';

import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Card, CardContent, Button } from '@material-ui/core';

import CreateIcon from './assets/pen.png';
import JoinIcon from './assets/link.png';
import ScoreBoard from './components/ScoreBoard/ScoreBoard';
import ChatComponent from './components/Chat/ChatComponent';
import CreateBtnClk from './components/CreateBtnClk/CreateBtnClk';
import JoinBtnClk from './components/JoinBtnClk/JoinBtnClk';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let socket = io('https://tic--tac--toe--server.herokuapp.com/');
let marked = [];
let flag = true;
let RoomIddisconnect = '';
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
    Player1: 'Waiting',
    Player2: 'Waiting',
    Player1Score: 0,
    Player2Score: 0,
  });

  const [messages, setMessages] = useState([]);

  const [status, setStatus] = useState('Waiting');

  //Things to do before unloading/closing the tab
  const doSomethingBeforeUnload = () => {
    // Do something

    socket.emit('leave', RoomIddisconnect);
  };

  useEffect(() => {
    // Activate the event listener
    RoomIddisconnect = RoomId;
    window.addEventListener('beforeunload', (ev) => {
      ev.preventDefault();
      return doSomethingBeforeUnload();
    });
  }, [RoomId]);

  useEffect(() => {
    if (flag) {
      const els = document.getElementsByClassName('btn');
      Array.prototype.forEach.call(els, function (el) {
        // Do stuff here
        el.style.pointerEvents = 'none';
      });
    } else if (
      JSON.stringify(moves) ===
      JSON.stringify(['', '', '', '', '', '', '', '', ''])
    ) {
      if (playerPiece === 'X') {
        const els = document.getElementsByClassName('btn');
        Array.prototype.forEach.call(els, function (el) {
          // Do stuff here

          el.style.pointerEvents = 'auto';
        });
        setStatus('Your turn');
      } else {
        const els = document.getElementsByClassName('btn');
        Array.prototype.forEach.call(els, function (el) {
          // Do stuff here
          el.style.pointerEvents = 'none';
        });
        setStatus(
          RoomDetails.Player1Piece === 'X'
            ? RoomDetails.Player1 + "'s turn"
            : RoomDetails.Player2 + "'s turn"
        );
      }
    }
  }, [
    moves,
    playerPiece,
    RoomDetails.Player1Piece,
    RoomDetails.Player1,
    RoomDetails.Player2,
  ]);

  function btn_clk(number) {
    //use for
    if (!results) {
      socket.emit('onDivClick', number, RoomDetails, playerPiece);
      document.getElementById(number).style.pointerEvents = 'none';

      const newMoves = [...moves];
      newMoves[number - 1] = playerPiece;

      setMoves(newMoves);

      setStatus(
        playerPiece === RoomDetails.Player1Piece
          ? RoomDetails.Player2 + "'s turn"
          : RoomDetails.Player1 + "'s turn"
      );

      // to nullify pointer events on the buttons
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
      socket.off('scoreUpdate');
      socket.on('scoreUpdate', (player1Score, player2Score) => {
        // const score = [...RoomDetails];
        // score.Player1Score = player1Score;
        // score.Player2Score = player2Score;
        setRoomDetails({
          ...RoomDetails,
          Player1Score: player1Score,
          Player2Score: player2Score,
        });
        socket.off('scoreUpdate');
      });

      socket.off('draw');
      socket.on('draw', (num, piece, details) => {
        const newMoves = [...moves]; //copy the array
        newMoves[num - 1] = piece; //execute the manipulations

        setMoves(newMoves);
        setStatus('Your turn');

        setRoomDetails(details);
        if (!marked.includes(num)) {
          marked.push(num);
        }

        document.getElementById(num).style.pointerEvents = 'none';
        const els = document.getElementsByClassName('btn');
        Array.prototype.forEach.call(els, function (el, index) {
          if (marked.includes(index + 1)) {
            el.style.pointerEvents = 'none';
          } else {
            el.style.pointerEvents = 'auto';
          }
        });
        socket.off('draw');
      });
    }
    socket.off('result');
    socket.on('result', (name) => {
      setStatus(name === 'Draw' ? 'Match is draw' : name + ' is the winnner');
      setResults(true);
      const els = document.getElementsByClassName('btn');
      Array.prototype.forEach.call(els, function (el) {
        // Do stuff here
        el.style.pointerEvents = 'none';
      });
      socket.off('result');
    });
    socket.off('playAgain');
    socket.on('playAgain', () => {
      setPlayerPiece(playerPiece === 'X' ? 'O' : 'X');
      setRoomDetails({
        ...RoomDetails,
        Player1Piece: RoomDetails.Player2Piece,
        Player2Piece: RoomDetails.Player1Piece,
        player1Array: [],
        player2Array: [],
      });
      setResults(false);
      setMoves(['', '', '', '', '', '', '', '', '']);
      marked = [];
    });
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const create = () => {
    setCreateJoin('create');
    socket = io('https://tic--tac--toe--server.herokuapp.com/');
    socket.on('create-game', (room_id) => {
      socket.emit('join-game', room_id);
      setRoomId(room_id);
    });
    setPlayerPiece(RoomDetails.Player1Piece);
  };

  const join = () => {
    socket = io('https://tic--tac--toe--server.herokuapp.com/');
    if (name !== '' && joinValue !== '') {
      socket.emit('join-game', joinValue, name);
      setRoomId(joinValue);
      socket.on('validate', (valid, roomDetails) => {
        if (valid) {
          setRoomDetails(roomDetails);
          onClose();
        } else {
          alert('Enter Valid Room ID');
        }
        flag = false;
        setPlayerPiece(roomDetails.Player2Piece);
      });
    } else {
      toast.warn('Enter Name and RoomId');
    }
  };
  const startGame = async () => {
    if (name !== '') {
      socket.emit('create-game', name);
      setRoomDetails({ ...RoomDetails, Player1: name });

      onClose();
    } else {
      toast.warn('Please Enter Name');
    }
  };

  const playAgain = () => {
    socket.emit('playAgain', RoomDetails);
    setPlayerPiece(playerPiece === 'X' ? 'O' : 'X');
    setRoomDetails({
      ...RoomDetails,
      Player1Piece: RoomDetails.Player2Piece,
      Player2Piece: RoomDetails.Player1Piece,
      player1Array: [],
      player2Array: [],
    });
    setResults(false);
    setMoves(['', '', '', '', '', '', '', '', '']);
    marked = [];
  };

  const display = () => {
    try {
      socket.off('testvalue');
      socket.on('testvalue', (val) => {
        if (val.hasOwnProperty('RoomId')) {
          setRoomDetails(val);
          setPlayerPiece(val.Player1Piece);
          // if (val.Player1Piece === "X") {
          //   const els = document.getElementsByClassName("btn");
          //   Array.prototype.forEach.call(els, function (el) {
          //     // Do stuff here
          //     el.style.pointerEvents = "auto";
          //   });
          // } else {
          //   const els = document.getElementsByClassName("btn");
          //   Array.prototype.forEach.call(els, function (el) {
          //     // Do stuff here
          //     el.style.pointerEvents = "none";
          //   });
          // }
          flag = false;
        } else if (val === 'Other Player has disconnected!') {
          toast.info(val);
        } else {
          settestState(val);
          socket.off('testvalue');
          setMessages([...messages, { message: val, role: 'reciever' }]);
        }
      });
    } catch (e) {}
  };

  return (
    <div>
      {display()}
      {listen()}
      {modalIsOpen ? (
        <div>
          <Modal
            center
            style={{ backgroundColor: '#3C3F41' }}
            ariaHideApp={false}
            isOpen={modalIsOpen}
            onClose={onClose}
          >
            {createJoin === '' ? (
              <div>
                <p
                  className='modal-title'
                  style={{
                    fontSize: '2em',
                    color: 'white',
                    textAlign: 'center',
                    fontFamily: 'Otomanopee One',
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
              <CreateBtnClk
                BtnClk={() => startGame()}
                setname={(name) => setName(name)}
                roomid={RoomId}
              />
            ) : (
              <JoinBtnClk
                BtnClk={() => join()}
                setname={(name) => setName(name)}
                setjoinvalue={(value) => setJoinValue(value)}
              />
            )}
          </Modal>
        </div>
      ) : (
        <div>
          <header className='App-header'>
            <p style={{ fontFamily: 'Otomanopee One' }}>
              Tic Tac Toe Multiplayer
            </p>
          </header>
          <div
            className='status'
            style={{
              textAlign: 'center',
              color: 'aliceblue',
              fontFamily: 'Otomanopee One',
              fontSize: 'xx-large',
            }}
          >
            {status}
          </div>

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
            <ChatComponent
              mvalue={testState}
              RoomId={RoomDetails.RoomId}
              joinValue={joinValue}
            />
          </div>
          {results ? (
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <Button
                style={{ zIndex: '200' }}
                onClick={playAgain}
                variant='contained'
                color='secondary'
              >
                Play Again
              </Button>
            </div>
          ) : null}
          <ScoreBoard details={RoomDetails} />
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
