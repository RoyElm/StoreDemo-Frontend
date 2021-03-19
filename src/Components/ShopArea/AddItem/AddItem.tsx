import React, { useEffect } from "react";
import { Button, ButtonGroup, TextField, ThemeProvider, Typography } from "@material-ui/core";
import { Clear, Send, Add } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import "./AddItem.css";
import ItemsModel from "../../Models/ItemsModel";
import store from "../../../Redux/Store";
import axios from "axios";
import { Globals } from "../../../Services/Globals";
import { notificationService } from "../../../Services/notification.service";
import { createTheme, creatingClasses } from '../../../Services/GlobalStylingMaker';
import { GlobalPaths } from "../../../Services/GlobalPaths";
import { logoutUser } from "../../../Services/GlobalHelpers";


function AddItem(): JSX.Element {

    const { register, handleSubmit } = useForm<ItemsModel>();
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

    async function submit(newItem: ItemsModel) {
        try {
            const myFormData = new FormData();
            myFormData.append("itemName", newItem.itemName);
            newItem.description && myFormData.append("description", newItem.description);
            newItem.colors && myFormData.append("colors", newItem.colors);
            myFormData.append("itemPrice", newItem.itemPrice.toString());
            myFormData.append("newImage", newItem.newImage.item(0));
            await axios.post<ItemsModel>(Globals.itemsUrl, myFormData);
            notificationService.success("Item added")
            history.push(GlobalPaths.storeItemsLinkUrl)

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
            <div className="AddItem">
                <form method="POST" onSubmit={handleSubmit(submit)} encType="multipart/form-data">
                    <Typography variant="h3">
                        <Add />
                        Add Item
                    </Typography>

                    <TextField
                        name="itemName" inputRef={register}
                        label="Item Name" variant="outlined" className={classes.textBox}
                        inputProps={{ minLength: 3, maxLength: 500 }}
                        required />
                    <br />

                    <TextField
                        name="description" inputRef={register}
                        inputProps={{ type: "textarea", minLength: 3, maxLength: 1000 }}
                        label="Description" type="textarea" variant="outlined" className={classes.textBox}
                        multiline
                    />
                    <br />

                    <TextField
                        name="colors" inputRef={register}
                        inputProps={{ minLength: 3, maxLength: 1000 }}
                        label="Colors" variant="outlined" className={classes.textBox}
                    />
                    <br />

                    <TextField name="itemPrice"
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

export default AddItem;
