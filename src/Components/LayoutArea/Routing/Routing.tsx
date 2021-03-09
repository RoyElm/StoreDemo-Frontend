import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../../HomeArea/Home";
import Page404 from "../Page404/Page404";
import Method from '../../Method/Method'
import Shop from "../../ShopArea/Shop/Shop";
import HatsItems from "../../ShopArea/Hats-items/Hats-Items";
import AdidasItems from "../../ShopArea/Adidas-Items/Adidas-Items";
import WoolfitItems from "../../ShopArea/Woolfit-items/Woolfit-items";
import Register from '../../UserArea/Register/Register';
import Login from "../../UserArea/Login/Login";
import { GlobalPaths } from "../../../Services/GlobalPaths";

function Routing(): JSX.Element {

    return (
        <div className="Routing">
            <Switch>
                <Route path={GlobalPaths.homeLinkUrl} component={Home} exact />
                <Route path={GlobalPaths.methodLinkUrl} component={Method} exact />
                <Route path={GlobalPaths.storeLinkUrl} component={Shop} exact />
                <Route path={GlobalPaths.storeHatsLinkUrl} component={HatsItems} exact />
                {/* <Route path='/store/adidas-items' component={AdidasItems} exact /> */}
                <Route path={GlobalPaths.storeWoolfitLinkUrl} component={WoolfitItems} exact />
                <Route path={GlobalPaths.loginLinkUrl} component={Login} exact />
                <Route path={GlobalPaths.registerLinkUrl} component={Register} exact />
                <Route component={Page404} />
            </Switch>
        </div>
    );
}

export default Routing;
