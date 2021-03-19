import React from "react";
import { Button, Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import { Globals } from "../../../Services/Globals";
import { createStyles } from "../../../Services/GlobalStylingMaker";
import CartModel from "../../Models/CartModel";
import "./CartCardHat.css";
import { Delete } from '@material-ui/icons';
import store from "../../../Redux/Store";
import { cartHatDeletedAction } from "../../../Redux/CartState";

interface cartCardProps {
    cart: CartModel;
};

function CartCardHat(props: cartCardProps): JSX.Element {
    const classes = createStyles();

    const deleteFromCart = (hatId: number) => {
        store.dispatch(cartHatDeletedAction(hatId));
    }

    return (
        <Card className="CartCardHat-root">
            <CardContent>
                <Button className="deleteButton" onClick={() => deleteFromCart(props.cart.hatId)}>
                    <Delete className="deleteIcon" />
                </Button>
                <Typography component="h6">
                    Hat - {props.cart.colors}
                </Typography>
                <Typography className="descSpan" component="p" variant="subtitle2" color="initial">
                    suitable for all genders
                    </Typography>
                <Typography className="priceHatSpan" component="span" variant="subtitle2" color="initial">
                    {props.cart.price}$
                    </Typography>
            </CardContent>
            <CardMedia
                className={classes.cover}
                image={Globals.hatsUrl + "hatsImage/" + props.cart.imageName}
                title="Hat"
            />
        </Card>
    );
}

export default CartCardHat;
