import React, { Component } from "react";
import "./Footer.css";
import logoBottomImage from "../../../assets/images/logoimages/footerlogo.png";


//img with class
class Footer extends Component {
    public render(): JSX.Element {
        return (
            <div className="Footer">
                <img className="FooterImage" src={logoBottomImage} alt="LogoImage"/>
            </div>
        );
    }
}

export default Footer;

