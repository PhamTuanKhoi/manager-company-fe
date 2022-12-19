import axios from "axios";
const path = "project/";

export const projectAPI = {
   async list() {
      return await axios.get(path);
   },

   async createProject(payload) {
      return await axios.post(path, payload);
   },
};
