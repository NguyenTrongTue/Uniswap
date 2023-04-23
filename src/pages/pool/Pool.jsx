import React, { useEffect, useState } from "react";
import styles from "./Pool.module.scss";
import classNames from "classnames/bind";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Table from "../../components/pooltable/PoolTable";
import Skeletion from "~/components/skeleton/Skeleton";
const cx = classNames.bind(styles);

const Pool = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    document.title = "Bakaswap|Pools";
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
    <div className={cx("wrapper")}>
      {loading ? (
        <Skeletion type="pools" />
      ) : (
        <>
          <div className={cx("watchlist")}>
            <span className={cx("watchlistTitle")}>Your Watchlist</span>
          </div>
          <div className={cx("tokensList")}>
            <Table />
          </div>
        </>
      )}
    </div>
  );
};

export default Pool;
