import React, { useState, useEffect, useMemo } from "react";
import NestedModal from "~/components/modal/Modal";
import styles from "./Portfolio.module.scss";
import classNames from "classnames/bind";
import axios from "axios";
import { useSelector } from "react-redux";
import formatPrice from "~/utils/formatPrice";
import tokens from "~/data/tokens.json";
const cx = classNames.bind(styles);

const Portfolio = () => {
  const [tab, setTab] = useState("token");
  const [open, setOpen] = useState(false);
  const [balance, setBalance] = useState([]);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchTokens = async () => {
      const res = await axios.get(
        `http://localhost:8000/userbalance/${currentUser.username}`
      );
      const balaces = res.data.map((balance) => {
        const _token = tokens.filter(
          (token) => token.tokenname === balance.tokenname
        );
        return {
          ..._token[0],
          amount: balance.amount,
          username: currentUser.username,
        };
      });
      setBalance(balaces);
    };
    fetchTokens();
  }, [currentUser]);

  const total = useMemo(() => {
    const result = balance.reduce((result, bal) => {
      return result + bal.amount * bal.price;
    }, 0);

    return result;
  }, [balance]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("headerLeft")}>
          <div className={cx("headerlabel")}>Portfolio value</div>
          <div className={cx("headerBalance")}>{formatPrice(total)}</div>
        </div>
        <div className={cx("headerRight")} onClick={() => setOpen(true)}>
          Buy token
        </div>
      </div>
      <div className={cx("body")}>
        <div className={cx("topBody")}>
          <div className={cx("assets")}>Assets</div>
          <div className={cx("filter")}>
            <div
              className={cx("label", tab === "token" && "active")}
              onClick={() => setTab("token")}
              style={{ marginRight: "12px" }}
            >
              Tokens
            </div>
            <div
              className={cx("label", tab === "transaction" && "active")}
              onClick={() => setTab("transaction")}
            >
              Transactions
            </div>
          </div>
        </div>
        {tab === "token" ? (
          <div className={cx("table")}>
            <div className={cx("tableHeader")}>
              <div className={cx("tokenLable")}>Token</div>
              <div className={cx("tokenLable")}>Price</div>
              <div className={cx("tokenLable")}>Balance</div>
            </div>
            {balance.map((token) => {
              return (
                <div className={cx("tableBody")}>
                  <div className={cx("tokenContent")}>
                    <img src={token.tokenimage} alt="" />
                    <div className={cx("token")}>
                      <div className={cx("tokenLabel")}>
                        {token?.tokensymbol.toUpperCase()}
                      </div>
                      <div className={cx("tokenName")}>{token.tokenname}</div>
                    </div>
                  </div>
                  <div className={cx("tokenPrice")}>
                    {formatPrice(token.price)}
                  </div>
                  <div className={cx("tokenBalance")}>
                    <span>
                      {token.amount} {token?.tokensymbol.toUpperCase()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className={cx("table")}>
            <div
              className={cx("tableHeader")}
              style={{
                gridTemplateColumns: "3fr repeat(3, 1fr)",
              }}
            >
              <div className={cx("tokenLable")}>Content</div>
              <div className={cx("tokenLable")}>Token Amount</div>
              <div className={cx("tokenLable")}>Token Amount</div>
              <div className={cx("tokenLable")}>Time</div>
            </div>

            <div
              className={cx("tableBody")}
              style={{
                gridTemplateColumns: "3fr repeat(3, 1fr)",
                padding: "10px 8px",
              }}
            >
              <div className={cx("transactionContent")}>Swap SHIB for ETH</div>
              <div className={cx("tokenPrice")}>$1000.80</div>
              <div className={cx("tokenPrice")}>$1000.80</div>
              <div className={cx("tokenPrice")}>1h ago</div>
            </div>
          </div>
        )}
      </div>
      <NestedModal
        open={open}
        setOpen={setOpen}
        setBalance={setBalance}
        balance={balance}
      />
    </div>
  );
};

export default Portfolio;
