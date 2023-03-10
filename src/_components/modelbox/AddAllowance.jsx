import React, { memo, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLoading } from "../../hook/useLoading";
import { listProjectByAdmin, listProjectByUser } from "../../redux/feature/projectSclice";
import { UserRoleType } from "../../constant/index";
import { createSalary, updateSalary } from "../../redux/feature/salarySclice";
import { toast } from "react-toastify";
const AddAllowance = ({ show, handleClose, isSalary, load }) => {
   const handleClosed = () => {
      handleClose();
      empty();
   };

   const [salary, setSalary] = useState({
      beneficiary: "",
      salary: "0",
      go: "0",
      home: "0",
      toxic: "0",
      diligence: "0",
      eat: "0",
      project: "",
   });

   const empty = () => {
      setSalary({
         beneficiary: "",
         salary: "",
         go: "",
         home: "",
         toxic: "",
         diligence: "",
         eat: "",
         project: "",
      });
   };

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
      if (validate()) {
         dispatch(
            createSalary({
               payload: {
                  ...salary,
                  creator: user._id,
                  projectEX: projects?.find((item) =>
                     item._id === salary?.project ? { name: item?.name, _id: item?._id } : ""
                  ),
               },
               toast,
               onHide: handleClose,
               setLoading,
               empty,
            })
         );
      }
   };

   //  ----------------------------- edit --------------------------

   useEffect(() => {
      if (isSalary._id) setSalary(isSalary);
   }, [isSalary, load]);

   const handleUpdate = () => {
      if (validate()) {
         dispatch(
            updateSalary({
               id: salary?._id,
               payload: { ...salary, creator: user._id },
               toast,
               onHide: handleClose,
               setLoading,
               empty,
            })
         );
      }
   };

   const validate = () => {
      if (!salary.beneficiary) {
         toast.warn("L??m ??n nh???p t??n nh??m th??? h?????ng");
         return false;
      }
      if (salary.salary === undefined) {
         toast.warn("L??m ??n nh???p m???c l????ng");
         return false;
      }
      if (salary.go === undefined) {
         toast.warn("L??m ??n nh???p m???c ph??? c???p ??i l???i");
         return false;
      }
      if (salary.home === undefined) {
         toast.warn("L??m ??n nh???p m???c ph??? c???p nh?? ???");
         return false;
      }
      if (salary.toxic === undefined) {
         toast.warn("L??m ??n nh???p m???c ph??? c???p n???ng nh???c/ ?????c hai");
         return false;
      }
      if (salary.eat === undefined) {
         toast.warn("L??m ??n nh???p m???c ph??? c???p ??n u???ng");
         return false;
      }
      if (salary.diligence === undefined) {
         toast.warn("L??m ??n nh???p m???c ph??? c???p chuy??n c???n");
         return false;
      }
      if (!salary.project) {
         toast.warn("L??m ??n ch???n d??? ??n");
         return false;
      }
      return true;
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
               <h5 className="modal-title">
                  {salary?._id ? "Ch???nh s???a nh??m th??? h?????ng" : "Th??m nh??m th??? h?????ng"}
               </h5>
               <button type="button" className="close-x">
                  <span aria-hidden="true" onClick={handleClosed}>
                     ??
                  </span>
               </button>
            </div>
            <div className="modal-body">
               <div>
                  <div className="row">
                     <div className="col-md-6">
                        <div className="form-group">
                           <label className="col-form-label">
                              T??n nh??m th??? h?????ng <span className="text-danger">*</span>
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
                              L????ng / ng??y <span className="text-danger">*</span>
                           </label>
                           <div className="input-box">
                              <input
                                 prefix="???"
                                 className="form-control tel"
                                 type="number"
                                 defaultValue={salary.salary}
                                 onChange={(e) => setSalary({ ...salary, salary: e.target.value })}
                              />
                              <span className="prefix">VND</span>
                           </div>
                        </div>
                     </div>
                     <div className="col-sm-6">
                        <div className="form-group">
                           <label className="col-form-label">??i l???i / th??ng</label>
                           <div className="input-box">
                              <input
                                 prefix="???"
                                 className="form-control tel"
                                 type="number"
                                 defaultValue={salary.go}
                                 onChange={(e) => setSalary({ ...salary, go: e.target.value })}
                              />
                              <span className="prefix">VND</span>
                           </div>
                        </div>
                     </div>
                     <div className="col-sm-6">
                        <div className="form-group">
                           <label className="col-form-label">Nh?? ??? / th??ng</label>
                           <div className="input-box">
                              <input
                                 prefix="???"
                                 className="form-control tel"
                                 type="number"
                                 defaultValue={salary.home}
                                 onChange={(e) => setSalary({ ...salary, home: e.target.value })}
                              />
                              <span className="prefix">VND</span>
                           </div>
                        </div>
                     </div>
                     <div className="col-sm-6">
                        <div className="form-group">
                           <label className="col-form-label">N???ng nh???c/ ?????c h???i / ng??y</label>
                           <div className="input-box">
                              <input
                                 prefix="???"
                                 className="form-control tel"
                                 type="number"
                                 defaultValue={salary.toxic}
                                 onChange={(e) => setSalary({ ...salary, toxic: e.target.value })}
                              />
                              <span className="prefix">VND</span>
                           </div>
                        </div>
                     </div>
                     <div className="col-sm-6">
                        <div className="form-group">
                           <label className="col-form-label">??n u???ng / ng??y</label>
                           <div className="input-box">
                              <input
                                 prefix="???"
                                 className="form-control tel"
                                 type="number"
                                 defaultValue={salary.eat}
                                 onChange={(e) => setSalary({ ...salary, eat: e.target.value })}
                              />
                              <span className="prefix">VND</span>
                           </div>
                        </div>
                     </div>
                     <div className="col-sm-6">
                        <div className="form-group">
                           <label className="col-form-label">Chuy??n c???n / th??ng</label>
                           <div className="input-box">
                              <input
                                 prefix="???"
                                 className="form-control tel"
                                 type="number"
                                 defaultValue={salary.diligence}
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
                              D??? ??n <span className="text-danger">*</span>
                           </label>
                           <select
                              className="form-control"
                              value={salary?.project}
                              onChange={(e) =>
                                 setSalary({
                                    ...salary,
                                    project: e.target.value,
                                 })
                              }
                           >
                              <option>Ch???n d??? ??n</option>
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
                     {salary?._id ? (
                        <button className="btn btn-primary submit-btn" onClick={handleUpdate}>
                           S???a
                        </button>
                     ) : (
                        <button className="btn btn-primary submit-btn" onClick={handleSave}>
                           L??u
                        </button>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </Modal>
   );
};

export default memo(AddAllowance);
