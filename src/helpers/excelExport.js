import * as ExcelJS from "exceljs";
import moment from "moment";

export const ExcelExport = async (data) => {
   const workbook = new ExcelJS.Workbook();
   const worksheet = workbook.addWorksheet("Sheet 1");

   worksheet.columns = [
      { header: "S no.", key: "s_no", width: 10 },
      { header: "Họ Tên", key: "name", width: 20 },
      { header: "Email", key: "email", width: 20 },
      { header: "Số điện thoại", key: "mobile", width: 20 },
      { header: "CCCD", key: "cccd", width: 20 },
      { header: "Ngày sinh", key: "date", width: 10 },
      { header: "Địa chỉ", key: "address", width: 20 },
      { header: "Mã số thuế", key: "tax", width: 20 },
      { header: "Chuyên môn", key: "field", width: 20 },
   ];

   // Looping through User data
   let counter = 1;
   data?.forEach((user) => {
      worksheet.addRow({
         ...user,
         s_no: counter,
         date: moment(user?.date).format("DD/MM/YYYY"),
      }); // Add data in worksheet
      counter++;
   });

   // Making first line in excel bold
   worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
   });

   // Add headers to worksheet
   // worksheet.addRow(["Name", "Email", "Phone"]);

   // // Add data to worksheet
   // worksheet.addRow(["John Doe", "john.doe@example.com", "123-456-7890"]);
   // worksheet.addRow(["Jane Smith", "jane.smith@example.com", "555-555-5555"]);

   // Generate buffer and download file
   const buffer = await workbook.xlsx.writeBuffer();
   const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
   });
   const url = window.URL.createObjectURL(blob);
   const a = document.createElement("a");
   a.href = url;
   a.download = "data.xlsx";
   a.click();
   window.URL.revokeObjectURL(url);
};
