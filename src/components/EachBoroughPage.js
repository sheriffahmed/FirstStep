import React, { Component } from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import axios from 'axios';
import MapContainer, { BOROUGHS } from '../api/googleMapsAPI';

const EachBoroughPage = ({ lat, long, input, }) => {


    constructor(props) {
        super(props);
        const { allAddress, listing } = this.props
        this.state = {
            info: "",
            list: [],
            listing: [...listing]
        }
        console.log("props ", props)
    }



    const testLocations = [{ name: "Resource Center 1", latitude: "40.735681", longitude: "-73.988713" }, { name: "Resource Center 2", latitude: "40.808451", longitude: "-73.947112" }]


    render() {
        const testLocations = [{name: "Resource Center 1", latitude: "40.735681", longitude: "-73.988713"}, {name: "Resource Center 2", latitude: "40.808451", longitude: "-73.947112"}]

        return (
            <div>
            List of Resources Will Go Here
            <br />
            <p>{JSON.stringify(this.props.listing)}</p>

            <MapContainer zoom={10} initialCenter={BOROUGHS.MANHATTAN} locations={testLocations} />
        </div>

    )
}



export default EachBoroughPage;