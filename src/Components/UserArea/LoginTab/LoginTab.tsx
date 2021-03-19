import React from "react";
import { NavLink } from "react-router-dom";
import { GlobalPaths } from "../../../Services/GlobalPaths";

function LoginTab(): JSX.Element {
    return (
        <div className="LoginTab">
            <NavLink to={GlobalPaths.loginLinkUrl}>Login</NavLink>
            <span>/</span>
            <NavLink to={GlobalPaths.registerLinkUrl}>Register</NavLink>
        </div>
    );
}

export default LoginTab;
