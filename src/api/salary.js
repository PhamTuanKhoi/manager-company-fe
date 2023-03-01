import axios from "axios";
const path = "salary/";

export const salaryAPI = {
   async create(payload) {
      return await axios.post(path, payload);
   },
};
