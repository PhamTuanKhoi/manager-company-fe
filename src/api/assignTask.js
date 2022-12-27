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
};
