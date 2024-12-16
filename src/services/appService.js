// import httpAxios from "./http-common";
// import { carrosJSON } from "./datosJSON";
//import Cookie from "universal-cookie";

const getLoginToken = async (email, pwd) => {
  // var data = {
  //   email: email,
  //   pwd: pwd,
  // };
  // return await httpAxios.post("/auth/acceso_login", data);

  if (email === "admin@armis.com" && pwd === "123456") {
    return Promise.resolve({
      data: {
        token: "selogueoperfectamente15500",
        usuario: "Mario",
        dni: "27.872.828",
      },
    });
  } else return Promise.reject(new Error());
};

const getPanelTopMetricas = async () => {
  return fetch(process.env.REACT_APP_APIURL + "/monitorUpdateTop", {
    method: "post",
    headers: {
      //"Access-Control-Allow-Headers": "*",
      // "Access-Control-Allow-Origin": "*",
      // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
    },
  }).then((response) => response.json());
  //return await httpAxios.post("/monitorUpdateLeft");
};

const getPanelLeftPrestadores = async () => {
  return fetch(process.env.REACT_APP_APIURL + "/monitorUpdateLeft", {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      //"Access-Control-Allow-Headers": "*",
      // "Access-Control-Allow-Origin": "*",
      // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
    },
  }).then((response) => response.json());
};

const getPanelRightLogs = async (id) => {
  //alert("services" + id);

  return fetch(process.env.REACT_APP_APIURL + "/monitorUpdateRight", {
    method: "post",
    headers: {
      //"Access-Control-Allow-Headers": "*",
      // "Access-Control-Allow-Origin": "*",
      // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
    },

    body: new URLSearchParams({
      rowIndex: id,
    }).toString(),
  }).then((response) => response.json());
  //return await httpAxios.post("/monitorUpdateLeft");
};

const AppService = {
  getLoginToken,
  getPanelTopMetricas,
  getPanelLeftPrestadores,
  getPanelRightLogs,
};

export default AppService;
