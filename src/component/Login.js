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
import { Loading } from "./Loading";

export const Login = () => {
  const {
    getLoginToken,
    token,
    credencialesInvalidas,
    setTimer,
    loading,
    cleanError,
  } = useContext(GlobalContext);

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
    if (token) {
      navigate("/home");
    } else {
      setTimer(0);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="contentLogin">
      {!loading ? (
        <Card className="loginForm">
          <CardBody>
            <Form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "5%" }}>
              <FormGroup className="mb-4">
                <Row>
                  <Col md={2} lg={2} xs={3}>
                    <Form.Label className="formlabel">Email</Form.Label>
                  </Col>
                  <Col md={8} lg={8} xs={9}>
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
                </Row>
              </FormGroup>
              <FormGroup className="mb-3">
                <Row>
                  <Col md={2} lg={2} xs={3} style={{ margin: 0 }}>
                    <Form.Label className="formlabel">Password</Form.Label>
                  </Col>
                  <Col md={8} lg={8} xs={7}>
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
                  <Col md={2} lg={2} xs={2}>
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
              <Row>
                <Col
                  md="12"
                  style={{ margin: 0, textAlign: "center", padding: 0 }}
                >
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
                    marginTop: "3%",
                    textAlign: "center",
                    itemsAlign: "center",
                    padding: 0,
                  }}
                >
                  <Row style={{ textAlign: "center", padding: 0 }}>
                    <Col md="12" style={{ textAlign: "center", padding: 0 }}>
                      <Button
                        className="btn btn-custom monserrat"
                        style={{ width: "160px" }}
                        type="submit"
                      >
                        Ingresar
                      </Button>
                    </Col>
                  </Row>
                </FormGroup>
              </Row>
            </Form>
          </CardBody>
        </Card>
      ) : (
        <Loading />
      )}
    </div>
  );
};
