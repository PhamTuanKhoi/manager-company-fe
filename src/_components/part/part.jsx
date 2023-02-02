import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoading } from "../../hook/useLoading";
import { createPart } from "../../redux/feature/partSclice";

const Part = () => {
   const [create, setCreate] = useState(false);
   const [text, setText] = useState("");
   const { id } = useParams();
   const { setLoading } = useLoading();
   const dispatch = useDispatch();

   const { user } = useSelector((state) => state.auth);

   const handleSave = () => {
      if (!text) return;

      if (!user._id) {
         toast.warn("Làm ơn đăng nhập vào hệ thống");
         return;
      }

      dispatch(
         createPart({ payload: { project: id, name: text, creator: user._id }, toast, setLoading })
      );
   };
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
               <div class="row">
                  <div className="col-md-12 col-lg-6 col-xl-6 d-flex">
                     <div className="card flex-fill">
                        <div className="card-body">
                           <div className="part-header">
                              <h4 className="card-title">Task Statistics</h4>
                              <div className="dropdown kanban-action">
                                 <a href="" data-bs-toggle="dropdown">
                                    <i className="fa fa-ellipsis-v" />
                                 </a>
                                 <div className="dropdown-menu dropdown-menu-right">
                                    <a
                                       className="dropdown-item"
                                       href="#"
                                       data-bs-toggle="modal"
                                       data-bs-target="#edit_task_board"
                                    >
                                       Edit
                                    </a>
                                    <a className="dropdown-item" href="#">
                                       Delete
                                    </a>
                                 </div>
                              </div>
                           </div>
                           <div className="statistics">
                              <div className="row">
                                 <div className="col-md-6 col-6 text-center">
                                    <div className="stats-box mb-4">
                                       <p>Total Tasks</p>
                                       <h3>385</h3>
                                    </div>
                                 </div>
                                 <div className="col-md-6 col-6 text-center">
                                    <div className="stats-box mb-4">
                                       <p>Overdue Tasks</p>
                                       <h3>19</h3>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="progress mb-4">
                              <div
                                 className="progress-bar bg-purple"
                                 role="progressbar"
                                 style={{ width: "80%" }}
                                 aria-valuenow={30}
                                 aria-valuemin={0}
                                 aria-valuemax={100}
                              >
                                 80%
                              </div>
                           </div>
                           <div className="progress mb-4">
                              <div
                                 className="progress-bar bg-success"
                                 role="progressbar"
                                 style={{ width: "30%" }}
                                 aria-valuenow={30}
                                 aria-valuemin={0}
                                 aria-valuemax={100}
                              >
                                 30%
                              </div>
                           </div>
                           <div>
                              <p>
                                 <i className="fa fa-dot-circle-o text-purple me-2" />
                                 Completed Tasks <span className="float-end">166</span>
                              </p>

                              <p>
                                 <i className="fa fa-dot-circle-o text-danger me-2" />
                                 Pending Tasks <span className="float-end">47</span>
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* modal */}
         {/* <div id="add_task_board" className="modal custom-modal fade" role="dialog">
            <div className="modal-dialog modal-dialog-centered">
               <div className="modal-content">
                  <div className="modal-header">
                     <h4 className="modal-title">Thêm bộ phận</h4>

                     <button type="button" className="close-x" data-bs-dismiss="modal">
                        <span aria-hidden="true">×</span>
                     </button>
                  </div>
                  <div className="modal-body">
                     <form>
                        <div className="form-group">
                           <label>Tên bộ phận</label>
                           <input type="text" className="form-control" />
                        </div>
                        <div className="form-group task-board-color">
                           <label>Màu nền</label>
                           <div className="board-color-list">
                              <label className="board-control board-primary">
                                 <input
                                    name="radio"
                                    type="radio"
                                    className="board-control-input"
                                    defaultValue="primary"
                                    defaultChecked
                                 />
                                 <span className="board-indicator" />
                              </label>
                              <label className="board-control board-success">
                                 <input
                                    name="radio"
                                    type="radio"
                                    className="board-control-input"
                                    defaultValue="success"
                                 />
                                 <span className="board-indicator" />
                              </label>
                              <label className="board-control board-info">
                                 <input
                                    name="radio"
                                    type="radio"
                                    className="board-control-input"
                                    defaultValue="info"
                                 />
                                 <span className="board-indicator" />
                              </label>
                              <label className="board-control board-purple">
                                 <input
                                    name="radio"
                                    type="radio"
                                    className="board-control-input"
                                    defaultValue="purple"
                                 />
                                 <span className="board-indicator" />
                              </label>
                              <label className="board-control board-warning">
                                 <input
                                    name="radio"
                                    type="radio"
                                    className="board-control-input"
                                    defaultValue="warning"
                                 />
                                 <span className="board-indicator" />
                              </label>
                              <label className="board-control board-danger">
                                 <input
                                    name="radio"
                                    type="radio"
                                    className="board-control-input"
                                    defaultValue="danger"
                                 />
                                 <span className="board-indicator" />
                              </label>
                           </div>
                        </div>
                        <div className="m-t-20 text-center">
                           <button className="btn btn-primary btn-lg">Submit</button>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div> */}
      </>
   );
};

export default Part;
