import React from 'react';
import "./AdminHatCard.css";
import { Globals } from '../../../Services/Globals';
import HatModel from '../../Models/HatModel';
import { Card, CardContent, CardMedia, Fab, Typography } from '@material-ui/core';
import { createStyles } from '../../../Services/GlobalStylingMaker';
import { Delete, Edit } from '@material-ui/icons';
import { NavLink, useHistory } from "react-router-dom";
import { notificationService } from '../../../Services/notification.service';
import axios from 'axios';
import { logoutUser } from '../../../Services/GlobalHelpers';
import { GlobalPaths } from '../../../Services/GlobalPaths';

interface cardProps {
    hat: HatModel;
}

export default function AdminHatCard(props: cardProps): JSX.Element {
    const classes = createStyles();
    const history = useHistory();

    const handleDeleteHat = async () => {
        try {
            const answer = window.confirm("Are you sure?");
            if (!answer) return;
            await axios.delete<HatModel>(Globals.hatsUrl + props.hat.hatId);
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
        <Card className={classes.root + " AdminHatCard"} title="Hat" >
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
                    <Fab color="primary" aria-label="Edit" className={classes.fab + " editButton"}>
                        <NavLink to={GlobalPaths.editHatUrl + "/" + props.hat.hatId}>
                            <Edit className="editIcon"></Edit>
                        </NavLink>
                    </Fab>
                    <Fab color="primary" aria-label="delete" onClick={handleDeleteHat} className={classes.fab + " deleteButton"}>
                        <Delete className="deleteIcon" />
                    </Fab>
                </Typography>
            </CardContent >
        </Card >

    )
}
