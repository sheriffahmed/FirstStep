import axios from "axios";

const getJobCenterListing = () =>
  axios.get("https://data.cityofnewyork.us/resource/9ri9-nbz5.json");

const getGEDListing = () =>
  axios.get("https://data.cityofnewyork.us/resource/jfsi-vq8f.json");

export default {
  getJobCenterListing,
  getGEDListing
};
