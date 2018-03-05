import React, { Component } from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import axios from 'axios';
import MapContainer, { BOROUGHS } from '../api/googleMapsAPI';

const EachBoroughPage = ({ lat, long, input, }) => {



    const testLocations = [{ name: "Resource Center 1", latitude: "40.735681", longitude: "-73.988713" }, { name: "Resource Center 2", latitude: "40.808451", longitude: "-73.947112" }]

    return (
        <div>
            Helloooo
            <MapContainer zoom={10} initialCenter={BOROUGHS.MANHATTAN} locations={testLocations} />
        </div>

    )
}



export default EachBoroughPage;