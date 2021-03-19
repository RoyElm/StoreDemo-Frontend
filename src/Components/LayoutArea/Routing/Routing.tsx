import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../Home/Home";
import Page404 from "../Page404/Page404";
import About from '../../About/About'
import Shop from "../../ShopArea/Shop/Shop";
import HatsItems from "../../ShopArea/Hats-items/Hats-Items";
import items from "../../ShopArea/items/items";
import { GlobalPaths } from "../../../Services/GlobalPaths";
import CartShop from "../../CartArea/CartShop/CartShop";
import Login from "../../UserArea/Login/Login";
import Register from "../../UserArea/Register/Register";
import Checkout from "../../CartArea/Checkout/Checkout";
import AddItem from "../../ShopArea/AddItem/AddItem";
import EditItem from "../../ShopArea/EditItem/EditItem";
import AddHat from "../../ShopArea/AddHat/AddHat";
import EditHat from "../../ShopArea/EditHat/EditHat";

function Routing(): JSX.Element {

    return (
        <div className="Routing">
            <Switch>
                <Route path={GlobalPaths.homeLinkUrl} component={Home} exact />
                <Route path={GlobalPaths.aboutLinkUrl} component={About} exact />
                <Route path={GlobalPaths.storeLinkUrl} component={Shop} exact />
                <Route path={GlobalPaths.storeHatsLinkUrl} component={HatsItems} exact />
                <Route path={GlobalPaths.storeItemsLinkUrl} component={items} exact />
                <Route path={GlobalPaths.loginLinkUrl} component={Login} exact />
                <Route path={GlobalPaths.registerLinkUrl} component={Register} exact />
                <Route path={GlobalPaths.cartShopUrl} component={CartShop} exact />
                <Route path={GlobalPaths.paymentUrl} component={Checkout} exact />
                <Route path={GlobalPaths.addItemUrl} component={AddItem} exact />
                <Route path={GlobalPaths.editItemUrl + "/:itemId"} component={EditItem} exact />
                <Route path={GlobalPaths.addHatUrl} component={AddHat} exact />
                <Route path={GlobalPaths.editHatUrl + "/:hatId"} component={EditHat} exact />
                <Route component={Page404} />
            </Switch>
        </div>
    );
}

export default Routing;
