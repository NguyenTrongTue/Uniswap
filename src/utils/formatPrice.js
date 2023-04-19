import numeral from "numeral";

export default function formatPrice(price) {
  let value = numeral(price).value();
  let unit = numeral(value).format("0.00a").toUpperCase();
  let formattedPrice = `$${unit}`;
  return formattedPrice;
}
