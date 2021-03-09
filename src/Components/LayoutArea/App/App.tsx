import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Logo from "../Logo/Logo";
import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";
import Footer from "../Footer/Footer";
import NavLog from "../../UserArea/NavLog/NavLog";
import store from "../../../Redux/Store";



function App() {
    // const state = store.getState().UserReducer.users
    // let logged = null;
    // const unsubscribeMe = store.subscribe(() => logged = store.getState().UserReducer.users.firstName);


    return (

        <BrowserRouter>
            <div className="App">
                <header>
                    <Logo />
                </header>
                <main>
                    <Routing />
                </main>
                <aside>
                    <Menu />
                </aside>
                <footer>
                    <Footer />
                </footer>
            </div>
        </BrowserRouter >
    );
}


export default App;

