/**
 * Signin Firebase
 */

import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
   Attachment,
   Avatar_05,
   Avatar_02,
   Avatar_13,
   Avatar_16,
} from "../../../Entryfile/imagepath";
import { useLoading } from "../../../hook/useLoading";
import { initUser } from "../../../redux/feature/initSclice";
import { io } from "socket.io-client";
import { api } from "../../../constant";
import { toast } from "react-toastify";
import moment from "moment";
import { useRef } from "react";
import { listMessage } from "../../../redux/feature/messageSclice";
import { useSocket } from "../../../context/useSocket";
// import Chatsidebar from "../../../initialpage/Sidebar/chatsidebar";

const Chat = () => {
   useEffect(() => {
      let firstload = localStorage.getItem("minheight");
      if (firstload === "true") {
         setTimeout(function () {
            window.location.reload(1);
            localStorage.removeItem("minheight");
         }, 1000);
      }
   });

   //use
   const { id } = useParams();
   const { setLoading } = useLoading();
   const dispatch = useDispatch();
   const [text, setText] = useState("");
   const [messages, setMessages] = useState([]);
   // const [socket, setSocket] = useState();
   const scrollRef = useRef();

   // scroll top message
   useEffect(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
   }, [messages]);

   useEffect(() => {
      dispatch(initUser({ id, setLoading }));
   }, [id]);

   // init user
   const init = useSelector((state) => state.init);
   // current user
   const { user } = useSelector((state) => state.auth);

   // socket.id only
   // useEffect(() => {
   //    setSocket(io(api));
   // }, [setSocket]);

   const { socket } = useSocket();

   // send infor user
   // useEffect(() => {
   //    if (socket.id) {
   //       socket?.emit("inforUser", {
   //          userid: user?._id,
   //       });
   //    }
   // }, [user, socket]);

   // send message
   const sendMessage = () => {
      if (!user._id) {
         toast.warn(`Làm ơn đăng nhập vào hệ thống`);
         return;
      }

      if (!init.initUser._id) {
         toast.warn(`Người nhận không tồn tại`);
         return;
      }

      if (!text) {
         return;
      }

      socket?.emit("createMessage", {
         from: user?._id,
         to: init?.initUser?._id,
         message: text,
         createdAt: Date.now(),
         name: user?.name,
         avartar: user?.avartar,
      });

      setText("");
   };
   // send message

   // receive data
   const listenMessage = (message) => {
      setMessages([...messages, message]);
   };

   useEffect(() => {
      if (socket.id) {
         socket?.on(`message`, listenMessage);

         return () => {
            socket?.off("message", listenMessage);
         };
      }
   }, [listenMessage, socket]);
   // receive data

   // fetch message db
   useEffect(() => {
      dispatch(listMessage({ query: { from: user._id, to: id }, setLoading }));
   }, [id, user]);

   const data = useSelector((state) => state.message);

   useEffect(() => {
      setMessages([...data.messages]);
   }, [data.messages]);

   return (
      <div className="page-wrapper">
         <Helmet>
            {/* <title>Chat - HRMS Admin Template</title> */}
            <meta name="description" content="Chat" />
         </Helmet>
         {/* Chat Main Row */}
         <div className="chat-main-row">
            {/* Chat Main Wrapper */}
            <div className="chat-main-wrapper">
               {/* Chats View */}
               <div className="col-lg-9 message-view task-view">
                  <div className="chat-window">
                     <div className="fixed-header">
                        <div className="navbar">
                           <div className="user-details me-auto">
                              <div className="float-start user-img">
                                 <Link
                                    className="avatar"
                                    to="/app/profile/employee-profile"
                                    title="Mike Litorus"
                                 >
                                    <img src={Avatar_05} alt="" className="rounded-circle" />
                                    <span className="status online" />
                                 </Link>
                              </div>
                              <div className="user-info float-start">
                                 <Link to="/app/profile/employee-profile" title="Mike Litorus">
                                    <span>{init?.initUser?.name}</span>{" "}
                                    <i className="typing-text">Typing...</i>
                                 </Link>
                                 <span className="last-seen">Last seen today at 7:50 AM</span>
                              </div>
                           </div>
                           <div className="search-box">
                              <div className="input-group input-group-sm">
                                 <input type="text" placeholder="Search" className="form-control" />
                                 <span className="input-group-append">
                                    <button type="button" className="btn">
                                       <i className="fa fa-search" />
                                    </button>
                                 </span>
                              </div>
                           </div>
                           <ul className="nav custom-menu">
                              <li className="nav-item">
                                 <a
                                    className="nav-link task-chat profile-rightbar float-end"
                                    id="task_chat"
                                    href="#task_window"
                                 >
                                    <i className="fa fa-user" />
                                 </a>
                              </li>
                              <li className="nav-item">
                                 <Link
                                    onClick={() => localStorage.setItem("minheight", "true")}
                                    to="/conversation/voice-call"
                                    className="nav-link"
                                 >
                                    <i className="fa fa-phone" />
                                 </Link>
                              </li>
                              <li className="nav-item">
                                 <Link to="/conversation/video-call" className="nav-link">
                                    <i className="fa fa-video-camera" />
                                 </Link>
                              </li>
                              <li className="nav-item dropdown dropdown-action">
                                 <a
                                    aria-expanded="false"
                                    data-bs-toggle="dropdown"
                                    className="nav-link dropdown-toggle"
                                    href=""
                                 >
                                    <i className="fa fa-cog" />
                                 </a>
                                 <div className="dropdown-menu dropdown-menu-right">
                                    <a href="" className="dropdown-item">
                                       Delete Conversations
                                    </a>
                                    <a href="" className="dropdown-item">
                                       Settings
                                    </a>
                                 </div>
                              </li>
                           </ul>
                        </div>
                     </div>
                     <div className="chat-contents">
                        <div className="chat-content-wrap">
                           <div className="chat-wrap-inner">
                              <div className="chat-box">
                                 <div className="chats">
                                    <div className="chat-line">
                                       <span className="chat-date">October 8th, 2018</span>
                                    </div>
                                    {/* constent */}
                                    {messages?.map((item, index) =>
                                       item?.from === user?._id ? (
                                          <div
                                             key={index}
                                             className="chat chat-right"
                                             ref={scrollRef}
                                          >
                                             <div className="chat-body">
                                                <div className="chat-bubble">
                                                   <div className="chat-content">
                                                      <p>{item?.message}</p>
                                                      {moment(item?.createdAt).format("hh:mm A")}
                                                   </div>
                                                   <div className="chat-action-btns">
                                                      <ul>
                                                         <li>
                                                            <a
                                                               href="#"
                                                               className="share-msg"
                                                               title="Share"
                                                            >
                                                               <i className="fa fa-share-alt" />
                                                            </a>
                                                         </li>
                                                         <li>
                                                            <a href="#" className="edit-msg">
                                                               <i className="fa fa-pencil" />
                                                            </a>
                                                         </li>
                                                         <li>
                                                            <a href="#" className="del-msg">
                                                               <i className="fa fa-trash-o" />
                                                            </a>
                                                         </li>
                                                      </ul>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       ) : (
                                          <div
                                             key={index}
                                             className="chat chat-left"
                                             ref={scrollRef}
                                          >
                                             <div className="chat-avatar">
                                                <Link
                                                   to="/app/profile/employee-profile"
                                                   className="avatar"
                                                >
                                                   <img alt="" src={Avatar_05} />
                                                </Link>
                                             </div>
                                             <div className="chat-body">
                                                <div className="chat-bubble">
                                                   <div className="chat-content">
                                                      <p>{item?.message}</p>
                                                      <span className="chat-time">
                                                         {moment(item?.createdAt).format("hh:mm A")}
                                                      </span>
                                                   </div>
                                                   <div className="chat-action-btns">
                                                      <ul>
                                                         <li>
                                                            <a
                                                               href="#"
                                                               className="share-msg"
                                                               title="Share"
                                                            >
                                                               <i className="fa fa-share-alt" />
                                                            </a>
                                                         </li>
                                                         <li>
                                                            <a href="#" className="edit-msg">
                                                               <i className="fa fa-pencil" />
                                                            </a>
                                                         </li>
                                                         <li>
                                                            <a href="#" className="del-msg">
                                                               <i className="fa fa-trash-o" />
                                                            </a>
                                                         </li>
                                                      </ul>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       )
                                    )}
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="chat-footer">
                        <div className="message-bar">
                           <div className="message-inner">
                              <a
                                 className="link attach-icon"
                                 href="#"
                                 data-bs-toggle="modal"
                                 data-bs-target="#drag_files"
                              >
                                 <img src={Attachment} alt="" />
                              </a>
                              <div className="message-area">
                                 <div className="input-group">
                                    <textarea
                                       className="form-control"
                                       placeholder="Type message..."
                                       value={text}
                                       onChange={(e) => setText(e.target.value)}
                                    />
                                    <span className="input-group-append">
                                       <button
                                          className="btn btn-custom"
                                          type="button"
                                          onClick={sendMessage}
                                       >
                                          <i className="fa fa-send" />
                                       </button>
                                    </span>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               {/* /Chats View */}
               {/* Chat Right Sidebar */}
               {/* <div
                  className="col-lg-3 message-view chat-profile-view chat-sidebar"
                  id="task_window"
               >
                  <div className="chat-window video-window">
                     <div className="fixed-header">
                        <ul className="nav nav-tabs nav-tabs-bottom">
                           <li className="nav-item">
                              <a className="nav-link" href="#calls_tab" data-bs-toggle="tab">
                                 Calls
                              </a>
                           </li>
                           <li className="nav-item">
                              <a
                                 className="nav-link active"
                                 href="#profile_tab"
                                 data-bs-toggle="tab"
                              >
                                 Profile
                              </a>
                           </li>
                        </ul>
                     </div>
                     <div className="tab-content chat-contents">
                        <div className="content-full tab-pane" id="calls_tab">
                           <div className="chat-wrap-inner">
                              <div className="chat-box">
                                 <div className="chats">
                                    <div className="chat chat-left">
                                       <div className="chat-avatar">
                                          <Link
                                             to="/app/profile/employee-profile"
                                             className="avatar"
                                          >
                                             <img alt="" src={Avatar_02} />
                                          </Link>
                                       </div>
                                       <div className="chat-body">
                                          <div className="chat-bubble">
                                             <div className="chat-content">
                                                <span className="task-chat-user">You</span>{" "}
                                                <span className="chat-time">8:35 am</span>
                                                <div className="call-details">
                                                   <i className="material-icons">phone_missed</i>
                                                   <div className="call-info">
                                                      <div className="call-user-details">
                                                         <span className="call-description">
                                                            Jeffrey Warden missed the call
                                                         </span>
                                                      </div>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="chat chat-left">
                                       <div className="chat-avatar">
                                          <Link
                                             to="/app/profile/employee-profile"
                                             className="avatar"
                                          >
                                             <img alt="" src={Avatar_02} />
                                          </Link>
                                       </div>
                                       <div className="chat-body">
                                          <div className="chat-bubble">
                                             <div className="chat-content">
                                                <span className="task-chat-user">John Doe</span>{" "}
                                                <span className="chat-time">8:35 am</span>
                                                <div className="call-details">
                                                   <i className="material-icons">call_end</i>
                                                   <div className="call-info">
                                                      <div className="call-user-details">
                                                         <span className="call-description">
                                                            This call has ended
                                                         </span>
                                                      </div>
                                                      <div className="call-timing">
                                                         Duration: <strong>5 min 57 sec</strong>
                                                      </div>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="chat-line">
                                       <span className="chat-date">January 29th, 2019</span>
                                    </div>
                                    <div className="chat chat-left">
                                       <div className="chat-avatar">
                                          <Link
                                             to="/app/profile/employee-profile"
                                             className="avatar"
                                          >
                                             <img alt="" src={Avatar_05} />
                                          </Link>
                                       </div>
                                       <div className="chat-body">
                                          <div className="chat-bubble">
                                             <div className="chat-content">
                                                <span className="task-chat-user">
                                                   Richard Miles
                                                </span>{" "}
                                                <span className="chat-time">8:35 am</span>
                                                <div className="call-details">
                                                   <i className="material-icons">phone_missed</i>
                                                   <div className="call-info">
                                                      <div className="call-user-details">
                                                         <span className="call-description">
                                                            You missed the call
                                                         </span>
                                                      </div>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="chat chat-left">
                                       <div className="chat-avatar">
                                          <Link
                                             to="/app/profile/employee-profile"
                                             className="avatar"
                                          >
                                             <img alt="" src={Avatar_02} />
                                          </Link>
                                       </div>
                                       <div className="chat-body">
                                          <div className="chat-bubble">
                                             <div className="chat-content">
                                                <span className="task-chat-user">You</span>{" "}
                                                <span className="chat-time">8:35 am</span>
                                                <div className="call-details">
                                                   <i className="material-icons">ring_volume</i>
                                                   <div className="call-info">
                                                      <div className="call-user-details">
                                                         <a
                                                            href="#"
                                                            className="call-description call-description--linked"
                                                            data-qa="call_attachment_link"
                                                         >
                                                            Calling John Smith ...
                                                         </a>
                                                      </div>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="content-full tab-pane show active" id="profile_tab">
                           <div className="display-table">
                              <div className="table-row">
                                 <div className="table-body">
                                    <div className="table-content">
                                       <div className="chat-profile-img">
                                          <div className="edit-profile-img">
                                             <img src={Avatar_02} alt="" />
                                             <span className="change-img">Change Image</span>
                                          </div>
                                          <h3 className="user-name m-t-10 mb-0">
                                             {init?.initUser?.name}
                                          </h3>
                                          <small className="text-muted">Web Designer</small>
                                          <a href="" className="btn btn-primary edit-btn">
                                             <i className="fa fa-pencil" />
                                          </a>
                                       </div>
                                       <div className="chat-profile-info">
                                          <ul className="user-det-list">
                                             <li>
                                                <span>Họ tên:</span>
                                                <span className="float-end text-muted">
                                                   {init?.initUser?.name}
                                                </span>
                                             </li>
                                             <li>
                                                <span>DOB:</span>
                                                <span className="float-end text-muted">
                                                   24 July
                                                </span>
                                             </li>
                                             <li>
                                                <span>Email:</span>
                                                <span className="float-end text-muted">
                                                   {init?.initUser?.email}
                                                </span>
                                             </li>
                                             <li>
                                                <span>Điện thoại:</span>
                                                <span className="float-end text-muted">
                                                   {init?.initUser?.mobile}
                                                </span>
                                             </li>
                                          </ul>
                                       </div>
                                       <div className="transfer-files">
                                          <ul className="nav nav-tabs nav-tabs-solid nav-justified mb-0">
                                             <li className="nav-item">
                                                <a
                                                   className="nav-link active"
                                                   href="#all_files"
                                                   data-bs-toggle="tab"
                                                >
                                                   All Files
                                                </a>
                                             </li>
                                             <li className="nav-item">
                                                <a
                                                   className="nav-link"
                                                   href="#my_files"
                                                   data-bs-toggle="tab"
                                                >
                                                   My Files
                                                </a>
                                             </li>
                                          </ul>
                                          <div className="tab-content">
                                             <div className="tab-pane show active" id="all_files">
                                                <ul className="files-list">
                                                   <li>
                                                      <div className="files-cont">
                                                         <div className="file-type">
                                                            <span className="files-icon">
                                                               <i className="fa fa-file-pdf-o" />
                                                            </span>
                                                         </div>
                                                         <div className="files-info">
                                                            <span className="file-name text-ellipsis">
                                                               AHA Selfcare Mobile Application
                                                               Test-Cases.xls
                                                            </span>
                                                            <span className="file-author">
                                                               <a href="#">Loren Gatlin</a>
                                                            </span>{" "}
                                                            <span className="file-date">
                                                               May 31st at 6:53 PM
                                                            </span>
                                                         </div>
                                                         <ul className="files-action">
                                                            <li className="dropdown dropdown-action">
                                                               <a
                                                                  href=""
                                                                  className="dropdown-toggle"
                                                                  data-bs-toggle="dropdown"
                                                                  aria-expanded="false"
                                                               >
                                                                  <i className="material-icons">
                                                                     more_horiz
                                                                  </i>
                                                               </a>
                                                               <div className="dropdown-menu">
                                                                  <a
                                                                     className="dropdown-item"
                                                                     href=""
                                                                  >
                                                                     Download
                                                                  </a>
                                                                  <a
                                                                     className="dropdown-item"
                                                                     href="#"
                                                                     data-bs-toggle="modal"
                                                                     data-bs-target="#share_files"
                                                                  >
                                                                     Share
                                                                  </a>
                                                               </div>
                                                            </li>
                                                         </ul>
                                                      </div>
                                                   </li>
                                                </ul>
                                             </div>
                                             <div className="tab-pane" id="my_files">
                                                <ul className="files-list">
                                                   <li>
                                                      <div className="files-cont">
                                                         <div className="file-type">
                                                            <span className="files-icon">
                                                               <i className="fa fa-file-pdf-o" />
                                                            </span>
                                                         </div>
                                                         <div className="files-info">
                                                            <span className="file-name text-ellipsis">
                                                               AHA Selfcare Mobile Application
                                                               Test-Cases.xls
                                                            </span>
                                                            <span className="file-author">
                                                               <a href="#">John Doe</a>
                                                            </span>{" "}
                                                            <span className="file-date">
                                                               May 31st at 6:53 PM
                                                            </span>
                                                         </div>
                                                         <ul className="files-action">
                                                            <li className="dropdown dropdown-action">
                                                               <a
                                                                  href=""
                                                                  className="dropdown-toggle"
                                                                  data-bs-toggle="dropdown"
                                                                  aria-expanded="false"
                                                               >
                                                                  <i className="material-icons">
                                                                     more_horiz
                                                                  </i>
                                                               </a>
                                                               <div className="dropdown-menu">
                                                                  <a
                                                                     className="dropdown-item"
                                                                     href=""
                                                                  >
                                                                     Download
                                                                  </a>
                                                                  <a
                                                                     className="dropdown-item"
                                                                     href="#"
                                                                     data-bs-toggle="modal"
                                                                     data-bs-target="#share_files"
                                                                  >
                                                                     Share
                                                                  </a>
                                                               </div>
                                                            </li>
                                                         </ul>
                                                      </div>
                                                   </li>
                                                </ul>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div> */}
               {/* <Chatsidebar /> */}
               {/* /Chat Right Sidebar */}
            </div>
            {/* /Chat Main Wrapper */}
         </div>
         {/* /Chat Main Row */}
         {/* Drogfiles Modal */}
         <div id="drag_files" className="modal custom-modal fade" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-md" role="document">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title">Drag and drop files upload</h5>
                     <button
                        type="button"
                        className="close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                     >
                        <span aria-hidden="true">×</span>
                     </button>
                  </div>
                  <div className="modal-body">
                     <form id="js-upload-form">
                        <div className="upload-drop-zone" id="drop-zone">
                           <i className="fa fa-cloud-upload fa-2x" />{" "}
                           <span className="upload-text">Just drag and drop files here</span>
                        </div>
                        <h4>Uploading</h4>
                        <ul className="upload-list">
                           <li className="file-list">
                              <div className="upload-wrap">
                                 <div className="file-name">
                                    <i className="fa fa-photo" />
                                    photo.png
                                 </div>
                                 <div className="file-size">1.07 gb</div>
                                 <button type="button" className="file-close">
                                    <i className="fa fa-close" />
                                 </button>
                              </div>
                              <div className="progress progress-xs progress-striped">
                                 <div
                                    className="progress-bar bg-success"
                                    role="progressbar"
                                    style={{ width: "65%" }}
                                 />
                              </div>
                              <div className="upload-process">37% done</div>
                           </li>
                           <li className="file-list">
                              <div className="upload-wrap">
                                 <div className="file-name">
                                    <i className="fa fa-file" />
                                    task.doc
                                 </div>
                                 <div className="file-size">5.8 kb</div>
                                 <button type="button" className="file-close">
                                    <i className="fa fa-close" />
                                 </button>
                              </div>
                              <div className="progress progress-xs progress-striped">
                                 <div
                                    className="progress-bar bg-success"
                                    role="progressbar"
                                    style={{ width: "65%" }}
                                 />
                              </div>
                              <div className="upload-process">37% done</div>
                           </li>
                           <li className="file-list">
                              <div className="upload-wrap">
                                 <div className="file-name">
                                    <i className="fa fa-photo" />
                                    dashboard.png
                                 </div>
                                 <div className="file-size">2.1 mb</div>
                                 <button type="button" className="file-close">
                                    <i className="fa fa-close" />
                                 </button>
                              </div>
                              <div className="progress progress-xs progress-striped">
                                 <div
                                    className="progress-bar bg-success"
                                    role="progressbar"
                                    style={{ width: "65%" }}
                                 />
                              </div>
                              <div className="upload-process">Completed</div>
                           </li>
                        </ul>
                     </form>
                     <div className="submit-section">
                        <button className="btn btn-primary submit-btn">Submit</button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {/* /Drogfiles Modal */}
         {/* Add Group Modal */}
         <div id="add_group" className="modal custom-modal fade" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-md" role="document">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title">Create a group</h5>
                     <button
                        type="button"
                        className="close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                     >
                        <span aria-hidden="true">×</span>
                     </button>
                  </div>
                  <div className="modal-body">
                     <p>
                        Groups are where your team communicates. They’re best when organized around
                        a topic — #leads, for example.
                     </p>
                     <form>
                        <div className="form-group">
                           <label>
                              Group Name <span className="text-danger">*</span>
                           </label>
                           <input className="form-control" type="text" />
                        </div>
                        <div className="form-group">
                           <label>
                              Send invites to: <span className="text-muted-light">(optional)</span>
                           </label>
                           <input className="form-control" type="text" />
                        </div>
                        <div className="submit-section">
                           <button className="btn btn-primary submit-btn">Submit</button>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
         {/* /Add Group Modal */}
         {/* Add Chat User Modal */}
         <div id="add_chat_user" className="modal custom-modal fade" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-md" role="document">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title">Direct Chat</h5>
                     <button
                        type="button"
                        className="close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                     >
                        <span aria-hidden="true">×</span>
                     </button>
                  </div>
                  <div className="modal-body">
                     <div className="input-group m-b-30">
                        <input
                           placeholder="Search to start a chat"
                           className="form-control search-input"
                           type="text"
                        />
                        <span className="input-group-append">
                           <button className="btn btn-primary">Search</button>
                        </span>
                     </div>
                     <div>
                        <h5>Recent Conversations</h5>
                        <ul className="chat-user-list">
                           <li>
                              <a href="#">
                                 <div className="media">
                                    <span className="avatar align-self-center">
                                       <img src={Avatar_16} alt="" />
                                    </span>
                                    <div className="media-body align-self-center text-nowrap">
                                       <div className="user-name">Jeffery Lalor</div>
                                       <span className="designation">Team Leader</span>
                                    </div>
                                    <div className="text-nowrap align-self-center">
                                       <div className="online-date">1 day ago</div>
                                    </div>
                                 </div>
                              </a>
                           </li>
                           <li>
                              <a href="#">
                                 <div className="media ">
                                    <span className="avatar align-self-center">
                                       <img src={Avatar_13} alt="" />
                                    </span>
                                    <div className="media-body align-self-center text-nowrap">
                                       <div className="user-name">Bernardo Galaviz</div>
                                       <span className="designation">Web Developer</span>
                                    </div>
                                    <div className="align-self-center text-nowrap">
                                       <div className="online-date">3 days ago</div>
                                    </div>
                                 </div>
                              </a>
                           </li>
                           <li>
                              <a href="#">
                                 <div className="media">
                                    <span className="avatar align-self-center">
                                       <img src={Avatar_02} alt="" />
                                    </span>
                                    <div className="media-body text-nowrap align-self-center">
                                       <div className="user-name">John Doe</div>
                                       <span className="designation">Web Designer</span>
                                    </div>
                                    <div className="align-self-center text-nowrap">
                                       <div className="online-date">7 months ago</div>
                                    </div>
                                 </div>
                              </a>
                           </li>
                        </ul>
                     </div>
                     <div className="submit-section">
                        <button className="btn btn-primary submit-btn">Submit</button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {/* /Add Chat User Modal */}
         {/* Share Files Modal */}
         <div id="share_files" className="modal custom-modal fade" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-md" role="document">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title">Share File</h5>
                     <button
                        type="button"
                        className="close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                     >
                        <span aria-hidden="true">×</span>
                     </button>
                  </div>
                  <div className="modal-body">
                     <div className="files-share-list">
                        <div className="files-cont">
                           <div className="file-type">
                              <span className="files-icon">
                                 <i className="fa fa-file-pdf-o" />
                              </span>
                           </div>
                           <div className="files-info">
                              <span className="file-name text-ellipsis">
                                 AHA Selfcare Mobile Application Test-Cases.xls
                              </span>
                              <span className="file-author">
                                 <a href="#">Bernardo Galaviz</a>
                              </span>{" "}
                              <span className="file-date">May 31st at 6:53 PM</span>
                           </div>
                        </div>
                     </div>
                     <div className="form-group">
                        <label>Share With</label>
                        <input className="form-control" type="text" />
                     </div>
                     <div className="submit-section">
                        <button className="btn btn-primary submit-btn">Share</button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {/* /Share Files Modal */}
      </div>
   );
};

export default Chat;
