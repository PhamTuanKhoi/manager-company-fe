import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoading } from "../../hook/useLoading";
import {
   checkNotAssignPart,
   createPart,
   listPartByIdProject,
   precentPartByIdProject,
} from "../../redux/feature/partSclice";
import AddUserToPart from "../modelbox/actionPart/AddUser";

function Part() {
   const [create, setCreate] = useState(false);
   const [text, setText] = useState("");
   const [part, setPart] = useState({});
   const [modalShow, setModalShow] = useState(false);
   const { id } = useParams();
   const { setLoading } = useLoading();
   const dispatch = useDispatch();

   const { user } = useSelector((state) => state.auth);
   // ======================================== create updated part ===============================
   const handleSave = () => {
      if (!text) return;

      if (!user._id) {
         toast.warn("Làm ơn đăng nhập vào hệ thống");
         return;
      }

      dispatch(
         createPart({
            payload: { project: id, name: text, creator: user._id },
            toast,
            setLoading,
         })
      );
      setText("");
   };

   useEffect(() => {
      dispatch(listPartByIdProject({ id, setLoading }));
   }, [id]);

   const { parts } = useSelector((state) => state.part);
   // ======================================== create part ===============================

   // ======================================== modal =====================================
   const handleListUser = (item) => {
      setPart(item);
      setModalShow(true);
   };

   useEffect(() => {
      dispatch(checkNotAssignPart({ query: { project: id }, setLoading }));
   }, [id]);
   // ========================================= modal =======================================

   // ========================================= precent =====================================
   useEffect(() => {
      dispatch(precentPartByIdProject({ query: { project: id }, setLoading }));
   }, [id]);

   const { precentPart } = useSelector((state) => state.part);
   // ========================================= precent =====================================

   return (
      <>
         <div className="card">
            <div className="card-body">
               <div className="part-header">
                  <div className="card-title m-b-20">Bộ phận</div>
                  {create ? (
                     <div className="from-part">
                        <span
                           className="text-danger close-create-part"
                           onClick={() => setCreate(!create)}
                        >
                           x
                        </span>
                        <input
                           type="text"
                           className="input-custom"
                           placeholder="Nhập tên..."
                           value={text}
                           onChange={(e) => setText(e.target.value)}
                        />
                        <button className="btn btn-primary" onClick={handleSave}>
                           Lưu
                        </button>
                     </div>
                  ) : (
                     <div onClick={() => setCreate(!create)}>
                        <a href="#" className="btn btn-white float-end ml-2 ">
                           <i className="fa fa-plus" /> Thêm bộ phận
                        </a>
                     </div>
                  )}
               </div>
               <div className="row">
                  {parts?.map((item) => (
                     <div key={item?._id} className="col-md-12 col-lg-6 col-xl-6 d-flex">
                        <div className="card flex-fill">
                           <div className="card-body">
                              <div className="part-header">
                                 <h4 className="card-title">{item?.name}</h4>
                                 <div className="dropdown kanban-action">
                                    <a href="" data-bs-toggle="dropdown">
                                       <i className="fa fa-ellipsis-v" />
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right">
                                       <a
                                          className="dropdown-item"
                                          href="#"
                                          onClick={() => handleListUser(item)}
                                       >
                                          Chỉnh sửa
                                       </a>
                                       <a className="dropdown-item" href="#">
                                          Xóa
                                       </a>
                                    </div>
                                 </div>
                              </div>
                              <div className="statistics">
                                 <div className="row">
                                    <div className="col-md-6 col-6 text-center">
                                       <div className="stats-box mb-4">
                                          <p>Tổng công việc</p>
                                          <h3>{item?.tasks?.length}</h3>
                                       </div>
                                    </div>
                                    <div className="col-md-6 col-6 text-center">
                                       <div className="stats-box mb-4">
                                          <p>Tổng thành viên</p>
                                          <h3>{item?.workers?.length}</h3>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              {precentPart?.map(
                                 (precent) =>
                                    precent?._id === item._id && (
                                       <div key={precent?._id}>
                                          <div className="progress mb-4">
                                             <div
                                                className="progress-bar bg-warning"
                                                role="progressbar"
                                                style={{ width: `${precent?.precentPerform}%` }}
                                                aria-valuenow={30}
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                             >
                                                {precent?.precentPerform || 0}%
                                             </div>
                                          </div>
                                          <div className="progress mb-4">
                                             <div
                                                className="progress-bar bg-success"
                                                role="progressbar"
                                                style={{ width: `${precent.precentFinish}%` }}
                                                aria-valuenow={30}
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                             >
                                                {precent?.precentFinish || 0}%
                                             </div>
                                          </div>
                                          <div>
                                             <p>
                                                <i className="fa fa-dot-circle-o text-warning me-2" />
                                                Thực hiện{" "}
                                                <span className="float-end">
                                                   {precent?.performTrue}
                                                </span>
                                             </p>

                                             <p>
                                                <i className="fa fa-dot-circle-o text-success me-2" />
                                                Hoàn thành{" "}
                                                <span className="float-end">
                                                   {precent?.finishTrue}
                                                </span>
                                             </p>
                                          </div>
                                       </div>
                                    )
                              )}
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         <AddUserToPart
            show={modalShow}
            onHide={() => setModalShow(false)}
            part={part}
            id={id}
            setLoading={setLoading}
            user={user}
         />
      </>
   );
}

export default Part;
