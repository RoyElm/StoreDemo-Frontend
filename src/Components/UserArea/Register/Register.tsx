import React, { useEffect } from "react";
import "./Register.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Globals } from "../../../Services/Globals";
import store from "../../../Redux/Store";
import { authRegisteredAction } from "../../../Redux/AuthState";
import { GlobalPaths } from "../../../Services/GlobalPaths";
import { notificationService } from "../../../Services/notification.service";
import { authPageStyling } from "../../../Services/GlobalStylingMaker";
import { Avatar, Box, Button, CssBaseline, Grid, Paper, TextField, Typography } from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { socketManagerInstance } from "../../../Socket.io/SocketManager";
import { authorizationHeader } from "../../../Services/GlobalHelpers";
import LoginModel from "../../Models/LoginModel";


function Register({ history }): JSX.Element {

    const classes = authPageStyling();

    const { register, handleSubmit } = useForm<LoginModel>();

    useEffect(() => {
        if (store.getState().authState.auth.isLoggedIn) {
            history.push("/page404");
        }
    });

    //Handling submit of registration form;
    async function send(newUser: LoginModel) {
        try {
            await axios.post<LoginModel>(Globals.authUrl + "register", newUser);
            store.dispatch(authRegisteredAction(newUser));
            //Start listen to socket.io
            socketManagerInstance.connect();

            //function from Global function services that will add to Axios header user token.
            authorizationHeader(newUser);
            history.push(GlobalPaths.homeLinkUrl);
        }
        catch (err) {
            notificationService.error(err);
        }
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlined />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit(send)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    inputRef={register}
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    inputRef={register}
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    inputRef={register}
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    inputRef={register}
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
                        <Grid container>
                            <Grid item>
                                <NavLink to={GlobalPaths.loginLinkUrl} variant="body2" align="center">
                                    {"Have an account? Sign in"}
                                </NavLink>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Typography variant="body2" color="textSecondary" align="center">
                                Copyright © Store Roy Elmakies {new Date().getFullYear()}
                            </Typography>
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}

export default Register;
