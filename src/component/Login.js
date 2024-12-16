import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

import {
  Button,
  Form,
  FormGroup,
  Alert,
  Col,
  CardBody,
  Card,
  Row,
} from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";

import secureLocalStorage from "react-secure-storage";

export const Login = () => {
  const { getLoginToken, token, credencialesInvalidas, setTimer } =
    useContext(GlobalContext);

  const navigate = useNavigate();

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const {
    handleSubmit,
    formState: { errors },
    control,
    //reset,
  } = useForm({
    defaultValues: {
      email: secureLocalStorage.getItem("rememberUser")
        ? secureLocalStorage.getItem("rememberUser")
        : "",
      password: "",
      emailforget: "",
    },
  });

  const onSubmit = async (data) => {
    secureLocalStorage.setItem("rememberUser", data.email);
    await getLoginToken(data.email, data.password);
    navigate("/home");
  };

  useEffect(() => {
    setTimer(0);
    if (token) {
      navigate("/home");
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="contentLogin">
      <Card className="loginForm">
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup className="mb-3">
              <Col>
                <Form.Label className="formlabel">Email</Form.Label>
              </Col>
              <Col>
                <Controller
                  name="email"
                  control={control}
                  defaultValue={""}
                  rules={{
                    required: true,
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Please enter a valid email",
                    },
                  }}
                  render={({ field }) => (
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      className="form-control-input-text"
                      style={{ margin: 0 }}
                      {...field}
                    />
                  )}
                />
                {errors.email && (
                  <Alert
                    size="sm"
                    color="danger"
                    className="monserrat"
                    style={{
                      padding: 5,
                      marginTop: 5,
                      color: "#000",
                      fontSize: "8pt",
                      fontWeight: "none",
                    }}
                  >
                    Ingrese un email válido
                  </Alert>
                )}
              </Col>
            </FormGroup>
            <FormGroup className="mb-3">
              <Row>
                <Col md="12" style={{ margin: 0 }}>
                  <Form.Label className="formlabel">Password</Form.Label>
                </Col>
                <Col md="11">
                  <Controller
                    name="password"
                    control={control}
                    defaultValue={""}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Form.Control
                        type={passwordShown ? "text" : "password"}
                        className="form-control-input-text"
                        style={{ margin: 0 }}
                        {...field}
                      />
                    )}
                  />
                  {errors.password && (
                    <Alert
                      size="sm"
                      color="danger"
                      className="monserrat"
                      style={{
                        padding: 5,
                        marginTop: 5,
                        color: "#000",
                        fontSize: "8pt",
                      }}
                    >
                      Ingrese su password
                    </Alert>
                  )}
                </Col>
                <Col md="1">
                  {passwordShown ? (
                    <i
                      onClick={togglePasswordVisiblity}
                      className="bi bi-eye-fill"
                      style={{ fontSize: "18pt" }}
                    ></i>
                  ) : (
                    <i
                      onClick={togglePasswordVisiblity}
                      className="bi bi-eye-slash-fill"
                      style={{ fontSize: "18pt" }}
                    ></i>
                  )}
                </Col>
              </Row>
            </FormGroup>

            <Col md="12" style={{ margin: 0, textAlign: "center", padding: 0 }}>
              {credencialesInvalidas && (
                <Alert
                  size="sm"
                  color="white"
                  className="monserrat"
                  style={{ color: "red", fontSize: "10pt" }}
                >
                  Usuario y/o contraseña no válidos
                </Alert>
              )}
            </Col>

            <FormGroup
              style={{
                marginTop: "5%",
                textAlign: "center",
                itemsAlign: "center",
                padding: 0,
              }}
            >
              <Row style={{ textAlign: "center", padding: 0 }}>
                <Col md="12" style={{ textAlign: "center", padding: 0 }}>
                  <Button
                    className="btn btn-custom monserrat"
                    style={{ width: "185px" }}
                    type="submit"
                  >
                    Ingresar
                  </Button>
                </Col>
              </Row>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};
