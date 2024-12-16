import axios from "axios";
import { decryptAES } from "./helpers";
import secureLocalStorage from "react-secure-storage";

var instance = axios.create();
instance.defaults.baseURL = process.env.REACT_APP_APIURL;
instance.defaults.timeout = 10000;

instance.interceptors.request.use(
  async (config) => {
    const token = secureLocalStorage.getItem("token");

    //if (token) config.headers["Authorization"] = "Bearer " + decryptAES(token);

    config.headers["Content-Type"] = "application/json";
    config.headers["Access-Control-Allow-Headers"] = "*";
    config.headers["Access-Control-Allow-Origin"] = "*";
    config.headers["Access-Control-Allow-Methods"] = "GET,PUT,POST,DELETE";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    var status = "0";

    //  let message = "Error del sistema. Verifique su conexión";
    //const err = error.toString();

    // console.error("Error Calling API Rest: " + error);

    console.error(JSON.stringify(error));

    if (!error.response) {
      return Promise.reject({ message: JSON.stringify(error), status: 0 });
    }

    if (error && (error.status || error.response.status) === 500) {
      status = "500";
      //AuthService.logout();
    }

    if (error && (error.status || error.response.status) === 400) {
      status = "400";
    }

    if (error && (error.status || error.response.status) === 401) {
      status = "401";
      console.log("401 Credenciales Invalidas");
      //alert("401")
      secureLocalStorage.clear();
    }

    if (error && (error.status || error.response.status) === 402) {
      status = "402";
    }

    if (error && (error.status || error.response.status) === 403) {
      status = "403";
    }

    if (error && (error.status || error.response.status) === 404) {
      status = "404";
    }

    //message = error.toString();

    return Promise.reject({ status: status, error: error });
  }
);

export default instance;
