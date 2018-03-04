import React, { Component } from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import axios from 'axios';
import logo from './logo.svg';
import resourcesAPI from './api/resourcesAPI';
import Home from './components/Home';
import EachBoroughPage from './components/EachBoroughPage';

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

  filterAllPlaces = () => {
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

  renderBoroughPage = () => {
    const { allAddress } = this.state
    return (
      <Home allAddress = {allAddress} />
    )
  }


  componentDidMount() {
    this.fetchListings();
  }

  render() {
    // console.log("render: ", this.state)
    let { borough, allAddress } = this.state
    return (
      <div className="App" >
        <nav>
          <Link to='/' >Home</Link>
          {"   "}
          {/* <Link to='/byborough' >Centers By Borough</Link> */}
          {"   "}
        </nav>
        {/* </header> */}
        
        {/* <h1> Filter Select All Places</h1>
        <this.HandleFilter />
        {borough ? this.filterAllPlaces() : null} */}
        < br />



        <Switch>
          <Route exact path="/" render={() =>(
            <div>
            <this.renderBoroughPage />
            </div>
          ) }/>
          {/* <Route path="/byborough" component={Home} /> */}
        </Switch>

      </div>

    );
  }
}

export default App;
