/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
// import * as moment from "moment";
// import "moment/locale/es";
import DataTable from "react-data-table-component";
import copy from "copy-to-clipboard";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { tableStyle } from "../services/helpers";
import downloadIcon from "../assets/img/download.gif";
import LogEditor from "./Editor";
import { Container, Button } from "react-bootstrap";

export const PanelRight = () => {
  const {
    logs,
    setTimer,
    timer,
    prestadorId,
    getPanelRightLogs,
    //timerSeconds,
    prestadores,
    donwloadingId,
    getPanelRightLogById,
    // lastLogIndex,
    showlogs,
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

  useEffect(() => {
    async function init() {
      if (timer === 1 && showlogs && token && !reintentFetch) {
        // if (prestadorId) {
        //   await sleep(timerSeconds);
        // }

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

  return (
    <Container
      fluid
      style={{
        marginTop: "0",
        minHeight: "100%",
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
        <Col
          xs={6}
          md={6}
          lg={6}
          className="text14"
          style={{ padding: 0, margin: 0 }}
        >
          Logs de {integracion}
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
            //onBlur={resetSearch}
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
