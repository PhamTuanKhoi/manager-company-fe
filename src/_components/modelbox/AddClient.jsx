import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLoading } from "../../hook/useLoading";
import { createClient } from "../../redux/feature/clientSclice";

const AddClient = ({ show, handleClose }) => {
   const [client, setClient] = useState({
      name: "",
      email: "",
      mobile: "",
      company: "",
      field: "",
      tax: "",
   });

   const { setLoading } = useLoading();
   const { user } = useSelector((state) => state.auth);
   const dispatch = useDispatch();

   async function handleSave() {
      if (!user._id) {
         toast.warn(`Làm ơn đăng nhập vào hệ thống`);
         return;
      }

      dispatch(
         createClient({
            payload: { ...client, creator: user._id },
            toast,
            handleClose,
            setLoading,
         })
      );
   }
   return (
      <Modal
         show={show}
         onHide={handleClose}
         size="lg"
         aria-labelledby="contained-modal-title-vcenter"
         centered
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
                              type="number"
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
                     <div className="col-md-6">
                        <div className="form-group">
                           <label className="col-form-label">Mã số thuế</label>
                           <input
                              className="form-control"
                              type="number"
                              onChange={(e) => setClient({ ...client, tax: e.target.value })}
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
   );
};

export default AddClient;
