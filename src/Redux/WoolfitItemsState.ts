import HatModel from "../Components/ShopArea/Models/HatModel";

// Products State: 
export class WoolfitState {
    public hats: HatModel[] = [];
}

// Products Action Types: 
export enum woolfitActionType {
    WoolfitDownloaded = "WoolfitDownloaded",
    WoolfitAdded = "WoolfitAdded",
    WoolfitUpdated = "WoolfitUpdated",
    WoolfitDeleted = "WoolfitDeleted"
}

// Products Action: 
export interface WoolfitAction {
    type: woolfitActionType; // מה סוג הפעולה שברצוננו לבצע
    payload?: any; // לצורך ביצוע הפעולה Redux-מה המידע שיש לשלוח ל
}

// Products Reducer: 
export function woolfitReducer(
    currentState: WoolfitState = new WoolfitState(),
    action: WoolfitAction): WoolfitState {

    const newState = { ...currentState }; // Duplicate currentState into a newState.

    switch (action.type) {
        case woolfitActionType.WoolfitDownloaded:
            newState.hats = action.payload; // payload = all products
            break;

        case woolfitActionType.WoolfitAdded:
            newState.hats.push(action.payload); // payload = the added product
            break;

        case woolfitActionType.WoolfitUpdated:
            const indexToUpdate = newState.hats.findIndex(p => p.hatId == action.payload.id);
            newState.hats[indexToUpdate] = action.payload; // payload = the updated product
            break;

        case woolfitActionType.WoolfitDeleted:
            const indexToDelete = newState.hats.findIndex(p => p.hatId == action.payload); // payload = the deleted product's id
            newState.hats.splice(indexToDelete, 1);
            break;
    }

    return newState; // Return the newState.
}
