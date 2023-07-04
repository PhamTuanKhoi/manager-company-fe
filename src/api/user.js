import axios from "axios";
const path = "user/";

export const userAPI = {
   listClient() {
      return axios.get(path + "client");
   },

   listClientByEmployees(id) {
      return axios.get(path + "client-role-employees/" + id);
   },

   listEmployees(filter = {}) {
      return axios.get(path + "employees", { params: filter });
   },

   listWorkerExcellent() {
      return axios.get(path + "worker/excellent");
   },

   listWorkerByProject(query = {}) {
      return axios.get(path + "by-project", { params: query });
   },

   listEmployeesByUserId(query = {}) {
      return axios.get(path + "employees-by-user", { params: query });
   },

   // listEmployeesByWorker(id) {
   //    return axios.get(path + "employees-role-worker/" + id);
   // },

   listWorker() {
      return axios.get(path + "worker");
   },

   listWorkerById(id) {
      return axios.get(path + "worker-by-role/" + id);
   },

   listUserSalary(filter = {}) {
      return axios.get(path + "salary", { params: filter });
   },

   listTodayAttendance(query) {
      return axios.get(path + "today-attendance", { params: query });
   },

   listTodayOvertime(query) {
      return axios.get(path + "today-overtime", { params: query });
   },

   workerNoAssign() {
      return axios.get(path + "worker-no-assign");
   },

   // workerProjectClient(filter = {}) {
   //    return axios.get(path + "worker-project-by-client?", {
   //       params: filter,
   //    });
   // },

   sumWorkHourInMonthOfWorker(query = {}) {
      return axios.get(path + "sum-workhour-in-month?", {
         params: query,
      });
   },

   getIdLinkPayroll(id) {
      return axios.get(path + "link-payroll/" + id);
   },

   profile(id) {
      return axios.get(path + id);
   },

   payroll(query = {}) {
      return axios.get(path + "payroll", {
         params: query,
      });
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

   async forgotPassword(payload) {
      return await axios.post(path + "forgot-password/", payload);
   },

   async resetPassword(payload) {
      return await axios.post(path + "reset-password/", payload);
   },

   async updateClient(id, payload) {
      return await axios.patch(path + "client/" + id, payload);
   },

   async updateWorker(id, payload) {
      return await axios.patch(path + "worker/" + id, payload);
   },

   async updateWorkerStatus(id, payload) {
      return await axios.patch(path + "worker/status/" + id, payload);
   },

   async updatePassword(id, payload) {
      return await axios.patch(path + "change-password/" + id, payload);
   },

   remove(id) {
      return axios.delete(path + id);
   },
};
