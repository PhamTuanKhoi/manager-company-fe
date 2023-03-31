import axios from "axios";
const path = "project/";

export const projectAPI = {
   async list() {
      return await axios.get(path);
   },

   async listByAllLever(query = {}) {
      return await axios.get(path + "all", { params: query });
   },

   async detail(id) {
      return await axios.get(path + id);
   },

   async createProject(payload) {
      return await axios.post(path, payload);
   },

   async updateProjectPayslip(id, payload) {
      return await axios.patch(path + "payslip/" + id, payload);
   },

   async updateProject(id, payload) {
      return await axios.patch(path + id, payload);
   },

   async deleteProject(id) {
      return await axios.delete(path + id);
   },
};
