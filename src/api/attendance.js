import axios from "axios";
const path = "attendance/";

export const attendanceAPI = {
   async fetchWiffi() {
      return await axios.get(path + "wiffi");
   },

   async create(payload) {
      return await axios.post(path, payload);
   },
};
