import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Applogo } from "../Entryfile/imagepath";
const RegisterUser = ({ show, onHide }) => {
   const [register, setRegister] = useState({
      name: "",
      email: "",
      cccd: 0,
      mobile: "",
      date: "",
      field: "",
      password: "",
      confirmPasword: "",
   });

   function handleSave() {
      console.log(register);
   }

   return (
      <>
         <Helmet>
            <title>Register - HRMS Admin Template</title>
            <meta name="description" content="Login page" />
         </Helmet>
         <div className="account-content">
            <Link to="/applyjob/joblist" className="btn btn-primary apply-btn">
               Apply Job
            </Link>

            <Link to="/app/main/dashboard">
               <img
                  style={{ width: "100px", marginLeft: "50px" }}
                  src="https://fce.com.vn/wp-content/uploads/2022/08/logo_fce_trong_suot-1024x614.png"
                  alt="Dreamguy's Technologies"
               />
            </Link>

            <div className="container">
               {/* Account Logo */}
               {/* /Account Logo */}
               <div className="account-box-12">
                  <div className="account-wrapper">
                     <h3 className="account-title">Đăng ký tài khoản</h3>
                     <p className="account-subtitle"></p>
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
                                    setRegister({ ...register, name: e.target.value })
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
                                    setRegister({ ...register, email: e.target.value })
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
                                    setRegister({ ...register, cccd: e.target.value })
                                 }
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
                                    setRegister({ ...register, mobile: e.target.value })
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
                                    setRegister({ ...register, date: e.target.value })
                                 }
                              />
                           </div>
                        </div>

                        <div className="col-sm-6">
                           <div className="form-group">
                              <label className="col-form-label">
                                 Lĩnh vực/ ngành nghề chuyên môn{" "}
                                 <span className="text-danger">*</span>
                              </label>
                              <input
                                 className="form-control"
                                 type="text"
                                 onChange={(e) =>
                                    setRegister({ ...register, field: e.target.value })
                                 }
                              />
                           </div>
                        </div>

                        <div className="col-sm-6">
                           <div className="form-group">
                              <label className="col-form-label">
                                 Mật khẩu <span className="text-danger">*</span>
                              </label>
                              <input
                                 className="form-control"
                                 type="password"
                                 onChange={(e) =>
                                    setRegister({ ...register, password: e.target.value })
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
                                    setRegister({ ...register, confirmPasword: e.target.value })
                                 }
                              />
                           </div>
                        </div>
                     </div>
                     <div className="submit-section">
                        <button className="btn btn-primary submit-btn" onClick={handleSave}>
                           Đăng ký
                        </button>
                     </div>
                     <div className="account-footer">
                        <p>
                           Already have an account? <Link to="/login">Login</Link>
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default RegisterUser;
