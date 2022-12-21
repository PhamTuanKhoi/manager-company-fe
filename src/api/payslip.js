import axios from "axios";
const path = "payslip/";

export const payslipAPI = {
   async list() {
      return await axios.get(path);
   },

   async ListByUser(id) {
      return await axios.get(path + "user/" + id);
   },

   async createPayslip(payload) {
      return await axios.post(path, payload);
   },
};
