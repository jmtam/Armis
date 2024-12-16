// import { encode as base64_encode } from "base-64";
import CryptoJS from "crypto-js";
import * as moment from "moment";
import "moment/locale/es";

export function encryptAES(textString) {
  let r = CryptoJS.AES.encrypt(textString, "Basic23$21$");
  return r.toString();
}

export function decryptAES(textEncryptedAES) {
  let tmp = CryptoJS.AES.decrypt(textEncryptedAES, "Basic23$21$");
  let r = tmp.toString(CryptoJS.enc.Utf8);
  return r.toString();
}
