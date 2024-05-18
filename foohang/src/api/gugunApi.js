import axios from "axios";

const gugunApi = axios.create({
  baseURL: "http://localhost/spots/sido/gugun",
});

export default gugunApi;
