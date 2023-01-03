import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Avatar_02 } from "../../../Entryfile/imagepath";

// import ReactSummernote from 'react-summernote';
// import 'react-summernote/dist/react-summernote.css'; // import styles
import Editproject from "../../../_components/modelbox/Editproject";
import "../../index.css";
import Addproject from "../../../_components/modelbox/Addproject";
import { useSelector } from "react-redux";
import { Table } from "antd";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import moment from "moment";

const ProjectList = () => {
   //  useEffect(() => {
   //     if ($(".select").length > 0) {
   //        $(".select").select2({
   //           minimumResultsForSearch: -1,
   //           width: "100%",
   //        });
   //     }
   //  });
   const onImageUpload = (fileList) => {
      const reader = new FileReader();
      // reader.onloadend = () => {
      //   ReactSummernote.insertImage(reader.result);
      // }
      reader.readAsDataURL(fileList[0]);
   };

   const [modalShow, setModalShow] = useState(false);

   const { projects } = useSelector((state) => state.project);

   const columns = [
      {
         title: "Dự án",
         dataIndex: "name",
         sorter: (a, b) => a.name.length - b.name.length,
      },

      {
         title: "leader",
      },
      {
         title: "Dự án",
         dataIndex: "team",
         sorter: (a, b) => a.start.length - b.start.length,
         render: (array, record) => (
            <ul className="team-members">
               {array.map((item) => (
                  <li>
                     <a href="#" title="John Doe" data-bs-toggle="tooltip">
                        <img alt="" src={Avatar_02} />
                     </a>
                  </li>
               ))}
               <li className="dropdown avatar-dropdown">
                  <a
                     href="#"
                     className="all-users dropdown-toggle"
                     data-bs-toggle="dropdown"
                     aria-expanded="false"
                  >
                     +{array.length}
                  </a>
               </li>
            </ul>
         ),
      },
      {
         title: "do uu tien",
         render: (array, record) => (
            <div className="dropdown action-label">
               <a
                  href
                  className="btn btn-white btn-sm btn-rounded dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
               >
                  <i className="fa fa-dot-circle-o text-danger" /> High{" "}
               </a>
               <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">
                     <i className="fa fa-dot-circle-o text-danger" /> High
                  </a>
                  <a className="dropdown-item" href="#">
                     <i className="fa fa-dot-circle-o text-warning" /> Medium
                  </a>
                  <a className="dropdown-item" href="#">
                     <i className="fa fa-dot-circle-o text-success" /> Low
                  </a>
               </div>
            </div>
         ),
      },

      {
         title: "trang thai",
         render: (array, record) => (
            <div className="dropdown action-label">
               <a
                  href
                  className="btn btn-white btn-sm btn-rounded dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
               >
                  <i className="fa fa-dot-circle-o text-danger" /> High{" "}
               </a>
               <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">
                     <i className="fa fa-dot-circle-o text-danger" /> High
                  </a>
                  <a className="dropdown-item" href="#">
                     <i className="fa fa-dot-circle-o text-warning" /> Medium
                  </a>
                  <a className="dropdown-item" href="#">
                     <i className="fa fa-dot-circle-o text-success" /> Low
                  </a>
               </div>
            </div>
         ),
      },
      {
         title: "bat dau",
         dataIndex: "start",
         sorter: (a, b) => a.start - b.start,
         render: (date, record) => moment(date).format("DD/MM/YYYY"),
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
                     data-bs-target="#edit_client"
                  >
                     <i className="fa fa-pencil m-r-5" /> Edit
                  </a>
                  <a
                     className="dropdown-item"
                     href="#"
                     data-bs-toggle="modal"
                     data-bs-target="#delete_client"
                  >
                     <i className="fa fa-trash-o m-r-5" /> Delete
                  </a>
               </div>
            </div>
         ),
      },
   ];

   console.log(projects);

   return (
      <div className="page-wrapper">
         <Helmet>
            <title>Projects - HRMS Admin Template</title>
            <meta name="description" content="Login page" />
         </Helmet>
         {/* Page Content */}
         <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
               <div className="row align-items-center">
                  <div className="col">
                     <h3 className="page-title">Projects</h3>
                     <ul className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/app/main/dashboard">Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item active">Projects</li>
                     </ul>
                  </div>
                  <div className="col-auto float-end ml-auto">
                     <a href="#" className="btn add-btn" onClick={() => setModalShow(true)}>
                        <i className="fa fa-plus" /> Create Project
                     </a>
                     <div className="view-icons">
                        <Link
                           to="/app/projects/project_dashboard"
                           className="grid-view btn btn-link"
                        >
                           <i className="fa fa-th" />
                        </Link>
                        <Link
                           to="/app/projects/projects-list"
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
                     <label className="focus-label">Project Name</label>
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
                        <option>Select Roll</option>
                        <option>Web Developer</option>
                        <option>Web Designer</option>
                        <option>Android Developer</option>
                        <option>Ios Developer</option>
                     </select>
                     <label className="focus-label">Role</label>
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
                           total: projects?.length,
                           showTotal: (total, range) =>
                              `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                           showSizeChanger: true,
                           onShowSizeChange: onShowSizeChange,
                           itemRender: itemRender,
                        }}
                        style={{ overflowX: "auto" }}
                        columns={columns}
                        // bordered
                        dataSource={projects}
                        rowKey={(record) => record._id}
                        onChange={console.log("change")}
                     />
                  </div>
               </div>
            </div>
         </div>
         {/* /Page Content */}
         {/* Create Project Modal */}
         <Addproject show={modalShow} onHide={() => setModalShow(false)} />
         {/* /Create Project Modal */}
         {/* Edit Project Modal */}
         <Editproject />
         {/* /Edit Project Modal */}
         {/* Delete Project Modal */}
         <div className="modal custom-modal fade" id="delete_project" role="dialog">
            <div className="modal-dialog modal-dialog-centered">
               <div className="modal-content">
                  <div className="modal-body">
                     <div className="form-header">
                        <h3>Delete Project</h3>
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
         {/* /Delete Project Modal */}
      </div>
   );
};

export default ProjectList;
