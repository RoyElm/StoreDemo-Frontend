import React from 'react';
import "./AdminItemCard.css";
import { Card, CardContent, Fab, Typography } from '@material-ui/core';
import { createStyles } from '../../../Services/GlobalStylingMaker';
import { Delete, Edit } from '@material-ui/icons';
import itemsModel from '../../Models/ItemsModel';
import ImageCarousel from '../imageCarousel/imageCarousel';
import { notificationService } from '../../../Services/notification.service';
import { GlobalPaths } from '../../../Services/GlobalPaths';
import { NavLink, useHistory } from "react-router-dom";
import { logoutUser } from '../../../Services/GlobalHelpers';
import axios from 'axios';
import { Globals } from '../../../Services/Globals';


interface itemProps {
    item: itemsModel;
}

export default function AdminItemCard(props: itemProps): JSX.Element {
    const classes = createStyles();
    const history = useHistory();

    const handleDelete = async () => {
        try {
            const answer = window.confirm("Are you sure?");
            if (!answer) return;
            await axios.delete<itemsModel>(Globals.itemsUrl + props.item.itemId);
        } catch (error) {
            if (error.response?.status === 403) {
                logoutUser();
                notificationService.error(error)
                history.push(GlobalPaths.loginLinkUrl);
            } else {
                notificationService.error(error)
            }
        }
    }

    return (
        <Card className="AdminItemCard" title="Item" >
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
                    <NavLink to={GlobalPaths.editItemUrl + "/" + props.item.itemId}>
                        <Fab color="primary" aria-label="Edit" className={classes.fab + " editButton"}>
                            <Edit className="editIcon"></Edit>
                        </Fab>
                    </NavLink>
                    <Fab color="primary" aria-label="delete" onClick={handleDelete} className={classes.fab + " deleteButton"}>
                        <Delete className="deleteIcon" />
                    </Fab>
                </Typography >
            </CardContent >
        </Card >
    )
}
