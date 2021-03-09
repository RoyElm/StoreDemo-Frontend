import React, { useEffect, useState } from "react";
import "./NavLog.css";
import { NavLink } from "react-router-dom";
import { UserActionType, userModel } from "../../../Redux/UserState";
import store from "../../../Redux/Store";
import { Unsubscribe } from "redux";
import { GlobalPaths } from "../../../Services/GlobalPaths";

function NavLog(): JSX.Element {

    const [users, setUsers] = useState<userModel>(store.getState().UserReducer.users);

    useEffect(() => {
        const unSubscribe: Unsubscribe = store.subscribe(() => {
            setUsers(store.getState().UserReducer.users);
        })
        return unSubscribe;
    })

    function logoutUser() {
        const action = { type: UserActionType.UserLoggedOut, payload: null };
        store.dispatch(action);
    }

    const login =
        <>
            <NavLink to={GlobalPaths.loginLinkUrl} >התחברות</NavLink>
            <span> | </span>
            <NavLink to={GlobalPaths.registerLinkUrl}>הרשמה</NavLink>
        </>;

    const logout =
        <>
            <NavLink to={GlobalPaths.homeLinkUrl} onClick={() => logoutUser()}>התנתקות</NavLink>
            <span> | </span>
            <span>  ברוך הבא {users.user && users.user.firstName}</span>
        </>;

    return (
        <nav className="NavLog">
            {users.isLoggedIn ? logout : login}
        </nav>
    );
}

export default NavLog;
