import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./Modal.module.scss";
import classNames from "classnames/bind";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import formatNumber from "~/utils/formatNumber";

const cx = classNames.bind(styles);

function ModalComponent({
  open,
  setOpen,
  setToken,
  balance,
  token1,
  token2,
  type,
}) {
  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const handleTokenSelect = (token) => {
    console.log(token);
    setOpen(false);
    setToken(token);
    if (type === "token1" && token2) {
      navigate(`/swap/${token.tokensymbol}/${token2.tokensymbol}`);
    } else if (type === "token1" && !token2) {
      navigate(`/swap/${token.tokensymbol}/none`);
    } else if (type === "token2") {
      navigate(`/swap/${token1.tokensymbol}/${token.tokensymbol}`);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <div className={cx("modal")}>
          <div className={cx("modalTop")}>
            <div className={cx("modalHeader")}>
              <div className={cx("mtLabel")}>Select a token</div>
              <div style={{ cursor: "pointer" }} onClick={handleClose}>
                <CloseIcon />
              </div>
            </div>
            <div className={cx("searchToken")}>
              <input type="text" placeholder="Search name or symbol" />
              <SearchIcon className={cx("searchIcon")} />
            </div>
          </div>
          <div className={cx("modalBody")}>
            {balance.map((b) => {
              return (
                <div
                  className={cx(
                    "modalItem",
                    (b.tokenname === token1?.tokenname ||
                      b.tokenname === token2?.tokenname) &&
                      "isChoosed"
                  )}
                  key={b.tokensymbol}
                  onClick={() => {
                    handleTokenSelect(b);
                  }}
                >
                  <div className={cx("modalItemLeft")}>
                    <img src={b.tokenimage} alt="" />
                    <div className={cx("token")}>
                      <div className={cx("tokenname")}>{b.tokenname}</div>
                      <div className={cx("tokensymbol")}>
                        {b.tokensymbol.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  <div className={cx("itemRight")}>
                    <span className={cx("amount")}>
                      {formatNumber(b.balance)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalComponent;
