import secureLocalStorage from "react-secure-storage";

const APIUrl = "http://107.23.228.203:10777";
//const APIUrl =  "http://15.229.193.237:10777"

const Timeout = (time) => {
  let controller = new AbortController();
  setTimeout(() => controller.abort(), time * 1000);
  return controller;
};

const getLoginToken = async (email, pwd) => {
  return fetch(APIUrl + "/monitorGetToken", {
    method: "post",
    body: new URLSearchParams({
      user: email,
      pass: pwd,
    }).toString(),
    signal: Timeout(5).signal,
    //signal: AbortSignal.timeout(5000),
  })
    .then((response) => {
      if (response.ok) return Promise.resolve(response.json());
      else {
        return Promise.reject(response);
      }
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const getPanelTopMetricas = async () => {
  const token = secureLocalStorage.getItem("token");

  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);

  return fetch(APIUrl + "/monitorUpdateTop", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
    //signal: AbortSignal.timeout(5000),
    signal: Timeout(5).signal,
  })
    .then((response) => {
      if (response.ok) return Promise.resolve(response.json());
      else {
        //console.error(response);
        return Promise.reject(response);
      }
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const getPanelLeftPrestadores = async () => {
  const token = secureLocalStorage.getItem("token");

  return fetch(APIUrl + "/monitorUpdateLeft", {
    method: "post",
    headers: {
      Authorization: "Bearer " + token,
    },
    //signal: AbortSignal.timeout(5000),
    signal: Timeout(5).signal,
  })
    .then((response) => {
      if (response.ok) return Promise.resolve(response.json());
      else {
        //console.error(response);
        return Promise.reject(response);
      }
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const getPanelRightLogs = async (id, lastIndex) => {
  //alert("services" + lastIndex);

  const token = secureLocalStorage.getItem("token");

  //console.log(lastIndex);
  return fetch(APIUrl + "/monitorUpdateRight", {
    method: "post",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: new URLSearchParams({
      integrationId: id,
      lastLogId: lastIndex,
    }).toString(),
    //signal: AbortSignal.timeout(5000),
    signal: Timeout(5).signal,
  })
    .then((response) => {
      if (response.ok) return Promise.resolve(response.json());
      else {
        return Promise.reject(response);
      }
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const getPanelRightLogById = async (integracionId, logId) => {
  //alert("services" + id);

  const token = secureLocalStorage.getItem("token");

  return fetch(APIUrl + "/monitorRestoreLogId", {
    method: "post",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: new URLSearchParams({
      integrationId: integracionId,
      restoreLogId: logId,
    }).toString(),
    //signal: AbortSignal.timeout(5000),
    signal: Timeout(5).signal,
  })
    .then((response) => {
      if (response.ok) return Promise.resolve(response.json());
      else {
        //console.error(response);
        return Promise.reject(response);
      }
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const setPanelConfig = async (item, value) => {
  //alert("services" + id);

  const token = secureLocalStorage.getItem("token");

  return fetch(APIUrl + "/monitorConfig", {
    method: "post",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: new URLSearchParams({
      itemName: item,
      itemVal: value,
    }).toString(),
    //signal: AbortSignal.timeout(5000),
    signal: Timeout(5).signal,
  })
    .then((response) => {
      if (response.ok) return Promise.resolve(response.json());
      else {
        //console.error(response);
        return Promise.reject(response);
      }
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const AppService = {
  getLoginToken,
  getPanelTopMetricas,
  getPanelLeftPrestadores,
  getPanelRightLogs,
  getPanelRightLogById,
  setPanelConfig,
};

export default AppService;
