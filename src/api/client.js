import axios from "axios";
const path = "auth/";

export const authAPI = {
   async create(payload) {
      return await axios.post(path + "client", payload);
   },
};
