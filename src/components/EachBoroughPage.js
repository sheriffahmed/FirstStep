import React, { Component } from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import axios from 'axios';
import MapContainer, { BOROUGHS } from '../api/googleMapsAPI';

class EachBoroughPage extends Component {

    constructor(props) {

        super(props);
        const { allAddress, listing } = this.props
this.list = [...this.props.listing]
this.locations = []

        this.state = {
            info: "",
            list: [],
            listing: []
        }

        
        
        console.log('LISTING', this.state.listing)
        console.log("props ", props)
    }

    // renderList = () => {
    
//  hi
    // }
componentDidMount(){
    this.setState({
        listing: [...this.props.listing]
    })  
    console.log("this.props.listings", this.props.listing)
    this.props.listing.map(place =>{
            if(place.address && place.latitude && place.longitude){
            this.locations.push({name: place.address, latitude: place.latitude, longitude: place.longitude }) }
            console.log(`NewLOCATIONS`, this.locations)
        })
}

    render() {
        
        const testLocations2 = [{name: "Resource Center 1", latitude: "40.735681", longitude: "-73.988713"}, {name: "Resource Center 2", latitude: "40.808451", longitude: "-73.947112"}]
        const testLocations = []
      
// let list = [...this.props.listing]
        return (
            <div>
            List of Resources Will Go Here
            <br />
            <ul> { this.state.listing.map( (place) =>(
              <div>

                <li> {place.borough}</li>
                <li>{place.address || place.street_address}</li>
                
                </div>
                )
               
            ) }
            </ul>
            <MapContainer zoom={10} initialCenter={BOROUGHS.MANHATTAN} locations={this.locations} />
            </div>
        )
    }

}
export default EachBoroughPage;
