import React, { Component } from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import axios from 'axios';
import MapContainer, { BOROUGHS } from '../api/googleMapsAPI';

class EachBoroughPage extends Component {

    constructor(props) {
        super();
        const { allAddress } = props
        this.state = {
            info: "",
            list: []
        }
        console.log("props ", props)
    }

    // renderList = () => {
    

    // }


    render() {
        return (
            <div>
            Helloooo
            <MapContainer zoom={10} initialCenter={BOROUGHS.MANHATTAN} />
            </div>
        )
    }

}
export default EachBoroughPage;