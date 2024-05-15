import axios from "axios";

const sdioApi = axios.create({
  baseURL: "http://localhost/sido",
});

export default sdioApi;
