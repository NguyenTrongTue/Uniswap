import React, { useEffect, useState } from "react";
import styles from "./Swap.module.scss";
import classNames from "classnames/bind";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

import tokens from "~/data/tokens.json";
import { useSelector } from "react-redux";
import formatPrice from "~/utils/formatPrice";
import ModalComponent from "./Modal";
import { ReveserIcon } from "~/components/Icon";
import requests from "~/api/httpRequests";
import { useNavigate, useParams } from "react-router-dom";
import formatNumber from "~/utils/formatNumber";
import Skeletion from "~/components/skeleton/Skeleton";

const cx = classNames.bind(styles);
const Swap = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [swapLoading, setSwapLoading] = useState(false);

  const [token1, setToken1] = useState(null);
  const [token2, setToken2] = useState(null);
  const [balance, setBalance] = useState([]);
  const [type, setType] = useState("");
  const [amount1, setAmount1] = useState();
  const [amount2, setAmount2] = useState();

  const { tokensymbol1, tokensymbol2 } = useParams();
  console.log(tokensymbol1, tokensymbol2);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const res = await requests.getUserbalance(currentUser.username);

        const balances = res.map((balance) => {
          const _token = tokens.filter(
            (token) => token.tokenname === balance.tokenname
          );
          return {
            ..._token[0],
            amount: balance.amount,
            username: currentUser.username,
          };
        });

        setBalance(
          tokens.map((token) => {
            const newToken = {
              ...token,
              balance: 0,
            };
            for (let i = 0; i < balances.length; i++) {
              if (balances[i].tokenname === newToken.tokenname) {
                newToken.balance = +balances[i].amount;
              }
            }
            return newToken;
          })
        );
      } catch (e) {
        console.error(e);
      }
    };
    fetchTokens();
  }, [currentUser]);

  useEffect(() => {
    if (tokensymbol1 === "none") {
      setToken1(balance[0]);
    } else {
      const token = balance.find(
        (t) => t.tokensymbol.toUpperCase() === tokensymbol1.toUpperCase()
      );

      setToken1(token);
    }
  }, [balance, tokensymbol1]);
  useEffect(() => {
    if (tokensymbol2 !== "none") {
      const token = balance.find(
        (t) => t.tokensymbol.toUpperCase() === tokensymbol2.toUpperCase()
      );

      setToken2(token);
    } else {
      setToken2(null);
    }
  }, [balance, tokensymbol2]);

  useEffect(() => {
    document.title = "Bakaswap|Swap";
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

  const handleSwapToken1 = async (e) => {
    if (e.target.value.includes("-")) {
      alert("Please enter a positive value ");
      setAmount1("");
    } else {
      setAmount1(e.target.value);
      if (token1 && token2) {
        if (e.target.value) {
          try {
            const res = await requests.calSwap(
              token1.tokenname,
              token2.tokenname,
              e.target.value
            );

            setAmount2(res[0].toFixed(5));
          } catch (err) {
            console.error(err);
          }
        } else {
          setAmount2("");
        }
      }
    }
  };
  const navigation = useNavigate();

  const handleSwap = async () => {
    if (amount1 > token1.balance) {
      alert("Token balance is not enough to make a transaction");
      setAmount1("");
      setAmount2("");
    } else {
      setSwapLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const res = await requests.swap(
          token1.tokenname,
          token2.tokenname,
          amount1,
          currentUser.username
        );
        setSwapLoading(false);
        document.querySelector(".alert").classList.remove("hide");
        document.querySelector(".alert").classList.add("active");
        setTimeout(() => {
          document.querySelector(".alert").classList.remove("active");
          document.querySelector(".alert").classList.add("hide");
          navigation("/portfolio");
        }, 1000);
        setAmount1("");
        setAmount2("");
      } catch (err) {
        console.log(err);
        setSwapLoading(false);
      }
    }
  };

  const handleReverse = async () => {
    const _token0 = token1;
    const _token1 = token2;

    setToken1(_token1);
    setToken2(_token0);
    try {
      const res = await requests.calSwap(
        token2.tokenname,
        token1.tokenname,
        amount1
      );

      setAmount2(res[0].toFixed(5));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={cx("home")}>
      {loading ? (
        <Skeletion type="swap" />
      ) : (
        <div className={cx("container")}>
          <div className={cx("top")}>
            <span>Swap</span>
            <SettingsOutlinedIcon />
          </div>
          <div className={cx("center")}>
            <div className={cx("box")}>
              <div className={cx("boxTop")}>
                <input
                  type="number"
                  placeholder="0"
                  className={cx("tokenQuantity")}
                  value={amount1}
                  onChange={handleSwapToken1}
                />
                <div
                  className={cx("chooseToken")}
                  onClick={() => {
                    setType("token1");
                    setOpenModal(true);
                  }}
                >
                  <img className={cx("logo")} src={token1?.tokenimage} alt="" />

                  <div className={cx("tokenName")}>
                    {token1?.tokensymbol?.toUpperCase()}
                  </div>
                  <KeyboardArrowDownOutlinedIcon className={cx("arrowIcon")} />
                </div>
              </div>
              <div className={cx("boxBottom")}>
                <span className={cx("amount")}>
                  {formatPrice(token1?.price)}
                </span>
                <span className={cx("balance")}>
                  Balance: {formatNumber(token1?.balance)}
                </span>
              </div>
              <div className={cx("reverse")} onClick={handleReverse}>
                <ReveserIcon />
              </div>
            </div>
            {token2 ? (
              <div className={cx("box")}>
                <div className={cx("boxTop")}>
                  <input
                    type="number"
                    placeholder="0"
                    className={cx("tokenQuantity")}
                    value={amount2}
                  />
                  <div
                    className={cx("chooseToken")}
                    onClick={() => {
                      setType("token2");
                      setOpenModal(true);
                    }}
                  >
                    <img
                      className={cx("logo")}
                      src={token2.tokenimage}
                      alt=""
                    />

                    <div className={cx("tokenName")}>
                      {token2.tokensymbol.toUpperCase()}
                    </div>
                    <KeyboardArrowDownOutlinedIcon
                      className={cx("arrowIcon")}
                    />
                  </div>
                </div>
                <div className={cx("boxBottom")}>
                  <span className={cx("amount")}>
                    {formatPrice(token2.price)}
                  </span>
                  <span className={cx("balance")}>
                    Balance: {formatNumber(token2.balance)}
                  </span>
                </div>
              </div>
            ) : (
              <div className={cx("box")}>
                <div className={cx("boxTop")}>
                  <input
                    type="number"
                    laceholder="0"
                    className={cx("tokenQuantity")}
                  />
                  <div
                    className={cx("selectToken")}
                    onClick={() => {
                      setType("token2");
                      setOpenModal(true);
                    }}
                  >
                    <span>Select token</span>
                    <KeyboardArrowDownOutlinedIcon
                      className={cx("arrowIcon")}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className={cx("bottom")}>
            {amount1 > 0 && amount2 > 0 ? (
              <button className={cx("selected")} onClick={handleSwap}>
                {swapLoading ? (
                  <CircularProgress size={40} color="inherit" />
                ) : (
                  "Swap"
                )}
              </button>
            ) : (
              <button className={cx("notSelect")}>Select a token</button>
            )}
          </div>
        </div>
      )}
      <ModalComponent
        open={openModal}
        setOpen={setOpenModal}
        setToken={type === "token1" ? setToken1 : setToken2}
        type={type}
        balance={balance}
        token1={token1}
        token2={token2}
      />
      <Alert severity="success" className="alert hide">
        Account successfully created
      </Alert>
    </div>
  );
};

export default Swap;
