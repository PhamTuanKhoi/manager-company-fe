import axios from "axios";
const path = "project/";

export const projectAPI = {
   async list() {
      return await axios.get(path);
   },

   async detail(id) {
      return await axios.get(path + id);
   },

   async createProject(payload) {
      return await axios.post(path, payload);
   },

   async updateProject(id, payload) {
      return await axios.patch(path + id, payload);
   },
};
