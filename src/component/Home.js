import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { PanelLeft } from "./PanelLeft";
import { PanelRight } from "./PanelRight";
import { PanelTop } from "./PanelTop";
// import Badge from "react-bootstrap/Badge";
// import Button from "react-bootstrap/Button";
// import { ListGroup } from "react-bootstrap";
// import { confirmAlert } from "react-confirm-alert";

export const Home = () => {
  // const navigate = useNavigate();

  const { showopciones, setTimer } = useContext(GlobalContext);

  useEffect(() => {
    async function init() {
      setTimer(1);
    }

    init();

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const toggleGoPaciente = async (item) => {
  //   if (item) {
  //     await getPacienteByDni(item.dni);
  //     navigate("/paciente");
  //   }
  // };

  // const goQrReader = () => {
  //   navigate("/qrscreen");
  // };

  // const cambiarCarro = () => {
  //   confirmAlert({
  //     message: "¿ Desea cambiar de carro ?",
  //     buttons: [
  //       {
  //         label: "Continuar",
  //         onClick: async () => {
  //           await cleanCarro(null);
  //           navigate("/carros");
  //         },
  //       },
  //       {
  //         label: "Cancelar",
  //         onClick: () => null,
  //       },
  //     ],
  //   });
  // };

  // const goStock = () => {
  //   navigate("/stock");
  // };

  return (
    <Container className="panelContainer" fluid>
      {showopciones === 1 && (
        <Row className="rowOptions">
          <Col>
            <PanelTop />
          </Col>
        </Row>
      )}
      <Row>
        <Col md={5} xs={12} lg={5}>
          <PanelLeft />
        </Col>
        <Col md={7} xs={12} lg={7}>
          <PanelRight />
        </Col>
      </Row>
    </Container>
  );
};
