import React, { memo } from "react";
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
import moment from "moment";
import { createRules, findRulesByIdProject } from "../../redux/feature/rulesSclice";
import { toast } from "react-toastify";
import { useMemo } from "react";

function AddWiffi({ show, onHide }) {
   const [position, setPosition] = useState(-1);
   const [rules, setReules] = useState({
      password: "",
      timeIn: "",
      timeOut: "",
   });
   const [text, setText] = useState("");
   const dispatch = useDispatch();
   const { setLoading } = useLoading();
   const { id } = useParams();

   // ----------------------- fetch wiffi -----------------------
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
   // ----------------------- fetch wiffi -----------------------

   // ----------------------- fetch rules -----------------------
   useEffect(() => {
      dispatch(findRulesByIdProject({ id, setLoading }));
   }, [id]);

   const { rule } = useSelector((state) => state.rules);

   useEffect(() => {
      setText(rule?.wiffi);
      setReules(rule);
   }, [rule]);
   // ----------------------- fetch rules -----------------------

   // ----------------------- create rules -----------------------
   const handleChangeTimeIn = (e) => {
      setReules({
         ...rules,
         timeIn: e.target.value.slice(0, 2) * 3600 + e.target.value.slice(3, 5) * 60,
      });
   };

   const handleChangeTimeOut = (e) => {
      setReules({
         ...rules,
         timeOut: e.target.value.slice(0, 2) * 3600 + e.target.value.slice(3, 5) * 60,
      });
   };

   const handleSave = () => {
      // let h = Math.floor(da / 3600);
      // console.log(Math.floor((da - h * 3600) / 60));
      dispatch(
         createRules({
            payload: { ...rules, wiffi: text, project: id },
            onHide,
            setLoading,
            toast,
         })
      );
   };
   // ----------------------- create rules -----------------------

   const [hourIn, setHourIn] = useState(0);
   const [minuteIn, setMinuteIn] = useState(0);

   // ----------------------- calculation time in -----------------------
   useMemo(() => {
      // calculation
      const hrIn = Math.floor(+rules.timeIn / 3600);
      const minuIn = Math.floor((+rules.timeIn - hrIn * 3600) / 60);

      // set state
      setHourIn(hrIn);
      setMinuteIn(minuIn);
   }, [rules.timeIn]);

   const [hourOut, setHourOut] = useState(0);
   const [minuteOut, setMinuteOut] = useState(0);

   // ----------------------- calculation time out -----------------------
   useMemo(() => {
      // calculation
      const hrOut = Math.floor(+rules.timeOut / 3600);
      const minuOut = Math.floor((+rules.timeOut - hrOut * 3600) / 60);

      // set state
      setHourOut(hrOut);
      setMinuteOut(minuOut);
   }, [rules.timeOut]);

   return (
      <Modal show={show} onHide={onHide}>
         <div className="modal-header">
            <h5 className="modal-title">Cài đặt wiffi chấm công</h5>
            <button type="button" className="close-x">
               <span aria-hidden="true" onClick={onHide}>
                  ×
               </span>
            </button>
         </div>
         <Modal.Body style={{ height: "520px" }}>
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
                     Cài đặt
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
                           defaultValue={text}
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
                           defaultValue={rules?.password}
                           onChange={(e) => setReules({ ...rules, password: e.target.value })}
                        />
                     </div>
                     <span>Giờ vào</span>
                     <div className="input-group m-b-30">
                        <input
                           placeholder="Nhập mật khẩu wiffi"
                           className="form-control search-input"
                           type="time"
                           value={
                              hourIn < 10
                                 ? `0${hourIn}:${minuteIn < 10 ? "0" + minuteIn : minuteIn}`
                                 : `${hourIn}:${minuteIn < 10 ? "0" + minuteIn : minuteIn}`
                           }
                           onChange={handleChangeTimeIn}
                        />
                     </div>
                     <span>Giờ ra</span>
                     <div className="input-group m-b-30">
                        <input
                           placeholder="Nhập mật khẩu wiffi"
                           className="form-control search-input"
                           type="time"
                           value={
                              hourOut < 10
                                 ? `0${hourOut}:${minuteOut < 10 ? "0" + minuteOut : minuteOut}`
                                 : `${hourOut}:${minuteOut < 10 ? "0" + minuteOut : minuteOut}`
                           }
                           onChange={handleChangeTimeOut}
                        />
                     </div>
                     <div className="button-dialog" onClick={handleSave}>
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

export default memo(AddWiffi);