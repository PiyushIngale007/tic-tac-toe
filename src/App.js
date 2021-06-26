import './App.css';
import Game from "./components/Game/Game";
import {useState} from "react";
import Modal from 'react-modal';
import {Card, CardContent} from '@material-ui/core';
import CreateIcon from './assets/pen.png'
import JoinIcon from './assets/link.png'


function App() {
    const [modalIsOpen, setIsOpen] = useState(true);
    const [createJoin, setCreateJoin] = useState("")

    const onClose = () => {
        setIsOpen(false)
    }

    const create = () => {
        setCreateJoin("create")
    }

    const join = () => {
        setCreateJoin("join")
    }


    const CreateBtnClk = () => {
        return (
            <div>
                <p style={{fontFamily: "Fira Sans", fontSize: "2em", color: "white" , textAlign: "center"}}>Create a Game</p>
                <p style={{fontSize: "2em", color: "white" , textAlign: "center"}}>Your Game id is : </p>
            </div>
        )
    }

    const JoinBtnClk = () => {
        return (
            <div>Join</div>
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
                        {createJoin === "" ? <div className="modal-cards">
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
