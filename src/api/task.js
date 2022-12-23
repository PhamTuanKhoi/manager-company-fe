import axios from "axios";
const path = "task/";

export const taskAPI = {
   async create(payload) {
      return await axios.post(path, payload);
   },
};
