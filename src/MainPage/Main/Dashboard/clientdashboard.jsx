/**
 * Signin Firebase
 */

import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
   Avatar_02,
   Avatar_04,
   Avatar_05,
   Avatar_07,
   Avatar_08,
   Avatar_09,
} from "../../../Entryfile/imagepath.jsx";
import Header from "../../../initialpage/Sidebar/header";
import Sidebar from "../../../initialpage/Sidebar/sidebar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { RiseOutlined, SmileTwoTone } from "@ant-design/icons";

const ClientDashboard = () => {
   const [menu, setMenu] = useState(false);

   const toggleMobileMenu = () => {
      setMenu(!menu);
   };

   return (
      <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
         <Header onMenuClick={(value) => toggleMobileMenu()} />
         <Sidebar />
         <div className="page-wrapper">
            <Helmet>
               <title>Dashboard - HRMS Admin Template</title>
               <meta name="description" content="Dashboard" />
            </Helmet>
            {/* Page Content */}
            <div className="content container-fluid">
               <div className="page-header">
                  <div className="row">
                     <div className="col-sm-4">
                        <img src="https://einfosoft.com/templates/admin/kuber/source/light/assets/images/pages/welcome.png" />
                     </div>
                     <div className="col-sm-8">
                        <div className="info-dn">
                           <h2>
                              Wellcome back <strong>FCE</strong>
                           </h2>
                           <p>
                              We would like to take this opportunity to welcome you to our practice
                              and to thank you for choosing our company. Nam quis ligula est. Nunc
                              sed risus non turpis tristique tempor. Ut sollicitudin faucibus magna
                              nec gravida..
                           </p>
                        </div>
                     </div>
                  </div>
                  <Row>
                     <Col xs={6} md={3}>
                        <div className="info-dn-detail">
                           <div className="detail-img">
                              <img src="" alt="" />
                           </div>
                           <div className="detail-info">
                              <RiseOutlined />
                           </div>
                        </div>
                     </Col>
                     <Col xs={6} md={3}>
                        xs=6 md=4
                     </Col>
                     <Col xs={6} md={3}>
                        xs=6 md=4
                     </Col>
                     <Col xs={6} md={3}>
                        xs=6 md=4
                     </Col>
                  </Row>
               </div>
            </div>
            {/* /Page Content */}
         </div>
      </div>
   );
};

export default ClientDashboard;
