import React, { Component } from 'react';
import './items.css';
import Axios from 'axios';
import store from '../../../Redux/Store';
import { itemsDownloadedAction } from '../../../Redux/ItemsState';
import { Globals } from '../../../Services/Globals';
import ItemCard from '../itemCard/itemCard';
import ItemsModel from '../../Models/ItemsModel';
import { notificationService } from '../../../Services/notification.service';
import { Unsubscribe } from 'redux';
import { GlobalPaths } from '../../../Services/GlobalPaths';
import { NavLink } from "react-router-dom";
import authModel from '../../Models/authModel';
import AdminItemCard from "../AdminItemCard/AdminItemCard"


interface itemsState {
    items: ItemsModel[];
    auth: authModel;
}

class Items extends Component<{}, itemsState> {

    private unsubscribeFromStore: Unsubscribe;

    public constructor(props: {}) {
        super(props);
        this.state = {
            items: store.getState().itemsState.items,
            auth: store.getState().authState.auth
        }
    }

    public async componentDidMount() {
        try {
            this.unsubscribeFromStore = store.subscribe(() => {
                const items = store.getState().itemsState.items;
                const auth = store.getState().authState.auth;
                this.setState({ items, auth });
            });

            if (store.getState().itemsState.items.length === 0) {
                const response = await Axios.get<ItemsModel[]>(Globals.itemsUrl);
                store.dispatch(itemsDownloadedAction(response.data))
            }
        }
        catch (err) {
            notificationService.error(err);
        }
    }

    public componentWillUnmount(): void {
        this.unsubscribeFromStore();
    }

    public render() {
        return (
            <div className="Items p-d-flex p-flex-wrap">
                {this.state.auth.isLoggedIn && this.state.auth.user.isAdmin === "royAdmin!" ?
                    <>
                        {this.state.items.map(item => <AdminItemCard key={item.itemId} item={item} />)}
                        <NavLink to={GlobalPaths.addItemUrl}>Add Item</NavLink>
                    </> :
                    this.state.items.map(item => <ItemCard key={item.itemId} item={item} />)
                }
            </div>
        )
    }
}

export default Items;
