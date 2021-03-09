import React from "react";
import { NavLink } from "react-router-dom";
import "./Links.css";

interface navLinkProps {
    content: string;
    src: string;
    route: string;
}

function Links(props: navLinkProps): JSX.Element {
    return (
        <div className="Links p-col-8 p-md-10 p-lg-10">
            <NavLink to={props.route} className="navTag">
                <span>{props.content}</span>
                <img src={props.src} alt={props.content} />
            </NavLink>
        </div>
    );
}

export default Links;
