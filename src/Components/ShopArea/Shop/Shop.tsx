import React from 'react';
import "./Shop.css"
import firstLink from '../../../assets/images/firstLink.jpg';
import secondLink from '../../../assets/images/secondLink.jpg';
import { GlobalPaths } from '../../../Services/GlobalPaths';
import { Card, CardActionArea, CardActions, CardMedia } from '@material-ui/core';
import { NavLink } from "react-router-dom";
import { createStyles } from '../../../Services/GlobalStylingMaker';

function Shop() {
    const classes = createStyles();
    return (
        <div className="Shop p-d-flex p-flex-wrap ">
            <Card title={"Hats"} key={998}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={firstLink}
                        title="Contemplative Reptile"
                    />
                </CardActionArea>
                <CardActions className="linkContainer">
                    <NavLink to={GlobalPaths.storeHatsLinkUrl}>Go to Hats </NavLink>
                </CardActions>
            </Card>
            <Card title={"Hats"} key={999}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={secondLink}
                        title="Contemplative Reptile"
                    />
                </CardActionArea>
                <CardActions className="linkContainer">
                    <NavLink to={GlobalPaths.storeItemsLinkUrl}>Go to items </NavLink>
                </CardActions>
            </Card>
        </div>
    )
}

export default Shop;