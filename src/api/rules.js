import axios from "axios";
const path = "rules/";

export const rulesAPI = {
   async findOneByIdProject(id) {
      return await axios.get(path + id + "/project");
   },

   async create(payload) {
      return await axios.post(path, payload);
   },
};
