import React from 'react';
import { Card } from 'primereact/card';
import "./Cards.css";
import { NavLink } from "react-router-dom";
// import { Tag } from 'primereact/tag';
import 'primeflex/primeflex.css';


interface cardProps {
    id: number;
    img: string;
    title?: string;
    content?: any;
    price?: number;
    route?: string;
    contentRoute?: string;
}

function Cards(props: cardProps) {
    const header = <img className="img" alt="Card" src={props.img} />
    const footer = props.route &&
        <NavLink to={props.route} className="nav-title" >
            <button className="button p-col-11 p-md-11 p-lg-11">🛒{props.contentRoute}</button>
        </NavLink >
    return (
        <Card key={props.id} className="Card p-mr-5 p-mb-2 p-col-8 p-md-6 p-lg-3" title={props.title} header={header} footer={footer}>
            {props.content ?
                <p>
                    {props.content}
                    <br />
                    {props.price && props.price + "₪"}
                </p> : <p></p>}
        </Card>
    )


}

export default Cards;