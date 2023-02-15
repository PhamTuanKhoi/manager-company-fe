import axios from "axios";
const path = "part/";

export const partAPI = {
   async create(payload) {
      return await axios.post(path, payload);
   },

   async listByIdProject(id) {
      return await axios.get(path + id + "/project");
   },

   async checkNotAssignPart(id) {
      return await axios.get("user/not-assign-part/" + id);
   },

   async updateFiledWorkers(id, payload) {
      return await axios.patch(path + "workers/" + id, payload);
   },

   async precentPartByIdProject(filter = {}) {
      return await axios.get(path + "precent", { params: filter });
   },

   async removeUserInPart(partId, userId) {
      return await axios.delete(path + "remove-user/" + partId + "/" + userId);
   },
};
