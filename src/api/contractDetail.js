import axios from "axios";
const path = "contract-detail/";

export const contractDetailAPI = {
   async create(payload) {
      return axios.post(path, payload);
   },
};
