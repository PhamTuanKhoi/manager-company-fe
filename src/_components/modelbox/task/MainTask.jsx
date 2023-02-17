import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

const MainTask = () => {
   const [showPart, setShowPart] = useState(false);

   const handleClosePart = () => setShowPart(false);
   const handleShowPart = () => setShowPart(true);

   const [showTask, setShowTask] = useState(false);

   const handleCloseTask = () => setShowTask(false);
   const handleShowTask = () => setShowTask(true);

   return (
      <>
         <li className="task">
            <div className="task-container">
               <span className="task-action-btn task-check">
                  <span
                     className="action-circle large complete-btn"
                     title="Mark Complete bg-warning"
                  >
                     <i className="material-icons">check</i>
                  </span>
               </span>
               <span
                  className="task-label"
                  // contentEditable="true"
                  suppressContentEditableWarning={true}
               >
                  Patient appointment booking
               </span>
               <span className="task-action-btn task-btn-right">
                  <span className="action-circle large" title="Assign" onClick={handleShowTask}>
                     <i className="material-icons">playlist_add</i>
                  </span>
                  <span className="action-circle large" title="Assign" onClick={handleShowPart}>
                     <i className="material-icons">group_add</i>
                  </span>
                  <span className="action-circle large delete-btn" title="Delete Task">
                     <i className="material-icons">delete</i>
                  </span>
               </span>
            </div>
         </li>

         {/* ============================== modal add part ============================== */}
         <Modal show={showPart} onHide={handleClosePart}>
            <div className="modal-header">
               <h5 className="modal-title">Thêm bộ phận</h5>
               <button type="button" className="close-x">
                  <span aria-hidden="true" onClick={handleClosePart}>
                     ×
                  </span>
               </button>
            </div>
            <Modal.Body>
               <ul className="chat-user-list tab-pane" id="part">
                  <li>
                     <a href="#">
                        <div className="media import-content">
                           <div className="content-media">
                              <span className="avatar">{/* <img alt="" src={Avatar_09} /> */}</span>
                              <div className="media-body align-self-center text-nowrap">
                                 <div className="user-name">ssd</div>
                                 {/* <span className="designation">{item?.department}</span> */}
                              </div>
                           </div>
                           <div className="import">Thêm</div>
                        </div>
                     </a>
                  </li>
               </ul>
            </Modal.Body>
         </Modal>
         {/* ============================== modal add part ============================== */}
         {/* ============================== modal add child task ============================== */}
         <Modal show={showTask} onHide={handleCloseTask}>
            <div className="modal-header">
               <h5 className="modal-title">Thêm công việc</h5>
               <button type="button" className="close-x">
                  <span aria-hidden="true" onClick={handleCloseTask}>
                     ×
                  </span>
               </button>
            </div>
            <Modal.Body>
               <span>Tiêu đề</span>
               <div className="input-group m-b-30">
                  <input
                     placeholder="Nhập tên công việc"
                     className="form-control search-input"
                     type="text"
                  />
               </div>
               <span>Mô tả</span>
               <div className="input-group m-b-30">
                  <TextArea
                     className="form-control search-input"
                     rows={4}
                     placeholder="Mô tả công việc"
                  />
               </div>
               <div className="button-dialog">
                  <button className="primary">Lưu</button>
               </div>
            </Modal.Body>
         </Modal>
         {/* ============================== modal add child task ============================== */}
      </>
   );
};

export default MainTask;
