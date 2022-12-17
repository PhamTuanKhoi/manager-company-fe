import axios from "axios";
const path = "user/";

export const userAPI = {
   async createClient(payload) {
      return await axios.post(path + "client", payload);
   },

   listClient() {
      return axios.get(path + "client");
   },
};
