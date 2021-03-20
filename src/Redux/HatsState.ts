import HatModel from "../Components/Models/HatModel";

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

// Hats Action Creators: 
export function hatsDownloadedAction(hats: HatModel[]): HatsAction {
    return { type: HatsActionType.HatsDownloaded, payload: hats };
}

export function hatAddedAction(addedHat: HatModel): HatsAction {
    return { type: HatsActionType.HatAdded, payload: addedHat };
}

export function hatUpdatedAction(updatedHat: HatModel): HatsAction {
    return { type: HatsActionType.HatUpdated, payload: updatedHat };
}

export function hatDeletedAction(hatId: number): HatsAction {
    return { type: HatsActionType.HatDeleted, payload: hatId };
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
            const indexToUpdate = newState.hats.findIndex(p => p.hatId === action.payload.hatId);
            newState.hats[indexToUpdate] = action.payload;
            break;

        case HatsActionType.HatDeleted:
            const indexToDelete = newState.hats.findIndex(p => p.hatId === action.payload); // payload = the deleted product's id
            newState.hats.splice(indexToDelete, 1);
            break;
    }

    return newState; // Return the newState.
}
