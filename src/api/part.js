import axios from "axios";
const path = "part/";

export const partAPI = {
   async create(payload) {
      return await axios.post(path, payload);
   },

   async listByIdProject(id) {
      return await axios.get(path + id + "/project");
   },
};
