import LoginModel from "../Components/LayoutArea/Models/LoginModel";

// const user = JSON.parse(sessionStorage.getItem("user"));

export class userModel {
    isLoggedIn: boolean;
    user: LoginModel;
}

// Products State: 
export class LoginState {
    public users: userModel = { isLoggedIn: false, user: null };

    constructor() {
        const users = JSON.parse(sessionStorage.getItem("user"));
        if (users) {
            this.users = users;
        }
    }
}

// User Action Types: 
export enum UserActionType {
    UserLoggedIn = "UserLoggedIn",
    UserRegistered = "UserRegistered",
    UserUpdated = "UserUpdated",
    UserLoggedOut = "UserLoggedOut"
}

// User Action: 
export interface UserAction {
    type: UserActionType; // מה סוג הפעולה שברצוננו לבצע
    payload?: any; // לצורך ביצוע הפעולה Redux-מה המידע שיש לשלוח ל
}
// User Reducer: 
export function UserReducer(
    currentState: LoginState = new LoginState(),
    action: UserAction): LoginState {

    const newState = { ...currentState }; // Duplicate currentState into a newState.

    switch (action.type) {
        case UserActionType.UserLoggedIn:
            newState.users = { isLoggedIn: true, user: action.payload };
            break;

        case UserActionType.UserRegistered:
            newState.users = { isLoggedIn: false, user: null };
            break;

        case UserActionType.UserUpdated:
            newState.users = { isLoggedIn: true, user: action.payload };
            break;
            
        case UserActionType.UserLoggedOut:
            newState.users = { isLoggedIn: false, user: null };
            break;
    }

    sessionStorage.setItem("user", JSON.stringify(newState.users))

    return newState; // Return the newState.
}
