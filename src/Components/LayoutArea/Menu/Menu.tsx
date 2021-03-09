import React from "react";
import { NavLink } from "react-router-dom";
import "./Menu.css";
import navImage from "../../../assets/images/logoimages/navImage.png";
import Links from '../../CreatingComponents/Links/Links';
import NavLog from "../../UserArea/NavLog/NavLog";
import { GlobalPaths } from "../../../Services/GlobalPaths";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
            <div>
                <Links content={"דף הבית"} route={GlobalPaths.homeLinkUrl} src={navImage} />
                <Links content={"השיטה"} route={GlobalPaths.methodLinkUrl} src={navImage} />
                <Links content={"החנות"} route={GlobalPaths.storeLinkUrl} src={navImage} />
            </div>
        </div>
    );
}

export default Menu;
