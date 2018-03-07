import React, { Component } from "react";
import PropTypes from "prop-types";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
// import ReactDOM from "react-dom";

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    // this.locations
    this.state = {
      locations: []
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      // this.loadMap();
  //     this.setState({
  //   locations: [...this.props.locations]
  // })
    }
  }
  // loadMap() {
  //   console.log('load map called');
  //   if (this.props && this.props.google) {
  //     // google is available
  //     const { google } = this.props;
  //     const maps = google.maps;

  //     const mapRef = this.refs.map;
  //     const node = ReactDOM.findDOMNode(mapRef);

  //     let { initialCenter, zoom } = this.props;
  //     const { lat, lng } = initialCenter;
  //     const center = new maps.LatLng(lat, lng);
  //     const mapConfig = Object.assign({}, {
  //       center: center,
  //       zoom: zoom
  //     })
  //     this.map = new maps.Map(node, mapConfig);
  //   }
  //  hi
  //   // ...
  // }
handleUpdate =()=>{
  
}
  componentDidMount() {
    // this.loadMap();
// this.locations =  this.props.locations.map(pos => {
//   let latFloat = parseFloat(pos.latitude);
//   let lngFloat = parseFloat(pos.longitude);

//   return (
//     <Marker
//       name={pos.name}
//       position={{ lat: latFloat, lng: lngFloat }}
//       visible={true}
//     />
//   );
// });
this.handleUpdate();
  }

  handleMark = () => {};

  render() {
    const style = {
      width: "700px",
      height: "400px",
      marginLeft: "2%"
    };

    console.log(`location props GoogleMaps API`, this.props.locations);
    let locations 

    locations = this.props.locations.map(pos => {
      let latFloat = parseFloat(pos.latitude);
      let lngFloat = parseFloat(pos.longitude);

      return (
        <Marker
          name={pos.name}
          position={{ lat: latFloat, lng: lngFloat }}
          visible={true}
        />
      );
    });

    if (!this.props.loaded) {
      return <div ref="map">Loading...</div>;
    }
    let { google } = this.props;

    return (
      <div ref="map">
        <Map
          style={style}
          google={this.props.google}
          initialCenter={this.props.initialCenter}
          zoom={this.props.zoom ? this.props.zoom : MapContainer.defaultProps.zoom}
        >
          {locations}

        </Map>

      </div>
    );
  }
}



MapContainer.propTypes = {
  google: PropTypes.object,
  zoom: PropTypes.number,
  initialCenter: PropTypes.object,
  locations: PropTypes.array
};

MapContainer.defaultProps = {
  zoom: 10,
  // New York by default
  initialCenter: {
    lat: 40.758896,
    lng: -73.98513
  }
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyBUcG-ocnq92foLawQ6Hvf8Xtyxjp-XXhY"
})(MapContainer);

export const BOROUGHS = {
  MANHATTAN: { lat: 40.758896, lng: -73.98513 },
  BROOKLYN: { lat: 40.650002, lng: -73.949997 },
  BRONX: { lat: 40.837048, lng: -73.865433 },
  QUEENS: { lat: 40.6814922, lng: -73.8365236 },
  STATENISLAND: {
    lat: 40.579021,
    lng: -74.151535
  }
};

