import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "react-router-dom";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import "../../antdstyle.css";

import Editemployee from "../../../_components/modelbox/Editemployee";
import Addemployee from "../../../_components/modelbox/Addemployee";
import Header from "../../../initialpage/Sidebar/header";
import Sidebar from "../../../initialpage/Sidebar/sidebar";
import { useSelector } from "react-redux";
import { EmployeeDepartmentOpition, EmployeeDepartmentType, UserRoleType } from "../../../constant";
import moment from "moment";
import DeleteUser from "../../../_components/modelbox/DeleteUser";
import employeesSclice, {
   listEmployees,
   listEmployeesByUserId,
} from "../../../redux/feature/employeesSclice";
import { employeesRemainingSelector } from "../../../redux/selectors/employeesSelector";
import { useDispatch } from "react-redux";
import { useLoading } from "../../../hook/useLoading";
// import ActionEmployees from "../../../components/action/actionEmployees";

const Employeeslist = () => {
   const [menu, setMenu] = useState(false);
   const [modalShow, setModalShow] = useState(false);
   const [employee, setEmployee] = useState({});
   const [render, setRender] = useState(0);
   const [modalDelete, setModalDelete] = useState(false);
   const [text, setText] = useState("");
   const [department, setDepartment] = useState("");
   const dispatch = useDispatch();
   const { setLoading } = useLoading();

   const search = useLocation().search;
   const project = new URLSearchParams(search).get("project");
   const role = new URLSearchParams(search).get("role");

   useEffect(() => {
      fetchEmployees();
   }, [user, project, role, department]);

   function fetchEmployees() {
      if (
         user.role === UserRoleType.ADMIN ||
         user.role === UserRoleType.EMPLOYEE ||
         user.role === UserRoleType.LEADER
      ) {
         dispatch(
            listEmployees({ query: { project, role, departmentId: department }, setLoading })
         );
      }

      if (user?.role === UserRoleType.CLIENT || user?.role === UserRoleType.WORKER) {
         dispatch(
            listEmployeesByUserId({
               query: { userId: user._id, project, role, departmentId: department },
               setLoading,
            })
         );
      }
   }

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

   const employees = useSelector(employeesRemainingSelector);
   const { user } = useSelector((state) => state.auth);

   useEffect(() => {
      dispatch(employeesSclice.actions.searchNameEmployees(text));
   }, [text]);

   const columns = [
      {
         title: "Họ và tên",
         dataIndex: "name",
         render: (text, record) => (
            <h2 className="table-avatar">
               <Link to={`/app/profile/employee-profile/${record?._id}`} className="avatar">
                  <img alt="" src={record?.avatar || record?.image} />
               </Link>
               <Link to={`/app/profile/employee-profile/${record?._id}`}>
                  {text} <span>{record?.departmentName}</span>
               </Link>
            </h2>
         ),
         sorter: (a, b) => a.name.length - b.name.length,
      },
      {
         title: "Phòng ban",
         dataIndex: "department",
         render: (text, record) => record?.departmentName,
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
         title: "Action",
         render: (text, record) =>
            (user?.role === UserRoleType.ADMIN ||
               user?.role === UserRoleType.EMPLOYEE ||
               user?.role === UserRoleType.LEADER) && (
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
                           setEmployee(record);
                           setModalShow(true);
                        }}
                     >
                        <i className="fa fa-pencil m-r-5" /> Sửa
                     </a>
                     <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => {
                           setEmployee(record);
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
   return (
      <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
         <Header onMenuClick={(value) => toggleMobileMenu()} />
         <Sidebar />
         <div className="page-wrapper">
            <Helmet>
               <title>Nhân viên</title>
               <meta name="description" content="Login page" />
            </Helmet>
            {/* Page Content */}
            <div Name="content container-fluid">
               {/* Page Header */}
               <div className="page-header">
                  <div className="row align-items-center">
                     <div className="col">
                        <h3 className="page-title"> Nhân viên</h3>
                     </div>
                     <div className="col-auto float-end ml-auto">
                        {(user?.role === UserRoleType.ADMIN ||
                           user?.role === UserRoleType.EMPLOYEE ||
                           user?.role === UserRoleType.LEADER) && (
                           <a href="#" className="btn add-btn" onClick={() => setModalShow(true)}>
                              <i className="fa fa-plus" /> Thêm nhân viên
                           </a>
                        )}
                        <div className="view-icons">
                           <Link
                              to="/app/employee/allemployees"
                              className="grid-view btn btn-link active"
                           >
                              <i className="fa fa-th" />
                           </Link>
                           <Link
                              to="/app/employee/employees-list"
                              className="list-view btn btn-link"
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
                        <input
                           type="text"
                           className="form-control floating"
                           value={text}
                           onChange={(e) => setText(e.target.value)}
                        />
                        <label className="focus-label">Tên nhân viên</label>
                     </div>
                  </div>
                  {/* <ActionEmployees department={department} setDepartment={setDepartment} /> */}
               </div>
               {/* /Search Filter */}
               <div className="row">
                  <div className="col-md-12">
                     <div className="table-responsive">
                        <Table
                           className="table-striped"
                           pagination={{
                              total: employees?.length,
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
            <Addemployee
               show={modalShow}
               onHide={() => setModalShow(false)}
               employee={employee}
               render={render}
            />
            {/* /Add Employee Modal */}
            {/* Edit Employee Modal */}
            <Editemployee />
            {/* /Edit Employee Modal */}
            {/* Delete Employee Modal */}
            <DeleteUser
               show={modalDelete}
               onHide={() => setModalDelete(false)}
               userRemove={employee}
            />
            {/* /Delete Employee Modal */}
         </div>
      </div>
   );
};

export default Employeeslist;
