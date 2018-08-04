import React, { Component } from "react";
import { Switch, Link, Route } from "react-router-dom";
import MapContainer, { BOROUGHS } from "./api/googleMapsAPI";
import axios from "axios";
import logo from "./logo.svg";
import resourcesAPI from "./api/resourcesAPI";
import EachBoroughPage from "./components/EachBoroughPage";
import styles from "./styles/index.css";

const Data = ({ allAddress, jobAPI, gedAPI }) => {};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allAddress: [],
      checkBox: [""],
      borough: "",
      jobAPI: [],
      gedAPI: [],
      checked: false,
      //CheckedArr creates key value pairs for checkbox state
      checkedArr: {},
      //listing will hold filtered data from target api array to be rendered
      listing: [],
      //ged & job checked isolates checked data for single api
      gedChecked: [],
      jobChecked: []
    };
  }

  fetchListings = () => {
    Promise.all([
      resourcesAPI.getJobCenterListing(),
      resourcesAPI.getGEDListing()
    ]).then(([jobRes, gedRes]) => {

      let addresses = [];
      let sb = [];
      let bothAPI = [...jobRes.data].concat([...gedRes.data]);

      let matchingPropNames = [
        "borough",
        "city",
        "address",
        "contact_number",
        "latitude",
        "longitude",
        "nta",
        "program_site_name",
        "facility_name",
        "comments",
        "phone_number_s",
        "street_address"
      ];

      let obj = {};

      bothAPI.forEach(place => {
        if (!sb.includes(place.borough)) {
          sb.push(place.borough);
          for (const prop in place) {

              obj[prop] = place[prop];

          }
        }
      });


      this.setState({
        allAddress: [...bothAPI],
        checkBox: ["", ...sb],
        jobAPI: [...jobRes],
        gedAPI: [...gedRes]
      });
  
    });
  };

  handleFilter = e => {};
  handleSubmit = e => {
    const { allAddress, checkedArr, gedAPI, jobAPI } = this.state;

    let choicesArr = [
      "Queens",
      "Manhattan",
      "Bronx",
      "Brooklyn",
      "Staten Island"
    ];
    //verdict is to check and see if any boroughs are  checked
    let verdict = false;
    let ifJob = false
    let ifGed = false
    let locations = api => {
      var filterData = api.filter(b => checkedArr[b.borough]);
      var filterJob = api.filter(b => b["address"])
      var filterJob2 = api.filter(b => b["address"] && checkedArr[b.borough])

      var filterGed = api.filter(b => b["street_address"])
      var filterGed2 = api.filter(b => b["street_address"] && checkedArr[b.borough])
      choicesArr.map(d => {
        if (checkedArr["GedListings"]) {
          ifGed = true
        }
        if (checkedArr["JobListings"]) { ifJob = true }
        if (checkedArr[d]) {
          verdict = true;
        }
      });
      if (!verdict) {
        
                if (!ifJob && !ifGed) {
        
                  this.setState({
                    listing: [...api]
                  })
                } else if (ifJob && !ifGed) {
                  this.setState({
                    listing: [...filterJob]
                  })
                } else if (ifGed && !ifJob) {
                  this.setState({
                    listing: [...filterGed]
                  })
                }
        
        
              } else {
                if (!ifJob && !ifGed) {
                  this.setState({
                    listing: [...filterData]
                  })
        
                } else if(ifJob && !ifGed){
                  this.setState({
                    listing: [...filterJob2]
                  })
                }else if (ifGed && !ifJob) {
                  this.setState({
                    listing: [...filterGed2]
                  })
                }
              }

      
    };

    if(true) {
      locations(allAddress)
    }
  };

  handleSelect = e => {
    if (e.state.value === "") {
    }
    this.setState({
      borough: e.target.value
    });
  };

  FilterPlaces = () => {
    let { allAddress } = this.state;
    return (
      <div>
        {allAddress.map(place => {
          if (place.borough === this.state.borough) {
            return (
              <div>
                <ul>
                  <h2>Facility: {place.facility_name}</h2>
                  <li>Phone Number: {place.phone_number_s}</li>
                  <li>City: {place.city} </li>
                  <li>Address: {place.street_address} </li>
                  <li>
                    {" "}
                    {place.comments ? `Comments: ${place.comments}` : null}{" "}
                  </li>
                </ul>
              </div>
            );
          } else {
            return <div> </div>;
          }
        })}
      </div>
    );
  };


  handleCheckboxChange = (e, isLocation) => {
    this.state.checkedArr[e.target.name] = e.target.checked;
   
  };

  filterAllPlaces = () => {
    let { allAddress } = this.state;


    return (
      <div>
        {allAddress.map(place => {
          if (place.borough === this.state.borough) {
            return (
              <ul>
                <h2>
                  Facility: {place.facility_name || place.program_site_name}
                </h2>
                <li>
                  Phone Number: {place.phone_number_s || place.contact_number}
                </li>
                <li>City: {place.city || place.borough} </li>
                <li>Address: {place.street_address || place.address} </li>
                <li>
                  {" "}
                  {place.comments ? `Comments: ${place.comments}` : null}{" "}
                </li>
              </ul>
            );
          }
        })}
      </div>
    );
  };


  componentDidMount() {
    this.fetchListings();
  }

  render() {

    let { borough, allAddress } = this.state;
    return (
      <div>
        <br />


        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <div>
                <div>
                  <h1>
                    <span>Take Your First Step</span>{" "}
                  </h1>
                  <br />
                  <h2>Help Me Find</h2>
                  <div>
                    <div id="wrapper">
                      <div className="boxes">
                        <input
                          type="checkbox"
                          name="GedListings"
                          onChange={e => {
                            this.handleCheckboxChange(e, false);
                          }}
                          id="box-1"
                        />
                        <label htmlFor="box-1"> GED Locations</label>
                        <input
                          type="checkbox"
                          name="JobListings"
                          onChange={e => {
                            this.handleCheckboxChange(e, false);
                          }}
                          id="box-2"
                        />
                        <label htmlFor="box-2">
                          {" "}
                          Financial Assistance Locations{" "}
                        </label>
                        <br />
                      </div>
                      <div className="h2">
                        <h2>In </h2>
                      </div>
                      <div className="boxes1">
                        <input
                          type="checkbox"
                          name="Queens"
                          onChange={e => {
                            this.handleCheckboxChange(e, true);
                          }}
                          id="box2-1"
                        />
                        <label htmlFor="box2-1"> Queens</label>
                        <input
                          type="checkbox"
                          name="Bronx"
                          onChange={e => {
                            this.handleCheckboxChange(e, true);
                          }}
                          id="box2-2"
                        />
                        <label htmlFor="box2-2"> Bronx </label>
                        <input
                          type="checkbox"
                          name="Manhattan"
                          onChange={e => {
                            this.handleCheckboxChange(e, true);
                          }}
                          id="box2-3"
                        />
                        <label htmlFor="box2-3">Manhattan </label>
                        <input
                          type="checkbox"
                          name="Brooklyn"
                          onChange={e => {
                            this.handleCheckboxChange(e, true);
                          }}
                          id="box2-4"
                        />
                        <label htmlFor="box2-4">Brooklyn </label>
                        <input
                          type="checkbox"
                          name="Staten Island"
                          onChange={e => {
                            this.handleCheckboxChange(e, true);
                          }}
                          id="box2-5"
                        />
                        <label htmlFor="box2-5">Staten Island </label>

                      </div>
                      <div>
                        <button onClick={this.handleSubmit}>
                          {" "}
                          <Link to="/byborough"> SUBMIT </Link>
                        </button>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          />
          <Route
            path="/byborough"
            render={() => (
              <div>
                {borough ? this.filterAllPlaces() : null}
                <EachBoroughPage listing={this.state.listing} />
              </div>
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
