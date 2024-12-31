import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import {
  Button,
  Form,
  FormGroup,
  Alert,
  Col,
  Row,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";

export const Configuracion = () => {
  const {
    setTimerSeconds,
    timerSeconds,
    setShowOpciones,
    setReintentFetchMseg,
    reintentFetchMseg,
  } = useContext(GlobalContext);
  const [procesado, setProcesado] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    control,
    //reset,
  } = useForm({
    defaultValues: {
      timer: timerSeconds,
    },
  });

  const onSubmit = async (data) => {
    await setTimerSeconds(data.timer);
    await setReintentFetchMseg(data.reintent);
    setProcesado(true);
  };

  const renderTooltip = (title) => <Tooltip>{title}</Tooltip>;

  return (
    <Row style={{ height: 45 }}>
      <Row className="rowOptions align-items-center">
        <Form onSubmit={handleSubmit(onSubmit)} className="align-items-center">
          <FormGroup className="align-items-center">
            <Row className="rowMetrica align-items-center">
              <Col
                md={"2"}
                className=" text12 align-items-center"
                style={{ width: "130px", color: "#000", textAlign: "right" }}
              >
                Refresco (mseg):
              </Col>
              <OverlayTrigger
                placement="bottom"
                overlay={renderTooltip(
                  "Tiempo en que se consulta al servidor por los datos"
                )}
              >
                <Col md={6} className="text12" style={{ maxWidth: 90 }}>
                  <Controller
                    name="timer"
                    control={control}
                    defaultValue={timerSeconds}
                    rules={{
                      required: true,
                      pattern: {
                        value: /^[0-9]*$/,
                      },
                    }}
                    render={({ field }) => (
                      <Form.Control
                        onClick={() => setProcesado(false)}
                        type="number"
                        min={0}
                        maxLength={5}
                        placeholder="mseg"
                        className="form-control-input-text"
                        style={{
                          margin: 0,
                          padding: 0,
                          textAlign: "center",
                          width: "80px",
                        }}
                        {...field}
                      />
                    )}
                  />
                </Col>
              </OverlayTrigger>

              <Col
                md={"2"}
                className=" text12 align-items-center"
                style={{ width: "210px", color: "#000", textAlign: "center" }}
              >
                Reintento ante errores (mseg)
              </Col>
              <OverlayTrigger
                placement="bottom"
                overlay={renderTooltip(
                  "Tiempo en que se reintenta conectar al servidor frente a un error"
                )}
              >
                <Col
                  md={6}
                  className="text12"
                  style={{
                    maxWidth: 90,
                    textAlign: "left",
                  }}
                >
                  <Controller
                    name="reintent"
                    control={control}
                    defaultValue={reintentFetchMseg}
                    rules={{
                      required: true,
                      pattern: {
                        value: /^[0-9]*$/,
                      },
                    }}
                    render={({ field }) => (
                      <Form.Control
                        onClick={() => setProcesado(false)}
                        type="number"
                        maxLength={5}
                        min={0}
                        placeholder="mseg"
                        className="form-control-input-text"
                        style={{
                          margin: 0,
                          padding: 0,
                          textAlign: "center",
                          width: "80px",
                        }}
                        {...field}
                      />
                    )}
                  />
                </Col>
              </OverlayTrigger>
              <Col
                md={2}
                lg={2}
                sm={2}
                style={{
                  alignContent: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 60,
                }}
                className=" text14"
              >
                <Button
                  className="btn btn-custom_opciones monserrat"
                  type="submit"
                >
                  <i className="bi bi-check-lg" style={{ fontSize: "12pt" }} />
                </Button>
              </Col>

              <Col
                md={6}
                className="align-items-center"
                style={{
                  alignItems: "center",
                }}
              >
                {errors.timer && (
                  <Row
                    className="align-items-center"
                    style={{
                      maxWidth: 300,
                      alignItems: "center",
                      height: 45,
                    }}
                  >
                    <Alert
                      size="sm"
                      variant="danger"
                      className="monserrat"
                      style={{
                        padding: 5,
                        margin: 7,
                        color: "#000",
                        fontSize: "8pt",
                        fontWeight: "none",
                      }}
                    >
                      Ingrese el valor de refresco en milisegundos <br></br>
                      mayor que 1000
                    </Alert>
                  </Row>
                )}
                {errors.reintent && (
                  <Row
                    className="align-items-center"
                    style={{
                      maxWidth: 300,
                      alignItems: "center",
                      height: 45,
                    }}
                  >
                    <Alert
                      size="sm"
                      variant="danger"
                      className="monserrat"
                      style={{
                        padding: 5,
                        margin: 7,
                        color: "#000",
                        fontSize: "8pt",
                        fontWeight: "none",

                        textAlign: "center",
                      }}
                    >
                      Reintento en milisegundos mayor que 1000
                    </Alert>
                  </Row>
                )}
                {procesado && (
                  <Row
                    className="align-items-center"
                    style={{
                      maxWidth: 300,
                      alignItems: "center",
                      height: 45,
                    }}
                  >
                    <Alert
                      size="sm"
                      variant="success"
                      className="monserrat align-items-center"
                      style={{
                        padding: 5,
                        margin: 7,
                        alignItems: "center",
                        color: "#000",
                        fontSize: "8pt",
                        fontWeight: "none",
                      }}
                    >
                      <Row
                        style={{
                          margin: 0,
                          width: "300px",
                          textAlign: "center",
                        }}
                      >
                        <Col
                          md={10}
                          lg={10}
                          sm={10}
                          style={{
                            textAlign: "center",
                            padding: 0,
                            alignContent: "center",
                          }}
                        >
                          Datos guardados correctamente
                        </Col>
                        <Col
                          md={2}
                          lg={2}
                          sm={2}
                          style={{ textAlign: "center", padding: 0 }}
                        >
                          <i
                            className="bi bi-x-lg"
                            onClick={() => setProcesado(false)}
                            style={{ fontSize: "9pt" }}
                          />
                        </Col>
                      </Row>
                    </Alert>
                  </Row>
                )}
              </Col>
            </Row>
          </FormGroup>
        </Form>
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
        <Col className="rowMetrica  align-items-center">
          <Button
            className={"btn btn-custom-close"}
            onClick={() => setShowOpciones()}
          >
            <i className="bi bi-x" style={{ fontSize: "16pt" }}></i>
          </Button>
        </Col>
      </Row>
    </Row>
  );
};