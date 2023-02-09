import axios from "axios";
const path = "part/";

export const partAPI = {
   async create(payload) {
      return await axios.post(path, payload);
   },

   async listByIdProject(id) {
      return await axios.get(path + id + "/project");
   },

   async checkNotAssignPart(filter = {}) {
      return await axios.get("worker-project/assign-part/", { params: filter });
   },

   async updateFiledWorkers(id, payload) {
      return await axios.patch(path + "workers/" + id, payload);
   },

   async precentPartByIdProject(filter = {}) {
      return await axios.get(path + "precent", { params: filter });
   },
};
