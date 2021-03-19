import React from "react";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../../../Services/GlobalHelpers";
import { GlobalPaths } from "../../../Services/GlobalPaths";
import LoginModel from "../../Models/LoginModel";

interface userProps {
    user: LoginModel;
}

function LogoutTab(props: userProps): JSX.Element {

    return (
        <div className="LogoutTab">
            <span> Welcome {props.user && props.user.firstName}</span>
            <br />
            <NavLink to={GlobalPaths.loginLinkUrl} onClick={logoutUser}>Logout</NavLink>
        </div>
    );
}

export default LogoutTab;
