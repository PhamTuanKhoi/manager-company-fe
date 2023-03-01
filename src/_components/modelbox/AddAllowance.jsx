import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

const AddAllowance = ({ show, handleClose }) => {
   const handleClosed = () => {
      handleClose();
   };

   const [salary, setSalary] = useState({
      beneficiary: "",
      salary: 0,
      go: "",
      home: "",
      toxic: "",
      diligence: "",
      eat: "",
   });

   console.log(salary);
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
               <h5 className="modal-title">{"Khách hàng mới"}</h5>
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
                              Lương <span className="text-danger">*</span>
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
                           <label className="col-form-label">Đi lại</label>
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
                           <label className="col-form-label">Nhà ở</label>
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
                           <label className="col-form-label">Nặng nhọc/ độc hại</label>
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
                           <label className="col-form-label">Ăn uống</label>
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
                           <label className="col-form-label">Chuyên cần</label>
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
                           <select className="form-control">
                              <option>Chọn dự án</option>
                              <option>s</option>
                           </select>
                        </div>
                     </div>
                  </div>
                  <div className="submit-section">
                     <button className="btn btn-primary submit-btn">Lưu</button>
                  </div>
               </div>
            </div>
         </div>
      </Modal>
   );
};

export default AddAllowance;
