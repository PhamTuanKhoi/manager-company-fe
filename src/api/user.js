import axios from "axios";
const path = "user/";

export const userAPI = {
   async create(payload) {
      return await axios.post(path + "client", payload);
   },

   list() {
      return axios.get(path + "client");
   },
};
