import axios from "axios";

const authApi = axios.create({
  baseURL: "http://localhost/members",
});

export default authApi;
