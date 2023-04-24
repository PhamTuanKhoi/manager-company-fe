/**
 * Signin Firebase
 */

import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";
import Adduser from "../../_components/modelbox/Adduser";
import { useDispatch } from "react-redux";
import workerSclice, { listWorker, listWorkerById } from "../../redux/feature/workerSclice";
import { useSelector } from "react-redux";
import moment from "moment";
import { useLoading } from "../../hook/useLoading";
import { avartarFAKE, UserRoleType } from "../../constant/index";
import DeleteUser from "../../_components/modelbox/DeleteUser";
import { workerRemainingSelector } from "../../redux/selectors/workerSelector";
import * as ExcelJS from "exceljs";

const Users = () => {
   const dispatch = useDispatch();
   const { setLoading } = useLoading();
   const [modalShow, setModalShow] = useState(false);
   const [render, setRender] = useState(0);
   const [editWorker, setEditWorker] = useState({});
   const [modalDelete, setModalDelete] = useState(false);
   const { user } = useSelector((state) => state.auth);

   useEffect(() => {
      if ($(".select").length > 0) {
         $(".select").select2({
            minimumResultsForSearch: -1,
            width: "100%",
         });
      }
   });

   useEffect(() => {
      if (user.role === UserRoleType.ADMIN) {
         dispatch(listWorker({ setLoading }));
      }

      if (user.role !== UserRoleType.ADMIN && user._id) {
         dispatch(listWorkerById({ id: user._id, setLoading }));
      }
   }, [user._id, user.role]);

   const workers = useSelector(workerRemainingSelector);

   const state = useSelector((state) => state.worker);

   const [textName, setTextName] = useState("");
   const [textField, setTextField] = useState("");

   useEffect(() => {
      dispatch(workerSclice.actions.searchName(textName));
      dispatch(workerSclice.actions.searchField(textField));
   }, [textName, textField]);

   const columns = [
      {
         title: "Họ và tên",
         dataIndex: "name",
         render: (text, record) => (
            <h2 className="table-avatar">
               <Link to={`/app/profile/worker-profile/${record?._id}`} className="avatar">
                  <img alt={record?.name} src={record?.avatar || avartarFAKE} />
               </Link>
               <Link to={`/app/profile/worker-profile/${record?._id}`}>
                  {text} <span>{record?.field}</span>
               </Link>
            </h2>
         ),
         sorter: (a, b) => a.name.length - b.name.length,
      },
      {
         title: "Email",
         dataIndex: "email",
         sorter: (a, b) => a.email.length - b.email.length,
      },

      {
         title: "Số điện thoại",
         dataIndex: "mobile",
         render: (text) => "0" + text,
         sorter: (a, b) => a.mobile - b.mobile,
      },

      {
         title: "Căn cước công dân",
         dataIndex: "cccd",
         sorter: (a, b) => a.cccd - b.cccd,
      },

      {
         title: "Ngày sinh",
         dataIndex: "date",
         render: (text) => moment(text).format("DD/MM/YYYY"),
         sorter: (a, b) => a.date - b.date,
      },

      // {
      //    title: "Dự án",
      //    dataIndex: "workerprojectEX",
      //    render: (text, record) => record?.workerprojectEX?.projectEX?.name,
      //    sorter: (a, b) => a?.workerprojectEX.length - b?.workerprojectEX.length,
      // },

      {
         title: "Action",
         render: (text, record) => (
            <div className="dropdown dropdown-action text-end">
               <a
                  href="#"
                  className="action-icon dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
               >
                  <i className="material-icons">more_vert</i>
               </a>
               <div className="dropdown-menu dropdown-menu-right">
                  <a
                     className="dropdown-item"
                     href="#"
                     onClick={() => {
                        setRender((prev) => prev + 1);
                        setEditWorker(record);
                        setModalShow(true);
                     }}
                  >
                     <i className="fa fa-pencil m-r-5" /> Sửa
                  </a>
                  <a
                     className="dropdown-item"
                     href="#"
                     onClick={() => {
                        setEditWorker(record);
                        setModalDelete(true);
                     }}
                  >
                     <i className="fa fa-trash-o m-r-5" /> Xóa
                  </a>
               </div>
            </div>
         ),
      },
   ];

   const exportToExcel = async () => {
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
      workers.forEach((user) => {
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
   return (
      <div className="page-wrapper">
         <Helmet>
            <title>Người lao động</title>
            <meta name="description" content="Login page" />
         </Helmet>
         {/* Page Content */}
         <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
               <div className="row align-items-center">
                  <div className="col">
                     <h3 className="page-title">Người lao động</h3>
                  </div>
                  <div className="col-auto float-end ml-auto">
                     <a href="#" className="btn add-btn" onClick={() => setModalShow(true)}>
                        <i className="fa fa-plus" /> Thêm người lao động
                     </a>
                  </div>
                  <div className="col-auto float-end ml-auto">
                     <div className="btn-group btn-group-sm" onClick={exportToExcel}>
                        <button className="btn btn-white">CSV</button>
                     </div>
                  </div>
               </div>
            </div>
            {/* /Page Header */}
            {/* Search Filter */}
            <div className="row filter-row">
               <div className="col-sm-6 col-md-3">
                  <div className="form-group form-focus">
                     <input
                        type="text"
                        className="form-control floating"
                        onChange={(e) => setTextName(e.target.value)}
                     />
                     <label className="focus-label"> Họ tên</label>
                  </div>
               </div>
               <div className="col-sm-6 col-md-3">
                  <div className="form-group form-focus">
                     <input
                        type="text"
                        className="form-control floating"
                        onChange={(e) => setTextField(e.target.value)}
                     />
                     <label className="focus-label">Lĩnh vực</label>
                  </div>
               </div>
            </div>
            {/* /Search Filter */}
            <div className="row">
               <div className="col-md-12">
                  <div className="table-responsive">
                     <Table
                        className="table-striped"
                        pagination={{
                           total: workers?.length,
                           showSizeChanger: true,
                           onShowSizeChange: onShowSizeChange,
                           itemRender: itemRender,
                        }}
                        style={{ overflowX: "auto" }}
                        columns={columns}
                        // bordered
                        dataSource={workers}
                        rowKey={(record) => record?._id}
                        // onChange={this.handleTableChange}
                     />
                  </div>
               </div>
            </div>
         </div>
         {/* /Page Content */}
         {/* Add User Modal */}

         <Adduser
            show={modalShow}
            onHide={() => setModalShow(false)}
            editWorker={editWorker}
            render={render}
         />

         {/* /Add User Modal */}
         {/* Edit User Modal */}

         {/* /Edit User Modal */}
         {/* Delete User Modal */}
         <DeleteUser
            show={modalDelete}
            onHide={() => setModalDelete(false)}
            userRemove={editWorker}
         />
         {/* /Delete User Modal */}
      </div>
   );
};

export default Users;
