import styles from "./Transaction.module.scss";
import classNames from "classnames/bind";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

const rows = [
  {
    id: 1,
    content: "Swap SHIB for ETH",
    totvalValue: "$537.09",
    tokenAmount1: "49.48m SHIB",
    tokenAmount2: "0.30E TH",
    account: "0x46F6...06A0",
    time: "16h ago",
  },
  {
    id: 2,
    content: "Add SHIB and ETH",
    totvalValue: "$537.09",
    tokenAmount1: "49.48m SHIB",
    tokenAmount2: "0.30E TH",
    account: "0x46F6...06A0",
    time: "16h ago",
  },
  {
    id: 3,
    content: "Remove SHIB and ETH",
    totvalValue: "$537.09",
    tokenAmount1: "49.48m SHIB",
    tokenAmount2: "0.30E TH",
    account: "0x46F6...06A0",
    time: "16h ago",
  },
  {
    id: 4,
    content: "Remove SHIB and ETH",

    totvalValue: "$537.09",
    tokenAmount1: "49.48m SHIB",
    tokenAmount2: "0.30E TH",
    account: "0x46F6...06A0",
    time: "16h ago",
  },
  {
    id: 5,
    content: "Remove SHIB and ETH",

    totvalValue: "$537.09",
    tokenAmount1: "49.48m SHIB",
    tokenAmount2: "0.30E TH",
    account: "0x46F6...06A0",
    time: "16h ago",
  },
  {
    id: 6,
    content: "Add SHIB and ETH",
    totvalValue: "$537.09",
    tokenAmount1: "49.48m SHIB",
    tokenAmount2: "0.30E TH",
    account: "0x46F6...06A0",
    time: "16h ago",
  },
  {
    id: 7,
    content: "Add SHIB and ETH",
    totvalValue: "$537.09",
    tokenAmount1: "49.48m SHIB",
    tokenAmount2: "0.30E TH",
    account: "0x46F6...06A0",
    time: "16h ago",
  },

  {
    id: 8,
    content: "Swap SHIB for ETH",
    totvalValue: "$537.09",
    tokenAmount1: "49.48m SHIB",
    tokenAmount2: "0.30E TH",
    account: "0x46F6...06A0",
    time: "16h ago",
  },
  {
    id: 9,
    content: "Swap SHIB for ETH",
    totvalValue: "$537.09",
    tokenAmount1: "49.48m SHIB",
    tokenAmount2: "0.30E TH",
    account: "0x46F6...06A0",
    time: "16h ago",
  },
  {
    id: 10,
    content: "Swap SHIB for ETH",
    totvalValue: "$537.09",
    tokenAmount1: "49.48m SHIB",
    tokenAmount2: "0.30E TH",
    account: "0x46F6...06A0",
    time: "16h ago",
  },

  {
    id: 11,
    content: "Swap SHIB for ETH",
    totvalValue: "$537.09",
    tokenAmount1: "49.48m SHIB",
    tokenAmount2: "0.30E TH",
    account: "0x46F6...06A0",
    time: "16h ago",
  },
];

export default function PoolTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isActive, setIsActive] = useState(1);
  const [data, setData] = useState(rows);
  const [pages] = useState(Math.floor(rows.length / 10) + (rows.length % 10));

  useEffect(() => {
    switch (isActive) {
      case 2:
        setData(rows.filter((row) => row.content[0] === "S"));
        break;
      case 3:
        setData(rows.filter((row) => row.content[0] === "A"));
        break;
      case 4:
        setData(rows.filter((row) => row.content[0] === "R"));
        break;
      default:
        break;
    }
  }, [isActive]);

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
        <div className={cx("nameHeader")}>
          <span
            className={cx("subTab", isActive === 1 && "active")}
            onClick={() => setIsActive(1)}
          >
            All
          </span>
          <span
            className={cx("subTab", isActive === 2 && "active")}
            onClick={() => setIsActive(2)}
          >
            Swaps
          </span>
          <span
            className={cx("subTab", isActive === 3 && "active")}
            onClick={() => setIsActive(3)}
          >
            Adds
          </span>
          <span
            className={cx("subTab", isActive === 4 && "active")}
            onClick={() => setIsActive(4)}
          >
            Removes
          </span>
        </div>
        <span className={cx("labelHeader")}>Total Value</span>
        <span className={cx("labelHeader")}>Token Amount</span>
        <span className={cx("labelHeader")}>Token Amount</span>
        <span className={cx("labelHeader")}>Account</span>
        <span className={cx("labelHeader")}>Time</span>
      </div>
      <div className={cx("content")}>
        {data
          .slice((currentPage - 1) * 10, 10 * currentPage)
          .map((transaction) => {
            return (
              <div className={cx("tokenItem")}>
                <span className={cx("id")}>{transaction.id}</span>
                <span className={cx("name")}>{transaction.content}</span>
                <span className={cx("label")}>{transaction.totvalValue}</span>
                <span className={cx("label")}>{transaction.tokenAmount1}</span>
                <span className={cx("label")}>{transaction.tokenAmount2}</span>
                <span className={cx("label", "account")}>
                  {transaction.account}
                </span>
                <span className={cx("label")}>{transaction.time}</span>
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
