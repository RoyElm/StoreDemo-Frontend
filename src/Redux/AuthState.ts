import authModel from "../Components/Models/authModel";
import LoginModel from "../Components/Models/LoginModel";
import { authorizationHeader } from "../Services/GlobalHelpers";


// Products State: 
export class authState {
    public auth: authModel = { isLoggedIn: false, user: null };

    constructor() {
        const auth = JSON.parse(sessionStorage.getItem("auth"));
        if (auth && auth.isLoggedIn) {
            this.auth = auth;
            authorizationHeader(auth.user);
        }
    }
}

// User Action Types: 
export enum AuthActionType {
    AuthLoggedIn = "AuthLoggedIn",
    AuthRegistered = "AuthRegistered",
    AuthLoggedOut = "AuthLoggedOut"
}

// User Action: 
export interface AuthAction {
    type: AuthActionType; // מה סוג הפעולה שברצוננו לבצע
    payload?: any; // לצורך ביצוע הפעולה Redux-מה המידע שיש לשלוח ל
}

//Auth Action Creators 
export function authLoggedInAction(user: LoginModel): AuthAction {
    return { type: AuthActionType.AuthLoggedIn, payload: user };
}

export function authRegisteredAction(user: LoginModel): AuthAction {
    return { type: AuthActionType.AuthRegistered, payload: user };
}

export function authLoggedOutAction(): AuthAction {
    return { type: AuthActionType.AuthLoggedOut };
}

// Auth Reducer: 
export function AuthReducer(
    currentState: authState = new authState(),
    action: AuthAction): authState {

    const newState = { ...currentState }; // Duplicate currentState into a newState.

    switch (action.type) {
        case AuthActionType.AuthRegistered:
        case AuthActionType.AuthLoggedIn:
            newState.auth = { isLoggedIn: true, user: action.payload };
            break;

        case AuthActionType.AuthLoggedOut:
            newState.auth = { isLoggedIn: false, user: null };
            break;
    }

    sessionStorage.setItem("auth", JSON.stringify(newState.auth))

    return newState;
}
