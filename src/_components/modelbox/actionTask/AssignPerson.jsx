import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLoading } from "../../../hook/useLoading";

import {
   createAssignTask,
   listAssignByTask,
   listAssignTask,
} from "../../../redux/feature/assignTaskSclice";
function AssignPerson({ show, onHide, task, load }) {
   const dispatch = useDispatch();
   const { setLoading } = useLoading();
   const { user } = useSelector((state) => state.auth);
   const { assignTasks } = useSelector((state) => state.assignTask);
   const { assignTaskByTask } = useSelector((state) => state.assignTask);

   // console.log(assignTasks);

   useEffect(() => {
      dispatch(listAssignByTask({ id: task._id, setLoading }));
   }, [load]);

   // console.log(load);

   function handleAdd(worker, task) {
      // console.log(worker.worker, task, { creator: user._id });

      if (!user._id) toast.warn(`Vui lòng đăng nhập vào hệ thống`);

      dispatch(
         createAssignTask({
            payload: { worker: worker.worker, task: task._id, creator: user._id },
            toast,
            setLoading,
         })
      );
   }

   const { listWPByProject } = useSelector((state) => state.workerProject);

   // console.log(listWPByProject);
   // console.log(task);
   // console.log(assignTaskByTask, "okay");

   return (
      <Modal
         show={show}
         onHide={onHide}
         onClick={(e) => e.stopPropagation()}
         className="modal custom-modal fade"
         role="dialog"
      >
         <div ole="document">
            <div className="modal-content">
               <div className="modal-header">
                  <h5 className="modal-title">Giao công việc</h5>
                  <button type="button" className="close-x">
                     <span
                        aria-hidden="true"
                        onClick={(e) => {
                           onHide();
                           e.stopPropagation();
                        }}
                     >
                        ×
                     </span>
                  </button>
               </div>
               <div className="modal-body">
                  <div className="input-group m-b-30">
                     <input
                        placeholder="Search a user to assign"
                        className="form-control search-input"
                        type="text"
                     />
                  </div>
                  <div className="body-dialog">
                     <ul className="chat-user-list">
                        {listWPByProject?.map((item, index) => {
                           // console.log(item?.user?._id, "user");
                           // console.log(ele.worker, "worker");

                           // console.log("next", item);
                           return (
                              <li key={index}>
                                 <a href="#">
                                    <div className="media import-content">
                                       <div className="content-media">
                                          <span className="avatar">
                                             {/* <img alt="" src={Avatar_09} /> */}
                                          </span>
                                          <div className="media-body align-self-center text-nowrap">
                                             <div className="user-name">{item?.user?.name}</div>
                                             {/* <span className="designation">{item?.department}</span> */}
                                          </div>
                                       </div>
                                       <div
                                          className="import"
                                          onClick={() => handleAdd(item, task)}
                                       >
                                          Thêm
                                       </div>
                                    </div>
                                 </a>
                              </li>
                           );
                        })}
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </Modal>
   );
}

export default AssignPerson;
