import React, { useContext, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ProgressBar from "react-bootstrap/ProgressBar";
// import * as moment from "moment";
// import "moment/locale/es";
import { GlobalContext } from "../context/GlobalContext";
import Form from "react-bootstrap/Form";
import { Tooltip, Button } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

export const Metricas = () => {
  const {
    //token,
    timer,
    getPanelTopMetricas,
    timermseg,
    metricas,
    setPanelConfig,
    setShowMetricas,
  } = useContext(GlobalContext);
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  useEffect(() => {
    async function init() {
      if (timer === 1) {
        if (metricas) {
          await sleep(timermseg);
        }
        await getPanelTopMetricas();
      }
    }
    init();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metricas, timer]);

  const handleConfigSwitch = async (event, item) => {
    await setPanelConfig(item, event.target.checked);
  };

  const renderTooltip = (title) => <Tooltip>{title}</Tooltip>;

  const colorMetricaTasa = (valor) => {
    if (valor <= 150) {
      return "#7DBA30";
    } else if (valor > 150 && valor <= 400) {
      return "yellow";
    } else if (valor > 400 && valor <= 800) {
      return "orange";
    } else {
      return "red";
    }
  };
  return (
    <Row style={{ height: 50 }}>
      <Row className="rowMetricas align-items-center">
        <Row className="rowMetrica" style={{ width: "160px", height: "30px" }}>
          <Col
            md={"2"}
            className="colLeftMetrica text12"
            style={{ width: "80px", marginLeft: 10 }}
          >
            Auditoría
          </Col>
          <Col
            md={"9"}
            className="colRightMetricaCheck"
            style={{
              width: "60px",
            }}
          >
            {metricas && (
              <Form>
                <Form.Check
                  type="switch"
                  checked={JSON.parse(metricas.auditIsOn)}
                  onChange={(i) => handleConfigSwitch(i, "audit")}
                  //label={JSON.parse(metricas.auditoriaIsOn) ? "on" : "off"}
                />
              </Form>
            )}
          </Col>
        </Row>

        <Row
          className="rowMetrica"
          style={{ maxWidth: "160px", height: "30px" }}
        >
          <Col
            md={"2"}
            className="colLeftMetrica text12"
            style={{ width: "80px" }}
          >
            Monitores
          </Col>
          <Col
            md={"9"}
            className="colRightMetrica text12"
            style={{ maxWidth: 60 }}
          >
            {metricas && JSON.parse(metricas.monitores)}
          </Col>
        </Row>

        <Row className="rowMetrica" style={{ width: "160px", height: "30px" }}>
          <Col
            md={"2"}
            className="colLeftMetrica text12"
            style={{ width: "60px" }}
          >
            Pool
          </Col>
          <Col
            md={"10"}
            className="colRightMetrica text12"
            style={{ maxWidth: 70 }}
          >
            {metricas && JSON.parse(metricas.pool)}
          </Col>
        </Row>
        <OverlayTrigger
          placement="bottom"
          overlay={renderTooltip(
            "Transferencia de paquetes por milisegundo, a mayaor valor mas probabilidad de saturación"
          )}
        >
          <Row
            className="rowMetrica"
            style={{ width: "170px", height: "30px" }}
          >
            <Col
              md={"2"}
              className="colLeftMetrica text12"
              style={{ width: "80px" }}
            >
              {/* <i className="bi bi-arrow-left-right" /> */}
              Tasa
              <span style={{ fontSize: 9, color: "#555" }}>{"  "}(ppm)</span>
            </Col>
            <Col
              md={"10"}
              className="colRightMetrica text12"
              style={{
                backgroundColor: colorMetricaTasa(
                  metricas && JSON.parse(metricas.tasa)
                ),

                color:
                  colorMetricaTasa(metricas && JSON.parse(metricas.tasa)) ===
                    "red" && "#fff",

                color:
                  colorMetricaTasa(metricas && JSON.parse(metricas.tasa)) ===
                    "#7DBA30" && "#fff",

                maxWidth: 70,
              }}
            >
              {metricas && JSON.parse(metricas.tasa)}
            </Col>
          </Row>
        </OverlayTrigger>

        <Row className="rowMetrica" style={{ width: "600px", height: "30px" }}>
          <Col
            md={"2"}
            className="colLeftMetrica text12"
            style={{ width: "80px" }}
          >
            Bridge
          </Col>
          <Col
            md={"2"}
            className="colRightMetricaCheck colRightMetricaCheckDato"
            style={{ width: "60px" }}
          >
            {metricas && (
              <Form>
                <Form.Check
                  type="switch"
                  checked={JSON.parse(metricas.bridgeIsOn)}
                  onChange={(i) => handleConfigSwitch(i, "bridge")}
                  //label={JSON.parse(metricas.auditoriaIsOn) ? "on" : "off"}
                />
              </Form>
            )}
          </Col>

          <Col
            md={"2"}
            className="colLeftMetricaDato text12"
            style={{ width: "60px" }}
          >
            Descart
          </Col>
          <Col
            md={"2"}
            className={
              metricas && metricas.bridgeIsOn
                ? "colRightMetricaDato text12"
                : "colRightMetrica text12"
            }
            style={{ width: "50px" }}
          >
            {metricas && JSON.parse(metricas.bridgeDescartados)}
          </Col>

          {metricas && metricas.bridgeIsOn && (
            <>
              <Col
                md={"2"}
                className="colLeftMetricaDato text12"
                style={{ width: "50px" }}
              >
                Cola
              </Col>
              <Col
                md={"2"}
                className="colRightMetricaDato text12"
                style={{ width: "50px" }}
              >
                {metricas && JSON.parse(metricas.bridgeCola)}
              </Col>
            </>
          )}
          {metricas && metricas.bridgeIsOn && (
            <>
              <Col
                md={"2"}
                className="colLeftMetricaDato text12"
                style={{ width: "60px" }}
              >
                Ingesta
              </Col>
              <Col
                md={"2"}
                className="colRightMetricaProgressBar text12"
                style={{ maxWidth: "200px" }}
              >
                {metricas && (
                  <>
                    <ProgressBar
                      variant="progressbar"
                      style={{
                        paddingLeft: "0px",
                        height: 18,
                        border: "1px solid #ccc",
                      }}
                      now={JSON.parse(metricas.bridgeIngestaProgreso)}
                      label={
                        " " +
                        JSON.parse(JSON.stringify(metricas.bridgeIngestaStatus))
                      }
                    />
                  </>
                )}
              </Col>
            </>
          )}
        </Row>

        <Row
          className="rowMetrica  align-items-center"
          style={{
            width: "20px",
            height: "40px",
            position: "absolute",
            right: 20,
          }}
        >
          <Col>
            <Button
              className={"btn btn-custom-close"}
              onClick={() => setShowMetricas()}
            >
              <i className="bi bi-x" style={{ fontSize: "16pt" }}></i>
            </Button>
          </Col>
        </Row>
      </Row>
    </Row>
  );
};
