import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { PanelLeft } from "./PanelLeft";
import { PanelRight } from "./PanelRight";
import { Configuracion } from "./Configuracion";
// import { useNavigate } from "react-router-dom";
import { Metricas } from "./Metricas";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

export const Home = () => {
  // const navigate = useNavigate();
  const [widthResize, setwidthResize] = useState(0);

  const { showopciones, showmetricas, setTimer, showlogs, loading, metricas } =
    useContext(GlobalContext);

  useEffect(() => {
    async function init() {
      console.log(window.screen.height);
      setTimer(1);
    }

    init();

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="panelContainer" fluid>
      {/* <Row>{parseInt(widthResize)}</Row> */}
      <Row>
        <Col>
          {showopciones === 1 && <Configuracion />}
          {showmetricas === 1 && <Metricas />}
        </Col>
      </Row>

      <Row>
        <PanelGroup
          autoSaveId="persistence"
          direction="horizontal"
          set
          style={{ margin: 0, padding: 0, marginLeft: 6, paddingRight: 12 }}
        >
          <Panel>
            <Col
              style={{
                paddingRight: 0,
                paddingLeft: 0,
                marginTop: 6,
              }}
              // md={showlogs === 0 && 12}
              // lg={showlogs === 0 && 12}
              xs={12}
            >
              <PanelLeft />
            </Col>
          </Panel>
          <PanelResizeHandle />
          {showlogs === 1 ? (
            <Panel>
              <Col
                style={{
                  paddingRight: 0,
                  paddingLeft: 7,
                  marginTop: 6,
                }}
                xs={12}
                // md={7}
                // lg={7}
              >
                <PanelRight />
              </Col>
            </Panel>
          ) : null}
        </PanelGroup>
      </Row>
    </Container>
  );
};
