/**
 * App Header
 */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import authSclice from "../../redux/feature/authSclice";
import { useLoading } from "../../hook/useLoading";
import { avartarFAKE, logoFAKE, UserRoleType } from "../../constant";
import { useSocket } from "../../context/useSocket";
import { notificationMessage } from "../../redux/feature/messageSclice";
import { Avatar_13 } from "../../Entryfile/imagepath";

const Header = (props) => {
   const handlesidebar = () => {
      document.body.classList.toggle("mini-sidebar");
   };
   const onMenuClik = () => {
      props.onMenuClick();
   };

   let pathname = location.pathname;

   const [messages, setMessages] = useState([]);
   const [messQty, setMessQty] = useState(0);
   const { socket } = useSocket();
   const dispatch = useDispatch();

   const handleLogout = () => {
      dispatch(authSclice.actions.logout());
      // socket?.emit("del-key", { userId: user?._id });
   };

   const { user } = useSelector((state) => state.auth);

   const { setLoading } = useLoading();

   const { notificationWorker } = useSelector((state) => state.init);
   const { messageNotification } = useSelector((state) => state.message);

   useEffect(() => {
      // if (user.role === UserRoleType.CLIENT) {
      //    dispatch(workerProjectClient({ query: { id: user._id }, setLoading }));
      // }

      if (user._id) dispatch(notificationMessage({ query: { id: user._id }, setLoading }));
   }, [user]);

   useEffect(() => {
      setMessages(messageNotification);
   }, [messageNotification]);

   // receive data
   const listenMessage = (message) => {
      if (message.from !== user._id) {
         setMessages(messages?.map((item) => (item.from === message.from ? message : item)));
         setMessQty((prev) => prev + 1);
      }
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

   return (
      <div className="header" style={{ right: "0px" }}>
         {/* Logo */}
         <div className="header-left">
            {(user?.role === UserRoleType.ADMIN ||
               user?.role === UserRoleType.LEADER ||
               user?.role === UserRoleType.EMPLOYEE) && (
               <Link to="/app/main/dashboard" className="logo">
                  {/* <img src={headerlogo} width={40} height={40} alt="" /> */}
                  <img width={40} height={30} src={logoFAKE} alt="Dreamguy's Technologies" />
               </Link>
            )}
            {user?.role === UserRoleType.CLIENT && (
               <Link to="/app/main/client-dashboard" className="logo">
                  <img width={40} height={30} src={logoFAKE} alt="Dreamguy's Technologies" />
               </Link>
            )}
            {user?.role === UserRoleType.WORKER && (
               <Link to="/app/main/app/projects/project_dashboard" className="logo">
                  <img width={40} height={30} src={logoFAKE} alt="Dreamguy's Technologies" />
               </Link>
            )}
         </div>
         {/* /Logo */}
         <a
            id="toggle_btn"
            href="#"
            style={{
               display: pathname.includes("tasks")
                  ? "none"
                  : pathname.includes("compose")
                  ? "none"
                  : "",
            }}
            onClick={handlesidebar}
         >
            <span className="bar-icon">
               <span />
               <span />
               <span />
            </span>
         </a>
         {/* Header Title */}
         <div className="page-title-box">
            <h3>Giải pháp nguồn nhân lực</h3>
         </div>
         {/* /Header Title */}
         <a id="mobile_btn" className="mobile_btn" href="#" onClick={() => onMenuClik()}>
            <i className="fa fa-bars" />
         </a>
         {/* Header Menu */}
         <ul className="nav user-menu">
            {/* Search */}
            {/* <li className="nav-item">
               <div className="top-nav-search">
                  <a href="" className="responsive-search">
                     <i className="fa fa-search" />
                  </a>
                  <form>
                     <input className="form-control" type="text" placeholder="Tìm kiếm" />
                     <button className="btn" type="submit">
                        <i className="fa fa-search" />
                     </button>
                  </form>
               </div>
            </li> */}
            {/* /Search */}
            {/* Flag */}

            {/* /Flag */}
            {/* Notifications */}
            {/* <li className="nav-item dropdown">
               <a href="#" className="dropdown-toggle nav-link" data-bs-toggle="dropdown">
                  <i className="fa fa-bell-o" /> 
               </a>
               <div className="dropdown-menu notifications">
                  <div className="topnav-dropdown-header">
                     <span className="notification-title">Notifications</span>
                     <a href="" className="clear-noti">
                        {" "}
                        Clear All{" "}
                     </a>
                  </div>
                  <div className="noti-content">
                     <ul className="notification-list">
                        {notificationWorker?.map((item) => (
                           <li className="notification-message" key={item?._id}>
                              <Link
                                 onClick={() => localStorage.setItem("minheight", "true")}
                                 to="/app/administrator/activities"
                              >
                                 <div className="media" style={{ display: "flex" }}>
                                    <span className="avatar">
                                       <img alt="" src={Avatar_02} />
                                    </span>
                                    <div className="media-body">
                                       <p className="noti-details">
                                          <span className="noti-title">{item?.name}</span> đã tham
                                          gia dự án{" "}
                                          <span className="noti-title">{item?.project}</span>
                                       </p>
                                       <p className="noti-time">
                                          <span className="notification-time">
                                             {moment(item?.joindate).format("DD/MM/YYYY HH:mm A")}
                                          </span>
                                       </p>
                                    </div>
                                 </div>
                              </Link>
                           </li>
                        ))}
                     </ul>
                  </div>
                  <div className="topnav-dropdown-footer">
                     <Link
                        onClick={() => localStorage.setItem("minheight", "true")}
                        to="/app/administrator/activities"
                     >
                        View all Notifications
                     </Link>
                  </div>
               </div>
            </li> */}
            {/* /Notifications */}
            {/* Message Notifications */}
            <li className="nav-item dropdown">
               <a href="#" className="dropdown-toggle nav-link" data-bs-toggle="dropdown">
                  <i className="fa fa-comment-o" />
                  {messQty !== 0 && <span className="badge badge-pill">{messQty}</span>}
               </a>
               <div className="dropdown-menu notifications">
                  <div className="topnav-dropdown-header">
                     <span className="notification-title">Messages</span>
                     <a href="" className="clear-noti">
                        {" "}
                        Clear All{" "}
                     </a>
                  </div>
                  <div className="noti-content">
                     <ul className="notification-list">
                        {messages?.map((item) => (
                           <li className="notification-message" key={item?.from}>
                              <Link
                                 onClick={() => localStorage.setItem("minheight", "true")}
                                 to={`/conversation/chat/${item?.from}`}
                              >
                                 <div className="list-item">
                                    <div className="list-left">
                                       <span className="avatar">
                                          <img alt="avatar" src={Avatar_13} />
                                       </span>
                                    </div>
                                    <div className="list-body">
                                       <span className="message-author">{item?.name} </span>
                                       <div className="clearfix" />
                                       <span className="message-content">{item?.message}</span>
                                       <span className="message-time">
                                          {moment(item?.createdAt).format("DD/MM/YYYY - HH:mm:ss")}
                                       </span>
                                    </div>
                                 </div>
                              </Link>
                           </li>
                        ))}
                     </ul>
                  </div>
                  <div className="topnav-dropdown-footer">
                     <Link
                        onClick={() => localStorage.setItem("minheight", "true")}
                        to="/conversation/chat"
                     >
                        View all Messages
                     </Link>
                  </div>
               </div>
            </li>
            {/* /Message Notifications */}
            <li className="nav-item dropdown has-arrow main-drop">
               <a href="#" className="dropdown-toggle nav-link" data-bs-toggle="dropdown">
                  <span className="user-img me-1">
                     <img src={user?.avartar || avartarFAKE} alt={user?.name} />
                     <span className="status online" />
                  </span>
                  <span>{user?.name || "Admin"}</span>
               </a>
               <div className="dropdown-menu">
                  {(user?.role === UserRoleType.EMPLOYEE ||
                     user?.role === UserRoleType.ADMIN ||
                     user?.role === UserRoleType.LEADER) && (
                     <Link
                        className="dropdown-item"
                        to={`/app/profile/employee-profile/${user?._id}`}
                     >
                        Trang cá nhân
                     </Link>
                  )}
                  {user?.role === UserRoleType.CLIENT && (
                     <Link
                        className="dropdown-item"
                        to={`/app/profile/client-profile/${user?._id}`}
                     >
                        Trang cá nhân
                     </Link>
                  )}
                  {user?.role === UserRoleType.WORKER && (
                     <Link
                        className="dropdown-item"
                        to={`/app/profile/worker-profile/${user?._id}`}
                     >
                        Trang cá nhân
                     </Link>
                  )}
                  {/* <Link className="dropdown-item" to="/settings/companysetting">
                     Settings
                  </Link> */}
                  <Link className="dropdown-item" to="/settings/change-password">
                     Cài đặt mật khẩu
                  </Link>
                  <Link className="dropdown-item" to="/login" onClick={handleLogout}>
                     Đăng xuất
                  </Link>
               </div>
            </li>
         </ul>
         {/* /Header Menu */}
         {/* Mobile Menu */}
         <div className="dropdown mobile-user-menu">
            <a
               href="#"
               className="nav-link dropdown-toggle"
               data-bs-toggle="dropdown"
               aria-expanded="false"
            >
               <i className="fa fa-ellipsis-v" />
            </a>
            <div className="dropdown-menu dropdown-menu-right">
               {(user?.role === UserRoleType.EMPLOYEE ||
                  user?.role === UserRoleType.ADMIN ||
                  user?.role === UserRoleType.LEADER) && (
                  <Link className="dropdown-item" to={`/app/profile/employee-profile/${user?._id}`}>
                     Trang cá nhân
                  </Link>
               )}
               {user?.role === UserRoleType.CLIENT && (
                  <Link className="dropdown-item" to={`/app/profile/client-profile/${user?._id}`}>
                     Trang cá nhân
                  </Link>
               )}
               {user?.role === UserRoleType.WORKER && (
                  <Link className="dropdown-item" to={`/app/profile/worker-profile/${user?._id}`}>
                     Trang cá nhân
                  </Link>
               )}
               <Link className="dropdown-item" to="/settings/change-password">
                  Cài đặt mật khẩu
               </Link>
               <Link className="dropdown-item" to="/login" onClick={handleLogout}>
                  Đăng xuất
               </Link>
            </div>
         </div>
         {/* /Mobile Menu */}
      </div>
   );
};

export default withRouter(Header);
