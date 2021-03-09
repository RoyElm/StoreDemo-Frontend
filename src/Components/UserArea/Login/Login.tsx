import React from "react";
import "./Login.css";
import { useForm } from "react-hook-form";
import LoginModel from "../../LayoutArea/Models/LoginModel";
import axios from "axios";
// import { useHistory } from "react-router-dom";
import store from "../../../Redux/Store";
import { UserActionType } from "../../../Redux/UserState";
import { Globals } from "../../../Services/Globals";


function Login({ history }): JSX.Element {

    const { register, handleSubmit } = useForm<LoginModel>();
    // const history = useHistory();

    async function send(user: LoginModel) {
        try {
            const response = await axios.post<LoginModel>(Globals.authUrl + "login", user);
            const userLogged = response.data;

            const action = { type: UserActionType.UserLoggedIn, payload: userLogged };
            store.dispatch(action);
            history.goBack();
        }
        catch (err) {
            alert("Error");
        }
    }

    return (
        <div className="Login">
            <h1>התחברות</h1>
            <form action="post" onSubmit={handleSubmit(send)}>
                <table>
                    <tr><td><input type="email" name="email" ref={register({ required: true })} /></td>
                        <td><label>אימייל</label></td>
                    </tr>
                    <tr>
                        <td><input type="password" name="password" ref={register({ required: true })} /></td>
                        <td><label>סיסמא</label></td>
                    </tr>
                    <tr>

                        <td><button>התחבר</button></td>
                        <td></td>
                    </tr>
                </table>
            </form>
        </div>
    );
}

export default Login;
