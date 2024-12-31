import React from "react";
import { Spinner, Row, Col } from "react-bootstrap";
//import loading from '../assets/img/loading.gif';
export const Loading = () => {
  return (
    <>
      <Row
        style={{
          textAlign: "center",
          padding: "0%",
          alignContent: "center",
          width: "100%",
        }}
      >
        <Col
          lg={12}
          md={12}
          sm={12}
          style={{
            padding: "2%",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            justifyItems: "center",
          }}
        >
          <Spinner style={{ width: "3rem", height: "3rem", color: "green" }} />
        </Col>
      </Row>
    </>
  );
};
