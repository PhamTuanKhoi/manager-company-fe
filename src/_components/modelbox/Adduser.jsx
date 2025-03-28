import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createWorker, updateWorker } from "../../redux/feature/workerSclice";
import { useLoading } from "../../hook/useLoading";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import { emailrgx, ExcellentOpition, phonergx } from "../../constant";
import axios from "axios";
import { uploadCloudinary } from "../../helpers/cloudinary";

const Adduser = ({ show, onHide, editWorker, render }) => {
   const [worker, setWorker] = useState({
      name: "",
      email: "",
      cccd: "",
      mobile: "",
      date: "",
      password: "",
      confirmPasword: "",
      field: "",
      address: "",
      fieldContent: "",
      excellent: "",
      tax: "",
   });

   const validatetion = () => {
      if (!user._id) {
         toast.warn(`Làm ơn đăng nhập vào hệ thống`);
         return false;
      }
      if (!worker.name) {
         toast.warn("Vui lòng nhập họ tên");
         return false;
      }

      if (worker.email) {
         const isValidEmail = emailrgx.test(worker.email);
         if (!isValidEmail) {
            toast.warn("Vui lòng nhập đúng email");
            return false;
         }
      }

      if (!worker.cccd) {
         toast.warn("Vui lòng nhập căn cước hoặc chứng minh nhân dân");
         return false;
      }

      if (worker.cccd) {
         if (!(worker.cccd.toString().length === 9 || worker.cccd.toString().length === 12)) {
            console.log(worker.cccd.length);
            toast.warn("Vui lòng nhập đúng căn cước hoặc chứng minh nhân dân");
            return false;
         }
      }

      if (!worker.mobile) {
         toast.warn("Vui lòng nhập số điện thoại");
         return false;
      }

      if (worker.mobile) {
         const isValidPhone = phonergx.test(worker.mobile);
         if (!isValidPhone) {
            toast.warn("Vui lòng nhập đúng số điện thoại");
            return false;
         }
      }

      if (!worker.date) {
         toast.warn("Vui lòng chọn ngày sinh");
         return false;
      }

      if (!worker.address) {
         toast.warn("Vui lòng nhập địa chỉ");
         return false;
      }

      if (!isEdit) {
         if (!worker.password) {
            toast.warn("Vui lòng nhập mật khẩu");
            return false;
         }

         if (!worker.confirmPasword) {
            toast.warn("Vui lòng nhập lại mật khẩu");
            return false;
         }

         if (worker.password) {
            if (worker.password !== worker.confirmPasword) {
               toast.warn("Mật khẩu không chính xác");
               return false;
            }
         }
      }

      Object.keys(worker).forEach((key) => (worker[key] === "" ? delete worker[key] : worker[key]));

      return true;
   };

   const [isEdit, setIsEdit] = useState("");
   const [file, setFile] = useState("");
   const [avatar, setAvatar] = useState("");
   const dispatch = useDispatch();
   const { setLoading } = useLoading();
   const { user } = useSelector((state) => state.auth);

   const empty = () => {
      setWorker({
         name: "",
         email: "",
         cccd: "",
         mobile: "",
         date: "",
         password: "",
         confirmPasword: "",
         field: "",
         address: "",
         fieldContent: "",
         excellent: "",
      });

      setIsEdit("");
   };

   const handleClose = () => {
      empty();
      onHide();
      setAvatar("");
   };

   // set data
   useEffect(() => {
      setWorker(editWorker);
      setIsEdit(editWorker._id);
      setAvatar(editWorker?.avatar);
   }, [render]);

   const handleSave = async () => {
      if (validatetion()) {
         let payload = {
            ...worker,
            date: new Date(worker.date).getTime(),
            creator: user._id,
            file: file,
         };

         if (file) {
            const image = await uploadCloudinary(file, setLoading);
            payload = {
               ...payload,
               avatar: image,
            };
         }

         dispatch(
            createWorker({
               payload,
               toast,
               onHide,
               setLoading,
               empty,
            })
         );
      }
   };

   const handleUpdate = async () => {
      if (!editWorker._id) {
         toast.warn(`Người lao động không tồn tại`);
         return;
      }

      if (validatetion()) {
         let payload = {
            ...worker,
            cccd: worker.cccd.toString(),
            oldEmail: editWorker.email,
            date: new Date(worker.date).getTime(),
            creator: user._id,
         };

         if (file) {
            const image = await uploadCloudinary(file, setLoading);
            payload = {
               ...payload,
               avatar: image,
            };
         }

         dispatch(
            updateWorker({
               id: editWorker._id,
               payload,
               toast,
               onHide,
               setLoading,
               empty,
            })
         );
      }
   };

   const handleChangeFile = (e) => {
      const file = e.target.files[0];
      if (e.target.files[0]) {
         setFile(file);
         setAvatar(URL.createObjectURL(file));
      }
   };

   return (
      <>
         {/* Add User Modal */}
         <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show}
            // onHide={handleClose}
         >
            <div role="document">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title">Thêm người lao động</h5>
                     <button type="button" className="close-x" onClick={handleClose}>
                        <span aria-hidden="true">×</span>
                     </button>
                  </div>
                  <div className="modal-body">
                     <div>
                        <div className="row">
                           <div className="col-sm-12">
                              <div className="personal-image">
                                 <label className="label">
                                    <input type="file" onChange={handleChangeFile} />
                                    <figure className="personal-figure">
                                       <img
                                          src={
                                             avatar ||
                                             "https://avatars1.githubusercontent.com/u/11435231?s=460&v=4"
                                          }
                                          className="personal-avatar"
                                          alt="avatar"
                                       />
                                       <figcaption className="personal-figcaption">
                                          <img src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png" />
                                       </figcaption>
                                    </figure>
                                 </label>
                              </div>
                           </div>

                           <div className="col-sm-6">
                              <div className="form-group">
                                 <label className="col-form-label">
                                    Họ và tên <span className="text-danger">*</span>
                                 </label>
                                 <input
                                    className="form-control"
                                    type="text"
                                    defaultValue={worker.name}
                                    onChange={(e) => setWorker({ ...worker, name: e.target.value })}
                                 />
                              </div>
                           </div>
                           <div className="col-sm-6">
                              <div className="form-group">
                                 <label className="col-form-label">Email</label>
                                 <input
                                    className="form-control"
                                    type="email"
                                    defaultValue={worker.email}
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
                                    defaultValue={worker.cccd}
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
                                    defaultValue={worker.mobile}
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
                                    value={moment(worker.date).format("YYYY-MM-DD")}
                                    onChange={(e) => setWorker({ ...worker, date: e.target.value })}
                                 />
                              </div>
                           </div>

                           <div className="col-sm-6">
                              <div className="form-group">
                                 <label className="col-form-label">
                                    Địa chỉ <span className="text-danger">*</span>
                                 </label>
                                 <input
                                    className="form-control"
                                    type="text"
                                    defaultValue={worker.address}
                                    onChange={(e) =>
                                       setWorker({ ...worker, address: e.target.value })
                                    }
                                 />
                              </div>
                           </div>
                           {!isEdit && (
                              <>
                                 <div className="col-sm-6">
                                    <div className="form-group">
                                       <label className="col-form-label">
                                          Mật khẩu <span className="text-danger">*</span>
                                       </label>
                                       <input
                                          className="form-control"
                                          type="password"
                                          onChange={(e) =>
                                             setWorker({ ...worker, password: e.target.value })
                                          }
                                       />
                                    </div>
                                 </div>

                                 <div className="col-sm-6">
                                    <div className="form-group">
                                       <label className="col-form-label">
                                          Nhập lại mật khẩu <span className="text-danger">*</span>
                                       </label>
                                       <input
                                          className="form-control"
                                          type="password"
                                          onChange={(e) =>
                                             setWorker({
                                                ...worker,
                                                confirmPasword: e.target.value,
                                             })
                                          }
                                       />
                                    </div>
                                 </div>
                              </>
                           )}

                           <div className="col-sm-6">
                              <div className="form-group">
                                 <label className="col-form-label">
                                    Vai trò <span className="text-danger">*</span>
                                 </label>
                                 <select
                                    className="form-control"
                                    value={worker?.excellent}
                                    onChange={(e) =>
                                       setWorker({ ...worker, excellent: e.target.value })
                                    }
                                 >
                                    <option>Chọn vai trò</option>
                                    {ExcellentOpition?.map((item, index) => (
                                       <option key={index} value={item?.value}>
                                          {item?.label}
                                       </option>
                                    ))}
                                 </select>
                              </div>
                           </div>

                           <div className="col-sm-6">
                              <div className="form-group">
                                 <label className="col-form-label">Mã số thuế</label>
                                 <input
                                    className="form-control"
                                    type="number"
                                    defaultValue={worker.tax}
                                    onChange={(e) => setWorker({ ...worker, tax: e.target.value })}
                                 />
                              </div>
                           </div>

                           <div className="col-sm-6">
                              <div className="form-group">
                                 <label className="col-form-label">
                                    Lĩnh vực/ ngành nghề chuyên môn
                                 </label>
                                 <input
                                    className="form-control"
                                    type="text"
                                    defaultValue={worker.field}
                                    onChange={(e) =>
                                       setWorker({ ...worker, field: e.target.value })
                                    }
                                 />
                              </div>
                           </div>

                           <div className="col-sm-6">
                              <div className="form-group">
                                 <label className="col-form-label">
                                    Mô tả chi tiết kinh nghiệm
                                 </label>
                                 <TextArea
                                    value={worker.fieldContent}
                                    onChange={(e) =>
                                       setWorker({ ...worker, fieldContent: e.target.value })
                                    }
                                    rows={4}
                                 />
                              </div>
                           </div>
                        </div>

                        <div className="submit-section">
                           {!isEdit ? (
                              <button className="btn btn-primary submit-btn" onClick={handleSave}>
                                 Lưu
                              </button>
                           ) : (
                              <button className="btn btn-primary submit-btn" onClick={handleUpdate}>
                                 Cập nhật
                              </button>
                           )}
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
