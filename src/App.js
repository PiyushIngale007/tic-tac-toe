import './App.css';
import Game from "./components/Game/Game";
import {useState} from "react";
import Modal from 'react-modal';
import { Card , CardContent , CardActions } from '@material-ui/core';
import CreateIcon from './assets/create.svg'
import JoinIcon from './assets/link.png'



function App() {
    const [modalIsOpen, setIsOpen] = useState(true);

    const onClose = () => {
        setIsOpen(false)
    }

    return (
        <div>
            {modalIsOpen ?
                <div className="modal-div">
                    <Modal
                        ariaHideApp={false}
                        isOpen={modalIsOpen}
                        onClose={onClose}
                    >
                        <div style={{display: "flex" , justifyContent: "center", margin: "50px"}}>
                            <Card className="card">
                                <CardContent>
                                    <div>
                                        <img width="25%" src={CreateIcon} alt={""}/>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="card">
                                <CardContent>
                                    <div>
                                        <img width="25%" src={JoinIcon} alt={""}/>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
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
