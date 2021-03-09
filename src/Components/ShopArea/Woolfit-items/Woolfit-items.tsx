import React, { Component } from 'react';
import Cards from '../../CreatingComponents/Cards/Cards';
import firstHat from "../../../assets/images/hatsImage/hat01.jpg"
import './Woolfit-items.css';
import HatModel from '../Models/HatModel';
import Axios from 'axios';
import store from '../../../Redux/Store';
import { woolfitActionType } from '../../../Redux/WoolfitItemsState';
import { Globals } from '../../../Services/Globals';
import { HatsActionType } from '../../../Redux/HatsState';
import NavLog from '../../UserArea/NavLog/NavLog';

interface HatState {
    hats: HatModel[];
}

class WoolfitItems extends Component<{}, HatState> {
    public constructor(props: {}) {
        super(props);
        this.state = {
            hats: store.getState().hatsReducer.hats
        }
    }

    public async componentDidMount() {
        try {
            if (store.getState().hatsReducer.hats.length === 0) {
                const response = await Axios.get<HatModel[]>(Globals.storeUrl + "items");
                const hats = response.data;
                this.setState({ hats });
                store.dispatch({ type: HatsActionType.HatsDownloaded, payload: hats })
            }
        }
        catch (err) {
            alert(err.message);
        }
    }
    
    public render() {
        return (
            <div className="Woolfit-Items p-d-flex p-flex-wrap">
                {this.state.hats.map(hat =>
                    <Cards img={Globals.storeUrl + "hats/hatsImage/" + hat.imageName} title={"backRaw2 Hat"} id={hat.hatId}
                        content={"XL/L/M"} route="/home" contentRoute="Go Home"
                        price={hat.price}
                    />)}
            </div>
        )
    }
}

export default WoolfitItems;
