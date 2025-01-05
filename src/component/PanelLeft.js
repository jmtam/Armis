/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import * as moment from "moment";
import "moment/locale/es";
import DataTable from "react-data-table-component"; //createTheme
// import { Loading } from "./Loading";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { tableStyle } from "../services/helpers";
import { Container } from "react-bootstrap";

export const PanelLeft = () => {
  const {
    getPanelLeftPrestadores,
    prestadores,
    timer,
    setTimer,
    //setTimerDate,
    timerSeconds,
    setPrestadorId,
    prestadorId,
    setClearLogs,
    clearLogLastIndex,
    token,

    reintentFetch,
    reintentFetchMseg,
  } = useContext(GlobalContext);

  const [selectedRow, setSelectedRow] = useState();
  const [data, setData] = useState([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    async function init() {
      if (!prestadorId) {
        setSelectedRow(1);
        await setPrestadorId(1);
      }
    }

    init();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (prestadores) {
      if (!searching) setData(prestadores);
    }
  }, [prestadores, searching]);

  //const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  useEffect(() => {
    async function init() {
      if (timer === 1 && token) {
        // if (prestadores) {
        //   await sleep(timerSeconds);
        // }
        await getPanelLeftPrestadores();
        // setTimerDate(moment().format("HH:mm:ss").toString());
      }
    }
    init();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prestadores, timer]);

  useEffect(() => {
    let interval = null;
    if (reintentFetch) {
      interval = setInterval(async () => {
        await getPanelLeftPrestadores();
        console.log(
          "REINTENTO ACTIVO  " +
            moment().format("HH:mm:ss").toString() +
            " Timer encendido " +
            timer +
            " Tiempo de reintento " +
            reintentFetchMseg
        );
      }, reintentFetchMseg);
    } else {
      clearInterval(interval);
      console.log(
        "REINTENTO DESACTIVADO " + moment().format("HH:mm:ss").toString()
      );
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reintentFetch, reintentFetchMseg]);

  const columns = [
    {
      name: "  Id",
      selector: (row) => row.id,
      sortable: true,
      width: "50px",
      compact: "true",
      style: {
        justifyContent: "center",
        paddingRight: 5,
      },
    },
    {
      name: "Integración",
      selector: (row) => row.integracion,
      sortable: true,
      compact: "true",
      width: "150px",

      style: {
        paddingLeft: 5,
      },
    },

    {
      name: "Dom",
      selector: (row) => row.dominios,
      sortable: true,
      compact: "true",
      //center: true,
      width: "50px",
      style: {
        justifyContent: "right",
        paddingRight: 5,
      },
    },

    {
      name: "Even",
      selector: (row) => row.eventos,
      sortable: true,
      compact: "true",
      width: "50px",
      style: {
        justifyContent: "right",
        paddingRight: 5,
      },
      //center: true,
    },

    {
      name: "Acep",
      selector: (row) => row.aceptados,
      sortable: true,
      compact: "true",
      width: "50px",
      style: {
        justifyContent: "right",
        paddingRight: 5,
      },
    },

    {
      name: "Rech",
      selector: (row) => row.rechazados,
      sortable: true,
      compact: "true",
      width: "50px",
      style: {
        justifyContent: "right",
        paddingRight: 5,
      },
    },
    {
      name: "Estado",
      selector: (row) => row.estado,
      compact: "true",
      style: {
        paddingLeft: 5,
      },

      // cell: (row) => {
      //   if (row.id === 2) {
      //     return (
      //       <div>
      //         <i
      //           className="bi bi-exclamation-triangle-fill"
      //           style={{ fontSize: "12pt", color: "orange", paddingRight: 5 }}
      //         />
      //         {row.estado}
      //       </div>
      //     );
      //   } else if (row.id === 3) {
      //     return (
      //       <div>
      //         <i
      //           className="bi bi-exclamation-triangle-fill"
      //           style={{ fontSize: "12pt", color: "red", paddingRight: 5 }}
      //         />
      //         {row.estado}
      //       </div>
      //     );
      //   } else {
      //     return row.estado;
      //   }
      // },
    },
  ];

  // const conditionalRowStyles = [
  //   {
  //     when: (row) => row.id === 1,
  //     style: {
  //       backgroundColor: "rgba(63, 195, 128, 0.9)",
  //       color: "white",
  //       "&:hover": {
  //         cursor: "pointer",
  //       },
  //     },
  //   },
  //   {
  //     when: (row) => row.id >= 1 && row.id < 2,
  //     style: {
  //       backgroundColor: "rgba(248, 248, 6, 1)",
  //       color: "#000",
  //       "&:hover": {
  //         cursor: "pointer",
  //       },
  //     },
  //   },
  //   {
  //     when: (row) => row.id >= 2,
  //     style: {
  //       backgroundColor: "rgb(247, 31, 11)",
  //       color: "white",
  //       "&:hover": {
  //         cursor: "not-allowed",
  //       },
  //     },
  //   },
  // ];

  const handleChangeRowCLicked = async (row, event) => {
    await setClearLogs();
    await clearLogLastIndex();
    await setPrestadorId(row.id);
    setSelectedRow(row.id);
    if (timer === 0) setTimer(1);
  };

  const handleSearch = async (e) => {
    if (e.target.value.length > 1) setSearching(true);
    var searchData = prestadores.filter((item) => {
      if (
        item.id.toString().toLowerCase().includes(e.target.value.toLowerCase())
      ) {
        return item;
      } else if (
        item.id.toString().toLowerCase().includes(e.target.value.toLowerCase())
      ) {
        return item;
      } else if (
        item.integracion
          .toString()
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      ) {
        return item;
      }
    });

    setData(searchData);
  };

  const resetSearch = async (e) => {
    e.preventDefault();
    e.target.value = "";
    setSearching(false);
  };

  return (
    <Container
      fluid
      style={{
        marginTop: "0%",
        padding: 0,
        margin: 0,
      }}
    >
      <Row
        className="rowSearch"
        style={{
          marginBottom: "1.5%",
          height: 37,
        }}
      >
        <Col className="text14" style={{ padding: 0, margin: 0 }}>
          Integración # {prestadorId && prestadorId}
        </Col>
        <Col>
          <Form.Control
            className="formInput"
            type="search"
            name="search"
            placeholder="Buscar ..."
            onChange={handleSearch}
            onBlur={resetSearch}
            //onFocus={() => setSearching(false)}
          />
        </Col>
      </Row>
      {prestadores && (
        <Row style={{ padding: 0, margin: 0 }}>
          <Col style={{ padding: 0, margin: 0 }}>
            <DataTable
              persistTableHead={true}
              columns={columns}
              data={data}
              fixedHeader={true}
              selectableRowsComponent={"null"}
              selectableRowsSingle
              selectableRowsHighlight
              onRowClicked={handleChangeRowCLicked}
              //conditionalRowStyles={conditionalRowStyles}
              highlightOnHover
              dense
              selectableRowSelected={(row) => row.id === selectedRow}
              responsive
              pointerOnHover
              noDataComponent="No hay registros disponibles"
              customStyles={tableStyle}
            />
          </Col>
        </Row>
      )}
    </Container>
  );
};

// const handleChange = async ({ selectedRows }) => {
//   if (typeof selectedRows[0] !== "undefined") {
//     await setPrestadorId(selectedRows[0].id);
//     setSelectedRow(selectedRows[0].id);
//     if (timer === 0) setTimer(1);
//     setClearLogs();

//     //alert("Selected Rows: " + JSON.stringify(selectedRows[0].id));
//   }
// };
