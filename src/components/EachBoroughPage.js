import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MapContainer, { BOROUGHS } from "../api/googleMapsAPI";

class EachBoroughPage extends Component {
  constructor(props) {
    super(props);
    const { allAddress, listing } = this.props;
    this.list = [...this.props.listing];
    this.locations = [];

    this.state = {
      info: "",
      list: [],
      listing: []
    };

    console.log("LISTING", this.state.listing);
    console.log("props ", props);
  }

  // renderList = () => {
componentWillMount(){

 if(this.locations){
   this.locations = []
 }
 this.setState({
  listing: [...this.props.listing]
});
console.log("this.props.listings", this.props.listing);

this.props.listing.map(place => {
  if (place.address && place.latitude && place.longitude) {
    this.locations.push({
      name: place.address,
      latitude: place.latitude,
      longitude: place.longitude
    });
  }
  // console.log(`NewLOCATIONS`, this.locations);
})
}
  //  hi
  // }
  componentDidUpdate(prevProps){
    if(prevProps.listing !== this.props.listing){
      this.setState({
        listing: [...this.props.listing]
      });
    }
  }
  // componentDidMount() {
  //   this.setState({
  //     listing: [...this.props.listing]
  //   });
  //   console.log("this.props.listings", this.props.listing);
   
  //   this.props.listing.map(place => {
  //     if (place.address && place.latitude && place.longitude) {
  //       this.locations.push({
  //         name: place.address,
  //         latitude: place.latitude,
  //         longitude: place.longitude
  //       });
  //     }
  //     console.log(`NewLOCATIONS`, this.locations);
  //   });
  // }

  render() {
    const testLocations2 = [
      {
        name: "Resource Center 1",
        latitude: "40.735681",
        longitude: "-73.988713"
      },
      {
        name: "Resource Center 2",
        latitude: "40.808451",
        longitude: "-73.947112"
      }
    ];
    const testLocations = [];

    // let list = [...this.props.listing]
    return (
      <div>
        <div>
          <Link to="/">
            <img
              style={{ width: "100px" }}
              src="https://i.imgur.com/muUuCZ8.png"
            />
          </Link>
          <h2>We hope your search leads to a successful next step!</h2>
        </div>
        <div className="container">
          <div className="left_div">
            <div className="list">
              <h3>Results</h3>
              <ul>
                {" "}
                {this.state.listing.map(place => (
                  <div>
                    <br />
                    <h2>{place.facility_name || place.program_site_name}</h2>
                    <li>{place.address || place.street_address}</li>
                    <li>{place.city !== place.borough ? place.city : null}</li>
                    <li> {place.borough}</li>
                    <li>{place.phone_number_s}</li>
                    <br />
                    <li>
                      {" "}
                      {place.comments
                        ? `Comments: ${place.comments}`
                        : null}{" "}
                    </li>
                    <span />
                  </div>
                ))}
              </ul>
            </div>
          </div>
          <div className="map_div">
            <MapContainer
              zoom={10}
              initialCenter={BOROUGHS.MANHATTAN}
              locations={this.locations}
            />
          </div>
        </div>
        <div className="info_div">
          <p>Info rendered goes here (when location pin is clicked on)</p>
        </div>
      </div>
    );
  }
}
export default EachBoroughPage;
