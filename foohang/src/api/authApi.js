import axios from "axios";

const authApi = axios.create({
  baseURL: "http://localhost/api/members",
});

export default authApi;
