import React from "react";
import logo from "../assets/img/logo.png";
import logoArm from "../assets/img/logo_arm.svg";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const Footer = () => {
  return (
    <footer className="footer">
      <Row
        className="align-items-center"
        style={{
          padding: 10,
        }}
      >
        <Col
          lg={11}
          md={11}
          sm={11}
          className="align-items-center text14"
          style={{
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <img src={logo} alt="..." width={60} />
          {"    "} Monitor Integraciones ARM - 2024
        </Col>
        <Col lg={1} md={1} sm={1}>
          <img src={logoArm} alt="..." width={100} />
        </Col>
      </Row>
    </footer>
  );
};
