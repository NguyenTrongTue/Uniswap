import React, { useEffect, useState } from "react";
import styles from "./Token.module.scss";
import classNames from "classnames/bind";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Slider from "react-slick";
import Table from "~/components/table/Table";
import { TOKENLIST } from "~/data/DummyData";
import settings from "~/utils/settingSlice";
import formatPrice from "~/utils/formatPrice";
import Skeletion from "~/components/skeleton/Skeleton";

const cx = classNames.bind(styles);

const Token = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    document.title = "Bakaswap|Tokens";
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
        <Skeletion type="tokens" />
      ) : (
        <>
          <div className={cx("watchlist")}>
            <span className={cx("watchlistTitle")}>Your Watchlist</span>
            <div className={cx("savedTokens")}>
              <span>Saved tokens will appear here</span>
            </div>
          </div>
          <div className={cx("topMovers")}>
            <div className={cx("topMoversTitle")}>Top Movers</div>
            <Slider {...settings} className={cx("slide")}>
              {TOKENLIST.sort(() => Math.random() - 0.5)
                .slice(0, 15)
                .map((token) => {
                  return (
                    <div className="slideItem">
                      <div className={cx("cardToken")}>
                        <img
                          src={token.tokenimage}
                          alt=""
                          className={cx("cardLeft")}
                        />
                        <div className={cx("cardCenter")}>
                          <span className={cx("name")}>
                            {token.tokensymbol.toUpperCase()}
                          </span>
                          <span className={cx("volumn")}>
                            {formatPrice(token.price)}
                          </span>
                        </div>
                        <div className={cx("volatility", "increase")}>
                          <ArrowUpwardIcon className={cx("icon")} />
                          <span>0.86%</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
          <div className={cx("tokensList")}>
            <Table />
          </div>
        </>
      )}
    </div>
  );
};

export default Token;
