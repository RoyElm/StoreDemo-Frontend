import React, { Component } from 'react';
import "./Hats-Items.css";
import { Globals } from '../../../Services/Globals';
import HatModel from '../../Models/HatModel';
import Axios from "axios";
import store from '../../../Redux/Store';
import { hatsDownloadedAction } from '../../../Redux/HatsState';
import HatCard from '../hatCard/hatCard';
import { notificationService } from '../../../Services/notification.service';
import { Unsubscribe } from 'redux';
import authModel from '../../Models/authModel';
import { GlobalPaths } from '../../../Services/GlobalPaths';
import AdminHatCard from '../AdminHatCard/AdminHatCard';
import { NavLink } from "react-router-dom";


interface HatState {
    hats: HatModel[];
    auth: authModel;
}

class Hats extends Component<{}, HatState> {
    private unsubscribeFromStore: Unsubscribe;

    public constructor(props: {}) {
        super(props);
        this.state = {
            hats: store.getState().hatsState.hats,
            auth: store.getState().authState.auth
        }
    }

    public async componentDidMount() {
        try {
            this.unsubscribeFromStore = store.subscribe(() => {
                const hats = store.getState().hatsState.hats;
                const auth = store.getState().authState.auth;
                this.setState({ hats, auth });
            });

            if (store.getState().hatsState.hats.length === 0) {
                const response = await Axios.get<HatModel[]>(Globals.hatsUrl);
                store.dispatch(hatsDownloadedAction(response.data))
            }

        }
        catch (err) {
            notificationService.error(err);
        }
    }

    public componentWillUnmount(): void {
        this.unsubscribeFromStore();
    }

    public render() {
        return (
            <div key="container" className="hat-Container">
                {this.state.auth.isLoggedIn && this.state.auth.user.isAdmin === "royAdmin!" ?
                    <>
                        {this.state.hats.map(hat => <AdminHatCard key={hat.hatId} hat={hat} />)}
                        <NavLink to={GlobalPaths.addHatUrl}>Add Hat</NavLink>
                    </> :
                    this.state.hats.map(hat => <HatCard hat={hat} key={hat.hatId} />)
                }
            </div>
        )
    }
}

export default Hats;
