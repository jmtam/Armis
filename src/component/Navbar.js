/* eslint-disable react-hooks/exhaustive-deps */
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
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

//import Notification from "../Notification";
import { confirmAlert } from "react-confirm-alert";

// import * as moment from "moment";
// import "moment/locale/es";

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
    errores,
    setShowMetricas,
    showmetricas,
    timermseg,
    setShowLogs,
    showlogs,
    getPanelTopMetricas,
    metricas,
    reintentFetch,
  } = useContext(GlobalContext);

  const [menuopen, setmenuopen] = useState(false);
  const [topError, setTopError] = useState(true);

  const navigate = useNavigate();

  const handlerOptions = async () => {
    await setShowOpciones(showopciones === 1 ? 0 : 1);
    if (showmetricas === 1) await setShowMetricas(0);
  };

  const handlePanelLogs = async () => {
    await setShowLogs(showlogs || showlogs === 1 ? 0 : 1);
  };
  const handlerMetricas = async () => {
    await setShowMetricas(showmetricas === 1 ? 0 : 1);
    if (showopciones === 1) await setShowOpciones(0);
  };

  useEffect(() => {
    async function init() {
      if (timer === 1 && token && !reintentFetch) await getPanelTopMetricas();
    }
    init();
  }, []);

  useEffect(() => {
    async function init() {
      if (!showmetricas && timer === 1 && token && !reintentFetch)
        await getPanelTopMetricas();
      if (errores) {
        setTopError(true);
      } else {
        setTopError(false);
      }
    }

    init();

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errores]);

  const handlerLogout = async () => {
    setmenuopen(!menuopen);
    confirmAlert({
      message: "¿Desea cerrar su sesión de usuario?",
      buttons: [
        {
          label: "Cerrar",
          onClick: async () => {
            setTimer(0);
            await setLogout();
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

  const renderTooltip = (title) => <Tooltip>{title}</Tooltip>;

  // const togglemenu = () => {
  //   setmenuopen(!menuopen);
  // };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className={topError && token ? "navbarError" : "navbar"}
    >
      <Container fluid>
        <Navbar.Brand href="#home">
          <img src={logo} alt="..." className="navLogoImg" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="navbar-toggler1"
        />
        {token && (
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav className="align-items-center">
              {metricas && metricas.status === 0 ? (
                <Nav.Item className="align-items-center" style={{ margin: 10 }}>
                  <Row
                    className="rowAlarma align-items-center"
                    style={{ width: "400px", height: "42px" }}
                  >
                    <Col
                      md={"12"}
                      className=""
                      style={{ alignItems: "center", paddin: 0, margin: 0 }}
                    >
                      <i
                        className="bi bi-exclamation-triangle-fill"
                        style={{
                          fontSize: "18pt",
                          color: "white",
                          paddingRight: 5,
                        }}
                      />
                      Problemas en Servidor de Integraciones:{metricas.status}
                    </Col>
                  </Row>
                </Nav.Item>
              ) : null}

              {topError && (
                <Nav.Item className="align-items-center" style={{ margin: 10 }}>
                  <Row
                    className="rowAlarma align-items-center"
                    style={{ width: "400px", height: "42px" }}
                  >
                    <Col
                      md={"12"}
                      className=""
                      style={{ alignItems: "center", paddin: 0, margin: 0 }}
                    >
                      <i
                        className="bi bi-exclamation-triangle-fill"
                        style={{
                          fontSize: "18pt",
                          color: "white",
                          paddingRight: 5,
                        }}
                      />
                      Problemas en comunicación y/o conexión
                    </Col>
                  </Row>
                </Nav.Item>
              )}
              <Nav.Item className="align-items-center" style={{ margin: 10 }}>
                <Button
                  className={
                    showlogs
                      ? "btn btn-custom-start"
                      : "btn btn-custom-disabled"
                  }
                  onClick={() => handlePanelLogs()}
                >
                  <OverlayTrigger
                    placement="bottom"
                    overlay={renderTooltip("Panel de Logs")}
                  >
                    <i
                      className="bi bi-window-split"
                      style={{ fontSize: "14pt" }}
                    ></i>
                  </OverlayTrigger>
                </Button>
              </Nav.Item>

              <Nav.Item className="align-items-center" style={{ margin: 10 }}>
                <Button
                  className={
                    showmetricas
                      ? "btn btn-custom-start"
                      : "btn btn-custom-disabled"
                  }
                  onClick={() => handlerMetricas()}
                >
                  <OverlayTrigger
                    placement="bottom"
                    overlay={renderTooltip("Métricas")}
                  >
                    <i
                      className="bi bi-bar-chart"
                      style={{ fontSize: "13pt" }}
                    ></i>
                  </OverlayTrigger>
                </Button>
              </Nav.Item>

              <Nav.Item
                style={{ marginRight: 10, marginLeft: 10, cursor: "pointer" }}
                onClick={() => handlerOptions()}
                className="pe-1 mr-auto align-items-center"
              >
                <OverlayTrigger
                  placement="bottom"
                  overlay={renderTooltip(
                    "Cambiar tiempos de actualización de la informacion."
                  )}
                >
                  <Row
                    className="rowMetrica align-items-center"
                    style={{ paddingRight: 20 }}
                  >
                    <Col
                      md={"2"}
                      className="colLeftMetrica colLeftMetricaTop text12 align-items-center"
                      style={{ width: "100px" }}
                    >
                      <i
                        className="bi bi-clock-history"
                        style={{ marginRight: 3, fontSize: 12 }}
                      ></i>
                      <span style={{ fontSize: 10 }}>
                        {"  (" + timermseg + " mseg)"}
                      </span>
                    </Col>
                    <Col
                      md={"9"}
                      className={
                        timer === 1
                          ? "colRightMetrica text12"
                          : "colRightMetrica colRightMetricaRojo text12"
                      }
                      style={{ width: "70px" }}
                    >
                      {timerDate && timerDate}
                    </Col>
                  </Row>
                </OverlayTrigger>
              </Nav.Item>

              <Nav.Item className="align-items-center">
                <Row
                  className="align-items-center"
                  style={{
                    width: "140px",
                  }}
                >
                  <Col md={3} xs={3} lg={3} style={{ padding: 0, margin: 0 }}>
                    <OverlayTrigger
                      placement="bottom"
                      overlay={renderTooltip(
                        timer === 1
                          ? "Pausar captura de datos"
                          : "Encender captura de datos"
                      )}
                    >
                      <Button
                        className={
                          timer === 1
                            ? "btn btn-custom-start monserrat"
                            : "btn btn-custom-stop monserrat"
                        }
                        onClick={async () =>
                          await setTimer(timer === 1 ? 0 : 1)
                        }
                      >
                        {timer === 1 ? (
                          <i
                            className="bi bi-play"
                            style={{ fontSize: "15pt" }}
                          />
                        ) : (
                          <i
                            className="bi bi-stop iconStop"
                            style={{ fontSize: "15pt" }}
                          />
                        )}
                      </Button>
                    </OverlayTrigger>
                  </Col>
                  <Col
                    className="text14"
                    md={7}
                    xs={7}
                    lg={7}
                    style={{ padding: 0, margin: 0, color: "#fff" }}
                  >
                    {timer === 1 ? "En proceso" : "En pausa"}
                  </Col>

                  <Col
                    md={2}
                    xs={2}
                    lg={2}
                    style={{ alignItems: "center", padding: 0, margin: 0 }}
                  >
                    {timer === 0 ? (
                      <Spinner
                        animation="grow"
                        size="sm"
                        style={{ backgroundColor: "white" }}
                      />
                    ) : (
                      <Spinner
                        animation="grow"
                        size="sm"
                        style={{ visibility: "hidden" }}
                      />
                    )}
                  </Col>
                </Row>
              </Nav.Item>

              <Nav.Link
                href="#"
                onClick={() => handlerLogout()}
                title="Cerrar sesión"
              >
                <OverlayTrigger
                  placement="bottom"
                  overlay={renderTooltip("Cerrar sesión de usuario " + usuario)}
                >
                  <i
                    className="bi bi-box-arrow-right"
                    style={{ fontSize: "16pt" }}
                  />
                </OverlayTrigger>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
};

// <>
//   {/* {token && <Notification />} */}
//   {[false].map((expand) => (
//     <Navbar
//       collapseonselect="true"
//       fixed="top"
//       key={expand}
//       expand={expand}
//       className={topError ? "navbarError" : "navbar"}
//     >
//       <Container fluid className="align-items-center">
//         <Navbar.Brand href="/">
//           {" "}
//           <img src={logo} alt="..." className="navLogoImg" />
//         </Navbar.Brand>
//         {token && (
//           <Navbar.Toggle
//             className="pe-3 me-auto navbar-toggler1"
//             aria-controls={`offcanvasNavbar-expand-${expand}`}
//             onClick={togglemenu}
//           >
//             <i
//               onClick={togglemenu}
//               className="bi bi-list"
//               style={{
//                 fontSize: "25pt",
//                 color: "#f8f8f8",
//               }}
//             ></i>
//           </Navbar.Toggle>
//         )}
//         {token && (
//           <Nav.Link className="pe-2 mr-auto">
//             {" "}
//             <i
//               className="bi bi-bell"
//               style={{
//                 fontSize: "22pt",
//                 color: "#f8f8f8",
//               }}
//               onClick={() => navigate("/notificaciones")}
//             ></i>
//           </Nav.Link>
//         )}
//         {token && (
//           <>
//             <Navbar.Text className="pe-3 mr-auto align-items-center">
//               <Row className="rowMetrica" style={{ marginRight: "4%" }}>
//                 <Col
//                   md={"2"}
//                   className="colLeftMetrica text12"
//                   style={{ width: "120px" }}
//                 >
//                   <i className="bi bi-arrow-clock" /> Update
//                   <span style={{ fontSize: 10 }}>
//                     {"  (" + timermseg + " mseg)"}
//                   </span>
//                 </Col>
//                 <Col
//                   md={"9"}
//                   className={
//                     timer === 1
//                       ? "colRightMetrica text12"
//                       : "colRightMetrica colRightMetricaRojo text12"
//                   }
//                   style={{ width: "70px" }}
//                 >
//                   {timerDate && timerDate}
//                 </Col>
//               </Row>
//             </Navbar.Text>
//             <Navbar.Text className="pe-2 mr-auto align-items-center">
//               <Row
//                 className="align-items-center"
//                 style={{
//                   marginRight: "1%",
//                   width: "160px",
//                   //backgroundColor: "red",
//                 }}
//               >
//                 <Col md={3} xs={3} lg={3} style={{ padding: 0, margin: 0 }}>
//                   <OverlayTrigger
//                     placement="bottom"
//                     overlay={renderTooltip(
//                       timer === 1
//                         ? "Pausar captura de datos"
//                         : "Encender captura de datos"
//                     )}
//                   >
//                     <Button
//                       className={
//                         timer === 1
//                           ? "btn btn-custom-start monserrat"
//                           : "btn btn-custom-stop monserrat"
//                       }
//                       onClick={async () =>
//                         await setTimer(timer === 1 ? 0 : 1)
//                       }
//                     >
//                       {timer === 1 ? (
//                         <i
//                           className="bi bi-play"
//                           style={{ fontSize: "15pt" }}
//                         />
//                       ) : (
//                         <i
//                           className="bi bi-stop iconStop"
//                           style={{ fontSize: "15pt" }}
//                         />
//                       )}
//                     </Button>
//                   </OverlayTrigger>
//                 </Col>
//                 <Col
//                   className="text14"
//                   md={6}
//                   xs={6}
//                   lg={6}
//                   style={{ padding: 0, margin: 0, color: "#fff" }}
//                 >
//                   {timer === 1 ? "En proceso" : "En pausa"}
//                 </Col>

//                 <Col
//                   md={2}
//                   xs={2}
//                   lg={2}
//                   style={{ alignItems: "center", padding: 0, margin: 0 }}
//                 >
//                   {timer === 0 ? (
//                     <Spinner
//                       animation="grow"
//                       size="sm"
//                       style={{ backgroundColor: "white" }}
//                     />
//                   ) : (
//                     <Spinner
//                       animation="grow"
//                       size="sm"
//                       style={{ visibility: "hidden" }}
//                     />
//                   )}
//                 </Col>
//               </Row>
//             </Navbar.Text>
//           </>
//         )}

//         {token && (
//           <Navbar.Offcanvas
//             show={menuopen}
//             className="navMenuLeft"
//             id={`offcanvasNavbar-expand-${expand}`}
//             style={{ backgroundSize: "0", backgroundColor: "#595" }}
//             aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
//             placement="start"
//             onClick={() => setmenuopen(false)}
//           >
//             <Offcanvas.Header>
//               <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
//                 <Row>
//                   <Col>
//                     <img src={logo} alt="..." className="navLogoImgMenu" />
//                   </Col>
//                   <Col style={{ verticalAlign: "middle" }}>
//                     <i
//                       onClick={togglemenu}
//                       className="bi bi-x-circle-fill"
//                       style={{
//                         position: "absolute",
//                         right: 0,
//                         fontSize: "16pt",
//                         color: "#f8f8f8",
//                         paddingRight: "2%",
//                       }}
//                     ></i>
//                   </Col>
//                 </Row>
//               </Offcanvas.Title>
//             </Offcanvas.Header>
//             <Offcanvas.Body>
//               <Nav className="justify-content-end flex-grow-1 pe-3">
//                 <OverlayTrigger
//                   placement="right"
//                   overlay={renderTooltip("Mostrar u ocultar métricas")}
//                 >
//                   <Nav.Link
//                     href="#"
//                     onClick={() => handlerMetricas()}
//                     style={{ width: 100 }}
//                   >
//                     Métricas
//                   </Nav.Link>
//                 </OverlayTrigger>

//                 <OverlayTrigger
//                   placement="right"
//                   overlay={renderTooltip("Mostrar u ocultar configuración")}
//                 >
//                   <Nav.Link
//                     href="#"
//                     onClick={() => handlerOptions()}
//                     style={{ width: 150 }}
//                   >
//                     Configuraciones
//                   </Nav.Link>
//                 </OverlayTrigger>
//               </Nav>
//               <Form className="d-flex" style={{ marginTop: "5%" }}>
//                 <OverlayTrigger
//                   placement="bottom"
//                   overlay={renderTooltip("Cerrar sesión de usuario")}
//                 >
//                   <Button
//                     data-bs-dismiss="offcanvas"
//                     variant="outline-success"
//                     className="btn-logout text16"
//                     onClick={() => handlerLogout()}
//                   >
//                     {usuario}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                     <i
//                       className="bi bi-box-arrow-right"
//                       style={{
//                         fontSize: "14pt",
//                         color: "#001f51",
//                       }}
//                     ></i>
//                   </Button>
//                 </OverlayTrigger>
//               </Form>
//             </Offcanvas.Body>
//           </Navbar.Offcanvas>
//         )}
//       </Container>
//     </Navbar>
//   ))}
// </>
