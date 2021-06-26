import './App.css';
import Game from "./components/Game/Game";
import {io} from 'socket.io-client'
import CopyIcon from "./assets/copy.svg"
import PasteIcon from "./assets/paste.png"

import {useState} from "react";
import Modal from 'react-modal';
import {Card, CardContent , Input} from '@material-ui/core';
import CreateIcon from './assets/pen.png'
import JoinIcon from './assets/link.png'

const room_id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)

function App() {
    const [modalIsOpen, setIsOpen] = useState(true);
    const [createJoin, setCreateJoin] = useState("")

    console.log(room_id)
    const onClose = () => {
        setIsOpen(false)
    }

    const create = () => {
        setCreateJoin("create")
        const socket = io("http://localhost:3001")
        socket.emit("create-game" ,room_id)
    }

    const join = () => {
        setCreateJoin("join")
        const socket = io("http://localhost:3001")
        socket.on("join-game" , (roomid) => {
            console.log(roomid)
        })

    }


    const CreateBtnClk = () => {
        return (
            <div>
                <p style={{fontFamily: "Fira Sans", fontSize: "2em", color: "white" , textAlign: "center"}}>Create a Game</p>
                <p style={{fontSize: "2em", color: "white" , textAlign: "center"}}>Your Game Room id is : </p>
                <div className="id-div">
                    <p style={{padding: "20px",fontSize: "2em", color: "white" , textAlign: "center"}}> { room_id }</p>
                </div>
            </div>
        )
    }

    const JoinBtnClk = () => {
        return (
            <div>
                <p style={{fontFamily: "Fira Sans", fontSize: "2em", color: "white" , textAlign: "center"}}>Join a Game</p>
                <p style={{fontSize: "2em", color: "white" , textAlign: "center"}}>Enter the Game Room id : </p>

                <div style={{margin: "0 auto",marginTop:"100px" ,width: "max-content" ,border: "2px solid #ffffff" , borderRadius: "10px"}}>
                    <Input style={{margin: "25px"}} placeholder={"Enter a valid room id"}/>
                    <img style={{display: "inline-flex" , verticalAlign: "middle"}} src={PasteIcon}/>
                </div>
            </div>
        )
    }
    return (
        <div>
            {modalIsOpen ?
                <div className="modal-div">
                    <Modal
                        style={{backgroundColor: "#3C3F41"}}
                        ariaHideApp={false}
                        isOpen={modalIsOpen}
                        onClose={onClose}
                    >
                        {createJoin === "" ? <div>
                            <p style={{fontSize: "2em" ,color: "white" , textAlign: "center"}}>Tic Tac Toe</p>
                            <div className="modal-cards">
                                <Card onClick={create} className="card">
                                    <CardContent>
                                        <div>
                                            <img className="img" src={CreateIcon} alt={""}/>
                                        </div>
                                        <div className="text">
                                            <p>Create a Game</p>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card onClick={join} className="card">
                                    <CardContent>
                                        <div>
                                            <img className="img" src={JoinIcon} alt={""}/>
                                        </div>
                                        <div className="text">
                                            <p>Join a Game</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div> : createJoin === "create" ? CreateBtnClk() : JoinBtnClk()}
                    </Modal>
                </div> :
                <div>
                    <header className="App-header">
                        <p>
                            Tic Tac Toe Multiplayer
                        </p>
                    </header>
                    <Game/>
                </div>}
        </div>
    );
}

export default App;
