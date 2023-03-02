import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Avatar_02, Avatar_05 } from "../../../Entryfile/imagepath";

import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import "../../antdstyle.css";
import { useDispatch } from "react-redux";
import { useLoading } from "../../../hook/useLoading";
import { listUserSalary } from "../../../redux/feature/workerSclice";
import { useSelector } from "react-redux";
const Salary = () => {
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
      {
         id: 2,
         image: Avatar_05,
         name: "Richard Miles",
         role: "Web Developer",
         employee_id: "100.000",
         email: "1.500.000",
         salary: "100.000",
         joindate: "100.000",
         roles: "Web Developer",
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

   // --------------------------- handle --------------------------

   const dispatch = useDispatch();
   const { setLoading } = useLoading();

   useEffect(() => {
      dispatch(listUserSalary({ setLoading }));
   }, []);

   const { workers } = useSelector((state) => state.worker);
   console.log(workers);

   // ---------------------------column ----------------------------

   const columns = [
      {
         title: "Tên",
         dataIndex: "name",
         render: (text, record) => (
            <h2 className="table-avatar">
               <Link to="/app/profile/employee-profile" className="avatar">
                  <img alt="" src={record?.image} />
               </Link>
               <Link to="/app/profile/employee-profile">
                  {text} <span>{record?.field}</span>
               </Link>
            </h2>
         ),
         sorter: (a, b) => a.name.length - b.name.length,
      },
      {
         title: "Đi lại",
         dataIndex: "employee_id",
         sorter: (a, b) => a.employee_id.length - b.employee_id.length,
      },

      {
         title: "Nhà ở",
         dataIndex: "email",
         sorter: (a, b) => a.email.length - b.email.length,
      },

      {
         title: "Nặng nhọc/ độc hại",
         dataIndex: "joindate",
         sorter: (a, b) => a.joindate.length - b.joindate.length,
      },
      {
         title: "Ăn uống",
         render: (text, record) => <div>100.000</div>,
      },
      {
         title: "Chuyên cần",
         dataIndex: "joindate",
         sorter: (a, b) => a.joindate.length - b.joindate.length,
      },
      {
         title: "Lương",
         render: (text, record) => 15000,
      },
      {
         title: "Dự án",
         dataIndex: "projectName",
         sorter: (a, b) => a.projectName.length - b.projectName.length,
      },
      {
         title: "Nhóm thụ hưởng",
         dataIndex: "salary.name",
         sorter: (a, b) => a?.salary?.name?.length - b?.salary?.name?.length,
         render: (text, record) => (
            <div className="dropdown">
               <a
                  href=""
                  className="btn btn-white btn-sm btn-rounded dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
               >
                  {record?.salary?.name || "chọn nhóm thụ hưởng"}
               </a>
               <div className="dropdown-menu">
                  {record?.salarys?.map((item) => (
                     <button key={item?._id} className="dropdown-item">
                        {item?.beneficiary}
                     </button>
                  ))}
               </div>
            </div>
         ),
      },
      {
         title: "phieu luong",
         render: (text, record) => (
            <Link className="btn btn-sm btn-primary" to="/app/payroll/salary-view">
               Generate Slip
            </Link>
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
                     <a
                        href="#"
                        className="btn add-btn"
                        data-bs-toggle="modal"
                        data-bs-target="#add_salary"
                     >
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
      </div>
   );
};

export default Salary;
