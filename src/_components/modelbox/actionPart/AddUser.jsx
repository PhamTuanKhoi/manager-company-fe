import React, { memo, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import assignTaskSclice from "../../../redux/feature/assignTaskSclice";
import {
   addUserToPart,
   checkNotAssignPart,
   removeUserInPart,
} from "../../../redux/feature/partSclice";
import { CloseOutlined } from "@ant-design/icons";
import { useMemo } from "react";

const AddUserToPart = ({ show, onHide, part, id, setLoading, user }) => {
   // ======================================== add user =====================================
   const dispatch = useDispatch();

   const { userNotAssignPart } = useSelector((state) => state.part);

   const handleAdd = (item) => {
      console.log("next");
      //custom data assign
      const dataAssign = part.taskEX?.map((val) => ({
         // _id fake
         userId: item?._id,
         name: item?.name,
         filed: item?.field,
         avartar: item?.avartar,
         taskId: val._id,
         taskName: val.name,
         perform: { status: false, date: Date.now() },
         finish: { status: false, date: Date.now() },
         partId: part._id,
         partName: part.name,
      }));

      if (user._id) {
         dispatch(
            addUserToPart({
               id: part._id,
               payload: { userId: item.userId, creator: user._id },
               toast,
               setLoading,
            })
         );

         // add data assign
         dispatch(assignTaskSclice.actions.addAssignTasks(dataAssign));
      }
   };
   // ======================================== add user ========================================
   // ======================================== remove user ========================================
   const handleRemoveUserInPart = (item) => {
      console.log("part, user");
      if (!part._id) return;
      if (!user._id) return;
      dispatch(removeUserInPart({ partId: part._id, userId: item._id, setLoading }));
   };
   // ======================================== remove user ========================================

   return (
      <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter">
         <div className="modal-content">
            <div className="modal-header">
               <h5 className="modal-title">Cập nhật người lao động vào bộ phận</h5>
               <button type="button" className="close-x">
                  <span aria-hidden="true" onClick={onHide}>
                     ×
                  </span>
               </button>
            </div>
            <Modal.Body>
               <ul className="nav nav-tabs nav-tabs-top nav-justified mb-0">
                  <li className="nav-item">
                     <a
                        className="nav-link active"
                        href="#adduser"
                        data-bs-toggle="tab"
                        aria-expanded="true"
                     >
                        Thêm người
                     </a>
                  </li>
                  <li className="nav-item">
                     <a
                        className="nav-link"
                        href="#removeuser"
                        data-bs-toggle="tab"
                        aria-expanded="false"
                     >
                        Xóa
                     </a>
                  </li>
               </ul>
               <div className="body-dialog">
                  <div className="tab-content">
                     <ul className="chat-user-list tab-pane show active" id="adduser">
                        {userNotAssignPart?.map((item) => (
                           <li key={item._id}>
                              <a href="#">
                                 <div className="media import-content">
                                    <div className="content-media">
                                       <span className="avatar">{/* <img alt="" src={} /> */}</span>
                                       <div className="media-body align-self-center text-nowrap">
                                          <div className="user-name">{item?.name}</div>
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
                     {/* remove user */}
                     <ul className="chat-user-list tab-pane" id="removeuser">
                        {part?.userEX?.map((item) => (
                           <li key={item?._id}>
                              <a href="#">
                                 <div className="media import-content">
                                    <div className="content-media">
                                       <span className="avatar">{/* <img alt="" src={} /> */}</span>
                                       <div className="media-body align-self-center text-nowrap">
                                          <div className="user-name">{item?.name}</div>
                                          <span className="designation">{item?.field}</span>
                                       </div>
                                    </div>
                                    <div
                                       className="remove-x"
                                       onClick={() => handleRemoveUserInPart(item)}
                                    >
                                       <CloseOutlined />
                                    </div>
                                 </div>
                              </a>
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
            </Modal.Body>
         </div>
      </Modal>
   );
};

export default memo(AddUserToPart);
