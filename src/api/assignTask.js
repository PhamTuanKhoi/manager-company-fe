import axios from "axios";
const path = "assign-task/";

export const assignTaskAPI = {
   async createAssign(payload) {
      return await axios.post(path, payload);
   },

   async list() {
      return await axios.get(path);
   },

   async listByTask(id) {
      return await axios.get(path + "task/" + id);
   },

   async listByProject(id) {
      return await axios.get(path + "project/" + id);
   },

   async checkNotAssignTask(filter = {}) {
      return await axios.get("worker-project/assign-task/", { params: filter });
   },

   async updatePerform(id, payload) {
      return await axios.patch(path + "perform/" + id, payload);
   },

   async updateFinish(id, payload) {
      return await axios.patch(path + "finish/" + id, payload);
   },
};
