import React from 'react';
import "./itemCard.css";
import { Card, CardContent, Fab, Typography } from '@material-ui/core';
import { createStyles } from '../../../Services/GlobalStylingMaker';
import { Add } from '@material-ui/icons';
import itemsModel from '../../Models/ItemsModel';
import ImageCarousel from '../imageCarousel/imageCarousel';
import { cartItemAddedAction } from '../../../Redux/CartState';
import store from '../../../Redux/Store';
import { notificationService } from '../../../Services/notification.service';

interface itemProps {
    item: itemsModel;
}


export default function ItemCard(props: itemProps): JSX.Element {
    const classes = createStyles();

    function addToCart(item: itemsModel) {
        store.dispatch(cartItemAddedAction(item));
        notificationService.success("Added");
    }

    return (
        <Card className={"itemCard"} title="Item" >
            <ImageCarousel images={props.item.imageName} />
            <CardContent className="cardContentItem">
                <Typography variant="body2" color="textSecondary" component="div">
                    <span className="itemName">{props.item.itemName}</span>
                    <br />
                    {props.item.description &&
                        <>
                            <span className="itemDescription">{props.item.description}</span>
                            <br />
                        </>
                    }
                    {props.item.colors &&
                        <>
                            <span className="itemColor">
                                {props.item.colors}
                            </span>
                            <br />
                        </>}
                    <span className="priceSpan">
                        {props.item.itemPrice + "$"}
                    </span>
                    <Fab color="primary" aria-label="add" onClick={() => addToCart(props.item)} className={classes.fab + " addToCartButton"}>
                        Add <Add className="addIcon" />
                    </Fab>
                </Typography >
            </CardContent >
        </Card >
    )
}
