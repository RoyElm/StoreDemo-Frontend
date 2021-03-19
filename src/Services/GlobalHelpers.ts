import store from "../Redux/Store";
import { authLoggedOutAction } from "../Redux/AuthState";
import LoginModel from "../Components/Models/LoginModel";
import axios from "axios";
import { socketManagerInstance } from "../Socket.io/SocketManager";


//Handling header authorization adding user token.
export function authorizationHeader(userLogged: LoginModel) {
    axios.defaults.headers["authorization"] = `Bearer ${userLogged.token}`;
    return;
}

//Handling logout user reseting vacation list, logging out user at redux, deleting token from header and disconnect from socket.io.
export function logoutUser() {
    store.dispatch(authLoggedOutAction());
    delete axios.defaults.headers["authorization"];
    socketManagerInstance.disconnect();
    return;
}
