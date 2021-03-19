import React from 'react';
import "./hatCard.css";
import { Globals } from '../../../Services/Globals';
import HatModel from '../../Models/HatModel';
import { Card, CardContent, CardMedia, Fab, Typography } from '@material-ui/core';
import { createStyles } from '../../../Services/GlobalStylingMaker';
import { Add } from '@material-ui/icons';
import store from '../../../Redux/Store';
import { cartHatAddedAction } from '../../../Redux/CartState';
import { notificationService } from '../../../Services/notification.service';

interface cardProps {
    hat: HatModel;
}

export default function HatCard(props: cardProps): JSX.Element {
    const classes = createStyles();

    function addToCart(hat: HatModel) {
        store.dispatch(cartHatAddedAction(hat));
        notificationService.success("Added");
    }

    return (
        <Card className={classes.root + " hatCard"} title="Hat" >
            <CardMedia className={classes.media} image={Globals.hatsUrl + "hatsImage/" + props.hat.imageName} title={"Woolfit Hats"} />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="div">
                    <h4 className="hatTitle">
                        Hat - {props.hat.colors}
                    </h4>
                    <br />
                    <p className="hatDescription">
                       suitable for all genders
                    </p>
                    <span className="priceSpan">
                        {props.hat.price + "$"}
                    </span>
                    <Fab color="primary" aria-label="add" onClick={() => addToCart(props.hat)} className={classes.fab + " addToCartButton"}>
                        Add<Add className="addIcon" /> 
                    </Fab>
                </Typography>
            </CardContent >
        </Card >

    )
}
