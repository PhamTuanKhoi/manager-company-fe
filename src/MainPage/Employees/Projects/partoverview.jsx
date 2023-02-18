import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "react-router-dom";

import Header from "../../../initialpage/Sidebar/header";
import Sidebar from "../../../initialpage/Sidebar/sidebar";
import "../../index.css";
import TableTask from "../../../_components/table/tableTask";
import AddSubBranch from "../../../_components/modelbox/AddSubBranch.jsx";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { child } from "../../../redux/feature/partSclice";
import { useLoading } from "../../../hook/useLoading";

const PartOverview = () => {
   const [menu, setMenu] = useState(false);
   const [showAddBranch, setShowAddBranch] = useState(false);

   const handleClose = () => setShowAddBranch(false);
   const handleShow = () => setShowAddBranch(true);

   const toggleMobileMenu = () => {
      setMenu(!menu);
   };

   useEffect(() => {
      let firstload = localStorage.getItem("firstload");
      if (firstload === "true") {
         setTimeout(function () {
            window.location.reload(1);
            localStorage.removeItem("firstload");
         }, 1000);
      }
   });

   const [part, setPart] = useState({});
   const { search } = useLocation();
   const query = new URLSearchParams(search);

   const dispatch = useDispatch();
   const { setLoading } = useLoading();

   const { user } = useSelector((state) => state.auth);

   const projectId = query.get("project");
   const partId = query.get("part");
   const name = query.get("name");

   useEffect(() => {
      dispatch(child({ query: { project: projectId, part: partId }, setLoading }));
   }, [projectId, partId]);

   const { parts } = useSelector((state) => state.part);

   return (
      <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
         <Header onMenuClick={(value) => toggleMobileMenu()} />
         <Sidebar />
         <div className="page-wrapper">
            <Helmet>
               <title>Dashboard - HRMS Admin Template</title>
               <meta name="description" content="Dashboard" />
            </Helmet>
            {/* Page Content */}

            <div className="content container-fluid">
               <div className="page-header">
                  <div className="row align-items-center">
                     <div className="col">
                        <h3 className="page-title">Bộ phận: {name}</h3>
                     </div>
                     <div className="col-auto float-end ml-auto">
                        <a href="#" className="btn btn-white float-end ml-2">
                           <i className="fa fa-plus" /> Thêm công việc
                        </a>
                     </div>
                  </div>
               </div>
               {/* Statistics Widget */}
               <div className="row">
                  {parts?.map((item) => (
                     <div key={item?._id} className="col-md-12 col-lg-6 col-xl-4 d-flex">
                        <div className="card flex-fill">
                           <div className="card-body">
                              <div className="part-header">
                                 <Link
                                    to={`/app/projects/part-owerview?project=${projectId}&part=${item?._id}&name=${item?.name}`}
                                    className="card-title"
                                 >
                                    {item?.name}
                                 </Link>
                                 <div className="dropdown kanban-action">
                                    <a href="#" data-bs-toggle="dropdown">
                                       <i className="fa fa-ellipsis-v" />
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right">
                                       <a
                                          className="dropdown-item"
                                          href="#"
                                          onClick={() => {
                                             handleShow();
                                             setPart(item);
                                          }}
                                       >
                                          Thêm nhánh phụ
                                       </a>
                                       <a className="dropdown-item" href="#">
                                          Xóa
                                       </a>
                                    </div>
                                 </div>
                              </div>
                              <div className="statistics">
                                 <div className="row">
                                    <div className="col-md-6 col-6 text-center">
                                       <div className="stats-box mb-4">
                                          <p>Công việc</p>
                                          <h3>21</h3>
                                       </div>
                                    </div>
                                    <div className="col-md-6 col-6 text-center">
                                       <div className="stats-box mb-4">
                                          <p>Tổ</p>
                                          <h3>19</h3>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="row">
                                    <div className="text-center">
                                       <div className="stats-box mb-4">
                                          <p>Nhân viên</p>
                                          <h3>12</h3>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div className="progress mb-4">
                                 <div
                                    className="progress-bar bg-warning"
                                    role="progressbar"
                                    style={{ width: "80%" }}
                                    aria-valuenow={50}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                 >
                                    80%
                                 </div>
                              </div>
                              <div className="progress mb-4">
                                 <div
                                    className="progress-bar bg-success"
                                    role="progressbar"
                                    style={{ width: "70%" }}
                                    aria-valuenow={50}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                 >
                                    70%
                                 </div>
                              </div>
                              <div>
                                 <p>
                                    <i className="fa fa-dot-circle-o text-warning me-2" />
                                    Inprogress Tasks <span className="float-end">115</span>
                                 </p>
                                 <p>
                                    <i className="fa fa-dot-circle-o text-success me-2" />
                                    On Hold Tasks <span className="float-end">31</span>
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
               {/* table assign task */}
               <div className="row">
                  <TableTask />
               </div>
               {/* table assign task */}
               {/* add sub-branch */}
               <AddSubBranch
                  show={showAddBranch}
                  onHide={handleClose}
                  part={part}
                  id={projectId}
                  user={user}
               />
               {/* add sub-branch */}
            </div>
            {/* /Page Content */}
         </div>
      </div>
   );
};

export default PartOverview;
