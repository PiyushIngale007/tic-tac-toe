import './App.css';
import Game from "./components/Game/Game";
import {io} from 'socket.io-client'
import CopyIcon from "./assets/copy.svg"
import PasteIcon from "./assets/paste.png"

import {useState} from "react";
import Modal from 'react-modal';
import {Card, CardContent , Input , Button} from '@material-ui/core';
import CreateIcon from './assets/pen.png'
import JoinIcon from './assets/link.png'


let socket = io("http://localhost:4000")
function App() {
    const [modalIsOpen, setIsOpen] = useState(true);
    const [createJoin, setCreateJoin] = useState("")
    const [joinValue, setJoinValue] = useState("")
    const [RoomId , setRoomId] = useState("")
    const [name , setName] = useState("")


    const [testState , settestState] = useState("")


    

    const onClose = () => {
        setIsOpen(false)
    }
   

    const create = () => {
        setCreateJoin("create")
        socket = io("http://localhost:4000")
        socket.on("create-game" ,(room_id)=>{
            console.log(room_id);
            socket.emit("join-game" , room_id)
            setRoomId(room_id)
        })
    }

    const join = () => {
       
        socket = io("http://localhost:4000")
        socket.emit("join-game", joinValue)
        socket.on("validate" , (valid) => {
            console.log(valid)
            if (valid) {
                onClose()                
            }
            else{
                alert("Enter Valid Room ID")
            }
        })
    }

    const testfunc = () => {
        socket.emit("testvalue" ,testState,RoomId!=="" ? RoomId : joinValue )
    }


    const CreateBtnClk = () => {
        return (
            <div>
                <p style={{fontFamily: "Fira Sans", fontSize: "2em", color: "white" , textAlign: "center"}}>Create a Game</p>
                <p style={{fontSize: "2em", color: "white" , textAlign: "center"}}>Please type your name : </p>
                <div style={{margin: "0 auto",marginTop:"10px" ,width: "max-content" ,border: "2px solid #ffffff" , borderRadius: "10px"}}>
                    <Input onChange={(e) => {setName(e.target.value)}} style={{margin: "25px"}} placeholder={"Name"}/>
                </div>
                <p style={{fontSize: "2em", color: "white" , textAlign: "center"}}>Your Game Room id is : </p>
                <div className="id-div">
                    <p style={{padding: "20px",fontSize: "2em", color: "white" , textAlign: "center"}}>{RoomId}</p>
                    {/* <img width="25px" style={{display: "inline-flex" , verticalAlign: "middle"}} src={CopyIcon}/> */}
                </div>
                <Button onClick={() => {onClose()}} style={{display: "flex", margin: "0 auto" , width: "max-content"}} variant="contained" color="primary" href="#contained-buttons">
                    Start Game
                </Button>
            </div>
        )
    }

    const display = () =>{
        try{
            socket.on("testvalue",(val)=>{
                console.log(val);
            })
        }catch(e){}

    }

    const JoinBtnClk = () => {
        return (
            <div>
                <p style={{fontFamily: "Fira Sans", fontSize: "2em", color: "white" , textAlign: "center"}}>Join a Game</p>
                <p style={{fontSize: "2em", color: "white" , textAlign: "center"}}>Please type your name : </p>
                <div style={{margin: "0 auto",marginTop:"10px" ,width: "max-content" ,border: "2px solid #ffffff" , borderRadius: "10px"}}>
                    <Input onChange={(e) => {setName(e.target.value)}} style={{margin: "25px"}} placeholder={"Name"}/>
                </div>
                <p style={{fontSize: "2em", color: "white" , textAlign: "center"}}>Enter the Game Room id : </p>

                <div style={{margin: "0 auto",marginTop:"100px" ,width: "max-content" ,border: "2px solid #ffffff" , borderRadius: "10px"}}>
                    <Input onChange={(e) => {setJoinValue(e.target.value)}} style={{margin: "25px"}} placeholder={"ROOM ID"}/>
                    <img style={{display: "inline-flex" , verticalAlign: "middle"}} src={PasteIcon}/>
                </div>
                <Button onClick={join} style={{display: "flex", margin: "0 auto" , width: "max-content"}} variant="contained" color="primary" href="#contained-buttons">
                    Check ID
                </Button>
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
                                <Card onClick={()=> setCreateJoin("join")} className="card">
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
                    <Input onChange={(e) => {settestState(e.target.value)}}></Input>
                    <Button onClick={testfunc}>Send</Button>
                    <p>{display()
                    }</p>
                    <Game/>
                </div>}
        </div>
    );
}

export default App;
