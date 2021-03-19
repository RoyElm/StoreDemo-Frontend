import React, { useEffect, useState } from "react";
import { Unsubscribe } from "redux";
import store from "../../../Redux/Store";
import "./totalItems.css";
import { LocalGroceryStore } from '@material-ui/icons';
import { NavLink } from "react-router-dom";
import { GlobalPaths } from "../../../Services/GlobalPaths";


function TotalItems(): JSX.Element {

    const [itemsLength, setItemsLength] = useState<number>(store.getState().cartState.cart.length);

    useEffect(() => {
        const unSubscribeFromStore: Unsubscribe = store.subscribe(() => {
            const itemLength = store.getState().cartState.cart.length;
            setItemsLength(itemLength);
        })
        return unSubscribeFromStore;
    })

    return (
        <NavLink className="totalItems" to={GlobalPaths.cartShopUrl}>
            {itemsLength} 
            <LocalGroceryStore />
        </NavLink>
    );
}

export default TotalItems;
