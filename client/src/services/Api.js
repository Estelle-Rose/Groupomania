import axios from "axios";
import store from "../store/store";

export default () => {
  return axios.create({
    baseURL: process.env.VUE_APP_API_ENDPOINT,

    headers: {
      Authorization: `${store.state.token}`,
    },
  });
};
