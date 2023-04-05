/**
 * Signin Firebase
 */

import React from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useLoading } from "../../../hook/useLoading";
import { changePassword } from "../../../redux/feature/initSclice";

const ChangePassword = () => {
   const [password, setPassword] = useState({
      oldPassword: "",
      password: "",
      confirmPassword: "",
   });

   const dispatch = useDispatch();
   const { setLoading } = useLoading();
   const { user } = useSelector((state) => state.auth);

   const handleSave = () => {
      if (validate()) {
         dispatch(changePassword({ id: user?._id, payload: password, setLoading, toast }));
      }
   };

   const validate = () => {
      if (!password.oldPassword) {
         toast.warn(`Làm ơn nhập mật khẩu cũ !`);
         return false;
      }

      if (!password.password) {
         toast.warn(`Làm ơn nhập mật khẩu mới !`);
         return false;
      }

      if (password.password.length < 4) {
         toast.warn(`Mật khẩu phải dài hơn 4 kis tự !`);
         return false;
      }

      if (!password.confirmPassword) {
         toast.warn(`Làm ơn nhập lại mật khẩu mới !`);
         return false;
      }

      if (password.password !== password.confirmPassword) {
         toast.warn(`Mật khẩu mới không chính xác !`);
         return false;
      }

      return true;
   };
   return (
      <div className="page-wrapper">
         <Helmet>
            <title>Đặt lại mật khẩu</title>
            <meta name="description" content="Login page" />
         </Helmet>
         <div className="content container-fluid">
            <div className="row">
               <div className="col-md-6 offset-md-3">
                  {/* Page Header */}
                  <div className="page-header">
                     <div className="row">
                        <div className="col-sm-12">
                           <h3 className="page-title">Đặt lại mật khẩu</h3>
                        </div>
                     </div>
                  </div>
                  {/* /Page Header */}
                  <div className="form-group">
                     <label>Mật khẩu cũ</label>
                     <input
                        type="password"
                        className="form-control"
                        value={password.oldPassword}
                        onChange={(e) => setPassword({ ...password, oldPassword: e.target.value })}
                     />
                  </div>
                  <div className="form-group">
                     <label>Mật khẩu mới</label>
                     <input
                        type="password"
                        className="form-control"
                        value={password.password}
                        onChange={(e) => setPassword({ ...password, password: e.target.value })}
                     />
                  </div>
                  <div className="form-group">
                     <label>Nhập lại mật khẩu mới</label>
                     <input
                        type="password"
                        className="form-control"
                        value={password.confirmPassword}
                        onChange={(e) =>
                           setPassword({ ...password, confirmPassword: e.target.value })
                        }
                     />
                  </div>
                  <div className="submit-section">
                     <button className="btn btn-primary submit-btn" onClick={handleSave}>
                        Lưu thay đổi
                     </button>
                  </div>
               </div>
            </div>
         </div>
         {/* /Page Content */}
      </div>
   );
};

export default ChangePassword;
