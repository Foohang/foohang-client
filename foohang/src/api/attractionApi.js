import axios from "axios";

const attractionApi = axios.create({
  baseURL: "http://localhost/spots/attractions",
});

export default attractionApi;
