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
  
componentDidMount(){
  this.loadMap();
}

handleMark= () =>{

}
render() {
  const style = {
    width: '50vw',
    height: '50vh',
    marginLeft: '25%'
  }

  console.log(this.props.locations)

 let locations = this.props.locations.map((pos)=>{

        let latFloat = parseFloat(pos.latitude)
        let lngFloat = parseFloat(pos.longitude)
        
      
            return(
            
           
          <Marker position={{lat: latFloat, lng: lngFloat}} visible={true} />
          
          
            )
          })
    if (!this.props.loaded) {
        return <div ref='map'>Loading...</div>
      }
      let {google} = this.props
      
      return (
        <div style={style} ref='map'>
        <Map google={this.props.google}>
          {locations}
        </Map> 
          
          
        </div>
      )
    }
 }
 MapContainer.propTypes = {
  google: PropTypes.object,
  zoom: PropTypes.number,
  initialCenter: PropTypes.object,
  locations: PropTypes.array
}
MapContainer.defaultProps = {
  zoom: 13,
  // San Francisco, by default
  initialCenter: {
    lat: 40.758896,
    lng: -73.985130
  }
}


export default GoogleApiWrapper({
    apiKey: ('AIzaSyBUcG-ocnq92foLawQ6Hvf8Xtyxjp-XXhY')
  })(MapContainer)

  export const BOROUGHS = {
MANHATTAN: {lat:40.758896 ,lng:-73.985130},
BROOKLYN: {lat:40.650002 ,lng:-73.949997},
BRONX: {lat:40.837048,lng:-73.865433},
QUEENS: {lat:40.6814922,lng:-73.8365236},
STATENISLAND: {lat:40.579021,lng:-74.151535
},





  } 