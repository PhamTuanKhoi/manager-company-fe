import axios from "axios";
const path = "rules/";

export const rulesAPI = {
   async create(payload) {
      return await axios.post(path, payload);
   },
};
