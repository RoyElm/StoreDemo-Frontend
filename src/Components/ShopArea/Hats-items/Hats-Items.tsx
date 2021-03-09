import React, { Component } from 'react';
import allImages from '../../../assets/images/hatsImage/allImages.jpg';
import "./Hats-Items.css";
import Cards from '../../CreatingComponents/Cards/Cards';
import 'primeflex/primeflex.css';
import { Globals } from '../../../Services/Globals'
import HatModel from '../Models/HatModel';
import Axios from "axios";
import store from '../../../Redux/Store';
import { HatsActionType } from '../../../Redux/HatsState';
import { GlobalPaths } from '../../../Services/GlobalPaths';

interface HatState {
    hats: HatModel[];
}

class Hats extends Component<{}, HatState> {
    public constructor(props: {}) {
        super(props);
        this.state = {
            hats: store.getState().hatsReducer.hats
        }
    }

    public async componentDidMount() {
        try {
            if (store.getState().hatsReducer.hats.length === 0) {
                const response = await Axios.get<HatModel[]>(Globals.hatsUrl);
                this.setState({ hats: response.data });
                store.dispatch({ type: HatsActionType.HatsDownloaded, payload: response.data })
            }
        }
        catch (err) {
            alert(err.message);
        }
    }

    public render(): JSX.Element {
        return (
            <div className="Hats-Items p-col-11 p-md-11 p-lg-10">
                <Cards img={allImages} title={"Woolfit Hats"} id={0}
                    content={
                        <section>
                            <p>
                                כובע פלקספיט דלתא הוא כובע מהפכני שיא הטכנולוגיה, קל מאד, חלק, ובעל נוחות מקסימלית
                                <br />
                                <br />
                            הכובע בנוי מ-3 שכבות של מגני זיעה ועמיד לחדירה במים
                            הבד (פטנט) דוחה כתמים, אנטי בקטריאלי, ומונע מהזיעה להכתים את הבד מעל

                                <span>
                                    הרכב בד: 92% פוליאסטר, 8% ספנדקס
                                </span>
                                <br />
                                <span>
                                    קיים בצבעים: שחור, לבן ונייבי
                                </span>
                                <br />
                                <span>
                                    XS/S, S/M, L/XL  :קיים ב
                                </span>
                            </p>
                        </section>
                    }
                />
                <div key="container" className="p-d-flex p-flex-wrap container">
                    {this.state.hats.map(hat =>
                        <Cards img={Globals.hatsUrl + "hatsImage/" + hat.imageName} id={hat.hatId}
                            content={"XL/L/M"} route={GlobalPaths.storeHatsLinkUrl} contentRoute="Click"
                            price={hat.price}
                        />
                    )}
                </div>

            </div>
        )
    }
}

export default Hats;
