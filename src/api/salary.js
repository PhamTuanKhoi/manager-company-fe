import axios from "axios";
const path = "salary/";

export const salaryAPI = {
   async list() {
      return await axios.get(path);
   },

   async create(payload) {
      return await axios.post(path, payload);
   },
};
