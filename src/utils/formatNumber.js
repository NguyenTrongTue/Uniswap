import numeral from "numeral";

function formatNumber(num) {
  if (typeof num !== "number" || isNaN(num)) {
    return "-";
  }
  if (Number.isInteger(num)) {
    return num.toString();
  }
  return numeral(num).format("0,0.00");
}

export default formatNumber;
