import React from "react";
import classNames from "classnames/bind";
import styles from "./Skeleton.module.scss";

const cx = classNames.bind(styles);

export default function Skeletion({ type }) {
  const Tokens = () => {
    return (
      <div className={cx("tokenWrapper")}>
        <div className={cx("tokenTop")}>
          {Array(5).fill(<div className={cx("tokenSliceItem")}></div>)}
        </div>
        <div className={cx("tokenBottom")}>
          {Array(7).fill(<div className={cx("tokenItem")}></div>)}
        </div>
      </div>
    );
  };

  const Pools = () => {
    return (
      <div className={cx("tokenWrapper")}>
        <div className={cx("searchSke")}></div>
        <div className={cx("tokenBottom")}>
          {Array(7).fill(<div className={cx("tokenItem")}></div>)}
        </div>
      </div>
    );
  };

  const Swap = () => {
    return (
      <div className={cx("swapWrapper")}>
        <div className={cx("swapTop")}></div>
        <div className={cx("swapBox")}></div>
        <div className={cx("swapBox")}></div>
        <div className={cx("swapBtn")}></div>
      </div>
    );
  };

  const Home = () => {
    return (
      <div className={cx("homeSwapper")}>
        <div className={cx("homeTitle")}></div>
        <div className={cx("homeCenter")}>
          <div className={cx("homeBox")}>
            <div className={cx("boxItem")}></div>
            <div className={cx("boxItem")}></div>
          </div>
          <div className={cx("homeBox")}>
            <div className={cx("boxItem")}></div>
            <div className={cx("boxItem")}></div>
          </div>
        </div>
        <div className={cx("homeBottom")}></div>
      </div>
    );
  };
  const Search = () => {
    return (
      <div className={cx("search")}>
        <div className={cx("leftWrapper")}>
          <div className={cx("left")}></div>
          <div className={cx("tokenName")}>
            <div className={cx("name")}></div>
            <div className={cx("symbol")}></div>
          </div>
          <div className={cx("right")}></div>
        </div>
      </div>
    );
  };

  if (type === "tokens") return <Tokens />;
  if (type === "pools") return <Pools />;
  if (type === "swap") return <Swap />;
  if (type === "home") return <Home />;
  if (type === "search") return <Search />;
}
