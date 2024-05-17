import axios from "axios";

const routeApi = axios.create({
  baseURL: "http://localhost/routes",
});

export default routeApi;
