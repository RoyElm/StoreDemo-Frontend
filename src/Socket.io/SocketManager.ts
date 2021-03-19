import { io, Socket } from "socket.io-client";
import { hatAddedAction, hatDeletedAction, hatUpdatedAction } from "../Redux/HatsState";
import { itemAddedAction, itemDeletedAction, itemUpdatedAction } from "../Redux/ItemsState";
import store from "../Redux/Store";
import { Globals } from '../Services/Globals';

class SocketManager {

    private socket: Socket;
    public connect(): void {

        // Connect to socket.io:
        this.socket = io(Globals.socketUrl);

        // Listen to socket.io events: 
        this.socket.on("msg-from-server-item-added", addedItem => {
            store.dispatch(itemAddedAction(addedItem));
        });
        this.socket.on("msg-from-server-item-updated", updatedItem => {
            store.dispatch(itemUpdatedAction(updatedItem));
        });
        this.socket.on("msg-from-server-item-deleted", itemId => {
            store.dispatch(itemDeletedAction(itemId));
        });
        // Listen to socket.io events: 
        this.socket.on("msg-from-server-hat-added", addedHat => {
            store.dispatch(hatAddedAction(addedHat));
        });
        this.socket.on("msg-from-server-hat-updated", updatedHat => {
            store.dispatch(hatUpdatedAction(updatedHat));
        });
        this.socket.on("msg-from-server-hat-deleted", hatId => {
            store.dispatch(hatDeletedAction(hatId));
        });

    }

    public disconnect(): void {
        this.socket.disconnect();
    }
}

export const socketManagerInstance = new SocketManager();
