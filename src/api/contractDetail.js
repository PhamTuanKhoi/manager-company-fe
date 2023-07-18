import axios from "axios";
const path = "contract-detail/";

export const contractDetailAPI = {
   async findAll(query = {}) {
      return await axios.get(path + "query", { params: query });
   },

   async create(payload) {
      return await axios.post(path, payload);
   },
};
