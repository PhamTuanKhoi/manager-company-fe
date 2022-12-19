import axios from "axios";
const path = "project/";

export const projectAPI = {
   async createProject(payload) {
      return await axios.post(path, payload);
   },
};
