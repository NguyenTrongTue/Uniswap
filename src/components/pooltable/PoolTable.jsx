import styles from "./PoolTable.module.scss";
import classNames from "classnames/bind";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import tokens from "~/data/tokens.json";

import { useEffect, useState } from "react";
import axios from "axios";
import formatPrice from "~/utils/formatPrice";

const cx = classNames.bind(styles);

export default function PoolTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pools, setPools] = useState([]);

  const [pages, setPages] = useState(0);
  useEffect(() => {
    const fetchTokens = async () => {
      const res = await axios.get("http://localhost:8000/pools/");

      setPools(res.data);
      const poolList = res.data.map((pool) => {
        const tokenList = tokens.filter(
          (token) =>
            token.tokenname === pool.token0 || token.tokenname === pool.token1
        );
        return {
          poolid: pool.poolid,
          reserve0: pool.reserve0,
          tvl: pool.tvl,
          token0: pool.token0,
          token1: pool.token1,
          reserve1: pool.reserve1,
          token0symbol: tokenList[0].tokensymbol,
          token1symbol: tokenList[1].tokensymbol,
          token0image: tokenList[0].tokenimage,
          token1image: tokenList[1].tokenimage,
        };
      });
      setPools(poolList);

      setPages(Math.floor(poolList.length / 10) + (poolList.length % 10));
    };
    fetchTokens();
  }, []);

  const handleBackPage = () => {
    setCurrentPage((prev) => (prev !== 1 ? prev - 1 : prev));
  };
  const handleForwardPage = () => {
    setCurrentPage((prev) => (prev !== pages ? prev + 1 : prev));
  };

  return (
    <div className={cx("datatable")}>
      <div className={cx("header")}>
        <span className={cx("idHeader")}>#</span>
        <span className={cx("nameHeader")}>Pool</span>
        <span className={cx("tvlHeader")}>TVL</span>
        <span className={cx("volumeHeader")}>Reserve Token 1</span>
        <span className={cx("volumeHeader")}>Reserve Token 2</span>
      </div>
      <div className={cx("content")}>
        {pools.slice((currentPage - 1) * 10, 10 * currentPage).map((token) => {
          return (
            <div className={cx("tokenItem")}>
              <span className={cx("id")}>{token.id}</span>
              <div className={cx("name")}>
                <div className="listImg">
                  <img src={token.token0image} alt="" />
                  <img src={token.token1image} alt="" />
                </div>
                <span className={cx("symbol")}>
                  {token.token0symbol.toUpperCase()}/
                  {token.token1symbol.toUpperCase()}
                </span>
                <div
                  className={cx(
                    "priceChange",
                    parseFloat(token.tvl).toFixed(2).toString().slice(-2) > 50
                      ? "increase"
                      : "decrease"
                  )}
                >
                  {parseFloat(token.tvl).toFixed(2).toString().slice(-2) >
                  50 ? (
                    <ArrowUpwardIcon className={cx("icon")} />
                  ) : (
                    <ArrowDownwardIcon className={cx("icon")} />
                  )}
                  <span>
                    0.{parseFloat(token.tvl).toFixed(2).toString().slice(-2)}%
                  </span>
                </div>
              </div>
              <span className={cx("price")}>{formatPrice(token.tvl)}</span>

              <span className={cx("tvl")}>{formatPrice(token.reserve0)}</span>
              <span className={cx("volume")}>
                {formatPrice(token.reserve1)}
              </span>
            </div>
          );
        })}
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
