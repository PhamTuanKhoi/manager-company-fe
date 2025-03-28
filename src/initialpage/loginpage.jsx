/**
 * Signin Firebase
 */

import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Applogo } from "../Entryfile/imagepath.jsx";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { alphaNumericPattern, emailrgx, logoFAKE, UserRoleType } from "../constant";
import { authAPI } from "../api/auth.js";
import { jwtManager } from "../helpers/jwtManager.js";
import { login } from "../redux/feature/authSclice";
import { useDispatch } from "react-redux";
import { useLoading } from "../hook/useLoading";
import { toast } from "react-toastify";

const schema = yup.object({
   email: yup.string().required("Email is required").trim(),
   password: yup.string().required("Password is required").trim(),
   //  password: yup.string().min(6).max(6).required("Password is required").trim(),
});

const Loginpage = (props) => {
   const [eye, seteye] = useState(true);

   const {
      handleSubmit,
      control,
      clearErrors,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(schema),
   });

   const dispatch = useDispatch();
   const { setLoading } = useLoading();

   const onSubmit = async (payload) => {
      try {
         dispatch(
            login({
               payload: { password: payload.password, username: payload.email },
               toast,
               props,
               setLoading,
            })
         );
         // clearErrors("password");
      } catch (error) {
         console.log(error);
         if (typeof error?.response?.data?.message === "string") {
            toast.error(error?.response?.data?.message);
         } else {
            error?.response?.data?.message?.forEach((item) => {
               toast.error(item);
            });
         }
      }
   };

   const onEyeClick = () => {
      seteye(!eye);
   };
   return (
      <>
         <Helmet>
            <title>Đăng nhập</title>
            <meta name="description" content="Login page" />
         </Helmet>
         <div className="account-content">
            {/* <Link to="/applyjob/joblist" className="btn btn-primary apply-btn">
               Apply Job
            </Link> */}

            <div>
               <img
                  style={{ width: "100px", marginLeft: "50px" }}
                  src={logoFAKE}
                  alt="Dreamguy's Technologies"
               />
            </div>

            <div className="container">
               <div className="account-box">
                  <div className="account-wrapper">
                     <h3 className="account-title">Đăng nhập</h3>
                     <p className="account-subtitle"></p>

                     <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                           <div className="form-group">
                              <label>Nhập email hoặc số điện thoại:</label>
                              <Controller
                                 name="email"
                                 control={control}
                                 render={({ field: { value, onChange } }) => (
                                    <input
                                       className={`form-control  ${
                                          errors?.email ? "error-input" : ""
                                       }`}
                                       type="text"
                                       value={value}
                                       onChange={onChange}
                                       autoComplete="false"
                                    />
                                 )}
                                 defaultValue=""
                              />
                              <small>{errors?.email?.message}</small>
                           </div>
                           <div className="form-group">
                              <div className="row">
                                 <div className="col">
                                    <label>Nhập mật khẩu:</label>
                                 </div>
                                 <div className="col-auto">
                                    <Link className="text-muted" to="/forgotpassword">
                                       Quên mật khẩu?
                                    </Link>
                                 </div>
                              </div>
                              <Controller
                                 name="password"
                                 control={control}
                                 render={({ field: { value, onChange } }) => (
                                    <div className="pass-group">
                                       <input
                                          type={eye ? "password" : "text"}
                                          className={`form-control  ${
                                             errors?.password ? "error-input" : ""
                                          }`}
                                          value={value}
                                          onChange={onChange}
                                          autoComplete="false"
                                       />
                                       <span
                                          onClick={onEyeClick}
                                          className={`fa toggle-password" ${
                                             eye ? "fa-eye-slash" : "fa-eye"
                                          }`}
                                       />
                                    </div>
                                 )}
                                 defaultValue=""
                              />
                              <small>{errors?.password?.message}</small>
                           </div>
                           <div className="form-group text-center">
                              <button className="btn btn-primary account-btn" type="submit">
                                 Xác nhận
                              </button>
                           </div>
                        </form>
                        <div className="account-footer">
                           {/* <p>
                              Don't have an account yet? <Link to="/register">Register</Link>
                           </p> */}
                           <p>
                              Bạn là người lao động?{" "}
                              <Link to="/register-user">Đăng ký tài khoản</Link>
                           </p>
                        </div>
                     </div>
                     {/* /Account Form */}
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Loginpage;
