import styles from "./Table.module.scss";
import classNames from "classnames/bind";
import numeral from "numeral";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useState } from "react";
import { TOKENLIST } from "~/data/DummyData";
const cx = classNames.bind(styles);



export default function DataTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pages] = useState(Math.floor(TOKENLIST.length / 10) + (TOKENLIST.length % 10));

  const handleBackPage = () => {
    setCurrentPage((prev) => (prev !== 1 ? prev - 1 : prev));
  };
  const handleForwardPage = () => {
    setCurrentPage((prev) => (prev !== pages ? prev + 1 : prev));
  };

  function formatPrice(price) {
    let value = numeral(price).value();
    let unit = numeral(value).format("0.00a").toUpperCase();
    let formattedPrice = `$${unit}`;
    return formattedPrice;
  }
  return (
    <div className={cx("datatable")}>
      <div className={cx("header")}>
        <span className={cx("idHeader")}>#</span>
        <span className={cx("nameHeader")}>Name</span>
        <span className={cx("priceHeader")}>Price</span>
        <span className={cx("priceChangeHeader")}>Price Change</span>
        <span className={cx("volumeHeader")}>Volume 24H</span>
        <span className={cx("tvlHeader")}>TVL</span>
      </div>
      <div className={cx("content")}>
        {TOKENLIST.slice((currentPage - 1) * 10, 10 * currentPage).map(
          (token, index) => {
            return (
              <div className={cx("tokenItem")}>
                <span className={cx("id")}>{index}</span>
                <div className={cx("name")}>
                  <img src={token.tokenimage} alt="" />
                  <span className={cx("name")}>{token.tokenname}</span>
                  <span className={cx("symbol")}>({token.tokensymbol.toUpperCase()})</span>
                </div>
                <span className={cx("price")}>{formatPrice(token.price)}</span>
                <div
                  className={cx(
                    "priceChange",
                    token.price >= 5 ? "increase" : "decrease"
                  )}
                >
                  {token.price >= 5 ? (
                    <ArrowUpwardIcon className={cx("icon")} />
                  ) : (
                    <ArrowDownwardIcon className={cx("icon")} />
                  )}
                  <span>0.{token.price.toFixed(2).toString().slice(-2)}</span>
                </div>
                <span className={cx("volume")}>
                  {formatPrice(token.price * 10000000)}
                </span>
                <span className={cx("tvl")}>
                  {formatPrice(token.price * 66668869)}
                </span>
              </div>
            );
          }
        )}
      </div>
      <div className={cx("footer")}>
        <ArrowBackIcon
          className={cx("footerIcon", currentPage === 1 && "disable")}
          onClick={handleBackPage}
        />
        <span className={cx("pageNumber")}>
          Page {currentPage} of {pages}
        </span>
        <ArrowForwardIcon
          className={cx("footerIcon", currentPage === pages && "disable")}
          onClick={handleForwardPage}
        />
      </div>
    </div>
  );
}
