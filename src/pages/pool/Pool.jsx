import React, { useEffect } from "react";
import styles from "./Pool.module.scss";
import classNames from "classnames/bind";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Slider from "react-slick";
import Table from "../../components/pooltable/PoolTable";
const cx = classNames.bind(styles);

const Pool = () => {
  useEffect(() => {
    document.title = "Uniswap|Tokens";
  }, []);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("watchlist")}>
        <span className={cx("watchlistTitle")}>Your Watchlist</span>
        <div className={cx("savedTokens")}>
          <span>Saved pools will appear here</span>
        </div>
      </div>

      <div className={cx("tokensList")}>
        <Table />
      </div>
    </div>
  );
};

export default Pool;
