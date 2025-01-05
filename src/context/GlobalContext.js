import React, { useReducer, createContext, useEffect } from "react";
import AppService from "../services/appService";
//import { encryptAES } from "../services/Crypto-Helper";
import secureLocalStorage from "react-secure-storage";
//import Cookie from "universal-cookie";
import * as moment from "moment";
import "moment/locale/es";
import copy from "copy-to-clipboard";

export const GlobalContext = createContext();

let initialState = {
  token: null,
  usuario: null,
  pwd: null,
  credencialesInvalidas: null,
  prestadores: null,
  prestadorId: null,
  metricas: null,
  logs: null,
  timer: 1,
  timerSeconds: null,
  timerDate: null,
  showopciones: 0,
  showmetricas: 1,
  showlogs: 0,
  loading: null,
  errores: null,
  // donwloadingId: null,
  // donwloadingData: null,
  lastLogIndex: 0,
  reintentFetch: 0,
  reintentFetchMseg: 5000,

  //notificaciones: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UNSET_USUARIO_AUTENTICADO":
      return {
        ...state,
        token: null,
        usuario: null,
        timer: 0,
      };

    case "SET_USUARIO_AUTENTICADO":
      return {
        ...state,
        token: action.payload.token,
        usuario: action.payload.usuario,

        timer: action.payload.timer,
        timerSeconds: action.payload.timerSeconds,
        showlogs: action.payload.showlogs,
        showmetricas: action.payload.showmetricas,
        // showopciones: action.payload.showopciones,
        reintentFetchMseg: action.payload.reintent_seconds,
        credencialesInvalidas: "",
      };

    case "CREDENCIALES_INVALIDAS":
      return {
        ...state,
        token: null,
        usuario: null,
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

    case "SET_SHOW_METRICAS":
      return {
        ...state,
        showmetricas: action.payload,
      };

    case "SET_SHOW_LOGS":
      return {
        ...state,
        showlogs: action.payload,
      };

    case "SET_DOWNLOADING":
      return {
        ...state,
        donwloadingId: action.payload,
      };
    case "SET_LSTLOGINDEX":
      return {
        ...state,
        lastLogIndex: action.payload,
      };

    case "SET_REINTENTFETCH":
      return {
        ...state,
        reintentFetch: action.payload,
      };

    case "SET_REINTENTFETCH_MSEG":
      return {
        ...state,
        reintentFetchMseg: action.payload,
      };

    case "SET_CREDENCILES":
      return {
        ...state,
        usuario: action.payload.usuario,
        pwd: action.payload.pwd,
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
      let _timer = secureLocalStorage.getItem("timer");
      let _timer_seconds = secureLocalStorage.getItem("timer_seconds");
      let _usuario = secureLocalStorage.getItem("usuario");
      let _showlogs = secureLocalStorage.getItem("showlogs");
      let _showmetricas = secureLocalStorage.getItem("showmetricas");
      // let _showopciones = secureLocalStorage.getItem("showopciones");
      let _reintent_seconds = secureLocalStorage.getItem("reintent_seconds");

      const payload = {
        token: _token ? _token : null,
        usuario: _usuario ? _usuario : null,
        timer: _timer ? _timer : 1,
        timerSeconds: _timer_seconds ? _timer_seconds : 2000,
        showlogs: _showlogs ? parseInt(_showlogs) : 0,
        showmetricas: _showmetricas ? parseInt(_showmetricas) : 0,
        // showopciones: _showopciones ? parseInt(_showopciones) : 0,
        reintent_seconds: _reintent_seconds
          ? parseInt(_reintent_seconds)
          : 5000,
      };

      //console.log(JSON.stringify(payload));
      dispatch({
        type: "SET_USUARIO_AUTENTICADO",
        payload: payload,
      });
    }

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /****  FUNCION GLOBAL CAPUTA DE ERRORES *********/
  /*  Segun el obejto error que recibe se define la accion que se debe realizar. Si el error es  */
  /*  401 reintenta solicitar login con credenciales de usuario  */
  /**** Recibe un objeto error */

  async function setError(error) {
    //console.error(error);

    if (error && error.status === 401) {
      dispatch({
        type: "SET_TIMER",
        payload: 0,
      });

      await getLoginToken(state.usuario, state.pwd);

      cleanError();
    } else {
      dispatch({
        type: "SET_REINTENTFETCH",
        payload: 1,
      });
      dispatch({
        type: "SET_ERROR",
        payload: error,
      });
    }
  }

  /****  FUNCION PARA SOLICITAR TOKEN *********/
  /*  LA funcion llama a services y solicita el token de acceso  */
  /*  Guarda el token en el estado de aplicación  */
  /****Recibe credenciales */
  async function getLoginToken(email, pwd) {
    dispatch({
      type: "LOADING",
      payload: true,
    });

    await AppService.getLoginToken(email, pwd)
      .then((response) => {
        //alert("Login" + response);

        let token = response.access_token;

        secureLocalStorage.setItem("token", token);
        secureLocalStorage.setItem("usuario", email);

        const payload = {
          token: token,
          timer: state.timer,
          timerSeconds: state.timerSeconds,
        };

        dispatch({
          type: "SET_USUARIO_AUTENTICADO",
          payload: payload,
        });

        const payload2 = {
          usuario: email,
          pwd: pwd,
        };

        dispatch({
          type: "SET_CREDENCILES",
          payload: payload2,
        });

        dispatch({
          type: "SET_TIMER",
          payload: 1,
        });
      })
      .catch((error) => {
        if (error.status === 401 || error.status === "401") {
          dispatch({
            type: "CREDENCIALES_INVALIDAS",
            payload: "Usuario y/o constraseña no válidos2",
          });
        } else {
          dispatch({
            type: "SET_ERROR",
            payload: error,
          });
        }
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
        //alert("METRICAS" + JSON.stringify(response));
        dispatch({
          type: "SET_METRICAS",
          payload: response,
        });
        cleanError();
      })
      .catch((error) => {
        setError(error);
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
    if (state.reintentFetch === 0) {
      dispatch({
        type: "SET_TIMER_DATE",
        payload: moment().format("HH:mm:ss").toString(),
      });
    }
    await AppService.getPanelLeftPrestadores()
      .then((response) => {
        // alert(JSON.stringify(response));
        dispatch({
          type: "SET_PRESTADORES",
          payload: response,
        });
        cleanError();
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

    await AppService.getPanelRightLogs(id, state.lastLogIndex)
      .then((response) => {
        if (state.lastLogIndex === 0) {
          dispatch({
            type: "SET_LOGS",
            payload: response,
          });
        } else {
          dispatch({
            type: "SET_LOGS",
            payload: response.concat(state.logs),
          });
        }

        if (response.length > 0) {
          dispatch({
            type: "SET_LSTLOGINDEX",
            payload: response[0].id,
          });
        }

        cleanError();
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        dispatch({
          type: "LOADING",
          payload: false,
        });
      });
  }

  async function getPanelRightLogById(integracionId, logId) {
    //alert("context right" + id)

    dispatch({
      type: "SET_DOWNLOADING",
      payload: logId,
    });

    dispatch({
      type: "LOADING",
      payload: true,
    });
    await AppService.getPanelRightLogById(integracionId, logId)
      .then((response) => {
        //alert(JSON.stringify(response));

        copy(JSON.stringify(response));

        // dispatch({
        //   type: "SET_DOWNLOADING_DATA",
        //   payload: JSON.stringify(response),
        // });

        dispatch({
          type: "SET_DOWNLOADING",
          payload: null,
        });

        //cleanError();
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        dispatch({
          type: "LOADING",
          payload: false,
        });
      });
  }

  async function setPanelConfig(item, value) {
    dispatch({
      type: "LOADING",
      payload: true,
    });

    await AppService.setPanelConfig(item, value)
      .then((response) => {
        // alert(JSON.stringify(response));
        // dispatch({
        //   type: "SET_LOGS",
        //   payload: response,
        // });

        cleanError();
      })
      .catch((error) => {
        setError(error);
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
    secureLocalStorage.setItem("timer", flag);

    dispatch({
      type: "SET_TIMER",
      payload: flag,
    });

    //console.log(flag === 0 ? "TIMER STOPPED" : "TIMER STARTED");
  }

  function setTimerDate(date) {
    dispatch({
      type: "SET_TIMER_DATE",
      payload: date,
    });
  }

  function setTimerSeconds(seconds) {
    secureLocalStorage.setItem("timer_seconds", seconds);
    dispatch({
      type: "SET_TIMER_SECONDS",
      payload: seconds,
    });
  }

  function setPrestadorId(id) {
    // alert("set prestador" + id);
    dispatch({
      type: "SET_PRESTADOR_ID",
      payload: id,
    });
  }

  function setClearLogs() {
    dispatch({
      type: "SET_LOGS",
      payload: null,
    });

    dispatch({
      type: "SET_DOWNLOADING",
      payload: null,
    });
  }

  function setShowOpciones(flag) {
    dispatch({
      type: "SET_SHOW_OPCIONES",
      payload: flag,
    });
  }

  function setShowMetricas(flag) {
    secureLocalStorage.setItem("showmetricas", flag);

    dispatch({
      type: "SET_SHOW_METRICAS",
      payload: flag,
    });
  }

  function setShowLogs(flag) {
    secureLocalStorage.setItem("showlogs", flag);
    dispatch({
      type: "SET_SHOW_LOGS",
      payload: flag,
    });
  }

  function setDOwnloading(flag) {
    dispatch({
      type: "SET_DOWNLOADING",
      payload: flag,
    });
  }

  function cleanError() {
    dispatch({
      type: "SET_ERROR",
      payload: null,
    });
    dispatch({
      type: "SET_REINTENTFETCH",
      payload: 0,
    });
    // saveInitialState();
  }

  function clearLogLastIndex() {
    dispatch({
      type: "SET_LSTLOGINDEX",
      payload: 0,
    });
    // saveInitialState();
  }

  function setReintentFetchMseg(seconds) {
    secureLocalStorage.setItem("reintent_seconds", seconds);

    dispatch({
      type: "SET_REINTENTFETCH_MSEG",
      payload: seconds,
    });
  }
  // async function clearNotificacion() {
  //   dispatch({
  //     type: "CLEAR_NOTIFICACION",
  //     payload: null,
  //   });
  // }
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
        setShowMetricas,
        setShowLogs,
        setClearLogs,
        setDOwnloading,
        // clearDownloadLogData,
        getPanelRightLogById,
        setPanelConfig,
        clearLogLastIndex,
        setReintentFetchMseg,
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
        showmetricas: state.showmetricas,
        showlogs: state.showlogs,
        donwloadingId: state.donwloadingId,
        lastLogIndex: state.lastLogIndex,
        reintentFetch: state.reintentFetch,
        reintentFetchMseg: state.reintentFetchMseg,
        //donwloadingData: state.donwloadingData,
        //notificaciones: state.notificaciones,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
