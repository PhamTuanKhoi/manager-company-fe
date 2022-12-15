import axios from "axios";
const path = "user/";

export const clientAPI = {
   async create(payload) {
      return await axios.post(path + "client", payload);
   },
};
