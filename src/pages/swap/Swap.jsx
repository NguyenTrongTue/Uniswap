import React, { useEffect, useState } from "react";
import styles from "./Swap.module.scss";
import classNames from "classnames/bind";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import tokens from "~/data/tokens.json";
import { useSelector } from "react-redux";
import formatPrice from "~/utils/formatPrice";
import ModalComponent from "./Modal";
import { ReveserIcon } from "~/components/Icon";
import requests from "~/api/httpRequests";

const cx = classNames.bind(styles);
const Swap = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [openModal, setOpenModal] = useState(false);
  const [token1, setToken1] = useState(null);
  const [token2, setToken2] = useState(null);
  const [balance, setBalance] = useState([]);
  const [type, setType] = useState("");
  const [amount1, setAmount1] = useState();
  const [amount2, setAmount2] = useState();

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
    setToken1(balance[0]);
  }, [balance]);

  useEffect(() => {
    document.title = "Uniswap";
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

  const handleSwap = async () => {
    try {
      const res = await requests.swap(
        token1.tokenname,
        token2.tokenname,
        amount1,
        currentUser.username
      );
      alert("Success");
    } catch (err) {
      console.log(err);
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
                  {token1?.tokensymbol.toUpperCase()}
                </div>
                <KeyboardArrowDownOutlinedIcon className={cx("arrowIcon")} />
              </div>
            </div>
            <div className={cx("boxBottom")}>
              <span className={cx("amount")}>{formatPrice(token1?.price)}</span>
              <span className={cx("balance")}>Balance: {token1?.balance}</span>
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
                  <img className={cx("logo")} src={token2.tokenimage} alt="" />

                  <div className={cx("tokenName")}>
                    {token2.tokensymbol.toUpperCase()}
                  </div>
                  <KeyboardArrowDownOutlinedIcon className={cx("arrowIcon")} />
                </div>
              </div>
              <div className={cx("boxBottom")}>
                <span className={cx("amount")}>
                  {formatPrice(token2.price)}
                </span>
                <span className={cx("balance")}>Balance: {token2.balance}</span>
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
                  <KeyboardArrowDownOutlinedIcon className={cx("arrowIcon")} />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className={cx("bottom")}>
          {amount1 > 0 && amount2 > 0 ? (
            <button className={cx("selected")} onClick={handleSwap}>
              Swap
            </button>
          ) : (
            <button className={cx("notSelect")}>Select a token</button>
          )}
        </div>
      </div>
      <ModalComponent
        open={openModal}
        setOpen={setOpenModal}
        setToken={type === "token1" ? setToken1 : setToken2}
        balance={balance}
        token1={token1}
        token2={token2}
      />
    </div>
  );
};

export default Swap;
