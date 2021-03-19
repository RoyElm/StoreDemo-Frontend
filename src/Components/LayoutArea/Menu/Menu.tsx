import React from "react";
import "./Menu.css";
import Links from '../../CreatingComponents/Links/Links';
import { GlobalPaths } from "../../../Services/GlobalPaths";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
            <div>
                <Links content={"Home"} route={GlobalPaths.homeLinkUrl} />
                <Links content={"Store"} route={GlobalPaths.storeLinkUrl}  />
                <Links content={"About"} route={GlobalPaths.aboutLinkUrl} />
            </div>
        </div>
    );
}

export default Menu;
