import React from "react";
import { Spinner } from "react-bootstrap";
//import loading from '../assets/img/loading.gif';
export const Loading = () => {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "5%",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner style={{ width: "2rem", height: "2rem", color: "green" }} />
      {" Cargando.... "}
    </div>
  );
};
