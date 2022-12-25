import axios from "axios";
const path = "task/";

export const taskAPI = {
   async create(payload) {
      return await axios.post(path, payload);
   },

   async assignPerson(id, payload) {
      return await axios.patch(path + "assign/" + id, payload);
   },

   async listByProject(id) {
      return await axios.get(path + "project/" + id);
   },
};
