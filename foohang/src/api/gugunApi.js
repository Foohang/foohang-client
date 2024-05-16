import axios from "axios";

const gugunApi = axios.create({
  baseURL: "http://localhost/spots/gugun",
});

export default gugunApi;
