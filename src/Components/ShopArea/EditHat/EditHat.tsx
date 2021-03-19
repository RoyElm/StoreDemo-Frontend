import React, { useEffect } from "react";
import { Button, ButtonGroup, TextField, ThemeProvider, Typography } from "@material-ui/core";
import { Clear, Send, Edit } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import "./EditHat.css";
import store from "../../../Redux/Store";
import axios from "axios";
import { Globals } from "../../../Services/Globals";
import { notificationService } from "../../../Services/notification.service";
import { createTheme, creatingClasses } from '../../../Services/GlobalStylingMaker';
import { GlobalPaths } from "../../../Services/GlobalPaths";
import { logoutUser } from "../../../Services/GlobalHelpers";
import HatModel from "../../Models/HatModel";


function EditHat(): JSX.Element {

    const { hatId } = useParams();
    const hat = store.getState().hatsState.hats.find(i => i.hatId.toString() === hatId);
    const { register, handleSubmit } = useForm<HatModel>({ defaultValues: hat ? hat : undefined });
    const history = useHistory();

    //importing styles from Global function; 
    const theme = createTheme();
    const classes = creatingClasses();

    //Handling unauthorized behavior of user
    useEffect(() => {
        if (!store.getState().authState.auth.isLoggedIn || !store.getState().authState.auth.user.isAdmin) {
            return history.push("/page404");
        }
    })

    async function submit(editedHat: HatModel) {
        try {
            const myFormData = new FormData();
            myFormData.append("colors", editedHat.colors);
            myFormData.append("price", editedHat.price.toString());
            myFormData.append("imageName", hat.imageName);
            if (editedHat.newImage.item(0) !== null) {
                myFormData.append("newImage", editedHat.newImage.item(0));
            }
            await axios.put<HatModel>(Globals.hatsUrl + hatId, myFormData);
            notificationService.success("Hat Edited")
            history.push(GlobalPaths.storeHatsLinkUrl)

        } catch (error) {
            //if user token has been expired he will be logout and rotate to Login Page
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
        <ThemeProvider theme={theme}>
            <div className="EditHat">
                <form method="POST" onSubmit={handleSubmit(submit)} encType="multipart/form-data">
                    <Typography variant="h3">
                        <Edit />
                        Edit Hat
                    </Typography>

                    <TextField
                        name="colors" inputRef={register}
                        inputProps={{ minLength: 3, maxLength: 1000 }}
                        label="Colors" variant="outlined" className={classes.textBox}
                        required
                    />
                    <br />

                    <TextField name="price"
                        inputProps={{ step: "0.01", min: 10, max: 20000 }}
                        inputRef={register} label="Price"
                        type="number" variant="outlined" className={classes.textBox} required />
                    <br />

                    <TextField name="newImage" inputRef={register}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ accept: "image/*" }}
                        label="Image" type="file" variant="outlined"
                        className={classes.textBox}
                    />
                    <br />

                    <ButtonGroup fullWidth variant="contained" >
                        <Button color="primary" fullWidth type="submit" startIcon={<Send />}>Send</Button>
                        <Button color="secondary" fullWidth type="reset" startIcon={<Clear />}>Clear</Button>
                    </ButtonGroup>
                </form>
            </div>
        </ThemeProvider >
    );
}

export default EditHat;
