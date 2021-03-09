import React from 'react';
import Cards from '../../CreatingComponents/Cards/Cards';
import "./Shop.css"
import hats from '../../../assets/images/hatsImage/hatImages.jpg'
import 'primeflex/primeflex.css';
import { GlobalPaths } from '../../../Services/GlobalPaths';


function Shop() {
    return (
        <div className="Shop p-d-flex p-flex-wrap ">
            <Cards img={hats} title={"Hats"} id={998}
                route={GlobalPaths.storeHatsLinkUrl} contentRoute="Go to Hat" />
            <Cards img={hats} title={"Woolfit Items"} id={999}
                route={GlobalPaths.storeWoolfitLinkUrl} contentRoute="Go to Woolfit Items" />
            {/* <Cards img={hats} title={"Adidas Items"}
                route="/store/adidas-items" contentRoute="Go to Adidas items"/> */}
        </div>
    )
}

export default Shop;