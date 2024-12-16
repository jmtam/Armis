import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";
import { GlobalContext } from "../context/GlobalContext";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
//import Notification from "../Notification";
import { confirmAlert } from "react-confirm-alert";
//import Tooltip from "react-bootstrap/Tooltip";

import * as moment from "moment";
import "moment/locale/es";

export const NavbarMenu = () => {
  const {
    setLogout,
    usuario,
    token,
    timer,
    timerDate,
    setTimer,
    showopciones,
    setShowOpciones,
    getPanelTopMetricas,
    metricas,
    timerSeconds,
  } = useContext(GlobalContext);

  const [menuopen, setmenuopen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let interval = null;
    if (timer) {
      interval = setInterval(async () => {
        await getPanelTopMetricas();
        console.log(
          moment(new Date()).format("DD/MM/YY HH:mm:ss").toString() +
            " GET API METRICAS " +
            timer
        );
      }, timerSeconds);
    } else {
      clearInterval(interval);
      console.log(
        moment(new Date()).format("DD/MM/YY HH:mm:ss").toString() +
          " STOP GET METRICAS " +
          timer
      );
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer, timerSeconds]);

  // const goHome = async (carro) => {
  //   setmenuopen(!menuopen);
  //   navigate("/home");
  // };

  // const renderTooltip = (props) => (
  //   <Tooltip {...props}>Cerrar su sesión de usuario</Tooltip>
  // );

  // const togglemenu = () => {
  //   setmenuopen(!menuopen);
  // };

  const handlerOptions = async () => {
    await setShowOpciones(showopciones === 1 ? 0 : 1);
  };

  const handlerLogout = async () => {
    setmenuopen(!menuopen);
    confirmAlert({
      message: "¿Desea cerrar su sesión de usuario?",
      buttons: [
        {
          label: "Cerrar",
          onClick: async () => {
            await setLogout();
            // await cleanCarro();
            setTimer(0);
            navigate("/login");
          },
        },
        {
          label: "Cancelar",
          onClick: () => null,
        },
      ],
    });
  };

  return (
    <Navbar fixed="top" collapseOnSelect expand="lg" className="navbar">
      <Container fluid>
        <Navbar.Brand href="/">
          <img src={logo} alt="..." className="navLogoImg" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="navbar-toggler1"
        />
        {token && (
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                href="#"
                onClick={() => handlerOptions()}
                className="align-items-center"
                title="Opciones Bridge y otras configuraciones"
              >
                Opciones
              </Nav.Link>
              <Nav.Link
                href="#"
                onClick={() => handlerLogout()}
                title="Cerrar sesión"
              >
                {usuario + "   "}
                <i className="bi bi-box-arrow-right" />
              </Nav.Link>
            </Nav>

            <Navbar.Text
              style={{
                marginRight: "5%",
                justifyContent: "center",
                verticalAlign: "middle",
                alignContent: "center",
                alignItems: "center",
                color: "#fff",
              }}
            >
              <Row className="rowMetrica">
                <Col
                  md={"2"}
                  className="colLeftMetrica text14"
                  style={{ width: "100px" }}
                >
                  <i className="bi bi-arrow-clock" /> Data
                  <span style={{ fontSize: 10 }}>
                    {"  "}
                    {"  (" + timerSeconds / 1000 + " seg )"}
                  </span>
                </Col>
                <Col
                  md={"9"}
                  className="colRightMetrica text14"
                  style={{ width: "140px" }}
                >
                  {timerDate && timerDate}
                </Col>
              </Row>
            </Navbar.Text>

            <Navbar.Text
              style={{
                marginRight: "5%",
                justifyContent: "center",
                verticalAlign: "middle",
                alignContent: "center",
                alignItems: "center",
                color: "#fff",
              }}
            >
              <Row className="rowMetrica">
                <Col
                  md={"2"}
                  className="colLeftMetrica text14"
                  style={{ width: "100px" }}
                >
                  <i className="bi bi-arrow-left-right" /> Tasa
                  <span style={{ fontSize: 9 }}>{"  "}(ppm)</span>
                </Col>
                <Col
                  md={"9"}
                  className="colRightMetrica"
                  style={{ width: "60px" }}
                >
                  {metricas && JSON.parse(metricas.tasa)}
                </Col>
              </Row>
            </Navbar.Text>

            <Row className="align-items-center" style={{ marginRight: "1%" }}>
              <Col md={4} xs={4} lg={4} style={{ padding: 0, margin: 0 }}>
                <Button
                  className={
                    timer === 1
                      ? "btn btn-custom-start monserrat"
                      : "btn btn-custom-stop monserrat"
                  }
                  onClick={async () => await setTimer(timer === 1 ? 0 : 1)}
                >
                  {timer === 1 ? (
                    <i className="bi bi-play" style={{ fontSize: "20pt" }} />
                  ) : (
                    <i
                      className="bi bi-stop iconStop"
                      style={{ fontSize: "20pt" }}
                    />
                  )}
                </Button>
              </Col>
              <Col
                className="text14"
                md={5}
                xs={5}
                lg={5}
                style={{ padding: 0, margin: 0, color: "#fff" }}
              >
                {timer === 1 ? "Running" : "Stopped"}
              </Col>

              <Col md={3} xs={3} lg={3}>
                {timer === 0 ? (
                  <Spinner
                    animation="grow"
                    size="sm"
                    style={{ backgroundColor: "white" }}
                  />
                ) : (
                  <Spinner animation="grow" style={{ visibility: "hidden" }} />
                )}
              </Col>
            </Row>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
};
