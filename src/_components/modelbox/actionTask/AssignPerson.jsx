import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoading } from "../../../hook/useLoading";

import { checkNotAssignTask, createAssignTask } from "../../../redux/feature/assignTaskSclice";
function AssignPerson({ show, onHide, task, load }) {
   const dispatch = useDispatch();
   const { setLoading } = useLoading();
   const { user } = useSelector((state) => state.auth);
   const { id } = useParams();

   function handleAdd(user, task) {
      if (!user._id) toast.warn(`Vui lòng đăng nhập vào hệ thống`);

      dispatch(
         createAssignTask({
            payload: { worker: user._id, task: task._id, creator: user._id },
            assignTask: {
               userId: user._id,
               name: user.name,
               filed: user.field,
               avartar: user.avartar,
               taskId: task._id,
               taskName: task.name,
            },
            toast,
            setLoading,
         })
      );
   }

   // get user not assign task
   useEffect(() => {
      if (task._id) {
         dispatch(checkNotAssignTask({ query: { project: id, task: task._id }, setLoading }));
      }
   }, [id, task._id, load]);

   const { notAssignTask } = useSelector((state) => state.assignTask);

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
                  <h5 className="modal-title">Giao việc {task.name}</h5>
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
                        {notAssignTask?.map((item, index) => (
                           <li key={index}>
                              <a href="#">
                                 <div className="media import-content">
                                    <div className="content-media">
                                       <span className="avatar">
                                          {/* <img alt="" src={Avatar_09} /> */}
                                       </span>
                                       <div className="media-body align-self-center text-nowrap">
                                          <div className="user-name">{item?.name}</div>
                                          {/* <span className="designation">{item?.department}</span> */}
                                       </div>
                                    </div>
                                    <div className="import" onClick={() => handleAdd(item, task)}>
                                       Thêm
                                    </div>
                                 </div>
                              </a>
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </Modal>
   );
}

export default AssignPerson;
