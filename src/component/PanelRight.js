import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import * as moment from "moment";
import "moment/locale/es";
import DataTable from "react-data-table-component";
import copy from "copy-to-clipboard";
import { Loading } from "./Loading";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

export const PanelRight = () => {
  const {
    logs,
    setTimer,
    timer,
    prestadorId,
    getPanelRightLogs,
    timerSeconds,
  } = useContext(GlobalContext);

  useEffect(() => {
    let interval = null;
    if (timer) {
      interval = setInterval(async () => {
        await getPanelRightLogs(prestadorId);
        console.log(
          moment(new Date()).format("DD/MM/YYYY HH:MM").toString() +
            "START PRESTADORES timer" +
            timer
        );
      }, timerSeconds);
    } else {
      clearInterval(interval);
      console.log(
        moment(new Date()).format("DD/MM/YYYY HH:MM").toString() +
          "STOP PRESTADORES timer" +
          timer
      );
    }
    return () => clearInterval(interval);
  }, [timer, prestadorId, timerSeconds]);

  useEffect(() => {
    if (logs) {
      setData(logs);
    }
  }, [logs]);

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      width: "80px",
      compact: "true",
    },
    {
      name: "Fecha",
      selector: (row) => row.fecha,
      sortable: true,
      compact: "true",
      width: "100px",
    },
    {
      name: "Dir",
      selector: (row) => row.dir,
      sortable: true,
      compact: "true",
      width: "40px",
    },
    {
      name: "Data",
      selector: (row) => row.data,
      sortable: true,
      compact: "true",
    },
  ];

  const handleChange = ({ selectedRows }) => {
    if (typeof selectedRows[0] !== "undefined") {
      copy(JSON.stringify(selectedRows[0]));
      setTimer(0);
    }
  };

  const [data, setData] = useState([]);
  const handleSearch = async (e) => {
    if (e.target.value === "") setTimer(1);
    else setTimer(0);

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

    setData(searchData);
  };

  return (
    <div className="panelRight">
      {logs && (
        <Row className="rowSearch">
          <Col lg={"6"} className="text14">
            Logs
          </Col>
          <Col lg={"6"} className="text12">
            <Form.Control
              className="formInput"
              type="search"
              placeholder="Buscar ..."
              onChange={handleSearch}
              onBlur={() => setTimer(1)}
            />
          </Col>
        </Row>
      )}

      {logs && (
        <DataTable
          columns={columns}
          data={data}
          fixedHeader
          //title="Integraciones"
          pagination
          paginationPerPage={15}
          //expandableRows
          //expandableRowsComponent={ExpandedComponent} // expandir columnas
          //paginationPerPage={2}
          selectableRows
          onSelectedRowsChange={handleChange}
          selectableRowsSingle
          selectableRowsHighlight
          // customStyles={customStyles} //Cambiar styles custom
          highlightOnHover
          fixedHeaderScrollHeight
          dense
          striped={true}

          //theme="solarized" //Cambia el theme
          //conditionalRowStyles={conditionalRowStyles}
        />
      )}
    </div>
  );
};
