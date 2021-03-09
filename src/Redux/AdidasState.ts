import HatModel from "../Components/ShopArea/Models/HatModel";

// Products State: 
export class HatsState {
    public hats: HatModel[] = [];
}

// Products Action Types: 
export enum AdidasActionType {
    AdidasDownloaded = "AdidasDownloaded",
    AdidasAdded = "AdidasAdded",
    AdidasUpdated = "AdidasUpdated",
    AdidasDeleted = "AdidasDeleted"
}

// Products Action: 
export interface AdidasAction {
    type: AdidasActionType; // מה סוג הפעולה שברצוננו לבצע
    payload?: any; // לצורך ביצוע הפעולה Redux-מה המידע שיש לשלוח ל
}

// Products Reducer: 
export function adidasReducer(
    currentState: HatsState = new HatsState(),
    action: AdidasAction): HatsState {

    const newState = { ...currentState }; // Duplicate currentState into a newState.

    switch (action.type) {
        case AdidasActionType.AdidasDownloaded:
            newState.hats = action.payload; // payload = all products
            break;

        case AdidasActionType.AdidasAdded:
            newState.hats.push(action.payload); // payload = the added product
            break;

        case AdidasActionType.AdidasUpdated:
            const indexToUpdate = newState.hats.findIndex(p => p.hatId == action.payload.id);
            newState.hats[indexToUpdate] = action.payload; // payload = the updated product
            break;

        case AdidasActionType.AdidasDeleted:
            const indexToDelete = newState.hats.findIndex(p => p.hatId == action.payload); // payload = the deleted product's id
            newState.hats.splice(indexToDelete, 1);
            break;
    }

    return newState; // Return the newState.
}
