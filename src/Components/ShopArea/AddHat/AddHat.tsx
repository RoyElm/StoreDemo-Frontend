import React, { useEffect } from "react";
import { Button, ButtonGroup, TextField, ThemeProvider, Typography } from "@material-ui/core";
import { Clear, Send, Add } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import "./AddHat.css";
import ItemsModel from "../../Models/ItemsModel";
import store from "../../../Redux/Store";
import axios from "axios";
import { Globals } from "../../../Services/Globals";
import { notificationService } from "../../../Services/notification.service";
import { createTheme, creatingClasses } from '../../../Services/GlobalStylingMaker';
import { GlobalPaths } from "../../../Services/GlobalPaths";
import { logoutUser } from "../../../Services/GlobalHelpers";
import HatModel from "../../Models/HatModel";


function AddHat(): JSX.Element {

    const { register, handleSubmit } = useForm<HatModel>();
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

    async function submit(newHat: HatModel) {
        try {
            const myFormData = new FormData();
            myFormData.append("colors", newHat.colors);
            myFormData.append("price", newHat.price.toString());
            myFormData.append("newImage", newHat.newImage.item(0));
            await axios.post<ItemsModel>(Globals.hatsUrl, myFormData);
            notificationService.success("Hat added")
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
            <div className="AddHat">
                <form method="POST" onSubmit={handleSubmit(submit)} encType="multipart/form-data">
                    <Typography variant="h3">
                        <Add />
                        Add Hat
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
                        className={classes.textBox} required
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

export default AddHat;
