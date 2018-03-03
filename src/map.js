import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
render() {
    if (!this.props.loaded) {
        return <div ref='map'>Loading...</div>
      }
      return (
        <div>Map will go here
        <Map google={this.props.google} />
        </div>
      )
    }
 }
export default GoogleApiWrapper({
    apiKey: ('AIzaSyBUcG-ocnq92foLawQ6Hvf8Xtyxjp-XXhY')
  })(MapContainer)