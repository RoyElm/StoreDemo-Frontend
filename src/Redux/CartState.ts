import CartModel from "../Components/Models/CartModel";
import HatModel from "../Components/Models/HatModel";
import woolfitModel from "../Components/Models/ItemsModel";

export class CartState {
    public cart: CartModel[] = [];
    public price: number = 0;

    constructor() {
        const cart = JSON.parse(localStorage.getItem("cart"));
        if (cart) {
            this.cart = cart;
        }
    }
}

export enum CartActionType {
    itemAdded = "itemAdded",
    itemDeleted = "itemDeleted",
    hatAdded = "hatAdded",
    hatDeleted = "hatDeleted",
    updatePrice = "updatePrice"
}

export interface CartAction {
    type: CartActionType; // מה סוג הפעולה שברצוננו לבצע
    payload?: any; // לצורך ביצוע הפעולה Redux-מה המידע שיש לשלוח ל
}

//Cart Action Creators 
export function cartHatAddedAction(hat: HatModel): CartAction {
    return { type: CartActionType.hatAdded, payload: hat };
}
export function cartItemAddedAction(item: woolfitModel): CartAction {
    return { type: CartActionType.itemAdded, payload: item };
}

export function cartHatDeletedAction(hatId: number): CartAction {
    return { type: CartActionType.hatDeleted, payload: hatId };
}

export function cartItemDeletedAction(itemId: number): CartAction {
    return { type: CartActionType.itemDeleted, payload: itemId };
}

export function updatePriceAction(price: number): CartAction {
    return { type: CartActionType.updatePrice, payload: price };
}


export function cartReducer(
    currentState: CartState = new CartState(),
    action: CartAction): CartState {

    const newState = { ...currentState };

    switch (action.type) {

        case CartActionType.itemAdded:
        case CartActionType.hatAdded:
            newState.cart.push(action.payload);
            break;

        case CartActionType.hatDeleted:
            const hatIndexToDelete = newState.cart.findIndex(p => p.hatId === action.payload); // payload = the deleted product's id
            newState.cart.splice(hatIndexToDelete, 1);
            break;

        case CartActionType.itemDeleted:
            const itemIndexToDelete = newState.cart.findIndex(p => p.itemId === action.payload); // payload = the deleted product's id
            newState.cart.splice(itemIndexToDelete, 1);
            break;

        case CartActionType.updatePrice:
            newState.price = action.payload;
            break;
    }

    localStorage.setItem("cart", JSON.stringify(newState.cart))

    return newState;
}
