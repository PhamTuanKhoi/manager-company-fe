import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { User } from "../../../Entryfile/imagepath.jsx";

import Header from "../../../initialpage/Sidebar/header";
import Sidebar from "../../../initialpage/Sidebar/sidebar";
import "../../index.css";
import AssignTask from "../../../_components/table/assignTask";
import AddSubBranch from "../../../_components/modelbox/AddSubBranch.jsx";

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
                        <h3 className="page-title">Bộ phận</h3>
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
                  <div className="col-md-12 col-lg-6 col-xl-4 d-flex">
                     <div className="card flex-fill">
                        <div className="card-body">
                           <div className="part-header">
                              <h4 className="card-title">Nhóm 1</h4>
                              <div className="dropdown kanban-action">
                                 <a href="#" data-bs-toggle="dropdown">
                                    <i className="fa fa-ellipsis-v" />
                                 </a>
                                 <div className="dropdown-menu dropdown-menu-right">
                                    <a className="dropdown-item" href="#" onClick={handleShow}>
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

                  <div className="col-md-12 col-lg-6 col-xl-4 d-flex">
                     <div className="card flex-fill">
                        <div className="card-body">
                           <div className="part-header">
                              <h4 className="card-title">Nhóm 2</h4>
                              <div className="dropdown kanban-action">
                                 <a href="#" data-bs-toggle="dropdown">
                                    <i className="fa fa-ellipsis-v" />
                                 </a>
                                 <div className="dropdown-menu dropdown-menu-right">
                                    <a className="dropdown-item" href="#" onClick={handleShow}>
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
                  <div className="col-md-12 col-lg-6 col-xl-4 d-flex">
                     <div className="card flex-fill">
                        <div className="card-body">
                           <div className="part-header">
                              <h4 className="card-title">Nhóm 3</h4>
                              <div className="dropdown kanban-action">
                                 <a href="#" data-bs-toggle="dropdown">
                                    <i className="fa fa-ellipsis-v" />
                                 </a>
                                 <div className="dropdown-menu dropdown-menu-right">
                                    <a className="dropdown-item" href="#" onClick={handleShow}>
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
                  <div className="col-md-12 col-lg-6 col-xl-4 d-flex">
                     <div className="card flex-fill">
                        <div className="card-body">
                           <div className="part-header">
                              <h4 className="card-title">Nhóm 4</h4>
                              <div className="dropdown kanban-action">
                                 <a href="#" data-bs-toggle="dropdown">
                                    <i className="fa fa-ellipsis-v" />
                                 </a>
                                 <div className="dropdown-menu dropdown-menu-right">
                                    <a className="dropdown-item" href="#" onClick={handleShow}>
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
               </div>
               {/* table assign task */}
               <div className="row">
                  <AssignTask />
               </div>
               {/* table assign task */}
               {/* add sub-branch */}
               <AddSubBranch show={showAddBranch} onHide={handleClose} />
               {/* add sub-branch */}
            </div>
            {/* /Page Content */}
         </div>
      </div>
   );
};

export default PartOverview;