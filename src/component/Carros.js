/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { Navigate  } from 'react-router-dom';
import { GlobalContext } from "../context/GlobalContext";

import { CardBody, Card, ListGroup } from "react-bootstrap";
//import { useForm, Controller } from "react-hook-form";

export const Carros = () => {
  const { usuario } = useContext(GlobalContext);

  const navigate = useNavigate();

  //const [carroSelected, setCarroSelected] = useState();

  // useEffect(() => {
  //   async function init() {
  //     await cleanPaciente();

  //     if (
  //       carro !== null &&
  //       carro !== "null" &&
  //       carro !== undefined &&
  //       carro.id !== null &&
  //       carro.id !== undefined &&
  //       carro.id !== "null"
  //     )
  //       navigate("/home");
  //     else await getCarros(dni);
  //   }

  //   init();
  //   //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const goHome = async (carro) => {
  //   await setCarro(carro);
  //   setCarroSelected(carro);
  //   navigate("/home");
  // };

  return (
    <div className="content">
      <Card className="carrosCard">
        <CardBody>
          <div className="text10 textAzul">
            Monitor
            <br></br>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
