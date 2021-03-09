import React from "react";
import "./Register.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom";
import RegisterModel from "../../LayoutArea/Models/RegisterModel";
import store from "../../../Redux/Store";
import { UserActionType } from "../../../Redux/UserState";
import { Globals } from "../../../Services/Globals";
import { GlobalPaths } from "../../../Services/GlobalPaths";


function Register(): JSX.Element {

    const { register, handleSubmit } = useForm<RegisterModel>();
    const history = useHistory();

    async function send(newUser: RegisterModel) {
        try {
            await axios.post<RegisterModel>(Globals.authUrl + "register", newUser);
            history.push(GlobalPaths.loginLinkUrl);
            const action = { type: UserActionType.UserRegistered, payload: newUser }
            store.dispatch(action);
        }
        catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className="Register">
            <h1>הרשמה</h1>
            <form action="post" onSubmit={handleSubmit(send)}>
                <table>
                    <tr>
                        <td><input type="text" name="firstName" ref={register({ required: true })} /></td>
                        <td><label>שם פרטי</label></td>
                    </tr>
                    <tr>
                        <td><input type="text" name="lastName" ref={register({ required: true })} /></td>
                        <td><label>שם משפחה</label></td>
                    </tr>
                    <tr>
                        <td><input type="email" name="email" ref={register({ required: true })} /></td>
                        <td><label>אימייל</label></td>
                    </tr>
                    <tr>
                        <td><input type="password" name="password" ref={register({ required: true })} /></td>
                        <td><label>סיסמא</label></td>
                    </tr>
                    <tr>
                        <td><button>הרשמה</button></td>
                        <td></td>
                    </tr>
                </table>
            </form>
        </div>
    );
}

export default Register;
