import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import ReactDOM from 'react-dom';

  export class MapContainer extends Component {
    constructor(props){
      super(props)
    }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
  }
  loadMap() {
    if (this.props && this.props.google) {
      // google is available
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      let {initialCenter, zoom} = this.props;
      const {lat, lng} = initialCenter;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      })
      this.map = new maps.Map(node, mapConfig);
    }
    // ...
  }
  

render() {
  const style = {
    width: '50vw',
    height: '50vh',
    marginLeft: '25%'
  }
    if (!this.props.loaded) {
        return <div ref='map'>Loading...</div>
      }
      return (
        <div style={style} ref='map'>Map will go here
        <Map google={this.props.google} />
        </div>
      )
    }
 }
 MapContainer.propTypes = {
  google: PropTypes.object,
  zoom: PropTypes.number,
  initialCenter: PropTypes.object
}
MapContainer.defaultProps = {
  zoom: 13,
  // San Francisco, by default
  initialCenter: {
    lat: 37.774929,
    lng: -122.419416
  }
}
export default GoogleApiWrapper({
    apiKey: ('AIzaSyBUcG-ocnq92foLawQ6Hvf8Xtyxjp-XXhY')
  })(MapContainer)