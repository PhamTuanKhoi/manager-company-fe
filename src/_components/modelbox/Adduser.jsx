import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createWorker } from "../../redux/feature/workerSclice";
import { useLoading } from "../../hook/useLoading";

const Adduser = ({ show, onHide }) => {
   const [worker, setWorker] = useState({
      name: "",
      email: "",
      cccd: 0,
      mobile: "",
      date: "",
   });

   const dispatch = useDispatch();
   const { user } = useSelector((state) => state.auth);
   const { setLoading } = useLoading();

   function handleSave() {
      if (user._id) {
         dispatch(
            createWorker({
               payload: {
                  ...worker,
                  date: new Date(worker.date).getTime(),
                  creator: user._id,
               },
               toast,
               onHide,
               setLoading,
            })
         );
      }
   }

   return (
      <>
         {/* Add User Modal */}
         <Modal show={show} onHide={onHide}>
            <div role="document">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title">Thêm người lao động</h5>
                     <button type="button" className="close-x">
                        <span aria-hidden="true" onClick={onHide}>
                           ×
                        </span>
                     </button>
                  </div>
                  <div className="modal-body">
                     <div>
                        <div className="row">
                           <div className="col-sm-6">
                              <div className="form-group">
                                 <label className="col-form-label">
                                    Họ và tên <span className="text-danger">*</span>
                                 </label>
                                 <input
                                    className="form-control"
                                    type="text"
                                    onChange={(e) => setWorker({ ...worker, name: e.target.value })}
                                 />
                              </div>
                           </div>
                           <div className="col-sm-6">
                              <div className="form-group">
                                 <label className="col-form-label">
                                    Email <span className="text-danger">*</span>
                                 </label>
                                 <input
                                    className="form-control"
                                    type="email"
                                    onChange={(e) =>
                                       setWorker({ ...worker, email: e.target.value })
                                    }
                                 />
                              </div>
                           </div>
                           <div className="col-sm-6">
                              <div className="form-group">
                                 <label className="col-form-label">
                                    Căn cước công dân <span className="text-danger">*</span>
                                 </label>
                                 <input
                                    className="form-control"
                                    type="number"
                                    onChange={(e) => setWorker({ ...worker, cccd: e.target.value })}
                                 />
                              </div>
                           </div>

                           <div className="col-sm-6">
                              <div className="form-group">
                                 <label className="col-form-label">
                                    {" "}
                                    Số điện thoại <span className="text-danger">*</span>
                                 </label>
                                 <input
                                    className="form-control"
                                    type="number"
                                    onChange={(e) =>
                                       setWorker({ ...worker, mobile: e.target.value })
                                    }
                                 />
                              </div>
                           </div>
                           <div className="col-sm-6">
                              <div className="form-group">
                                 <label className="col-form-label">
                                    Ngày sinh <span className="text-danger">*</span>
                                 </label>
                                 <input
                                    className="form-control"
                                    type="date"
                                    onChange={(e) => setWorker({ ...worker, date: e.target.value })}
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
            </div>
         </Modal>
         {/* /Add User Modal */}
      </>
   );
};

export default Adduser;
