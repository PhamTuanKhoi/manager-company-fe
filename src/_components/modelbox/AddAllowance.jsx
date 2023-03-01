import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLoading } from "../../hook/useLoading";
import { listProjectByAdmin, listProjectByUser } from "../../redux/feature/projectSclice";
import { UserRoleType } from "../../constant/index";
import { createSalary } from "../../redux/feature/salarySclice";
import { toast } from "react-toastify";
const AddAllowance = ({ show, handleClose }) => {
   const handleClosed = () => {
      handleClose();
   };

   const [salary, setSalary] = useState({
      beneficiary: "",
      salary: 0,
      go: 0,
      home: 0,
      toxic: 0,
      diligence: 0,
      eat: 0,
      project: "",
   });

   const dispatch = useDispatch();
   const { setLoading } = useLoading();
   const { user } = useSelector((state) => state.auth);

   // ------------------- fetch project ----------------------
   useEffect(() => {
      if (user.role) {
         if (user.role === UserRoleType.ADMIN) {
            dispatch(listProjectByAdmin({ setLoading }));
         }

         if (user.role !== UserRoleType.ADMIN) {
            dispatch(listProjectByUser({ id: user._id, setLoading }));
         }
      }
   }, [user._id]);

   const { projects } = useSelector((state) => state.project);

   // -------------------------- create ----------------------

   const handleSave = () => {
      dispatch(
         createSalary({
            payload: { ...salary, creator: user._id },
            toast,
            onHide: handleClose,
            setLoading,
         })
      );
   };

   return (
      <Modal
         show={show}
         onHide={handleClosed}
         size="lg"
         aria-labelledby="contained-modal-title-vcenter"
         centered
      >
         <div className="modal-content">
            <div className="modal-header">
               <h5 className="modal-title">{"Thêm nhóm thụ hưởng"}</h5>
               <button type="button" className="close-x">
                  <span aria-hidden="true" onClick={handleClosed}>
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
                              Tên nhóm thụ hưởng <span className="text-danger">*</span>
                           </label>
                           <input
                              className="form-control"
                              type="text"
                              defaultValue={salary.beneficiary}
                              onChange={(e) =>
                                 setSalary({ ...salary, beneficiary: e.target.value })
                              }
                           />
                        </div>
                     </div>
                     <div className="col-sm-6">
                        <div className="form-group">
                           <label className="col-form-label">
                              Lương / ngày <span className="text-danger">*</span>
                           </label>
                           <div className="input-box">
                              <input
                                 prefix="￥"
                                 className="form-control tel"
                                 type="number"
                                 value={salary.salary}
                                 onChange={(e) => setSalary({ ...salary, salary: e.target.value })}
                              />
                              <span className="prefix">VND</span>
                           </div>
                        </div>
                     </div>
                     <div className="col-sm-6">
                        <div className="form-group">
                           <label className="col-form-label">Đi lại / tháng</label>
                           <div className="input-box">
                              <input
                                 prefix="￥"
                                 className="form-control tel"
                                 type="number"
                                 value={salary.go}
                                 onChange={(e) => setSalary({ ...salary, go: e.target.value })}
                              />
                              <span className="prefix">VND</span>
                           </div>
                        </div>
                     </div>
                     <div className="col-sm-6">
                        <div className="form-group">
                           <label className="col-form-label">Nhà ở / tháng</label>
                           <div className="input-box">
                              <input
                                 prefix="￥"
                                 className="form-control tel"
                                 type="number"
                                 value={salary.home}
                                 onChange={(e) => setSalary({ ...salary, home: e.target.value })}
                              />
                              <span className="prefix">VND</span>
                           </div>
                        </div>
                     </div>
                     <div className="col-sm-6">
                        <div className="form-group">
                           <label className="col-form-label">Nặng nhọc/ độc hại / ngày</label>
                           <div className="input-box">
                              <input
                                 prefix="￥"
                                 className="form-control tel"
                                 type="number"
                                 value={salary.toxic}
                                 onChange={(e) => setSalary({ ...salary, toxic: e.target.value })}
                              />
                              <span className="prefix">VND</span>
                           </div>
                        </div>
                     </div>
                     <div className="col-sm-6">
                        <div className="form-group">
                           <label className="col-form-label">Ăn uống / ngày</label>
                           <div className="input-box">
                              <input
                                 prefix="￥"
                                 className="form-control tel"
                                 type="number"
                                 value={salary.eat}
                                 onChange={(e) => setSalary({ ...salary, eat: e.target.value })}
                              />
                              <span className="prefix">VND</span>
                           </div>
                        </div>
                     </div>
                     <div className="col-sm-6">
                        <div className="form-group">
                           <label className="col-form-label">Chuyên cần / tháng</label>
                           <div className="input-box">
                              <input
                                 prefix="￥"
                                 className="form-control tel"
                                 type="number"
                                 value={salary.diligence}
                                 onChange={(e) =>
                                    setSalary({ ...salary, diligence: e.target.value })
                                 }
                              />
                              <span className="prefix">VND</span>
                           </div>
                        </div>
                     </div>
                     <div className="col-sm-6">
                        <div className="form-group">
                           <label className="col-form-label">
                              Dự án <span className="text-danger">*</span>
                           </label>
                           <select
                              className="form-control"
                              value={salary?.project}
                              onChange={(e) => setSalary({ ...salary, project: e.target.value })}
                           >
                              <option>Chọn dự án</option>
                              {projects?.map((item) => (
                                 <option key={item?._id} value={item?._id}>
                                    {item?.name}
                                 </option>
                              ))}
                           </select>
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

export default AddAllowance;
