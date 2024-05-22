import axios from "axios";

const sdioApi = axios.create({
  baseURL: "http://localhost/spots/sido",
});

export default sdioApi;
