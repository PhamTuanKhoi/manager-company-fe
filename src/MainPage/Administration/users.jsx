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
import workerSclice, {
   listWorker,
   listWorkerById,
   updateWorkerStatus,
} from "../../redux/feature/workerSclice";
import { useSelector } from "react-redux";
import moment from "moment";
import { useLoading } from "../../hook/useLoading";
import { avartarFAKE, UserRoleType, workerStatus, workerStatusOpition } from "../../constant/index";
import DeleteUser from "../../_components/modelbox/DeleteUser";
import { workerRemainingSelector } from "../../redux/selectors/workerSelector";
import * as ExcelJS from "exceljs";
import { toast } from "react-toastify";
import { ExcelExport } from "../../helpers/excelExport";

const Users = () => {
   const dispatch = useDispatch();
   const { setLoading } = useLoading();
   const [modalShow, setModalShow] = useState(false);
   const [render, setRender] = useState(0);
   const [editWorker, setEditWorker] = useState({});
   const [modalDelete, setModalDelete] = useState(false);
   const { user } = useSelector((state) => state.auth);
   const permission_status = [UserRoleType.ADMIN, UserRoleType.EMPLOYEE, UserRoleType.LEADER];

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

   const [textName, setTextName] = useState("");
   const [textField, setTextField] = useState("");

   useEffect(() => {
      dispatch(workerSclice.actions.searchName(textName));
      dispatch(workerSclice.actions.searchField(textField));
   }, [textName, textField]);

   const columns = [
      {
         title: "Mã NLD",
         dataIndex: "code",
         render: (text) =>
            text && text < 10 ? (
               <span className="text-primary fw-bold">FCE-0{text}</span>
            ) : (
               <span className="text-primary fw-bold">FCE-{text}</span>
            ),
         sorter: (a, b) => a.code - b.code,
      },
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
         title: "Status",
         dataIndex: "status",
         render: (text, record) => (
            <div className="dropdown action-label ">
               <a
                  href="#"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  className={`badge ${
                     workerStatus.DOING === record?.status
                        ? "bg-inverse-success"
                        : workerStatus.RETIRED === record?.status
                        ? "bg-inverse-danger"
                        : "bg-inverse-primary"
                  }`}
               >
                  {workerStatus.DOING === record?.status ? (
                     <>
                        <span className="ms-2 text-uppercase fst-italic fw-bold me-2 text-success">
                           đang làm
                        </span>
                        <i className={"fa fa-dot-circle-o text-success"} />
                     </>
                  ) : workerStatus.RETIRED === record?.status ? (
                     <>
                        <span className="ms-2 text-uppercase fst-italic fw-bold me-2 text-danger">
                           đã nghỉ
                        </span>
                        <i className={"fa fa-dot-circle-o text-success"} />
                     </>
                  ) : (
                     <span className="ms-2 text-uppercase fst-italic fw-bold text-primary">
                        chọn trạng thái
                     </span>
                  )}
               </a>
               {permission_status.includes(user?.role) && (
                  <div className="dropdown-menu" style={{ width: "50px" }}>
                     {workerStatusOpition?.map((item, i) => (
                        <a
                           key={i}
                           className="dropdown-item"
                           href="#"
                           onClick={() => handleUpdateStatus(record?._id, item.value)}
                        >
                           <i
                              className={
                                 item?.value === workerStatus.DOING
                                    ? "text-success fa fa-dot-circle-o"
                                    : "text-danger fa fa-dot-circle-o"
                              }
                           />
                           <span
                              className={`ms-2 text-uppercase fst-italic fw-bold ${
                                 item?.value === workerStatus.DOING ? "text-success" : "text-danger"
                              }`}
                           >
                              {item?.label}
                           </span>
                        </a>
                     ))}
                  </div>
               )}
            </div>
         ),
         sorter: (a, b) => a.status.length - b.status.length,
      },

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

   const handleUpdateStatus = async (id, status) => {
      dispatch(updateWorkerStatus({ id, payload: { status }, setLoading, toast }));
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
                     <div className="btn-group btn-group-sm" onClick={() => ExcelExport(workers)}>
                        <button className="btn btn-white text-success fw-bold">
                           <i className="fa fa-file-text" aria-hidden="true"></i> CSV
                        </button>
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
