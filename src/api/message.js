import axios from "axios";
const path = "message-api/";

export const massageAPI = {
   async chatDouble(filter = {}) {
      return await axios.get("message-api?", { params: filter });
   },
};
