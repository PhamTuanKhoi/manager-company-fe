import axios from "axios";
const path = "attendance/";

export const attendanceAPI = {
   async fetchWiffi() {
      return await axios.get(path + "wiffi");
   },
};
