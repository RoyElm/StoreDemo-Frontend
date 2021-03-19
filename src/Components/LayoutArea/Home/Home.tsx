import React, { Component } from "react";
import "./Home.css";

//img with class
class Home extends Component {
    public render(): JSX.Element {
        return (
            <div className="Home">
                <h1 className="MainSentence">
                   Welcome to my Store Website Demo
                   <br/>
                   build By: Roy Elmakies 
                </h1>
            </div>
        );
    }
}


export default Home;

