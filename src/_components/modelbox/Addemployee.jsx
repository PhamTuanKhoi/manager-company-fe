import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import {
   emailrgx,
   EmployeeDepartmentType,
   EmployeesRoleOpition,
   phonergx,
   UserRoleType,
} from "../../constant/index";
import {
   createEmployees,
   employeesProfile,
   updateEmployees,
} from "../../redux/feature/employeesSclice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useLoading } from "../../hook/useLoading";
import { useEffect } from "react";
import moment from "moment";

const Addemployee = ({ show, onHide, employee, render }) => {
   const [isEdit, setIsEdit] = useState("");
   const [employees, setEmployees] = useState({
      name: "",
      email: "",
      cccd: "",
      department: "",
      mobile: "",
      date: "",
      address: "",
      role: UserRoleType.EMPLOYEE,
   });

   const empty = () => {
      setEmployees({
         name: "",
         email: "",
         cccd: "",
         department: "",
         mobile: "",
         date: "",
         address: "",
         role: UserRoleType.EMPLOYEE,
      });

      setIsEdit("");
   };

   const handleClose = () => {
      empty();
      onHide();
   };

   const { setLoading } = useLoading();
   const dispatch = useDispatch();
   const { user } = useSelector((state) => state.auth);

   useEffect(() => {
      setEmployees(employee);
      setIsEdit(employee._id);
   }, [render]);

   const handleSave = () => {
      if (validatetion()) {
         dispatch(
            createEmployees({
               payload: {
                  ...employees,
                  date: new Date(employees.date).getTime(),
                  creator: user._id,
               },
               toast,
               onHide,
               empty,
               setLoading,
            })
         );
      }
   };

   const handleUpdate = () => {
      if (!employee._id) {
         toast.warn(`Nh??n vi??n kh??ng t???n t???i`);
         return;
      }

      if (validatetion()) {
         dispatch(
            updateEmployees({
               id: employee._id,
               payload: {
                  ...employees,
                  oldEmail: employee?.email,
                  date: new Date(employees.date).getTime(),
                  creator: user._id,
               },
               toast,
               onHide,
               empty,
               setLoading,
            })
         );
      }
   };

   const validatetion = () => {
      if (!user._id) {
         toast.warn(`L??m ??n ????ng nh???p v??o h??? th???ng`);
         return false;
      }
      if (!employees.name) {
         toast.warn("Vui l??ng nh???p h??? t??n");
         return false;
      }

      if (!employees.email) {
         toast.warn("Vui l??ng nh???p email");
         return false;
      }

      if (employees.email) {
         const isValidEmail = emailrgx.test(employees.email);
         if (!isValidEmail) {
            toast.warn("Vui l??ng nh???p ????ng email");
            return false;
         }
      }

      if (!employees.cccd) {
         toast.warn("Vui l??ng nh???p c??n c?????c ho???c ch???ng minh nh??n d??n");
         return false;
      }
      if (employees.cccd) {
         if (!(employees.cccd.toString().length === 9 || employees.cccd.toString().length === 12)) {
            toast.warn("Vui l??ng nh???p ????ng c??n c?????c ho???c ch???ng minh nh??n d??n");
            return false;
         }
      }

      if (!employees.department) {
         toast.warn("Vui l??ng ch???n v??? tr??");
         return false;
      }

      if (!employees.mobile) {
         toast.warn("Vui l??ng nh???p s??? ??i???n tho???i");
         return false;
      }

      if (employees.mobile) {
         const isValidPhone = phonergx.test(employees.mobile);
         if (!isValidPhone) {
            toast.warn("Vui l??ng nh???p ????ng s??? ??i???n tho???i");
            return false;
         }
      }

      if (!employees.date) {
         toast.warn("Vui l??ng ch???n ng??y sinh");
         return false;
      }

      if (!employees.address) {
         toast.warn("Vui l??ng nh???p ?????a ch???");
         return false;
      }

      if (!employees.role) {
         toast.warn("Vui l??ng ch???n vai tr??");
         return false;
      }

      return true;
   };

   return (
      <>
         {/* Add Employee Modal */}
         <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show}
            onHide={handleClose}
         >
            <div className="modal-content">
               <div className="modal-header">
                  <h5 className="modal-title">{isEdit ? "S???a nh??n vi??n" : "Th??m nh??n vi??n"}</h5>
                  <button type="button" className="close-x">
                     <span aria-hidden="true" onClick={handleClose}>
                        ??
                     </span>
                  </button>
               </div>
               <div className="modal-body">
                  <div>
                     <div className="row">
                        <div className="col-sm-6">
                           <div className="form-group">
                              <label className="col-form-label">
                                 H??? v?? t??n <span className="text-danger">*</span>
                              </label>
                              <input
                                 className="form-control"
                                 type="text"
                                 defaultValue={employees.name}
                                 onChange={(e) =>
                                    setEmployees({ ...employees, name: e.target.value })
                                 }
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
                                 defaultValue={employees.email}
                                 onChange={(e) =>
                                    setEmployees({ ...employees, email: e.target.value })
                                 }
                              />
                           </div>
                        </div>
                        <div className="col-sm-6">
                           <div className="form-group">
                              <label className="col-form-label">
                                 C??n c?????c c??ng d??n <span className="text-danger">*</span>
                              </label>
                              <input
                                 className="form-control"
                                 type="number"
                                 defaultValue={employees.cccd}
                                 onChange={(e) =>
                                    setEmployees({ ...employees, cccd: e.target.value })
                                 }
                              />
                           </div>
                        </div>

                        <div className="col-md-6">
                           <div className="form-group">
                              <label className="col-form-label">
                                 V??? tr?? <span className="text-danger">*</span>
                              </label>{" "}
                              <br />
                              <select
                                 className="form-control"
                                 // className="select"   class tam linh
                                 value={employees.department}
                                 onChange={(e) =>
                                    setEmployees({ ...employees, department: e.target.value })
                                 }
                              >
                                 <option>Ch???n v??? tr??</option>
                                 <option value={EmployeeDepartmentType.ACCOUNTANT}>K??? to??n</option>
                                 <option value={EmployeeDepartmentType.BUSSINESS}>
                                    Kinh doanh
                                 </option>
                                 <option value={EmployeeDepartmentType.MARKETING}>Marketing</option>
                                 <option value={EmployeeDepartmentType.RECRUIT}>Tuy???n d???ng</option>
                              </select>
                           </div>
                        </div>
                        <div className="col-sm-6">
                           <div className="form-group">
                              <label className="col-form-label">
                                 {" "}
                                 S??? ??i???n tho???i <span className="text-danger">*</span>
                              </label>
                              <input
                                 className="form-control"
                                 type="number"
                                 defaultValue={employees.mobile}
                                 onChange={(e) =>
                                    setEmployees({ ...employees, mobile: e.target.value })
                                 }
                              />
                           </div>
                        </div>
                        <div className="col-sm-6">
                           <div className="form-group">
                              <label className="col-form-label">
                                 Ng??y sinh <span className="text-danger">*</span>
                              </label>
                              <input
                                 className="form-control"
                                 type="date"
                                 value={moment(employees.date).format("YYYY-MM-DD")}
                                 onChange={(e) =>
                                    setEmployees({ ...employees, date: e.target.value })
                                 }
                              />
                           </div>
                        </div>
                        <div className="col-sm-6">
                           <div className="form-group">
                              <label className="col-form-label">
                                 ?????a ch??? <span className="text-danger">*</span>
                              </label>
                              <input
                                 type="text"
                                 className="form-control"
                                 defaultValue={employees.address}
                                 onChange={(e) =>
                                    setEmployees({ ...employees, address: e.target.value })
                                 }
                              />
                           </div>
                        </div>

                        <div className="col-sm-6">
                           <div className="form-group">
                              <label className="col-form-label">
                                 Vai tr?? <span className="text-danger">*</span>
                              </label>
                              <select
                                 className="form-control"
                                 value={employees.role}
                                 onChange={(e) =>
                                    setEmployees({ ...employees, role: e.target.value })
                                 }
                              >
                                 <option>Ch???n vai tr??</option>
                                 {EmployeesRoleOpition?.map((item) => (
                                    <option value={item?.value}>{item?.label}</option>
                                 ))}
                              </select>
                           </div>
                        </div>
                     </div>

                     {!isEdit ? (
                        <div className="submit-section">
                           <button className="btn btn-primary submit-btn" onClick={handleSave}>
                              L??u
                           </button>
                        </div>
                     ) : (
                        <div className="submit-section">
                           <button className="btn btn-primary submit-btn" onClick={handleUpdate}>
                              C???p nh???t
                           </button>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </Modal>
         {/* /Add Employee Modal */}
      </>
   );
};

export default Addemployee;
