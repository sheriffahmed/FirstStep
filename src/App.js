import React, { Component } from 'react';
import {Switch, Link, Route} from 'react-router-dom';
import axios from 'axios';
import MapContainer from './api/GoogleMapsAPI'
import logo from './logo.svg';
import './App.css';
import resourcesAPI from './api/resourcesAPI';


class App extends Component {
  constructor(){
    super();
    this.state = {
      allAddress: [],
      selectBox: [''],
      borough: ''
    }
  }
  handleFetch = () =>{
    resourcesAPI.getJobCenterListing().then(res =>{
      // console.log(res.data);
      let addresses = []
      let sb = []
      res.data.forEach(place =>{
       if(!sb.includes(place.borough)){
         sb.push(place.borough);
       }
       let obj = {}
       for(const prop in place){
         if(prop === 'borough' || prop === 'city' || prop === 'facility_name' || prop === 'latitude' || prop === 'longitude' || prop === 'comments' || prop === 'phone_number_s' || prop == 'street_address'){
          obj[prop] = place[prop]
         }
       }
       addresses.push(obj)
      })
      console.log(`ADD`, addresses)
      this.setState({
        allAddress: [...addresses],
        selectBox: ['', ...sb]
      })
      // console.log(`ALL`, this.state.allAddress)
    })
  }
  handleSelect = e =>{
    this.setState({
      borough: e.target.value
    })
  }

  HandleFilter = () =>(
    <div>
      <select onChange={this.handleSelect}>
        {this.state.selectBox.map(b =>{
          return(
            <option value={b}>
              {b}
              </option>
          )
        })}
        </select>
      </div>
  )

  FilterPlaces = () =>  {
    let {allAddress} = this.state
    return(
    <div>
      {allAddress.map(place =>{
         if(place.borough === this.state.borough){
        
       
          return(
           <ul> 
             <h2>Facility: {place.facility_name}</h2>
             <li>Phone Number: {place.phone_number_s}</li>
             <li>City: {place.city} </li>
             <li>Address: {place.street_address} </li>
             <li> {place.comments ? `Comments: ${place.comments}` : null } </li>     

      </ul>
             
          )
         
      }
      })
    }
    </div>
  )}
  
  componentDidMount(){
    this.handleFetch();
  }
  render() {
    let {borough, allAddress} = this.state
    return (
      <div className="App">
        {/* <header className="App-header"> */}
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>

        <nav>
          <Link to='/' >Home</Link>
          <Link to='/' >Centers By Borough</Link>
          <Link to='/' >Centers By City</Link>
          
          </nav>
        {/* </header> */}
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <h1> Filter Select</h1>
        <this.HandleFilter />
        {borough ? <this.FilterPlaces  /> : null}
        <br />

        <MapContainer  />

<Switch>
  <Route />
  </Switch>

      </div>
    );
  }
}

export default App;
