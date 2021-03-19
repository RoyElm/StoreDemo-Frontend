import React, { useEffect, useRef } from 'react';
import { NavLink } from "react-router-dom";
import { GlobalPaths } from '../../../Services/GlobalPaths';
import { authPageStyling } from '../../../Services/GlobalStylingMaker';
import "./Login.css";
import LoginModel from '../../Models/LoginModel';
import { useForm } from 'react-hook-form';
import store from '../../../Redux/Store';
import axios from 'axios';
import { Globals } from '../../../Services/Globals';
import { notificationService } from '../../../Services/notification.service';
import { authLoggedInAction } from '../../../Redux/AuthState';
import { LockOutlined } from '@material-ui/icons';
import { Avatar, Box, Button, CssBaseline, Grid, Paper, TextField, Typography } from "@material-ui/core";
import { socketManagerInstance } from '../../../Socket.io/SocketManager';
import { authorizationHeader } from '../../../Services/GlobalHelpers';


function Login({ history }) {
    const classes = authPageStyling();

    let registered = useRef<LoginModel>();
    const { register, handleSubmit } = useForm<LoginModel>();

    useEffect(() => {
        //Handling unauthorized behavior of user;
        if (store.getState().authState.auth.isLoggedIn) {
            history.push("/page404");
        }

        //After registration rendering the username that has been registered;
        if (!store.getState().authState.auth.isLoggedIn && store.getState().authState.auth.user) {
            registered.current = store.getState().authState.auth.user;
        };
    })

    //Handling login form submit;
    async function send(user: LoginModel) {
        try {
            const response = await axios.post<LoginModel>(Globals.authUrl + "login", user);
            const userLogged = response.data;
            store.dispatch(authLoggedInAction(userLogged));

            //Start listen to socket.io
            socketManagerInstance.connect();

            //function from Global function services that will add to Axios header user token.
            authorizationHeader(userLogged);

            history.push(GlobalPaths.homeLinkUrl);
        } catch (err) {
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
                        Sign in
                </Typography>
                    <form className={classes.form} onSubmit={handleSubmit(send)}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            type="email"
                            id="email"
                            inputRef={register}
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            inputRef={register}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                    </Button>
                        <Grid container>
                            <Grid item>
                                <NavLink to={GlobalPaths.registerLinkUrl} variant="body2" align="center">
                                    {"Don't have an account? Sign Up"}
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

export default Login;
