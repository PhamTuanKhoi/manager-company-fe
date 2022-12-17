import axios from "axios";
const path = "user/";

export const userAPI = {
   listClient() {
      return axios.get(path + "client");
   },

   async createClient(payload) {
      return await axios.post(path + "client", payload);
   },

   async createEmployees(payload) {
      return await axios.post(path + "employees", payload);
   },
};
