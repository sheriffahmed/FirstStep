// import React, { Component } from "react";
// import { Switch, Route, Redirect } from "react-router-dom";
// import EachBoroughPage from "./EachBoroughPage";

// class Home extends Component {
//   constructor({ allAddress, jobAPI, gedAPI }) {
//     super({ allAddress, jobAPI, gedAPI });
//     // const { allAddress, jobAPI, gedAPI } = this.props
//     this.state = {
//       choicesArr: [
//         "JobListings",
//         "GedListings",
//         "Other",
//         "Queens",
//         "Manhattan",
//         "Bronx",
//         "Brooklyn",
//         "StatenIsland"
//       ],
//       fireRedirect: false,
//       checkedArr: []
//     };
//     console.log("allAddresssss", this.props);
//   }

//   handleCheckboxChange = e => {
//     const { choicesArr, checkedArr } = this.state;
//     choicesArr.map(served => {
//       if (served === e.target.name) {
//         checkedArr.push(e.target.name);
//         this.setState({
//           checkedArr
//         });
//       }
//     });
//     console.log("e.target.name", e.target.name);
//     console.log("checkedArr", checkedArr);
//   };

//   handleSubmit = event => {
//     event.preventDefault();
//     this.setState({
//       fireRedirect: true //only updating the state when the form is submitted
//     });
//   };

//   componentDidMount() {
//     this.renderDataSelected();
//   }

//   renderDataSelected = () => {
//     const { checkedArr } = this.state;
//     return <EachBoroughPage allAddress={checkedArr} />;
//   };

//   render() {
//     const { fireRedirect } = this.state;
//     return (
//       <div>
//         <div>
//           <img id="icon" src="https://i.imgur.com/muUuCZ8.png" />
//           <h1>Take Your First Step </h1>
//           <h2>Help Me Find</h2>
//           <div>
//             <div id="wrapper">
//               <div className="boxes">
//                 <input
//                   type="checkbox"
//                   name="GedListings"
//                   onChange={this.handleCheckboxChange}
//                   id="box-1"
//                 />
//                 <label htmlFor="box-1"> GED Plus Locations</label>
//                 <input
//                   type="checkbox"
//                   name="JobListings"
//                   onChange={this.handleCheckboxChange}
//                   id="box-2"
//                 />
//                 <label htmlFor="box-2"> Financial Assistance Locations </label>
//               </div>
//               <div className="h2">
//                 <h2>In</h2>
//               </div>
//               <div className="boxes1">
//                 <form onSubmit={this.handleSubmit}>
//                   <input
//                     type="checkbox"
//                     name="Queens"
//                     onChange={this.handleCheckboxChange}
//                     id="box2-1"
//                   />
//                   <label htmlFor="box2-1"> Queens</label>
//                   <input
//                     type="checkbox"
//                     name="Manhattan"
//                     onChange={this.handleCheckboxChange}
//                     id="box2-2"
//                   />
//                   <label htmlFor="box2-2"> Bronx </label>
//                   <input
//                     type="checkbox"
//                     name="Bronx"
//                     onChange={this.handleCheckboxChange}
//                     id="box2-3"
//                   />
//                   <label htmlFor="box2-3">Manhattan </label>
//                   <input
//                     type="checkbox"
//                     name="Brooklyn"
//                     onChange={this.handleCheckboxChange}
//                     id="box2-4"
//                   />
//                   <label htmlFor="box2-4">Brooklyn </label>
//                   <input
//                     type="checkbox"
//                     name="StatenIsland"
//                     onChange={this.handleCheckboxChange}
//                     id="box2-5"
//                   />
//                   <label htmlFor="box2-5">Staten Island </label>
//                 </form>
//               </div>
//               <div>
//                 <nav />
//                 <button>SUBMIT</button>
//               </div>

//               {fireRedirect && (
//                 <Switch>
//                   <Redirect from="/" to="/byborough" />
//                   <Route path="/byborough" render={this.renderDataSelected} />
//                 </Switch>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default Home;
