import React from "react";
import logo from "../assets/img/logo.png";
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
          className="align-items-center text14"
          style={{
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <img src={logo} alt="..." width={60} />
          {"    "} Monitor Integraciones ARM - 2024
        </Col>
      </Row>
    </footer>
  );
};
