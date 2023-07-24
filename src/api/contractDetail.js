import axios from "axios";
const path = "contract-detail/";

export const contractDetailAPI = {
   async findAll(query = {}) {
      return await axios.get(path + "query", { params: query });
   },

   async findById(id) {
      return await axios.get(path + id);
   },

   async create(payload) {
      return await axios.post(path, payload);
   },

   async update(id, payload) {
      return await axios.patch(path + id, payload);
   },

   async delete(id) {
      return await axios.delete(path + id);
   },
};
