import React, { Component } from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import axios from 'axios';
import MapContainer, {BOROUGHS} from './api/googleMapsAPI'
import logo from './logo.svg';
import './App.css';
import resourcesAPI from './api/resourcesAPI';

class App extends Component {
  constructor() {
    super();
    this.state = {
      allAddress: [],
      selectBox: [''],
      borough: ''
    }
  }

  fetchListings = () => {
    Promise.all([
      resourcesAPI.getJobCenterListing(),
      resourcesAPI.getGEDListing()
    ])
      .then(([jobRes, gedRes]) => {
        console.log("jobRes.data", jobRes.data);
        console.log("gedRes.data", gedRes.data);
        let addresses = []
        let sb = []
        let bothAPI = [...jobRes.data].concat([...gedRes.data]);
        console.log("bothAPI", bothAPI)
        let matchingPropNames = [
          'borough',
          'city',
          'address',
          'contact_number',
          'latitude',
          'longitude',
          'nta',
          'program_site_name',
          'facility_name',
          'comments',
          'phone_number_s',
          'street_address']

        let obj = {}

        bothAPI.forEach(place => {
          if (!sb.includes(place.borough)) {
            sb.push(place.borough);
            for (const prop in place) {
              if (matchingPropNames.indexOf(prop) >= 0) {
                obj[prop] = place[prop]
              }
            }
          }
        })

        console.log(`ADD`, bothAPI)
        this.setState({
          allAddress: [...bothAPI],
          selectBox: ['', ...sb]
        })
        // console.log(`ALL`, this.state.allAddress)
      })
  }


  handleSelect = e => {
    this.setState({
      borough: e.target.value
    })
    console.log("this.state.borough", e.target.value)
  }

  HandleFilter = () => (
    <div>
      <select onChange={this.handleSelect}>
        {this.state.selectBox.map(b => {
          return (
            <option value={b}>
              {b}
            </option>
          )
        })}
      </select>
    </div>
  )

  filterPlaces = () => {
    let { allAddress } = this.state
    console.log("place.borough", this.state.borough)
    console.log("allAddress", allAddress)
    return (
      <div>
        {allAddress.map(place => {
          if (place.borough === this.state.borough) {

            return (
              <ul>
                <h2>Facility: {place.facility_name || place.program_site_name}</h2>
                <li>Phone Number: {place.phone_number_s || place.contact_number}</li>
                <li>City: {place.city || place.borough} </li>
                <li>Address: {place.street_address || place.address} </li>
                <li> {place.comments ? `Comments: ${place.comments}` : null} </li>
              </ul>
            )
          }
        })
        }
      </div>
    )
  }


  componentDidMount() {
    this.fetchListings();
  }

  render() {
    console.log("render: ", this.state)
    let { borough, allAddress } = this.state
    return (
      <div className="App" >
        <nav>
          <Link to='/' >Home</Link>
          <Link to='/' >Centers By Borough</Link>
          <Link to='/' >Centers By City</Link>
        </nav>
        {/* </header> */}
        <p className="App-intro" >
          To get started, edit <code> src / App.js</code > and save to reload.
        </p >
        <h1> Filter Select</h1>
        <this.HandleFilter />
        {borough ? this.filterPlaces(): null}
        < br />


        <MapContainer zoom ={10} initialCenter={BOROUGHS.MANHATTAN} />

<Switch>
  <Route />
  </Switch>

      </div>

    );
  }
}

export default App;
