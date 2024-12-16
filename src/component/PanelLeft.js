/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import * as moment from "moment";
import "moment/locale/es";
import DataTable from "react-data-table-component"; //createTheme
import { Loading } from "./Loading";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

//const rowSelectCritera = (row) => row.id === 1;

export const PanelLeft = () => {
  const {
    getPanelLeftPrestadores,
    prestadores,
    timer,
    setTimer,
    setTimerDate,
    timerSeconds,
    setPrestadorId,
    prestadorId,
    setClearLogs,
  } = useContext(GlobalContext);

  // const [rowSelected, setRowSelected] = useState(1);

  // const [clearRows, setclearRows] = useState(false);

  // createTheme(
  //   "solarized",
  //   {
  //     text: {
  //       primary: "#268bd2",
  //       secondary: "#2aa198",
  //     },
  //     background: {
  //       default: "#002b36",
  //     },
  //     context: {
  //       background: "#cb4b16",
  //       text: "#FFFFFF",
  //     },
  //     divider: {
  //       default: "#073642",
  //     },
  //     button: {
  //       default: "#2aa198",
  //       hover: "rgba(0,0,0,.08)",
  //       focus: "rgba(255,255,255,.12)",
  //       disabled: "rgba(255, 255, 255, .34)",
  //     },
  //     sortFocus: {
  //       default: "#2aa198",
  //     },
  //   },
  //   "dark"
  // );

  // useEffect(() => {
  //   async function init() {
  //     //setId(prestadorId);
  //     // if (prestadorId) await getPanelRightLogs(prestadorId);
  //     // else setPrestadorId(1);
  //   }

  //   init();
  //   //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [prestadorId]);

  useEffect(() => {
    if (prestadores) {
      setData(prestadores);
    }
  }, [prestadores]);

  useEffect(() => {
    let interval = null;
    if (timer) {
      interval = setInterval(async () => {
        await getPanelLeftPrestadores();

        //        if (prestadorId) await getPanelRightLogs(prestadorId);
        // else setPrestadorId(1);

        setTimerDate(moment().format("DD/MM/YY HH:mm:ss").toString());

        console.log(
          moment().format("DD/MM/YY HH:mm:ss").toString() +
            " GET API CALL " +
            timer
        );
      }, timerSeconds);
    } else {
      clearInterval(interval);
      console.log(
        moment(new Date()).format("DD/MM/YY HH:mm:ss").toString() +
          " STOP API CALL " +
          timer
      );
    }
    return () => clearInterval(interval);
  }, [timer, prestadorId, timerSeconds]);

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
      //center: true,
      width: "40px",
      //right: true,

      //grow: 1,
      compact: "true",
      // style: {
      //   backgroundColor: "rgba(187, 204, 221, 1)",
      // },
    },
    {
      name: "Prestador",
      selector: (row) => row.integracion,
      sortable: true,
      //grow: 3,
      compact: "true",
      width: "200px",
    },
    {
      name: "Estado",
      selector: (row) => row.estado,
      sortable: true,
      //grow: 8,
      compact: "true",
    },
  ];

  //   {
  //     id: 1,
  //     fullName: "John Doe",
  //     height: "1.75m",
  //     weight: "89kg",
  //   },
  //   {
  //     id: 2,
  //     fullName: "Jane Doe",
  //     height: "1.64m",
  //     weight: "55kg",
  //   },
  //   {
  //     id: 3,
  //     fullName: "Sheera Maine",
  //     height: "1.69m",
  //     weight: "74kg",
  //   },
  // ];

  // const customStyles = {
  //   header: {
  //     style: {
  //       minHeight: "56px",
  //     },
  //   },
  //   headRow: {
  //     style: {
  //       borderTopStyle: "solid",
  //       borderTopWidth: "1px",
  //       //borderTopColor: defaultThemes.default.divider.default,
  //     },
  //   },
  //   headCells: {
  //     style: {
  //       "&:not(:last-of-type)": {
  //         borderRightStyle: "solid",
  //         borderRightWidth: "1px",
  //         //borderRightColor: defaultThemes.default.divider.default,
  //       },
  //     },
  //   },
  //   cells: {
  //     style: {
  //       "&:not(:last-of-type)": {
  //         borderRightStyle: "solid",
  //         borderRightWidth: "1px",
  //         //borderRightColor: defaultThemes.default.divider.default,
  //       },
  //     },
  //   },
  // };

  // const conditionalRowStyles = [
  //   {
  //     when: (row) => row.id < 300,
  //     style: {
  //       backgroundColor: "rgba(63, 195, 128, 0.9)",
  //       color: "white",
  //       "&:hover": {
  //         cursor: "pointer",
  //       },
  //     },
  //   },
  //   {
  //     when: (row) => row.calories >= 300 && row.calories < 400,
  //     style: {
  //       backgroundColor: "rgba(248, 148, 6, 0.9)",
  //       color: "white",
  //       "&:hover": {
  //         cursor: "pointer",
  //       },
  //     },
  //   },
  //   {
  //     when: (row) => row.calories >= 400,
  //     style: {
  //       backgroundColor: "rgba(242, 38, 19, 0.9)",
  //       color: "white",
  //       "&:hover": {
  //         cursor: "not-allowed",
  //       },
  //     },
  //   },
  // ];
  const handleChange = async ({ selectedRows }) => {
    if (typeof selectedRows[0] !== "undefined") {
      await setPrestadorId(selectedRows[0].id);
      if (timer === 0) setTimer(1);
      setClearLogs();

      //alert("Selected Rows: " + JSON.stringify(selectedRows[0].id));
    }
  };

  //   {
  //     id: 1,
  //     fullName: "John Doe",
  //     height: "1.75m",
  //     weight: "89kg",
  //   },
  //   {
  //     id: 2,
  //     fullName: "Jane Doe",
  //     height: "1.64m",
  //     weight: "55kg",
  //   },
  //   {
  //     id: 3,
  //     fullName: "Sheera Maine",
  //     height: "1.69m",
  //     weight: "74kg",
  //   },
  // ];

  // const customStyles = {
  //   header: {
  //     style: {
  //       minHeight: "56px",
  //     },
  //   },
  //   headRow: {
  //     style: {
  //       borderTopStyle: "solid",
  //       borderTopWidth: "1px",
  //       //borderTopColor: defaultThemes.default.divider.default,
  //     },
  //   },
  //   headCells: {
  //     style: {
  //       "&:not(:last-of-type)": {
  //         borderRightStyle: "solid",
  //         borderRightWidth: "1px",
  //         //borderRightColor: defaultThemes.default.divider.default,
  //       },
  //     },
  //   },
  //   cells: {
  //     style: {
  //       "&:not(:last-of-type)": {
  //         borderRightStyle: "solid",
  //         borderRightWidth: "1px",
  //         //borderRightColor: defaultThemes.default.divider.default,
  //       },
  //     },
  //   },
  // };

  // const conditionalRowStyles = [
  //   {
  //     when: (row) => row.id < 300,
  //     style: {
  //       backgroundColor: "rgba(63, 195, 128, 0.9)",
  //       color: "white",
  //       "&:hover": {
  //         cursor: "pointer",
  //       },
  //     },
  //   },
  //   {
  //     when: (row) => row.calories >= 300 && row.calories < 400,
  //     style: {
  //       backgroundColor: "rgba(248, 148, 6, 0.9)",
  //       color: "white",
  //       "&:hover": {
  //         cursor: "pointer",
  //       },
  //     },
  //   },
  //   {
  //     when: (row) => row.calories >= 400,
  //     style: {
  //       backgroundColor: "rgba(242, 38, 19, 0.9)",
  //       color: "white",
  //       "&:hover": {
  //         cursor: "not-allowed",
  //       },
  //     },
  //   },
  // ];
  const handleChangeRowCLicked = async (row, event) => {
    await setPrestadorId(row.id);
  };

  const [data, setData] = useState([]);

  const handleSearch = async (e) => {
    // setTitle(e.target.value);
    // alert(JSON.stringify(e.target.value));

    if (e.target.value === "") setTimer(1);
    else setTimer(0);

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

  // const toggleCleared = ({ selectedRows }) => {
  //   alert("llego");
  // };
  // const rowSelectCritera = (row) => row.id === prestadorId;
  //const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;
  return (
    <div className="panelLeft">
      {prestadorId && prestadores && (
        <Row className="rowSearch">
          <Col lg={"6"} className="text14">
            {"Prestador # " + prestadorId}
          </Col>
          <Col lg={"6"} className="text12">
            <Form.Control
              className="formInput"
              type="search"
              placeholder="Buscar ..."
              onChange={handleSearch}
            />
          </Col>
        </Row>
      )}

      {/* {JSON.stringify(prestadores)} */}
      {prestadores ? (
        <DataTable
          // className="tableData"
          columns={columns}
          data={data}
          fixedHeader
          //title="Integraciones"
          pagination
          //expandableRows
          //expandableRowsComponent={ExpandedComponent} // expandir columnas
          //paginationPerPage={2}
          selectableRows
          onSelectedRowsChange={handleChange}
          //onRowClicked={handleChange}
          selectableRowsSingle
          selectableRowsHighlight
          onRowClicked={handleChangeRowCLicked}
          // customStyles={customStyles} //Cambiar styles custom
          highlightOnHover
          fixedHeaderScrollHeight
          dense
          //progressPending={pending}
          selectableRowSelected={!prestadorId ? (row) => row.id === 1 : null}
          //clearSelectedRows={clearRows}
          setRowSelec
          //theme="solarized" //Cambia el theme
          //conditionalRowStyles={conditionalRowStyles}
        />
      ) : (
        <Loading />
      )}
    </div>
  );
};

// https://stackoverflow.com/questions/36881022/onrowclick-for-react-bootstrap-table
// https://www.youtube.com/watch?v=OR0qIT96xJ8
// https://react-data-table-component.netlify.app/?path=/docs/getting-started-examples--docs
