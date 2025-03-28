/**
 * Signin Firebase
 */

import React, { Component } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { emailrgx, logoFAKE } from "../constant/index.js";
import { useLoading } from "../hook/useLoading";
import { forgotPassword } from "../redux/feature/initSclice.js";

const ForgotPassword = () => {
   const [email, setEmail] = useState("");
   const { setLoading } = useLoading();
   const dispatch = useDispatch();
   const history = useHistory();

   const handleSend = () => {
      if (validatetion())
         dispatch(
            forgotPassword({
               payload: { email },
               setLoading,
               toast,
               redirect: () => history.push("/login"),
            })
         );
   };

   const validatetion = () => {
      if (!email) {
         toast.warn(`Vui lòng nhập email!`);
         return false;
      }

      if (email) {
         const isValidEmail = emailrgx.test(email);
         if (!isValidEmail) {
            toast.warn("Vui lòng nhập đúng email");
            return false;
         }
      }

      return true;
   };

   return (
      <>
         <Helmet>
            <title>Quên mật khẩu</title>
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
                     <h3 className="account-title">Quên mật khẩu?</h3>
                     <p className="account-subtitle">Nhập email nhận lại mật khẩu của bạn</p>

                     <div className="form-group">
                        <label>Địa chỉ email</label>
                        <input
                           className="form-control"
                           type="text"
                           onChange={(e) => setEmail(e.target.value)}
                        />
                     </div>
                     <div className="form-group text-center">
                        <button
                           className="btn btn-primary account-btn"
                           type="submit"
                           onClick={handleSend}
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

export default ForgotPassword;
