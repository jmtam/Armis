/****  COMPONENTE DESPLIEGA TABLA IZQUIERADA DE INTEGRACIONES *********/
/* En la carga inicial solicita datos de integraciones */

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
import { Container } from "react-bootstrap";

export const PanelLeft = ({ windowsH }) => {
  const {
    getPanelLeftPrestadores,
    prestadores,
    timer,
    //setTimer,
    //setTimerDate,
    timermseg,
    setPrestadorId,
    prestadorId,
    setClearLogs,
    clearLogLastIndex,
    token,
    getLoginToken,
    usuario,
    pwd,
    reintentFetch,
    reintentmseg,
    setLogout,
    showopciones,
    showmetricas,
    setPanelConfig,
  } = useContext(GlobalContext);

  const [selectedRow, setSelectedRow] = useState();
  const [selectedPrestadorAudit, setSelectedPrestadorAudit] = useState();
  const [data, setData] = useState([]);
  const [searching, setSearching] = useState(false);

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
      name: "Audit",
      selector: (row) => row.auditar,
      sortable: true,
      compact: "true",
      width: "50px",
      center: true,
      style: {
        justifyContent: "center",
      },
      cell: (row) =>
        row.auditar ? (
          <i
            className="bi bi-clipboard-check"
            style={{
              fontSize: "12pt",
            }}
          />
        ) : (
          row.auditar
        ),
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

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  useEffect(() => {
    async function init() {
      if (timer === 1 && token) {
        if (prestadores) {
          await sleep(timermseg);
        }
        await getPanelLeftPrestadores();
      }
    }
    init();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prestadores, timer]);

  useEffect(() => {
    if (prestadores) {
      if (!searching) {
        setData(prestadores);
        setSelectedPrestadorAudit(
          prestadores.find((p) => p.id === selectedRow)
        );
      }
    }
  }, [prestadores, searching]);

  useEffect(() => {
    let interval = null;
    if (reintentFetch || reintentFetch === 1) {
      interval = setInterval(
        async () => {
          if (usuario && pwd) {
            await getLoginToken(usuario, pwd);
          } else {
            setLogout();
          }

          await getPanelLeftPrestadores();

          console.log(
            "REINTENTO ACTIVO  " +
              moment().format("HH:mm:ss").toString() +
              " Timer encendido " +
              timer +
              " Tiempo de reintento " +
              reintentmseg
          );
        },
        reintentmseg ? reintentmseg : 5000
      );
    } else {
      clearInterval(interval);
      console.log(
        "REINTENTO DESACTIVADO " + moment().format("HH:mm:ss").toString()
      );
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reintentFetch]);

  useEffect(() => {
    async function init() {
      if (!prestadorId) {
        setSelectedRow(1);
        await setPrestadorId(1);
      } else {
        setSelectedRow(prestadorId);
      }
    }

    init();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prestadorId]);

  // ALERTAS
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
    if (timer === 1) {
      await setClearLogs();
      await clearLogLastIndex();
      await setPrestadorId(row.id);
      setSelectedPrestadorAudit(row);
      setSelectedRow(row.id);
    }
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

  const tableStyle = {
    table: {
      style: {
        paddingLeft: 0,
        marginTop: 10,
        marginBottom: "5",
        maxHeight:
          showopciones || showmetricas ? windowsH - 170 : windowsH - 120,
        minHeight:
          showopciones || showmetricas ? windowsH - 170 : windowsH - 120,
      },
    },
    rows: {
      style: {
        textWrap: "nowrap",
        backgroundColor: "#fff",
        fontFamily: '"Montserrat", sans-serif',
        fontSize: "12px !important",
      },
      denseStyle: {
        minHeight: "22px",
      },
      selectedHighlightStyle: {
        "&:nth-of-type(n)": {
          backgroundColor: "rgba(202, 245, 207, 0.7)",
          // borderBottomColor: "#eee",
          color: "#000",
          fontWeight: "500",
        },
      },
      highlightOnHoverStyle: {
        backgroundColor: "#ccc",
        transitionDuration: "0.15s",
        transitionProperty: "background-color",
      },
    },
    head: {
      style: {
        textAlign: "center",
        justifyContent: "center",
      },
    },
    headRow: {
      style: {
        paddingLeft: 10,
        fontFamily: "Montserrat, sans-serif",
        fontSize: "11px",
        fontWeight: "bold",
        color: "#555",
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
        borderBottomColor: "#ccc",
        justifyContent: "center",
      },
      denseStyle: {
        justifyContent: "center",
      },
    },
    headCells: {
      style: {
        justifyContent: "left",
      },
    },
    cells: {
      style: {
        // borderBottomStyle: "solid",
        // borderBottomWidth: "1px",
        // borderBottomColor: "#ccc",
        // borderRightStyle: "solid",
        // borderRightWidth: "1px",
        // borderRightColor: "#ccc",
      },
    },
    noData: {
      style: {
        fontFamily: "Montserrat, sans-serif",
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#000",
        padding: 20,
      },
    },
  };

  const handleConfigSwitch = async (event, item) => {
    // const obj = prestadores.find((p) => p.id === prestadorId);
    await setPanelConfig(item, event.target.checked, selectedPrestadorAudit.id);
    await getPanelLeftPrestadores();
    //alert(JSON.stringify(selectedPrestadorAudit));
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
        {selectedPrestadorAudit && (
          <>
            <Col
              md={"2"}
              className="colLeftMetrica text12"
              style={{ width: "60px" }}
            >
              {"Auditar"}
            </Col>
            <Col
              md={"9"}
              className="colRightMetricaCheck"
              style={{ width: "60px", marginRight: 10 }}
            >
              <Form>
                <Form.Check
                  type="switch"
                  checked={selectedPrestadorAudit.auditar}
                  onChange={(i) => handleConfigSwitch(i, "audit")}
                  //label={"#" + selectedPrestadorAudit.id}
                />
              </Form>
            </Col>
          </>
        )}
        <Col>
          <Form.Control
            className="formInput"
            type="search"
            name="search"
            placeholder="Buscar ..."
            onChange={handleSearch}
            // onBlur={resetSearch}
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
