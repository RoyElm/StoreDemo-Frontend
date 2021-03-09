import HatModel from "../Components/ShopArea/Models/HatModel";

// Products State: 
export class HatsState {
    public hats: HatModel[] = [];
}

// Products Action Types: 
export enum HatsActionType {
    HatsDownloaded = "HatsDownloaded",
    HatAdded = "HatAdded",
    HatUpdated = "HatUpdated",
    HatDeleted = "HatDeleted"
}

// Products Action: 
export interface HatsAction {
    type: HatsActionType; // מה סוג הפעולה שברצוננו לבצע
    payload?: any; // לצורך ביצוע הפעולה Redux-מה המידע שיש לשלוח ל
}

// Products Reducer: 
export function hatsReducer(
    currentState: HatsState = new HatsState(),
    action: HatsAction): HatsState {

    const newState = { ...currentState }; // Duplicate currentState into a newState.

    switch (action.type) {
        case HatsActionType.HatsDownloaded:
            newState.hats = action.payload; // payload = all products
            break;

        case HatsActionType.HatAdded:
            newState.hats.push(action.payload); // payload = the added product
            break;

        case HatsActionType.HatUpdated:
            const indexToUpdate = newState.hats.findIndex(p => p.hatId == action.payload.id);
            newState.hats[indexToUpdate] = action.payload; // payload = the updated product
            break;

        case HatsActionType.HatDeleted:
            const indexToDelete = newState.hats.findIndex(p => p.hatId == action.payload); // payload = the deleted product's id
            newState.hats.splice(indexToDelete, 1);
            break;
    }

    return newState; // Return the newState.
}
