import React, { Component } from 'react';
import { Switch, Link, Route, Redirect } from 'react-router-dom';
import EachBoroughPage from './EachBoroughPage';
// import styles from './styles/index.css'

class Home extends Component {

    constructor(props) {
        super();
        const { allAddress } = props
        this.state = {
            checkedArr: [{services:["JobListings", "GedListings", "Other"],
                          boroughs:["Queens", "Manhattan", "Bronx", "Brooklyn", "StatenIsland"]}],
            fireRedirect: false
        }
        console.log("allAddresssss", props)
    }

    handleCheckboxChange = e => {
        const { checkedArr } = this.state
        let selectedArr = []
        checkedArr[0].services.map((served) => {
            if (served === e.target.name) {
                this.setState({
                    checkedArr: selectedArr.push(e.target.name)
                })
            }
        }) 
                console.log("e.target.name", e.target.name)
                console.log("checkedArr", checkedArr)
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            fireRedirect: true //only updating the state when the form is submitted
        })
    };

    componentDidMount() {
        this.renderDataSelected();
    }
    
    renderDataSelected = () => {
        const { allAddress,  } = this.state
        return ( <EachBoroughPage allAddress={allAddress}/> )
    }

    render() {
        const { fireRedirect } = this.state
        return (
        <div>
            <div>
                <h1>Take Your First Step </h1>
                <h2>Help Me Find</h2>
            <div>
        <div id="wrapper">
            <div className ="boxes">
        <input 
        type="checkbox" 
        name="GedListings"
        onChange={this.handleCheckboxChange} 
        id="box-1"/>
        <label htmlFor="box-1"> GED Locations</label>
        <input 
        type="checkbox"
        name="JobListings"
        onChange={this.handleCheckboxChange} 
        id="box-2"/>
        <label htmlFor="box-2"> Financial Assistance Locations </label>
        <input 
        type="checkbox" 
        name="Other"
        onChange={this.handleCheckboxChange} 
        id="box-3"/>
        <label htmlFor="box-3"> Other</label>
      </div>
      <div className ="h2">
        <h2>In Location</h2>
      </div>
      <div className ="boxes1">
      <form onSubmit={this.handleSubmit}>
        <input 
        type="checkbox"  
        name="Queens" 
        id="box2-1"/>
        <label htmlFor="box2-1"> Queens</label>
        <input 
        type="checkbox" 
        name="Manhattan"
        id="box2-2"/>
        <label htmlFor="box2-2"> Bronx </label>
        <input 
        type="checkbox"  
        name="Bronx" 
        id="box2-3"/>
        <label htmlFor="box2-3">Manhattan </label>
        <input 
        type="checkbox" 
        name="Brooklyn" 
        id="box2-4"/>
        <label htmlFor="box2-4">Brooklyn </label>
        <input 
        type="checkbox"  
        name="StatenIsland"
        id="box2-5"/>
        <label htmlFor="box2-5">Staten Island </label>
        </form>
      </div>     
      <div>
        <nav>
            </nav>
      <button>SUBMIT</button>
    </div>               
                
                {fireRedirect && (
                    <Switch>
                    <Redirect from='/' to='/byborough'/>
                    <Route path='/byborough' render={this.renderDataSelected}/>
                  </Switch>
                )}
                
            </div>
            </div>
            </div>
            </div>
        )
    }
};

export default Home;