import React from "react";
import { Button, Card, CardContent, Typography } from "@material-ui/core";
import CartModel from "../../Models/CartModel";
import "./CartCardItem.css";
import { Delete } from '@material-ui/icons';
import store from "../../../Redux/Store";
import { cartItemDeletedAction } from "../../../Redux/CartState";
import ImageCarousel from "../../ShopArea/imageCarousel/imageCarousel";

interface cartCardProps {
    cart: CartModel;
};

function CartCardItem(props: cartCardProps): JSX.Element {
    const deleteFromCart = (itemId: number) => {
        store.dispatch(cartItemDeletedAction(itemId));
    }

    return (
        <Card className="CartCardItem-root">
            <CardContent >
                <Button className="deleteButton" onClick={() => deleteFromCart(props.cart.itemId)}>
                    <Delete className="deleteIcon" />
                </Button>
                <Typography component="h6">
                    {props.cart.itemName}
                </Typography>
                <Typography className="descriptionParagraph" component="p" variant="subtitle2" color="initial">
                    {props.cart.description}
                </Typography>
                <Typography className="priceItemSpan" component="span" variant="subtitle2" color="initial">
                    {props.cart.itemPrice}$
                    </Typography>
            </CardContent>
            <ImageCarousel images={props.cart.imageName} />
        </Card>
    );
}

export default CartCardItem;
