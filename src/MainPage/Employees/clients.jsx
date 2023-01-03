import React, { useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Avatar_19, Avatar_29 } from "../../Entryfile/imagepath";
import { createClient, listClient } from "../../redux/feature/clientSclice";
import Editclient from "../../_components/modelbox/Editclient";
import Modal from "react-bootstrap/Modal";
import { useLoading } from "../../hook/useLoading";
import { UserRoleType } from "../../constant";

const Clients = () => {
   useEffect(() => {
      if ($(".select").length > 0) {
         $(".select").select2({
            minimumResultsForSearch: -1,
            width: "100%",
         });
      }
   });

   //use
   const [show, setShow] = useState(false);
   const { setLoading } = useLoading();

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
   const { user } = useSelector((state) => state.auth);
   const [client, setClient] = useState({
      name: "",
      email: "",
      mobile: "",
      company: "",
      field: "",
   });

   const dispatch = useDispatch();

   async function handleSave() {
      if (user?._id) {
         dispatch(
            createClient({
               payload: { ...client, creator: user._id },
               toast,
               handleClose,
               setLoading,
            })
         );
      }
   }

   useEffect(() => {
      fetchClient();
   }, []);

   async function fetchClient() {
      if (user.role === UserRoleType.ADMIN) {
         dispatch(listClient({ setLoading }));
      }
   }

   const { clients } = useSelector((state) => state.client);
   return (
      <div className="page-wrapper">
         <Helmet>
            <title>Clients - HRMS Admin Template</title>
            <meta name="description" content="Login page" />
         </Helmet>
         {/* Page Content */}
         <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
               <div className="row align-items-center">
                  <div className="col">
                     <h3 className="page-title">Khách hàng</h3>
                  </div>
                  <div className="col-auto float-end ml-auto">
                     <a href="#" className="btn add-btn" onClick={handleShow}>
                        <i className="fa fa-plus" /> Thêm khách hàng
                     </a>
                     <div className="view-icons">
                        <Link to="/app/employees/clients" className="grid-view btn btn-link active">
                           <i className="fa fa-th" />
                        </Link>
                        <Link to="/app/employees/clients-list" className="list-view btn btn-link">
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
                     <label className="focus-label">ID khách hàng</label>
                  </div>
               </div>
               <div className="col-sm-6 col-md-3">
                  <div className="form-group form-focus">
                     <input type="text" className="form-control floating" />
                     <label className="focus-label">Tên khách hàng</label>
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
            {/* Search Filter */}
            <div className="row staff-grid-row">
               {clients.map((item) => (
                  <div key={item?._id} className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
                     <div className="profile-widget">
                        <div className="profile-img">
                           <Link to="/app/profile/client-profile" className="avatar">
                              <img alt="" src={Avatar_19} />
                           </Link>
                        </div>
                        <div className="dropdown profile-action">
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
                        <h4 className="user-name m-t-10 mb-0 text-ellipsis">
                           <Link to="/app/profile/client-profile">{item?.name}</Link>
                        </h4>
                        <h5 className="user-name m-t-10 mb-0 text-ellipsis">
                           <Link to="/app/profile/client-profile">{item?.company}</Link>
                        </h5>

                        <div className="small text-muted">{item?.field}</div>
                        <Link
                           onClick={() => localStorage.setItem("minheight", "true")}
                           to="/conversation/chat"
                           className="btn btn-white btn-sm m-t-10 mr-1"
                        >
                           Message
                        </Link>
                        <Link
                           to="/app/profile/client-profile"
                           className="btn btn-white btn-sm m-t-10"
                        >
                           View Profile
                        </Link>
                     </div>
                  </div>
               ))}
            </div>
         </div>
         {/* /Page Content */}
         {/* Add Client Modal */}
         <Modal
            show={show}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="modal custom-modal fade"
            role="dialog"
         >
            <div className="modal-content">
               <div className="modal-header">
                  <h5 className="modal-title">Khách hàng mới</h5>
                  <button type="button" className="close-x">
                     <span aria-hidden="true" onClick={handleClose}>
                        ×
                     </span>
                  </button>
               </div>
               <div className="modal-body">
                  <div>
                     <div className="row">
                        <div className="col-md-6">
                           <div className="form-group">
                              <label className="col-form-label">
                                 Họ tên <span className="text-danger">*</span>
                              </label>
                              <input
                                 className="form-control"
                                 type="text"
                                 onChange={(e) => setClient({ ...client, name: e.target.value })}
                              />
                           </div>
                        </div>
                        <div className="col-md-6">
                           <div className="form-group">
                              <label className="col-form-label">Email</label>
                              <input
                                 className="form-control"
                                 type="email"
                                 onChange={(e) => setClient({ ...client, email: e.target.value })}
                              />
                           </div>
                        </div>
                        <div className="col-md-6">
                           <div className="form-group">
                              <label className="col-form-label">
                                 Số điện thoại <span className="text-danger">*</span>
                              </label>
                              <input
                                 className="form-control"
                                 type="text"
                                 onChange={(e) => setClient({ ...client, mobile: e.target.value })}
                              />
                           </div>
                        </div>
                        <div className="col-md-6">
                           <div className="form-group">
                              <label className="col-form-label">
                                 Công ty <span className="text-danger">*</span>
                              </label>
                              <input
                                 className="form-control floating"
                                 type="text"
                                 onChange={(e) => setClient({ ...client, company: e.target.value })}
                              />
                           </div>
                        </div>
                        <div className="col-md-6">
                           <div className="form-group">
                              <label className="col-form-label">Lĩnh vực</label>
                              <input
                                 className="form-control"
                                 type="text"
                                 onChange={(e) => setClient({ ...client, field: e.target.value })}
                              />
                           </div>
                        </div>
                     </div>
                     <div className="submit-section">
                        <button className="btn btn-primary submit-btn" onClick={handleSave}>
                           Lưu
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </Modal>
         {/* /Add Client Modal */}
         {/* Edit Client Modal */}
         <Editclient />
         {/* /Edit Client Modal */}
         {/* Delete Client Modal */}
         <div className="modal custom-modal fade" id="delete_client" role="dialog">
            <div className="modal-dialog modal-dialog-centered">
               <div className="modal-content">
                  <div className="modal-body">
                     <div className="form-header">
                        <h3>Delete Client</h3>
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
         {/* /Delete Client Modal */}
      </div>
   );
};

export default Clients;
