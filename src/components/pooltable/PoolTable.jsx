import styles from "./PoolTable.module.scss";
import classNames from "classnames/bind";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { POOLS } from "~/data/DummyData";

import { useState } from "react";

const cx = classNames.bind(styles);

const rows = [
  {
    id: 1,
    img1: "https://raw.githubusercontent.com/uniswap/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
    img2: "https://raw.githubusercontent.com/uniswap/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png",
    symbol1: "ETH",
    symbol2: "USDC",
    priceChange: "0.51%",
    colume24h: "$500.29m",
    colume7d: "$500.29m",
    tvl: "$1.18B",
    change: "increase",
  },
  {
    id: 2,
    img1: "https://raw.githubusercontent.com/uniswap/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
    img2: "https://raw.githubusercontent.com/uniswap/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png",
    symbol1: "ETH",
    symbol2: "USDC",
    priceChange: "0.51%",
    colume24h: "$500.29m",
    colume7d: "$500.29m",
    tvl: "$1.18B",
    change: "increase",
  },
  {
    id: 3,
    img1: "https://raw.githubusercontent.com/uniswap/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
    img2: "https://raw.githubusercontent.com/uniswap/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png",
    symbol2: "USDC",
    symbol1: "ETH",
    price: "$1.81k",
    priceChange: "0.51%",
    colume24h: "$500.29m",
    tvl: "$1.18B",
    change: "increase",
  },
  {
    id: 4,
    img1: "https://raw.githubusercontent.com/uniswap/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
    img2: "https://raw.githubusercontent.com/uniswap/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png",
    symbol1: "ETH",
    symbol2: "USDC",
    priceChange: "0.51%",
    colume24h: "$500.29m",
    colume7d: "$500.29m",
    tvl: "$1.18B",
    change: "decrease",
  },
  {
    id: 5,
    img1: "https://raw.githubusercontent.com/uniswap/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
    img2: "https://raw.githubusercontent.com/uniswap/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png",
    symbol1: "ETH",
    symbol2: "USDC",
    priceChange: "0.51%",
    colume24h: "$500.29m",
    colume7d: "$500.29m",
    tvl: "$1.18B",
    change: "decrease",
  },
  {
    id: 6,
    img1: "https://raw.githubusercontent.com/uniswap/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
    img2: "https://raw.githubusercontent.com/uniswap/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png",
    symbol1: "ETH",
    symbol2: "USDC",
    priceChange: "0.51%",
    colume24h: "$500.29m",
    colume7d: "$500.29m",
    tvl: "$1.18B",
    change: "increase",
  },
  {
    id: 7,
    img1: "https://raw.githubusercontent.com/uniswap/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
    img2: "https://raw.githubusercontent.com/uniswap/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png",
    symbol1: "ETH",
    symbol2: "USDC",
    priceChange: "0.51%",
    colume24h: "$500.29m",
    colume7d: "$500.29m",
    tvl: "$1.18B",
    change: "decrease",
  },
  {
    id: 8,
    img1: "https://raw.githubusercontent.com/uniswap/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
    img2: "https://raw.githubusercontent.com/uniswap/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png",

    symbol1: "ETH",
    symbol2: "USDC",

    priceChange: "0.51%",
    colume24h: "$500.29m",
    tvl: "$1.18B",
    change: "increase",
  },
  {
    id: 9,
    img1: "https://raw.githubusercontent.com/uniswap/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
    img2: "https://raw.githubusercontent.com/uniswap/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png",
    symbol1: "ETH",
    symbol2: "USDC",
    priceChange: "0.51%",
    colume24h: "$500.29m",
    colume7d: "$500.29m",
    tvl: "$1.18B",
    change: "decrease",
  },
  {
    id: 10,
    img1: "https://raw.githubusercontent.com/uniswap/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
    img2: "https://raw.githubusercontent.com/uniswap/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png",
    symbol2: "USDC",

    symbol1: "ETH",
    price: "$1.81k",
    priceChange: "0.51%",
    colume24h: "$500.29m",
    tvl: "$1.18B",
    change: "increase",
  },
  {
    id: 11,
    img1: "https://raw.githubusercontent.com/uniswap/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
    img2: "https://raw.githubusercontent.com/uniswap/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png",
    symbol2: "USDC",

    symbol1: "ETH",
    price: "$1.81k",
    priceChange: "0.51%",
    colume24h: "$500.29m",
    tvl: "$1.18B",
    change: "increase",
  },
];

export default function PoolTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pages] = useState(Math.floor(rows.length / 10) + (rows.length % 10));

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
        <span className={cx("volumeHeader")}>Volume 24H</span>
        <span className={cx("volumeHeader")}>Volume 7D</span>
      </div>
      <div className={cx("content")}>
        {POOLS.slice((currentPage - 1) * 10, 10 * currentPage).map((token) => {
          return (
            <div className={cx("tokenItem")}>
              <span className={cx("id")}>{token.id}</span>
              <div className={cx("name")}>
                <div className="listImg">
                  <img src={token.img1} alt="" />
                  <img src={token.img2} alt="" />
                </div>
                <span className={cx("symbol")}>
                  {token.name1}/{token.name2}
                </span>
                <div
                  className={cx(
                    "priceChange",
                    parseFloat(token.tvl) > 121 ? "increase" : "decrease"
                  )}
                >
                  {parseFloat(token.tvl) > 121 ? (
                    <ArrowUpwardIcon className={cx("icon")} />
                  ) : (
                    <ArrowDownwardIcon className={cx("icon")} />
                  )}
                  <span>
                    0.{parseFloat(token.tvl).toFixed(2).toString().slice(-2)}%
                  </span>
                </div>
              </div>
              <span className={cx("price")}>${token.tvl}m</span>

              <span className={cx("tvl")}>${token.tvl}m</span>
              <span className={cx("volume")}>${token.tvl}m</span>
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
