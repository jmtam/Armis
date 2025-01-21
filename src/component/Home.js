import React, { useContext, useEffect } from "react";
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
import { useResizeDetector } from "react-resize-detector";
// import DataTable from "react-data-table-component";
// import { tableStyle } from "../services/helpers";

export const Home = () => {
  // const navigate = useNavigate();

  const { showopciones, showmetricas, setTimer, showlogs } =
    useContext(GlobalContext);

  useEffect(() => {
    async function init() {
      //console.log(window.screen.height);
      setTimer(1);
      console.clear();
    }

    init();

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { width, height, ref } = useResizeDetector({});

  return (
    <Container ref={ref} className="panelContainer" fluid>
      <Row>
        <Col>
          {showopciones || showopciones === 1 ? (
            <Configuracion windowsH={height} windowsW={width} />
          ) : null}
          {showmetricas || showmetricas === 1 ? <Metricas /> : null}
        </Col>
      </Row>

      <Row>
        <PanelGroup
          autoSaveId="persistence"
          direction="horizontal"
          style={{
            margin: 0,
            padding: 0,
            marginLeft: 6,
            paddingRight: 12,
            marginTop: 5,
          }}
        >
          <Panel id="integraciones" order={1}>
            <Col
              style={{
                paddingRight: 0,
                paddingLeft: 0,
                marginTop: 6,
              }}
              // md={showlogs === 0 && 12}
              // lg={showlogs === 0 && 12}
              //xs={12}
            >
              <PanelLeft windowsH={height} />
            </Col>
          </Panel>
          <PanelResizeHandle />
          {showlogs || showlogs === 1 ? (
            <Panel id="logs" order={2}>
              <Col
                style={{
                  paddingRight: 0,
                  paddingLeft: 7,
                  marginTop: 6,
                }}
                //xs={12}
                // md={7}
                // lg={7}
              >
                <PanelRight windowsH={height} />
              </Col>
            </Panel>
          ) : null}
        </PanelGroup>
      </Row>
    </Container>
  );
};
