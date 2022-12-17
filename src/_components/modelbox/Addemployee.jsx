import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { EmployeeDepartmentType } from "../../constant/index";
import { createEmployees } from "../../redux/feature/employeesSclice";
import { toast } from "react-toastify";
import { useWeb3 } from "../../context/useUser";

const Addemployee = ({ show, onHide }) => {
   const [employees, setEmployees] = useState({
      name: "",
      email: "",
      cccd: 0,
      department: "",
      mobile: "",
      date: "",
      address: "",
   });

   const dispatch = useDispatch();
   const { user } = useWeb3();

   async function handleSave() {
      if (user._id) {
         dispatch(
            createEmployees({
               payload: {
                  ...employees,
                  date: new Date(employees.date).getTime(),
                  creator: user._id,
               },
               toast,
               onHide,
            })
         );
      }
   }

   return (
      <>
         {/* Add Employee Modal */}
         <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show}
            onHide={onHide}
            className="modal custom-modal fade"
            role="dialog"
         >
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title">Add Employee</h5>
                     <button type="button" className="close" onClick={onHide}>
                        <span aria-hidden="true">×</span>
                     </button>
                  </div>
                  <div className="modal-body">
                     <form>
                        <div className="row">
                           <div className="col-sm-6">
                              <div className="form-group">
                                 <label className="col-form-label">
                                    Họ và tên <span className="text-danger">*</span>
                                 </label>
                                 <input
                                    className="form-control"
                                    type="text"
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
                                    onChange={(e) =>
                                       setEmployees({ ...employees, email: e.target.value })
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
                                    onChange={(e) =>
                                       setEmployees({ ...employees, cccd: e.target.value })
                                    }
                                 />
                              </div>
                           </div>

                           <div className="col-md-6">
                              <div className="form-group">
                                 <label className="col-form-label">
                                    Vị trí <span className="text-danger">*</span>
                                 </label>{" "}
                                 <br />
                                 <select
                                    className="form-control"
                                    // className="select"   class tam linh
                                    onChange={(e) =>
                                       setEmployees({ ...employees, department: e.target.value })
                                    }
                                 >
                                    <option>Chọn vị trí</option>
                                    <option value={EmployeeDepartmentType.ACCOUNTANT}>
                                       Kế toán
                                    </option>
                                    <option value={EmployeeDepartmentType.BUSSINESS}>
                                       Kinh doanh
                                    </option>
                                    <option value={EmployeeDepartmentType.MARKETING}>
                                       Marketing
                                    </option>
                                    <option value={EmployeeDepartmentType.RECRUIT}>
                                       Tuyển dụng
                                    </option>
                                 </select>
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
                                       setEmployees({ ...employees, mobile: e.target.value })
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
                                    onChange={(e) =>
                                       setEmployees({ ...employees, date: e.target.value })
                                    }
                                 />
                              </div>
                           </div>
                           <div className="col-sm-6">
                              <div className="form-group">
                                 <label className="col-form-label">
                                    Địa chỉ <span className="text-danger">*</span>
                                 </label>
                                 <input
                                    type="text"
                                    className="form-control"
                                    onChange={(e) =>
                                       setEmployees({ ...employees, address: e.target.value })
                                    }
                                 />
                              </div>
                           </div>
                        </div>

                        <div className="submit-section">
                           <button className="btn btn-primary submit-btn" onClick={handleSave}>
                              Lưu
                           </button>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </Modal>
         {/* /Add Employee Modal */}
      </>
   );
};

export default Addemployee;
