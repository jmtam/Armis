/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect, useRef } from "react";
import { GlobalContext } from "../context/GlobalContext";
// import * as moment from "moment";
// import "moment/locale/es";
import DataTable from "react-data-table-component";
import copy from "copy-to-clipboard";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

import downloadIcon from "../assets/img/download.gif";
//import LogEditor from "./Editor";
import { Container, Button } from "react-bootstrap";

export const PanelRight = ({ windowsH }) => {
  const {
    logs,
    setTimer,
    timer,
    prestadorId,
    getPanelRightLogs,
    //timermseg,
    prestadores,
    donwloadingId,
    getPanelRightLogById,
    // lastLogIndex,
    showlogs,
    showopciones,
    showmetricas,
    token,
    setShowLogs,
    reintentFetch,
    // donwloadingData,
    // clearDownloadLogData,
  } = useContext(GlobalContext);

  //const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const [data, setData] = useState([]);
  const [integracion, setintegracion] = useState([]);
  // const [showEditor, setShowEditor] = useState(false);
  // const [editorData, setEditorData] = useState();
  //const [isLoading, setIsLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  const inputSearch = useRef();

  useEffect(() => {
    async function init() {
      if (timer === 1 && showlogs && token && !reintentFetch) {
        if (prestadorId && prestadores) {
          var obj = prestadores.filter((p) => p.id === prestadorId);
          //alert(obj[0].integracion);
          setintegracion(obj[0].integracion + "  # " + prestadorId);
        }
        //setIsLoading(true);
        await getPanelRightLogs(prestadorId);

        //setIsLoading(false);
      }
    }
    init();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prestadorId, timer, prestadores]);

  useEffect(() => {
    async function init() {
      if (timer === 1) {
        inputSearch.current.value = "";
      }
    }
    init();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  useEffect(() => {
    if (logs) {
      setData(logs);
    }
  }, [logs]);

  const columns = [
    // {
    //   name: "Id",
    //   selector: (row) => row.id,
    //   sortable: true,
    //   //center: true,
    //   width: "80px",
    //   compact: "true",
    //   //right: true,
    //   cell: (row) =>
    //     donwloadingId === row.id ? (
    //       <div style={{ textAlign: "right" }}>
    //         {/* <i
    //           className="bi bi-cloud-download"
    //           style={{ fontSize: "10pt", color: "green", paddingRight: 5 }}
    //         /> */}
    //         <img src={downloadIcon} alt="" width="30" />
    //         {row.id}
    //       </div>
    //     ) : (
    //       <div style={{ textAlign: "right" }}>{row.id}</div>
    //     ),
    // },
    {
      name: "    Fecha",
      selector: (row) => row.fecha,
      sortable: true,
      compact: "true",
      width: "95px",
      cell: (row) =>
        donwloadingId === row.id ? (
          <img src={downloadIcon} alt="" width="30" />
        ) : (
          row.fecha
        ),
      style: {
        paddingLeft: 5,
      },
    },
    {
      name: "Dir",
      selector: (row) => row.dir,
      sortable: true,
      compact: "true",
      width: "33px",
      style: {
        justifyContent: "center",
        paddingRight: 5,
      },
    },
    {
      name: "Bytes",
      selector: (row) => row.bytes,
      sortable: true,
      compact: "true",
      width: "55px",
      style: {
        justifyContent: "right",
        paddingRight: 5,
      },
    },

    {
      name: "Data",
      selector: (row) => row.data,

      compact: "true",

      style: {
        paddingLeft: 5,
      },
    },
  ];

  const handleChangeRowCLicked = async (row, event) => {
    if (donwloadingId === null || !donwloadingId) {
      if (row.truncated === "true" || row.truncated === true) {
        await getPanelRightLogById(prestadorId, row.id);
      } else {
        copy(JSON.stringify(row));
      }
      setSelectedRow(row.id);
    } else {
      setSelectedRow(donwloadingId);
      //alert("HAy un proceso de descarga aguarde a que finalice");
    }
  };

  // const handleChangeRowDOubleCLicked = async (row, event) => {
  //   //Insecure origins treated as secure   flags del chrome

  //   await navigator.clipboard.readText().then((clipText) => {
  //     setEditorData(clipText);
  //     setShowEditor(true);
  //   });
  // };

  // const resetSearch = (e) => {
  //   e.preventDefault();
  //   // e.target.value = "";
  //   // setTimer(1);
  // };

  const handleSearch = async (e) => {
    if (e.target.value.length > 2) setTimer(0);

    var searchData = logs.filter((item) => {
      if (
        item.data
          .toString()
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      ) {
        return item;
      } else if (
        item.id.toString().toLowerCase().includes(e.target.value.toLowerCase())
      ) {
        return item;
      } else if (
        item.fecha
          .toString()
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      ) {
        return item;
      }
    });

    if (e.target.value.length === 0) setTimer(1);

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
  return (
    <Container
      fluid
      style={{
        marginTop: "0",
        minHeight: "100%",
        padding: 0,
        marginLeft: 10,
      }}
    >
      <Row
        className="rowSearch"
        style={{
          marginBottom: "1.5%",
          height: 37,
        }}
      >
        <Col
          xs={6}
          md={6}
          lg={6}
          className="text14"
          style={{ padding: 0, margin: 0 }}
        >
          Logs: {integracion}
          {/* {"  -  "} Last: {lastLogIndex} */}
          {/* {donwloadingId && " / Downloading:" + donwloadingId} */}
        </Col>
        <Col style={{ padding: 0, margin: 0 }} xs={5} md={5} lg={5}>
          <Form.Control
            name="search"
            className="formInput"
            type="search"
            placeholder="Buscar ..."
            onChange={handleSearch}
            ref={inputSearch}
          />
        </Col>

        <Col xs={1} md={1} lg={1} style={{ justifyItems: "end" }}>
          <Button
            className={"btn btn-custom-close"}
            onClick={() => setShowLogs(0)}
          >
            <i
              className="bi bi-chevron-right"
              style={{ fontSize: "12pt", color: "#fff" }}
            ></i>
          </Button>
        </Col>
      </Row>
      {logs && (
        <Row style={{ padding: 0, margin: 0 }}>
          <Col style={{ padding: 0, margin: 0 }}>
            <DataTable
              columns={columns}
              data={data}
              fixedHeader={true}
              persistTableHead={true}
              // progressPending={true}
              selectableRowsComponent={"null"}
              selectableRowsSingle
              selectableRowsHighlight
              defaultSortFieldId={"id"}
              //onRowDoubleClicked={handleChangeRowDOubleCLicked}
              defaultSortAsc={false}
              onRowClicked={handleChangeRowCLicked}
              highlightOnHover
              responsive
              dense
              selectableRowSelected={(row) => row.id === selectedRow}
              pointerOnHover
              noDataComponent="No hay registros disponibles"
              //customStyles={windowsH > 700 ? tableStyle : tableStyle2}
              customStyles={tableStyle}
            />
          </Col>
        </Row>
      )}

      {/* {showEditor && (
        <LogEditor
          data={editorData}
          setShowEditor={setShowEditor}
          showEditor={showEditor}
        />
      )} */}
    </Container>
  );
};
