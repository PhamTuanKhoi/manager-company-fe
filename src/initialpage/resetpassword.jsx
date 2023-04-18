/**
 * Signin Firebase
 */

import React, { Component, useMemo } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { logoFAKE } from "../constant/index.js";
import { useLoading } from "../hook/useLoading";
import { forgotPassword, resetPassword } from "../redux/feature/initSclice.js";

const ResetPassword = () => {
   const [payload, setPayload] = useState({
      password: "",
      confirmPassword: "",
   });

   const { search } = useLocation();
   const query = useMemo(() => new URLSearchParams(search), [search]);
   const token = query.get("e");

   const { setLoading } = useLoading();
   const dispatch = useDispatch();
   const history = useHistory();

   const handleSave = () => {
      if (validatetion())
         dispatch(
            resetPassword({
               payload: { ...payload, token },
               setLoading,
               toast,
               redirect: () => history.push("/login"),
            })
         );
   };

   const validatetion = () => {
      if (!payload.password) {
         toast.warn("Vui lòng nhập mật khẩu");
         return false;
      }

      if (!payload.confirmPassword) {
         toast.warn("Vui lòng nhập lại mật khẩu");
         return false;
      }

      if (payload.password) {
         if (payload.password !== payload.confirmPassword) {
            toast.warn("Mật khẩu không chính xác");
            return false;
         }
      }

      return true;
   };

   return (
      <>
         <Helmet>
            <title>Đặt lại mật khẩu</title>
            <meta name="description" content="Login page" />
         </Helmet>
         <div className="account-content">
            {/* <Link to="/applyjob/joblist" className="btn btn-primary apply-btn">
                Apply Job
              </Link> */}
            <div className="container">
               {/* Account Logo */}
               <div className="account-logo">
                  <Link to="/app/main/dashboard">
                     <img src={logoFAKE} alt="Dreamguy's Technologies" />
                  </Link>
               </div>
               {/* /Account Logo */}
               <div className="account-box">
                  <div className="account-wrapper">
                     <h3 className="account-title">Đặt lại mật khẩu</h3> <br />
                     <div className="form-group">
                        <label>Nhập mật khẩu</label>
                        <input
                           className="form-control"
                           type="password"
                           onChange={(e) => setPayload({ ...payload, password: e.target.value })}
                        />
                     </div>
                     <div className="form-group">
                        <label>Nhập lại mật khẩu</label>
                        <input
                           className="form-control"
                           type="password"
                           onChange={(e) =>
                              setPayload({ ...payload, confirmPassword: e.target.value })
                           }
                        />
                     </div>
                     <div className="form-group text-center">
                        <button
                           className="btn btn-primary account-btn"
                           type="submit"
                           onClick={handleSave}
                        >
                           Xác nhận
                        </button>
                     </div>
                     <div className="account-footer">
                        <p>
                           Tôi đã nhớ mật khẩu? <Link to="/login">Đăng nhập</Link>
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default ResetPassword;
