import React, { useReducer, createContext, useEffect } from "react";
import AppService from "../services/appService";
//import { encryptAES } from "../services/Crypto-Helper";
import secureLocalStorage from "react-secure-storage";
//import Cookie from "universal-cookie";
//import * as moment from "moment";
import "moment/locale/es";

export const GlobalContext = createContext();

let initialState = {
  token: null,
  usuario: null,
  credencialesInvalidas: null,
  prestadores: null,
  prestadorId: null,
  metricas: null,
  logs: null,
  timer: 1,
  timerSeconds: 2000,
  timerDate: null,
  showopciones: 0,
  loading: null,
  //notificaciones: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UNSET_USUARIO_AUTENTICADO":
      return {
        ...state,
        token: null,
        usuario: null,
      };

    case "SET_USUARIO_AUTENTICADO":
      return {
        ...state,
        token: action.payload.token,
        usuario: action.payload.usuario,
        credencialesInvalidas: "",
      };

    case "CREDENCIALES_INVALIDAS":
      return {
        ...state,
        credencialesInvalidas: action.payload,
      };

    case "SET_ERROR":
      return {
        ...state,
        errores: action.payload,
      };

    case "LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "SET_PRESTADORES":
      return {
        ...state,
        prestadores: action.payload,
      };

    case "SET_LOGS":
      return {
        ...state,
        logs: action.payload,
      };

    case "SET_METRICAS":
      return {
        ...state,
        metricas: action.payload,
      };

    case "SET_TIMER":
      return {
        ...state,
        timer: action.payload,
      };

    case "SET_TIMER_SECONDS":
      return {
        ...state,
        timerSeconds: action.payload,
      };

    case "SET_TIMER_DATE":
      return {
        ...state,
        timerDate: action.payload,
      };

    case "SET_PRESTADOR_ID":
      return {
        ...state,
        prestadorId: action.payload,
      };

    case "SET_SHOW_OPCIONES":
      return {
        ...state,
        showopciones: action.payload,
      };

    default:
      return state;
  }
};

export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // function saveInitialState() {
  //   sessionStorage.setItem('initialState', JSON.stringify(state))
  // }

  useEffect(() => {
    async function init() {
      let _token = secureLocalStorage.getItem("token");
      let _usuario = secureLocalStorage.getItem("usuario");

      const payload = {
        token: _token ? _token : null,
        usuario: _usuario ? _usuario : null,
      };

      dispatch({
        type: "SET_USUARIO_AUTENTICADO",
        payload: payload,
      });
    }

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function setError(error) {
    console.error(error);
    console.error(
      "Se ha producido un error. Reintente o cierre la sesión y reingrese sus credenciales"
    );

    dispatch({
      type: "SET_ERROR",
      payload: error,
    });
    //saveInitialState();
  }

  function cleanError() {
    dispatch({
      type: "SET_ERROR",
      payload: null,
    });
    // saveInitialState();
  }

  // async function clearNotificacion() {
  //   dispatch({
  //     type: "CLEAR_NOTIFICACION",
  //     payload: null,
  //   });
  // }

  async function getLoginToken(email, pwd) {
    dispatch({
      type: "LOADING",
      payload: true,
    });

    await AppService.getLoginToken(email, pwd)
      .then((response) => {
        // alert(JSON.stringify(response.data.token));

        let token = response.data.token;

        secureLocalStorage.setItem("token", token);
        secureLocalStorage.setItem("usuario", response.data.usuario);

        dispatch({
          type: "SET_TIMER",
          payload: 1,
        });

        dispatch({
          type: "SET_USUARIO_AUTENTICADO",
          payload: response.data,
        });
      })
      .catch((error) => {
        // if (error.status === 401 || error.status === "401") {
        dispatch({
          type: "CREDENCIALES_INVALIDAS",
          payload: "Usuario y/o constraseña no válidos",
        });
        // } else setError(JSON.stringify(error));
      })
      .finally(() => {
        dispatch({
          type: "LOADING",
          payload: false,
        });
      });
  }

  async function getPanelLeftPrestadores() {
    dispatch({
      type: "LOADING",
      payload: true,
    });

    await AppService.getPanelLeftPrestadores()
      .then((response) => {
        // alert(JSON.stringify(response));
        dispatch({
          type: "SET_PRESTADORES",
          payload: response,
        });
      })
      .catch((error) => {
        setError(JSON.stringify(error));
      })
      .finally(() => {
        dispatch({
          type: "LOADING",
          payload: false,
        });
      });
  }

  async function getPanelRightLogs(id) {
    //alert("context right" + id)
    dispatch({
      type: "LOADING",
      payload: true,
    });

    await AppService.getPanelRightLogs(id)
      .then((response) => {
        // alert(JSON.stringify(response));
        dispatch({
          type: "SET_LOGS",
          payload: response,
        });
      })
      .catch((error) => {
        setError(JSON.stringify(error));
      })
      .finally(() => {
        dispatch({
          type: "LOADING",
          payload: false,
        });
      });
  }

  async function getPanelTopMetricas() {
    dispatch({
      type: "LOADING",
      payload: true,
    });

    await AppService.getPanelTopMetricas()
      .then((response) => {
        // alert(JSON.stringify(response));
        dispatch({
          type: "SET_METRICAS",
          payload: response,
        });
      })
      .catch((error) => {
        setError(JSON.stringify(error));
      })
      .finally(() => {
        dispatch({
          type: "LOADING",
          payload: false,
        });
      });
  }

  async function setLogout() {
    dispatch({
      type: "UNSET_USUARIO_AUTENTICADO",
    });

    secureLocalStorage.removeItem("token");
    secureLocalStorage.removeItem("usuario");
  }

  function setTimer(flag) {
    dispatch({
      type: "SET_TIMER",
      payload: flag,
    });
  }

  function setTimerDate(date) {
    dispatch({
      type: "SET_TIMER_DATE",
      payload: date,
    });
  }

  function setTimerSeconds(date) {
    dispatch({
      type: "SET_TIMER_SECONDS",
      payload: date,
    });
  }

  function setPrestadorId(id) {
    // alert("set prestador" + id);
    dispatch({
      type: "SET_PRESTADOR_ID",
      payload: id,
    });
  }

  function setClearLogs(id) {
    // alert("set prestador" + id);
    dispatch({
      type: "SET_LOGS",
      payload: null,
    });
  }

  function setShowOpciones(flag) {
    dispatch({
      type: "SET_SHOW_OPCIONES",
      payload: flag,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        getLoginToken,
        setLogout,
        setError,
        cleanError,
        //clearNotificacion,
        getPanelLeftPrestadores,
        getPanelTopMetricas,
        getPanelRightLogs,
        setTimer,
        setTimerSeconds,
        setTimerDate,
        setPrestadorId,
        setShowOpciones,
        setClearLogs,
        usuario: state.usuario,
        token: state.token,
        credencialesInvalidas: state.credencialesInvalidas,
        errores: state.errores,
        loading: state.loading,
        prestadores: state.prestadores,
        prestadorId: state.prestadorId,
        logs: state.logs,
        metricas: state.metricas,
        timer: state.timer,
        timerSeconds: state.timerSeconds,
        timerDate: state.timerDate,
        showopciones: state.showopciones,

        //notificaciones: state.notificaciones,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
