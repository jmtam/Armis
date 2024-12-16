import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { Container, Alert, Row, Button, Col } from "react-bootstrap";

export const Errores = () => {
  const [moreInfo, setmoreInfo] = useState(false);

  const { cleanError, errores, setLogout } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!errores) navigate("/");

    if (
      errores &&
      (errores.status === "401" || JSON.parse(errores).status === "401")
    ) {
      setLogout();
      navigate("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errores, navigate]);

  const handleBorrarError = () => {
    cleanError();
    navigate("/");
  };

  const handleInfo = () => {
    if (moreInfo) setmoreInfo(false);
    else setmoreInfo(true);
  };

  return (
    <section className="page-section">
      <Container className="container">
        <Row style={{ marginTop: "20%", textAlign: "center" }}>
          <Col>
            <span
              className="hometitlelight"
              style={{ fontSize: "16pt", color: "#000", fontWeight: "300" }}>
              <i
                className="bi bi-bell"
                style={{ fontSize: "25pt", color: "red" }}></i>
              {"  "}Se ha producido un error
            </span>
            {errores && errores.status}

            {"  "}
            <Button
              outline
              onClick={() => handleInfo()}
              size="sm"
              className="btn monserrat btnTable"
              style={{ fontWeight: "300", marginLeft: "2%" }}
              aria-pressed="true">
              <i className="bi bi-plus-lg" style={{ fontSize: "9pt" }} />
              {"  "}Info
            </Button>
          </Col>
        </Row>
        <Row>
          <Col style={{ marginTop: "0.5%", textAlign: "center" }}>
            {moreInfo && (
              <Alert
                size="sm"
                color="secondary"
                className="monserrat"
                style={{
                  textAlign: "left",
                  padding: "1%",
                  marginTop: "1%",
                  color: "#000",
                  fontSize: "10pt",
                  wordWrap: "break-word",
                }}>
                {JSON.stringify(errores)}
              </Alert>
            )}
            <br></br>
            <Button
              size="sm"
              aria-pressed="true"
              className="btn monserrat"
              onClick={() => handleBorrarError()}>
              {" "}
              Continuar
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
