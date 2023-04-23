import { useEffect, useState } from "react";

import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import tokens from "~/data/tokens.json";
import styles from "./Modal.module.scss";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import requests from "~/api/httpRequests";
const cx = classNames.bind(styles);
const currencyOptions = [
  {
    flag: require(`../../assets/flag/US.svg`).default,
    code: "USD",
    name: "US Dollar",
    symbol: "$",
    countryCode: "us",
  },
  {
    flag: require(`../../assets/flag/EU.svg`).default,
    code: "EUR",
    name: "Euro",
    symbol: "€",
    countryCode: "eu",
  },
  {
    flag: require(`../../assets/flag/GB.svg`).default,
    code: "GBP",
    name: "British Pound",
    symbol: "£",
    countryCode: "gb",
  },
  {
    flag: require(`../../assets/flag/JP.svg`).default,
    code: "JPY",
    name: "Japanese Yen",
    symbol: "¥",
    countryCode: "jp",
  },
  {
    flag: require(`../../assets/flag/VN.svg`).default,
    code: "VND",
    name: "Việt Nam đồng",
    symbol: "đ",
    countryCode: "vn",
  },
];
function ChildModal({ type, open, onClose, setSelectedCurrency }) {
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <div className={cx("subModal")}>
          <div className={cx("subModalTop")}>
            <h2> {type === "currency" ? "Currency" : "Token"} Selector</h2>
            <div className={cx("exit")} onClick={() => onClose(false)}>
              <CloseIcon className={cx("exitIcon")} />
            </div>
          </div>

          {type === "currency" ? (
            <div className={cx("currencyList")}>
              {currencyOptions.map((currency) => {
                return (
                  <div
                    className={cx("currencyItem")}
                    key={currency.code}
                    onClick={() => {
                      setSelectedCurrency(currency);
                      onClose(false);
                    }}
                  >
                    <img
                      src={currency.flag}
                      className={cx("logo")}
                      alt=""
                      style={{
                        width: "30px",
                        heigh: "30px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                    <span>{currency.code}</span>
                    <span>({currency.symbol})</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={cx("currencyList")}>
              {tokens.map((token) => {
                return (
                  <div
                    className={cx("currencyItem")}
                    key={token.tokensymbol}
                    onClick={() => {
                      setSelectedCurrency(token);
                      onClose(false);
                    }}
                  >
                    <img src={token.tokenimage} className={cx("logo")} alt="" />
                    <span>{token.tokenname}</span>
                    <span>({token.tokensymbol.toUpperCase()})</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}

export default function NestedModal({ open, setOpen, setBalance }) {
  const [selectedCurrency, setSelectedCurrency] = useState(currencyOptions[0]);
  const [selectedToken, setSelectedToken] = useState(tokens[0]);
  const [token, setToken] = useState("");
  const [amount, setAmount] = useState("");

  const { currentUser } = useSelector((state) => state.user);

  const handleSupply = async () => {
    try {
      const res = await requests.addBalance(
        currentUser.username,
        selectedToken.tokenname,
        token
      );
      setBalance((prev) => {
        const newToken = {
          ...selectedToken,
          username: currentUser.username,
          amount: +token,
          tokenname: selectedToken.tokenname,
        };
        if (!prev.some((t) => t.tokenname === selectedToken.tokenname)) {
          return [...prev, newToken];
        } else {
          const newTokenList = prev.map((token) => {
            if (token.tokenname === selectedToken.tokenname) {
              token.amount += newToken.amount;
            }
            return token;
          });
          return [...newTokenList];
        }
      });
      setOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [openSubModal, setOpenSubModal] = useState(false);
  const [type, setType] = useState("");

  const handleCloseSubModal = () => {
    setOpenSubModal(false);
  };

  useEffect(() => {
    if (amount) {
      setToken((parseFloat(amount) / selectedToken.price).toFixed(2));
    } else {
      setToken("");
    }
  }, [selectedToken]);

  const handleAmount = (e) => {
    if (e.target.value.trim()) {
      setAmount(e.target.value);
      setToken((parseFloat(e.target.value) / selectedToken.price).toFixed(2));
    } else {
      setAmount(e.target.value);
      setToken("");
    }
  };
  const handleToken = (e) => {
    if (e.target.value) {
      setToken(e.target.value);
      setAmount(parseFloat(e.target.value * selectedToken.price).toFixed(2));
    } else {
      setToken(e.target.value);
      setToken("");
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div className={cx("nestedModal")}>
          <div className={cx("nmTop")}>
            <span>Buy Token</span>
            <div className={cx("exit")} onClick={handleClose}>
              <CloseIcon className={cx("exitIcon")} />
            </div>
          </div>
          <div className={cx("nmItem")}>
            {/* <div className={cx("nmLabel")}>I want to spend</div> */}
            <div className={cx("itemBox")}>
              <input type="text" value={amount} onChange={handleAmount} />
              <div
                className={cx("chooseCurrent")}
                onClick={() => {
                  setType("currency");
                  setOpenSubModal(true);
                }}
              >
                <img
                  className={cx("flag")}
                  src={selectedCurrency.flag}
                  alt=""
                />
                <div className={cx("countryName")}>{selectedCurrency.code}</div>
                <KeyboardArrowDownIcon />
              </div>
            </div>
          </div>
          <div className={cx("nmItem")}>
            {/* <div className={cx("nmLabel")}>I want to spend</div> */}
            <div className={cx("itemBox")}>
              <input type="text" value={token} onChange={handleToken} />
              <div
                className={cx("chooseCurrent")}
                onClick={() => {
                  setType("token");
                  setOpenSubModal(true);
                }}
              >
                <img
                  className={cx("flag")}
                  src={selectedToken.tokenimage}
                  alt=""
                />
                <div className={cx("countryName")}>
                  {selectedToken.tokensymbol.toUpperCase()}
                </div>
                <KeyboardArrowDownIcon />
              </div>
            </div>
          </div>
          <div className={cx("button")} onClick={handleSupply}>
            Supply
          </div>
        </div>
      </Modal>
      <ChildModal
        type={type}
        open={openSubModal}
        onClose={handleCloseSubModal}
        setSelectedCurrency={
          type === "currency" ? setSelectedCurrency : setSelectedToken
        }
      />
    </div>
  );
}
