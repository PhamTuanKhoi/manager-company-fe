import axios from "axios";
const path = "payslip/";

export const payslipAPI = {
   async list() {
      return await axios.get(path);
   },

   async findOne(id) {
      return await axios.get(path + id);
   },

   async listByEmployees(id) {
      return await axios.get(path + "employees/" + id);
   },

   async listByClient(id) {
      return await axios.get(path + "client/" + id);
   },

   async listByWorker(id) {
      return await axios.get(path + "worker/" + id);
   },

   async ListByUser(id) {
      return await axios.get(path + "user/" + id);
   },

   async createPayslip(payload) {
      return await axios.post(path, payload);
   },

   async updatePayslip(id, payload) {
      return await axios.patch(path + id, payload);
   },
};
