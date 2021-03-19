import React, { useEffect, useState } from 'react';
import { Typography, List, ListItem, ListItemText, Grid } from '@material-ui/core';
import store from '../../../Redux/Store';
import { finalReviewStyle } from '../../../Services/GlobalStylingMaker';
import orderModel from '../../Models/orderModel';
import creditCardModel from '../../Models/creditCardModel';

interface FinalReviewProps {
    addressState: orderModel,
    paymentState: creditCardModel,
}

export default function FinalReview(props: FinalReviewProps) {

    const payments = [
        { name: 'Card holder', detail: props.paymentState.nameOnCard },
        { name: 'Card number', detail: props.paymentState.cardNumber },
        { name: 'Expiry date', detail: props.paymentState.expiryDate },
    ];
    const classes = finalReviewStyle();
    const products = store.getState().cartState.cart;
    const [price, setPrice] = useState<number>(0);

    useEffect(() => {
        let newPrice = 0;
        products.map(product => product.price ? newPrice += product.price : newPrice += product.itemPrice);
        setPrice(newPrice);
    }, [products])

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <List disablePadding>
                {products.map((product, index) => (
                    <ListItem className={classes.listItem} key={index}>
                        <ListItemText primary={product.itemName ? product.itemName : "Hat"} secondary={product.description ? product.description : "suitable for all genders"} />
                        <Typography variant="body2">{product.price ? product.price : product.itemPrice}$</Typography>
                    </ListItem>
                ))}
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" className={classes.total}>
                        {price}$
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        Shipping
                    </Typography>
                    <Typography gutterBottom>{props.addressState.firstName} {props.addressState.lastName}</Typography>
                    <Typography gutterBottom>{props.addressState.address}</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        Payment details
                    </Typography>
                    <Grid container>
                        {payments.map(payment => (
                            <React.Fragment key={payment.name}>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.name}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.detail}</Typography>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}