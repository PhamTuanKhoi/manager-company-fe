import { cloudinaryAPI } from "../constant";

export const uploadCloudinary = async (file, setLoading) => {
   try {
      setLoading(true);
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", cloudinaryAPI.upload_preset);
      data.append("cloud_name", cloudinaryAPI.cloud_name);
      data.append("folder", cloudinaryAPI.folder);
      const resp = await fetch(
         `https://api.cloudinary.com/v1_1/${cloudinaryAPI.cloud_name}/image/upload`,
         {
            method: "post",
            body: data,
         }
      );

      const datas = await resp.json();
      setLoading(false);
      return datas.url;
   } catch (error) {
      setLoading(false);
      console.log(error);
   }
};
