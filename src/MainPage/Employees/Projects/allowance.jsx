import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
   Avatar_02,
   Avatar_09,
   Avatar_10,
   Avatar_05,
   Avatar_11,
   Avatar_12,
   Avatar_13,
} from "../../../Entryfile/imagepath";

import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import "../../antdstyle.css";
import AddAllowance from "../../../_components/modelbox/AddAllowance";
import { useDispatch, useSelector } from "react-redux";
import { useLoading } from "../../../hook/useLoading";
import { listSalary } from "../../../redux/feature/salarySclice";
import { formatMoney } from "../../../constant";

const Allowance = () => {
   const [data, setData] = useState([
      {
         id: 1,
         image: Avatar_02,
         name: "John Doe",
         role: "Web Designer",
         employee_id: "100.000",
         email: "1.500.000",
         salary: "100.000",
         joindate: "100.000",
         roles: "Software Engineer",
      },
   ]);
   useEffect(() => {
      if ($(".select").length > 0) {
         $(".select").select2({
            minimumResultsForSearch: -1,
            width: "100%",
         });
      }
   });

   // ----------------------------------- use --------------------------------------
   const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   // -------------------------- list ------------------------
   const dispatch = useDispatch();
   const { setLoading } = useLoading();

   useEffect(() => {
      dispatch(listSalary({ setLoading }));
   }, []);

   const { salarys } = useSelector((state) => state.salary);

   console.log(salarys);

   const columns = [
      {
         title: "Nhóm thụ hưởng",
         dataIndex: "beneficiary",
         sorter: (a, b) => a.beneficiary.length - b.beneficiary.length,
      },
      {
         title: "Đi lại",
         dataIndex: "go",
         sorter: (a, b) => a.go.length - b.go.length,
         render: (text, record) => formatMoney(text),
      },

      {
         title: "Nhà ở",
         dataIndex: "home",
         sorter: (a, b) => a.home.length - b.home.length,
         render: (text, record) => formatMoney(text),
      },

      {
         title: "Nặng nhọc/ độc hại",
         dataIndex: "toxic",
         sorter: (a, b) => a.toxic.length - b.toxic.length,
         render: (text, record) => formatMoney(text),
      },
      {
         title: "Ăn uống",
         dataIndex: "eat",
         sorter: (a, b) => a.eat.length - b.eat.length,
         render: (text, record) => formatMoney(text),
      },
      {
         title: "Chuyên cần",
         dataIndex: "diligence",
         sorter: (a, b) => a.diligence.length - b.diligence.length,
         render: (text, record) => formatMoney(text),
      },
      {
         title: "Lương",
         dataIndex: "salary",
         sorter: (a, b) => a.salary.length - b.salary.length,
         render: (text, record) => formatMoney(text),
      },
      {
         title: "Dự án",
         dataIndex: "projectEX.name",
         render: (text, record) => record?.projectEX.name,
         sorter: (a, b) => a.projectEX.name.length - b.projectEX.name.length,
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
                     data-bs-toggle="modal"
                     data-bs-target="#edit_salary"
                  >
                     <i className="fa fa-pencil m-r-5" /> Edit
                  </a>
                  <a
                     className="dropdown-item"
                     href="#"
                     data-bs-toggle="modal"
                     data-bs-target="#delete_salary"
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
            <title>Salary - HRMS Admin Template</title>
            <meta name="description" content="Login page" />
         </Helmet>
         {/* Page Content */}
         <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
               <div className="row align-items-center">
                  <div className="col">
                     <h3 className="page-title">Phụ cấp</h3>
                  </div>
                  <div className="col-auto float-end ml-auto">
                     <a href="#" className="btn add-btn" onClick={handleShow}>
                        <i className="fa fa-plus" /> Thêm phụ cấp
                     </a>
                  </div>
               </div>
            </div>
            {/* /Page Header */}
            {/* Search Filter */}
            <div className="row filter-row">
               <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
                  <div className="form-group form-focus">
                     <input type="text" className="form-control floating" />
                     <label className="focus-label">Tên</label>
                  </div>
               </div>
               <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
                  <div className="form-group form-focus select-focus">
                     <select className="select floating">
                        <option value> -- Select -- </option>
                        <option value>Employee</option>
                        <option value={1}>Manager</option>
                     </select>
                     <label className="focus-label">Role</label>
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
                           total: salarys.length,
                           showTotal: (total, range) =>
                              `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                           showSizeChanger: true,
                           onShowSizeChange: onShowSizeChange,
                           itemRender: itemRender,
                        }}
                        style={{ overflowX: "auto" }}
                        columns={columns}
                        // bordered
                        dataSource={salarys}
                        rowKey={(record) => record._id}
                        // onChange={this.handleTableChange}
                     />
                  </div>
               </div>
            </div>
         </div>
         {/* /Page Content */}
         {/* Add Salary Modal */}
         <AddAllowance show={show} handleClose={handleClose} />
         {/* /Add Salary Modal */}
         {/* Delete Salary Modal */}
         <div className="modal custom-modal fade" id="delete_salary" role="dialog">
            <div className="modal-dialog modal-dialog-centered">
               <div className="modal-content">
                  <div className="modal-body">
                     <div className="form-header">
                        <h3>Delete Salary</h3>
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
         {/* /Delete Salary Modal */}
      </div>
   );
};

export default Allowance;
