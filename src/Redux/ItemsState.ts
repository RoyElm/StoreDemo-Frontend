import itemsModel from "../Components/Models/ItemsModel";

// Items State: 
export class ItemsState {
    public items: itemsModel[] = [];
}

// Items Action Types: 
export enum itemsActionType {
    ItemsDownloaded = "ItemsDownloaded",
    ItemAdded = "ItemAdded",
    ItemUpdated = "ItemUpdated",
    ItemDeleted = "ItemDeleted"
}

// Items Action: 
export interface ItemsAction {
    type: itemsActionType;
    payload?: any;
}

// items Action Creators: 
export function itemsDownloadedAction(items: itemsModel[]): ItemsAction {
    return { type: itemsActionType.ItemsDownloaded, payload: items };
}

export function itemAddedAction(addedItem: itemsModel): ItemsAction {
    return { type: itemsActionType.ItemAdded, payload: addedItem };
}

export function itemUpdatedAction(updatedItem: itemsModel): ItemsAction {
    return { type: itemsActionType.ItemUpdated, payload: updatedItem };
}

export function itemDeletedAction(itemId: number): ItemsAction {
    return { type: itemsActionType.ItemDeleted, payload: itemId };
}


// Items Reducer: 
export function itemsReducer(
    currentState: ItemsState = new ItemsState(),
    action: ItemsAction): ItemsState {

    const newState = { ...currentState };

    switch (action.type) {
        case itemsActionType.ItemsDownloaded:
            newState.items = action.payload;
            break;

        case itemsActionType.ItemAdded:
            newState.items.push(action.payload);
            break;

        case itemsActionType.ItemUpdated:
            const indexToUpdate = newState.items.findIndex(p => p.itemId === action.payload.itemId);
            newState.items[indexToUpdate] = action.payload;
            break;

        case itemsActionType.ItemDeleted:
            const indexToDelete = newState.items.findIndex(p => p.itemId === action.payload);
            newState.items.splice(indexToDelete, 1);
            break;
    }

    return newState; // Return the newState.
}
