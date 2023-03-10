import axios from "axios";
const path = "user/";

export const userAPI = {
   listClient() {
      return axios.get(path + "client");
   },

   listClientByEmployees(id) {
      return axios.get(path + "client-role-employees/" + id);
   },

   listEmployees() {
      return axios.get(path + "employees");
   },

   listWorkerExcellent() {
      return axios.get(path + "worker/excellent");
   },

   listEmployeesByClient(id) {
      return axios.get(path + "employees-role-client/" + id);
   },

   listEmployeesByWorker(id) {
      return axios.get(path + "employees-role-worker/" + id);
   },

   listWorker() {
      return axios.get(path + "worker");
   },

   listWorkerByClient(id) {
      return axios.get(path + "worker-role-client/" + id);
   },

   listWorkerByEmployees(id) {
      return axios.get(path + "worker-role-employees/" + id);
   },

   listUserSalary() {
      return axios.get(path + "salary");
   },

   workerNoAssign() {
      return axios.get(path + "worker-no-assign");
   },

   workerProjectClient(filter = {}) {
      return axios.get(path + "worker-project-by-client?", {
         params: filter,
      });
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

   async updateWorker(id, payload) {
      return await axios.patch(path + "worker/" + id, payload);
   },

   remove(id) {
      return axios.delete(path + id);
   },
};
