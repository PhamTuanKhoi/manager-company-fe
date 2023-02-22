import React from "react";
import { Modal } from "react-bootstrap";
import { WifiOutlined } from "@ant-design/icons";
import { Checkbox, Switch } from "antd";
import { useDispatch } from "react-redux";
import { useLoading } from "../../hook/useLoading";
import { useEffect } from "react";
import attendanceSclice, { fetchWiffi } from "../../redux/feature/attendanceSclice";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

function AddWiffi({ show, onHide }) {
   const [position, setPosition] = useState(-1);
   const [text, setText] = useState("");
   const dispatch = useDispatch();
   const { setLoading, loading } = useLoading();

   const handleOpenWiffi = (e) => {
      if (e) {
         dispatch(fetchWiffi({ setLoading }));
         return;
      }

      dispatch(attendanceSclice.actions.learWiffi());
   };

   const onChange = (i, name) => {
      setPosition(i);
      setText(name);
   };

   const { wiffi } = useSelector((state) => state.attendance);

   return (
      <Modal show={show} onHide={onHide}>
         <div className="modal-header">
            <h5 className="modal-title">Cập nhật wiffi chấm công</h5>
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
                     href="#choose"
                     data-bs-toggle="tab"
                     aria-expanded="true"
                  >
                     Chọn wiffi
                  </a>
               </li>
               <li className="nav-item">
                  <a className="nav-link" href="#update" data-bs-toggle="tab" aria-expanded="false">
                     Cập nhật
                  </a>
               </li>
            </ul>
            <div className="body-dialog">
               <div className="tab-content">
                  {/* update wiffi */}
                  <div className="tab-pane show" id="update">
                     <span>Wiffi đã chọn</span>
                     <div className="input-group m-b-30">
                        <input
                           className="form-control search-input"
                           value={text}
                           type="text"
                           disabled
                        />
                     </div>
                     <span>Mật khẩu</span>
                     <div className="input-group m-b-30">
                        <input
                           placeholder="Nhập mật khẩu wiffi"
                           className="form-control search-input"
                           type="password"
                        />
                     </div>
                     <div className="button-dialog">
                        <button className="primary">Lưu</button>
                     </div>
                  </div>
                  {/* choose wiffi */}
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
                                 <Checkbox
                                    checked={position === index ? true : false}
                                    onChange={() => onChange(index, item?.ssid)}
                                 />
                              </div>
                           </a>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         </Modal.Body>
      </Modal>
   );
}

export default AddWiffi;
