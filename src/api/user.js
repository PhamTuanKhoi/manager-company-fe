import axios from "axios";
const path = "user/";

export const userAPI = {
   listClient() {
      return axios.get(path + "client");
   },

   listEmployees() {
      return axios.get(path + "employees");
   },

   async createClient(payload) {
      return await axios.post(path + "client", payload);
   },

   async createEmployees(payload) {
      return await axios.post(path + "employees", payload);
   },
};
