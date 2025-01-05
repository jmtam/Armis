// import { encode as base64_encode } from "base-64";
import CryptoJS from "crypto-js";
// import * as moment from "moment";
// import "moment/locale/es";

export function encryptAES(textString) {
  let r = CryptoJS.AES.encrypt(textString, "Basic23$21$");
  return r.toString();
}

export function decryptAES(textEncryptedAES) {
  let tmp = CryptoJS.AES.decrypt(textEncryptedAES, "Basic23$21$");
  let r = tmp.toString(CryptoJS.enc.Utf8);
  return r.toString();
}

export const tableStyle = {
  table: {
    style: {
      paddingLeft: 0,
      marginTop: 10,

      minHeight: parseInt(window.screen.height) >= 1000 ? 750 : 600,
      maxHeight: parseInt(window.screen.height) >= 1000 ? 750 : 600,
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
      // use nth-of-type(n) to override other nth selectors
      "&:nth-of-type(n)": {
        backgroundColor: "rgba(202, 245, 207, 0.7)",
        // borderBottomColor: "#eee",
        color: "#000",
        fontWeight: "500",
      },
    },
    highlightOnHoverStyle: {
      //color: "green",
      backgroundColor: "#ccc",
      transitionDuration: "0.15s",
      transitionProperty: "background-color",
    },
  },
  head: {
    style: {
      // fontFamily: "Montserrat, sans-serif",
      // fontSize: "12px",
      // fontWeight: 500,
      // minWidth: "0px",

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
