import React, { Component } from 'react';
import Cards from '../../CreatingComponents/Cards/Cards';
import './Adidas-Items.css';
import HatModel from '../Models/HatModel';
import Axios from 'axios';
import store from '../../../Redux/Store';
import { AdidasActionType } from '../../../Redux/AdidasState';
import { Globals } from '../../../Services/Globals';
import { HatsActionType } from '../../../Redux/HatsState';
import NavLog from '../../UserArea/NavLog/NavLog';

interface HatState {
    hats: HatModel[];
}

class AdidasItems extends Component<{}, HatState> {
    public constructor(props: {}) {
        super(props);
        this.state = {
            hats: store.getState().hatsReducer.hats
        }
    }

    public async componentDidMount() {
        try {
            if (store.getState().hatsReducer.hats.length === 0) {
                const response = await Axios.get<HatModel[]>(Globals.storeUrl + "adidas/");
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
                    <Cards img={Globals.hatsUrl + "hatsImage/" + hat.imageName} title={"backRaw2 Hat"}
                        content={"XL/L/M"} route="/store" contentRoute="Go store" id={hat.hatId}
                        price={hat.price}
                    />)}
            </div>
        )
    }
}

export default AdidasItems;

// function AdidasItems() {
//     return (
//         <div className="Adidas-Items p-d-flex p-flex-wrap">
//             <Cards img={firstHat} title={"backRaw2 Hat"}
//                 content={"XL/L/M"} route="/home" contentRoute="Go Home"
//                 price={123}
//             />

//         </div>
//     )
// }

// export default AdidasItems;