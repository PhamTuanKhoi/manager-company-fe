import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { createWorkerProject } from "../../../redux/feature/workerProjectSclice";
import { useLoading } from "../../../hook/useLoading";

import { listWorker } from "../../../redux/feature/workerSclice";
function AssignPerson({ show, onHide }) {
   const { workers } = useSelector((state) => state.worker);
   const dispatch = useDispatch();
   const { id } = useParams();
   const { setLoading } = useLoading();
   const [isExitArray, setIsExitArray] = useState([]);

   function handleAdd(worker) {
      dispatch(
         createWorkerProject({
            payload: { worker: worker._id, project: id },
            toast,
            onHide,
            setLoading,
            worker,
         })
      );
   }

   const { listWPByProject } = useSelector((state) => state.workerProject);

   console.log(listWPByProject);

   useEffect(() => {
      exit();
      fetchWorker();
   }, [listWPByProject]);

   function exit() {
      let arrWorkerId = listWPByProject.map((item) => item.worker);
      setIsExitArray(arrWorkerId);
   }

   function fetchWorker() {
      dispatch(listWorker({ setLoading }));
   }

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
                  <h5 className="modal-title">Thêm người lao dộng</h5>
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
                        {listWPByProject?.map((item, index) => (
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
                                    <div className="import" onClick={() => handleAdd(item)}>
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
