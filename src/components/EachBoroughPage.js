import React, { Component } from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import axios from 'axios';
import MapContainer, { BOROUGHS } from '../api/googleMapsAPI';

class EachBoroughPage extends Component {

    constructor(props) {
        super(props);
        const { allAddress, listing } = this.props
this.list = [...this.props.listing]

        this.state = {
            info: "",
            list: [],
            listing: []
        }

        
        
        console.log('LISTING', this.state.listing)
        console.log("props ", props)
    }

    // renderList = () => {
    

    // }
componentDidMount(){
    this.setState({
        listing: [...this.props.listing]
    })
}

    render() {
        
        const testLocations2 = [{name: "Resource Center 1", latitude: "40.735681", longitude: "-73.988713"}, {name: "Resource Center 2", latitude: "40.808451", longitude: "-73.947112"}]
        const testLocations = []
        this.props.listing.map(place =>{
            if(place.address && place.latitude && place.longitude){
            testLocations2.push({name: place.address, latitude: parse(place.latitude, longitude: place.longitude }) }
        })
// let list = [...this.props.listing]
        return (
            <div>
            List of Resources Will Go Here
            <br />
            <ul> { this.state.listing.map( (place) =>(
              <div>

                <li> {place.borough}</li>
                <li>{place.address}</li>
                
                </div>
                )
               
            ) }
            </ul>
            <MapContainer zoom={10} initialCenter={BOROUGHS.MANHATTAN} locations={testLocations} />
            </div>
        )
    }

}
export default EachBoroughPage;