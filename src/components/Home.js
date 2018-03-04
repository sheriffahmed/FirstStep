import React, { Component } from 'react';
import { Switch, Link, Route, Redirect } from 'react-router-dom';
import EachBoroughPage from './EachBoroughPage';

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
                <form onSubmit={this.handleSubmit}>
                    <h2>Help Me Find</h2>

                    <p>
                        GED Locations {" "}
                        <input
                            name="GedListings"
                            type="checkbox"
                            onChange={this.handleCheckboxChange}
                        />
                    </p>
                    <p>
                        Financial Assistance Locations {" "}
                        <input
                            name="JobListings"
                            type="checkbox"
                            onChange={this.handleCheckboxChange}
                        />
                    </p>
                    <p>
                        Other {" "}
                        <input
                            name="Other"
                            type="checkbox"
                            onChange={this.handleCheckboxChange}
                        />
                    </p>

                    <br />

                    <h3> Located In </h3>
                    <p>
                        Queens {" "}
                        <input
                            name="Queens"
                            type="checkbox"
                            onChange={this.handleCheckboxChange}
                        />
                    </p>
                    <p>
                        Manhattan {" "}
                        <input
                            name="Manhattan"
                            type="checkbox"
                            onChange={this.handleCheckboxChange}
                        />
                    </p>
                    <p>
                        Bronx {" "}
                        <input
                            name="Bronx"
                            type="checkbox"
                            onChange={this.handleCheckboxChange}
                        />
                    </p>
                    <p>
                        Brooklyn {" "}
                        <input
                            name="Brooklyn"
                            type="checkbox"
                            onChange={this.handleCheckboxChange}
                        />
                    </p>
                    <p>
                        Staten Island {" "}
                        <input
                            name="StatenIsland"
                            type="checkbox"
                            onChange={this.handleCheckboxChange}
                        />
                    </p>
                    <button type="submit">Submit</button>
                </form>
                {fireRedirect && (
                    <Switch>
                    <Redirect from='/' to='/byborough'/>
                    <Route path='/byborough' render={this.renderDataSelected}/>
                  </Switch>
                )}
                
            </div>
        )
    }
};

export default Home;