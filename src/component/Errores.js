import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { Container, Alert, Row, Button, Col } from "react-bootstrap";

export const Errores = () => {
  const [moreInfo, setmoreInfo] = useState(false);

  const { cleanError, errores, setTimer } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    //setTimer(0);
    //alert(JSON.stringify(errores));
    if (errores && errores.status === 401) {
      //alert(JSON.stringify(errores));
      //setLogout();
    }

    //if (!errores) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errores]);

  const handleBorrarError = async () => {
    await cleanError();
    await setTimer(0);
    navigate("/");
  };

  const handleInfo = () => {
    if (moreInfo) setmoreInfo(false);
    else setmoreInfo(true);
  };

  return (
    <section className="page-section">
      <Container
        className="container"
        style={{ textAlign: "center", width: "600px" }}
      >
        <Row style={{ marginTop: "20%", textAlign: "center", width: "700px" }}>
          {" "}
          <Alert
            size="sm"
            className="monserrat"
            style={{
              padding: "1%",
              marginTop: "1%",
              color: "#000",
              fontSize: "10pt",
              wordWrap: "break-word",
              backgroundColor: "#eeeeee",
              border: "1px solid #ccc",
              width: "600px",
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
              textAlign: "center",
            }}
          >
            <span
              className="hometitlelight"
              style={{ fontSize: "14pt", color: "#000", fontWeight: "300" }}
            >
              Se ha producido un error
            </span>

            <Button
              outline="true"
              onClick={() => handleInfo()}
              size="sm"
              className="btn btn-custom monserrat"
              aria-pressed="true"
              style={{ marginLeft: "5%", fontSize: "9pt !important" }}
            >
              <i className="bi bi-plus-lg" style={{ fontSize: "9pt" }} />
              {"  "}Info
            </Button>
          </Alert>
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
                }}
              >
                {/* {errores && errores.status && "   Status: " + errores.status}
                {errores &&
                  errores.statusText &&
                  "   Message: " + errores.statusText}
                {errores && errores.url && "   URL: " + errores.url} */}
                {!errores &&
                  "Error desconocido, por favor comunique al adminsitrador"}
                {errores && JSON.stringify(errores)}
              </Alert>
            )}
            <br></br>
            <Button
              size="sm"
              aria-pressed="true"
              className="btn btn-custom monserrat"
              onClick={() => handleBorrarError()}
            >
              {" "}
              Continuar
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
