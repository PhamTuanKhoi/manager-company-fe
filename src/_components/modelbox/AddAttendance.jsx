import React from "react";
import { Modal } from "react-bootstrap";
import { WifiOutlined } from "@ant-design/icons";
import { Checkbox, Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";
import attendanceSclice, { fetchWiffi } from "../../redux/feature/attendanceSclice";
import { useLoading } from "../../hook/useLoading";

const AddAttendance = ({ show, onHide }) => {
   const dispatch = useDispatch();
   const { setLoading } = useLoading();

   const handleOpenWiffi = (e) => {
      console.log(e);
      if (e) dispatch(fetchWiffi({ setLoading }));

      dispatch(attendanceSclice.actions.learWiffi());
   };

   const { wiffi } = useSelector((state) => state.attendance);

   return (
      <Modal show={show} onHide={onHide}>
         <div className="modal-header">
            <h5 className="modal-title">Wiffi chấm công</h5>
            <button type="button" className="close-x">
               <span aria-hidden="true" onClick={onHide}>
                  ×
               </span>
            </button>
         </div>
         <Modal.Body style={{ height: "520px" }}>
            <ul className="chat-user-list tab-pane show active overflow" id="choose">
               <div className="media import-content">
                  <div className="content-media">
                     <div className="media-body align-self-center text-nowrap">
                        <div className="user-name">
                           <WifiOutlined />
                        </div>
                     </div>
                  </div>
                  <Switch onChange={handleOpenWiffi} />
               </div>
               {wiffi?.map((item, index) => (
                  <li key={index}>
                     <a href="#">
                        <div className="media import-content">
                           <div className="content-media">
                              <div className="media-body align-self-center text-nowrap">
                                 <div className="user-name">{item?.ssid}</div>
                              </div>
                           </div>
                           <Checkbox />
                        </div>
                     </a>
                  </li>
               ))}
            </ul>
         </Modal.Body>
      </Modal>
   );
};

export default AddAttendance;
