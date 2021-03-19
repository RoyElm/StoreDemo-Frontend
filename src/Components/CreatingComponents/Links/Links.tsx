import React from "react";
import { NavLink } from "react-router-dom";
import "./Links.css";

interface navLinkProps {
    content: string;
    route: string;
}

function Links(props: navLinkProps): JSX.Element {
    return (
        <NavLink to={props.route} className="navTag">
            <span>{props.content}</span>
        </NavLink>
    );
}

export default Links;
