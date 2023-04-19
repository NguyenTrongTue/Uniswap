import React, { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import classNames from "classnames/bind";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Table from "~/components/table/Table";
import Linechart from "~/components/lineChart/Linechart";
import ColumnChart from "~/components/ColumnChart/ColumnChart";
import Transaction from "~/components/transactions/Transaction";
import axios from "axios";

import PoolTable from "~/components/pooltable/PoolTable";


const cx = classNames.bind(styles);

const Home = () => {

  return (
    <div className={cx("home")}>
      <div className={cx("title")}>Uniswap Overview</div>
      <div className={cx("chart")}>
        <div className={cx("boxChart")}>
          <div className={cx("chartTile")}>TVL</div>
          <div className={cx("chartValue")}>$3.31b</div>
          <Linechart />
        </div>
        <div className={cx("boxChart")}>
          <div className={cx("chartTile")}>Volume 24H</div>
          <div className={cx("chartValue")}>$625.69m</div>
          <ColumnChart />
        </div>
      </div>
      <div className={cx("infoList")}>
        <div className={cx("info")}>
          <span className={cx("label")}>Volume24H:</span>
          <span className={cx("value")}>$625.69m</span>
          <div className={cx("change", "increase")}>
            (<ArrowDownwardIcon className={cx("icon")} /> 50.80%)
          </div>
        </div>
        <div className={cx("info")}>
          <span className={cx("label")}>Fees 24H:</span>
          <span className={cx("value")}>$679.82k</span>
          <div className={cx("change", "increase")}>
            (<ArrowDownwardIcon className={cx("icon")} /> 50.80%)
          </div>
        </div>
        <div className={cx("info")}>
          <span className={cx("label")}>TVL:</span>
          <span className={cx("value")}>$3.31b</span>
          <div className={cx("change", "decrease")}>
            (<ArrowDownwardIcon className={cx("icon")} /> 50.80%)
          </div>
        </div>
      </div>
      <div className={cx("title")}>Top Tokens</div>
      <Table />
      <div className={cx("title")}>Top Pools</div>
      <PoolTable />

      <div className={cx("title")}> Transactions</div>
      <Transaction />
    </div>
  );
};

export default Home;
