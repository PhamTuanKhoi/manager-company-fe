import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import "../../antdstyle.css";
import {
   Avatar_02,
   Avatar_05,
   Avatar_11,
   Avatar_12,
   Avatar_09,
   Avatar_10,
   Avatar_13,
} from "../../../Entryfile/imagepath";
import Editemployee from "../../../_components/modelbox/Editemployee";
import Addemployee from "../../../_components/modelbox/Addemployee";
import Header from "../../../initialpage/Sidebar/header";
import Sidebar from "../../../initialpage/Sidebar/sidebar";
import { useSelector } from "react-redux";
import { EmployeeDepartmentType } from "../../../constant";
import moment from "moment";

const Employeeslist = () => {
   const [menu, setMenu] = useState(false);

   const toggleMobileMenu = () => {
      setMenu(!menu);
   };

   useEffect(() => {
      if ($(".select").length > 0) {
         $(".select").select2({
            minimumResultsForSearch: -1,
            width: "100%",
         });
      }
   });

   const { employees } = useSelector((state) => state.employees);

   const columns = [
      {
         title: "Họ và tên",
         dataIndex: "name",
         render: (text, record) => (
            <h2 className="table-avatar">
               <Link to="/app/profile/employee-profile" className="avatar">
                  <img alt="" src={record.avartar || record.image} />
               </Link>
               <Link to="/app/profile/employee-profile">
                  {text}{" "}
                  <span>
                     {record?.department === EmployeeDepartmentType.BUSSINESS
                        ? "Kinh doanh"
                        : record.department === EmployeeDepartmentType.ACCOUNTANT
                        ? "Kế toán"
                        : record.department === EmployeeDepartmentType.RECRUIT
                        ? "Tuyen Dung"
                        : record.department === EmployeeDepartmentType.MARKETING
                        ? "Maketing"
                        : ""}
                  </span>
               </Link>
            </h2>
         ),
         sorter: (a, b) => a.name.length - b.name.length,
      },
      {
         title: "Phòng ban",
         dataIndex: "department",
         sorter: (a, b) => a.department.length - b.department.length,
      },

      {
         title: "Email",
         dataIndex: "email",
         sorter: (a, b) => a.email.length - b.email.length,
      },

      {
         title: "Số điện thoại",
         dataIndex: "mobile",
         sorter: (a, b) => a.mobile - b.mobile,
      },

      {
         title: "Ngày tham gia",
         dataIndex: "createdAt",
         render: (text, record) => moment(record.createdAt).format("DD/MM/YYYY"),
         sorter: (a, b) => a.createdAt - b.createdAt,
      },

      {
         title: "Căn cước công dân",
         dataIndex: "cccd",
         sorter: (a, b) => a.cccd - b.cccd,
      },
      {
         title: "Role",
         render: (text, record) => (
            <div className="dropdown">
               <a
                  href=""
                  className="btn btn-white btn-sm btn-rounded dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
               >
                  Web Developer{" "}
               </a>
               <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">
                     Software Engineer
                  </a>
                  <a className="dropdown-item" href="#">
                     Software Tester
                  </a>
                  <a className="dropdown-item" href="#">
                     Frontend Developer
                  </a>
                  <a className="dropdown-item" href="#">
                     UI/UX Developer
                  </a>
               </div>
            </div>
         ),
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
                     data-bs-target="#edit_employee"
                  >
                     <i className="fa fa-pencil m-r-5" /> Edit
                  </a>
                  <a
                     className="dropdown-item"
                     href="#"
                     data-bs-toggle="modal"
                     data-bs-target="#delete_employee"
                  >
                     <i className="fa fa-trash-o m-r-5" /> Delete
                  </a>
               </div>
            </div>
         ),
      },
   ];
   return (
      <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
         <Header onMenuClick={(value) => toggleMobileMenu()} />
         <Sidebar />
         <div className="page-wrapper">
            <Helmet>
               <title>Employeeslist - HRMS Admin Template</title>
               <meta name="description" content="Login page" />
            </Helmet>
            {/* Page Content */}
            <div className="content container-fluid">
               {/* Page Header */}
               <div className="page-header">
                  <div className="row align-items-center">
                     <div className="col">
                        <h3 className="page-title">Employee</h3>
                        <ul className="breadcrumb">
                           <li className="breadcrumb-item">
                              <Link to="/app/main/dashboard">Dashboard</Link>
                           </li>
                           <li className="breadcrumb-item active">Employee</li>
                        </ul>
                     </div>
                     <div className="col-auto float-end ml-auto">
                        <a
                           href="#"
                           className="btn add-btn"
                           data-bs-toggle="modal"
                           data-bs-target="#add_employee"
                        >
                           <i className="fa fa-plus" /> Add Employee
                        </a>
                        <div className="view-icons">
                           <Link to="/app/employee/allemployees" className="grid-view btn btn-link">
                              <i className="fa fa-th" />
                           </Link>
                           <Link
                              to="/app/employee/employees-list"
                              className="list-view btn btn-link active"
                           >
                              <i className="fa fa-bars" />
                           </Link>
                        </div>
                     </div>
                  </div>
               </div>
               {/* /Page Header */}
               {/* Search Filter */}
               <div className="row filter-row">
                  <div className="col-sm-6 col-md-3">
                     <div className="form-group form-focus">
                        <input type="text" className="form-control floating" />
                        <label className="focus-label">Employee ID</label>
                     </div>
                  </div>
                  <div className="col-sm-6 col-md-3">
                     <div className="form-group form-focus">
                        <input type="text" className="form-control floating" />
                        <label className="focus-label">Employee Name</label>
                     </div>
                  </div>
                  <div className="col-sm-6 col-md-3">
                     <div className="form-group form-focus select-focus">
                        <select className="select floating">
                           <option>Select Designation</option>
                           <option>Web Developer</option>
                           <option>Web Designer</option>
                           <option>Android Developer</option>
                           <option>Ios Developer</option>
                        </select>
                        <label className="focus-label">Designation</label>
                     </div>
                  </div>
                  <div className="col-sm-6 col-md-3">
                     <a href="#" className="btn btn-success btn-block w-100">
                        {" "}
                        Search{" "}
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
                              total: employees.length,
                              showTotal: (total, range) =>
                                 `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                              showSizeChanger: true,
                              onShowSizeChange: onShowSizeChange,
                              itemRender: itemRender,
                           }}
                           style={{ overflowX: "auto" }}
                           columns={columns}
                           // bordered
                           dataSource={employees}
                           rowKey={(record) => record._id}
                           // onChange={console.log("change")}
                        />
                     </div>
                  </div>
               </div>
            </div>
            {/* /Page Content */}
            {/* Add Employee Modal */}
            <Addemployee />
            {/* /Add Employee Modal */}
            {/* Edit Employee Modal */}
            <Editemployee />
            {/* /Edit Employee Modal */}
            {/* Delete Employee Modal */}
            <div className="modal custom-modal fade" id="delete_employee" role="dialog">
               <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                     <div className="modal-body">
                        <div className="form-header">
                           <h3>Delete Employee</h3>
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
            {/* /Delete Employee Modal */}
         </div>
      </div>
   );
};

export default Employeeslist;
