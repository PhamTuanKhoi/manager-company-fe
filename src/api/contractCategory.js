import axios from "axios";
const path = "contract-category/";

export const contractCategoryAPI = {
   async findAll(payload) {
      return axios.get(path, payload);
   },

   async findById(id) {
      return axios.get(path + id);
   },

   async create(payload) {
      return axios.post(path, payload);
   },

   async update(id, payload) {
      return axios.patch(path + id, payload);
   },

   async delete(id) {
      return axios.delete(path + id);
   },
};
