import React, { Component } from "react";
import { Unsubscribe } from "redux";
import store from "../../../Redux/Store";
import CartModel from "../../Models/CartModel";
import CartCardHat from "../CartCardHat/CartCardHat";
import CartCardItem from "../CartCardItem/CartCardItem";
import { Store, AttachMoney, Payment } from '@material-ui/icons/';
import { NavLink } from "react-router-dom";
import "./CartShop.css";
import { Button } from "@material-ui/core";
import { updatePriceAction } from "../../../Redux/CartState";
import { GlobalPaths } from "../../../Services/GlobalPaths";

interface cartsState {
    carts: CartModel[];
    price: number;
}

class CartShop extends Component<{}, cartsState> {

    public unSubscribeFromStore: Unsubscribe;

    public constructor(props: {}) {
        super(props);
        this.state = {
            carts: store.getState().cartState.cart,
            price: 0
        }
    }

    public componentDidMount() {
        this.unSubscribeFromStore = store.subscribe(() => {
            let price = 0;
            const carts = store.getState().cartState.cart;
            this.setState({ carts })
            for (const item of this.state.carts) {
                item.price ? price += item.price : price += item.itemPrice;
            }
            this.setState({ price })
        })

        if (this.state.price === 0) {
            let price = 0;
            for (const item of this.state.carts) {
                item.price ? price += item.price : price += item.itemPrice;
            }
            store.dispatch(updatePriceAction(price));
            this.setState({ price })

        }
    }

    public componentWillUnmount() {
        this.unSubscribeFromStore();
    }

    render() {
        return (
            <div className="CartShop" >
                {!this.state.carts.length &&
                    <h3>Your Store Cart Is Empty <Store className="storeIcon" /></h3>
                }
                {this.state.carts.length > 0 &&
                    <>
                        <h3>
                            Shopping Cart <Store className="storeIcon" />
                        </h3>
                        <div className="cardContainer">
                            {this.state.carts.map((cart, index) => cart.hatId ? <CartCardHat key={index} cart={cart} /> : <CartCardItem key={index} cart={cart} />)}
                        </div>
                        <div className="totalPriceCheckout">
                            <h3>Subtotal: {this.state.price} <AttachMoney className="usdIcon" /></h3>
                            <Button variant="contained" className="buttonCheckout">
                                <NavLink to={GlobalPaths.paymentUrl}>Checkout <Payment className="paymentIcon" /></NavLink>
                            </Button>
                        </div>
                    </>
                }
            </div >
        )
    };
}

export default CartShop;
