/****  RUTAS DE NAVEGACION Y VALIDACION DE USUARIO EN SESION *********/
/* Si el usuario esta en sesión despliega barra navehacion y el componente home en caso contrario 
envia a login  */

import React, { Fragment, useContext } from "react";
import { NavbarMenu } from "./component/Navbar";
import { Home } from "./component/Home";
import { Errores } from "./component/Errores";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import { GlobalContext } from "./context/GlobalContext";
import { Login } from "./component/Login";
//import { Footer } from "./component/Footer";
// import { Notificaciones } from "./component/Notificaciones";
// import Notification from "./Notification";

export const history = createBrowserHistory();

// history.listen((_) => {
//   window.scrollTo(0, 0);
// });

export const Navigator = () => {
  const { token } = useContext(GlobalContext);

  return (
    <Router history={history}>
      <Fragment>
        <NavbarMenu />
        {/* {token && <Notification />} */}
        <Routes>
          {token ? (
            <>
              <Route path="*" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/" element={<Home />} />
              <Route path="error" element={<Errores />} />
              {/* <Route path="logEditor" element={<LogEditor />} /> */}
              {/* <Route path="/notificaciones" element={<Notificaciones />} /> */}
            </>
          ) : (
            <>
              <Route path="*" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Login />} />
            </>
          )}
        </Routes>
        {/* <Footer /> */}
      </Fragment>
    </Router>
  );
};
