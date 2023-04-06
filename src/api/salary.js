import axios from "axios";
const path = "salary/";

export const salaryAPI = {
   async list(query = {}) {
      return await axios.get(path, { params: query });
   },

   async create(payload) {
      return await axios.post(path, payload);
   },

   async update(id, payload) {
      return await axios.patch(path + id, payload);
   },

   async remove(id) {
      return await axios.delete(path + id);
   },
};
