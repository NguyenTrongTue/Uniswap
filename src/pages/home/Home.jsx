import React, { useState, useEffect } from "react";

import styles from "./Home.module.scss";
import classNames from "classnames/bind";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Table from "~/components/table/Table";
import Linechart from "~/components/lineChart/Linechart";
import ColumnChart from "~/components/ColumnChart/ColumnChart";

import PoolTable from "~/components/pooltable/PoolTable";
import Skeletion from "~/components/skeleton/Skeleton";

const cx = classNames.bind(styles);

const Home = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    document.title = "Bakaswap";
    const fetchApi = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchApi();
  }, []);
  return (
    <div className={cx("home")}>
      {loading ? (
        <Skeletion type="home" />
      ) : (
        <>
          <div className={cx("title")}>Uniswap Overview</div>
          <div className={cx("chart")}>
            <div className={cx("boxChart")}>
              <div className={cx("chartTile")}>TVL</div>
              <div className={cx("chartValue")}>$3.31b</div>
              <Linechart />
            </div>
            <div className={cx("boxChart")}>
              <div className={cx("chartTile")}>Volume 24H</div>
              <div className={cx("chartValue")}>$213.4m</div>
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
        </>
      )}
    </div>
  );
};

export default Home;
