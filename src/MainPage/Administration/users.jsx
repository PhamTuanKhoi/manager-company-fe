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
import { listWorker } from "../../redux/feature/workerSclice";
import { useSelector } from "react-redux";
import moment from "moment";
import { useLoading } from "../../hook/useLoading";
import { avartarFAKE } from "../../constant/index";

const Users = () => {
   const [modalShow, setModalShow] = useState(false);
   const dispatch = useDispatch();
   const { setLoading } = useLoading();
   const [render, setRender] = useState(0);
   const [editWorker, setEditWorker] = useState({});

   useEffect(() => {
      if ($(".select").length > 0) {
         $(".select").select2({
            minimumResultsForSearch: -1,
            width: "100%",
         });
      }
   });

   useEffect(() => {
      dispatch(listWorker({ setLoading }));
   }, []);

   const { workers } = useSelector((state) => state.worker);

   const columns = [
      {
         title: "Họ và tên",
         dataIndex: "name",
         render: (text, record) => (
            <h2 className="table-avatar">
               <Link to={`/app/profile/worker-profile/${record?._id}`} className="avatar">
                  <img alt={record?.name} src={record?.image || avartarFAKE} />
               </Link>
               <Link to={`/app/profile/worker-profile/${record?._id}`}>
                  {text} <span>{record?.role}</span>
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

      {
         title: "Role",
         dataIndex: "role",
         render: (text, record) => (
            <span
               className={text === "Admin" ? "badge bg-inverse-danger" : "badge bg-inverse-success"}
            >
               {text}
            </span>
         ),
         sorter: (a, b) => a.role.length - b.role.length,
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
                     <i className="fa fa-pencil m-r-5" /> Edit
                  </a>
                  <a
                     className="dropdown-item"
                     href="#"
                     data-bs-toggle="modal"
                     data-bs-target="#delete_user"
                  >
                     <i className="fa fa-trash-o m-r-5" /> Delete
                  </a>
               </div>
            </div>
         ),
      },
   ];
   return (
      <div className="page-wrapper">
         <Helmet>
            <title>Users - HRMS Admin Template</title>
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
               </div>
            </div>
            {/* /Page Header */}
            {/* Search Filter */}
            <div className="row filter-row">
               <div className="col-sm-6 col-md-3">
                  <div className="form-group form-focus">
                     <input type="text" className="form-control floating" />
                     <label className="focus-label"> Họ tên</label>
                  </div>
               </div>
               <div className="col-sm-6 col-md-3">
                  <div className="form-group form-focus select-focus">
                     <select className="select floating">
                        {/* <option>Select Company</option>
                        <option>Global Technologies</option>
                        <option>Delta Infotech</option> */}
                     </select>
                     <label className="focus-label"> Công ty</label>
                  </div>
               </div>

               <div className="col-sm-6 col-md-3">
                  <a href="#" className="btn btn-success btn-block w-100">
                     {" "}
                     Tìm kiếm{" "}
                  </a>
               </div>
            </div>
            {/* /Search Filter */}
            <div className="row">
               <div className="col-md-12">
                  <div className="table-responsive">
                     <Table
                        className="table-striped"
                        pagination={{
                           total: workers.length,
                           showTotal: (total, range) =>
                              `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                           showSizeChanger: true,
                           onShowSizeChange: onShowSizeChange,
                           itemRender: itemRender,
                        }}
                        style={{ overflowX: "auto" }}
                        columns={columns}
                        // bordered
                        dataSource={workers}
                        rowKey={(record) => record._id}
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
         <div className="modal custom-modal fade" id="delete_user" role="dialog">
            <div className="modal-dialog modal-dialog-centered">
               <div className="modal-content">
                  <div className="modal-body">
                     <div className="form-header">
                        <h3>Delete User</h3>
                        <p>Are you sure want to delete?</p>
                     </div>
                     <div className="modal-btn delete-action">
                        <div className="row">
                           <div className="col-6">
                              <a href="" className="btn btn-primary continue-btn">
                                 Delete
                              </a>
                           </div>
                           <div className="col-6">
                              <a
                                 href=""
                                 data-bs-dismiss="modal"
                                 className="btn btn-primary cancel-btn"
                              >
                                 Cancel
                              </a>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {/* /Delete User Modal */}
      </div>
   );
};

export default Users;
