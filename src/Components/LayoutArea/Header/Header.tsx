import React, { Component } from "react";
import "./Header.css";
import NavLog from "../../UserArea/NavLog/NavLog";
import TotalItems from "../../CartArea/totalItems/totalItems";


class Header extends Component {
    public render(): JSX.Element {
        return (
            <div className="Header">
                <TotalItems />
                <NavLog />
            </div>
        );
    }
}

export default Header;

