import axios from "axios";
const path = "part-task/";

export const workerProjectAPI = {
   async create(payload) {
      return await axios.post(path, payload);
   },
   s,
};
