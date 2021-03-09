import React, { Component } from "react";
import "./Logo.css";
import backGroundLogo from "../../../assets/images/logoimages/backgroundlogo.png";
import NavLog from "../../UserArea/NavLog/NavLog";


class Logo extends Component {
    public render(): JSX.Element {
        return (
            <div className="Logo">
                <NavLog />
                <img src={backGroundLogo} alt="backGroundLogo" />
            </div>
        );
    }
}

export default Logo;

