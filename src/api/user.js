import axios from "axios";
const path = "user/";

export const userAPI = {
   listClient() {
      return axios.get(path + "client");
   },

   listEmployees() {
      return axios.get(path + "employees");
   },

   listWorker() {
      return axios.get(path + "worker");
   },

   profile(id) {
      return axios.get(path + id);
   },

   async createClient(payload) {
      return await axios.post(path + "client", payload);
   },

   async createEmployees(payload) {
      return await axios.post(path + "employees", payload);
   },

   async createWorker(payload) {
      return await axios.post(path + "worker", payload);
   },

   async updateEmployees(id, payload) {
      return await axios.patch(path + "employees/" + id, payload);
   },

   async updateClient(id, payload) {
      return await axios.patch(path + "client/" + id, payload);
   },

   remove(id) {
      return axios.delete(path + id);
   },
};
