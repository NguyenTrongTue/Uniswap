import { useEffect, useRef, useState } from "react";
import Tippy from "@tippyjs/react/headless";
import styles from "./Search.module.scss";
import classNames from "classnames/bind";
import { SearchIcon } from "../Icon";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import tokens from "~/data/tokens.json";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import { addRecentSearch } from "~/redux/userSlice";
import { Link } from "react-router-dom";
import Skeletion from "../skeleton/Skeleton";
import formatPrice from "~/utils/formatPrice";

const cx = classNames.bind(styles);
const Search = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const [firstFocus, setFirstFocus] = useState(true);

  const { recentSearch } = useSelector((state) => state.user);
  const [recents, setRecents] = useState([...recentSearch]);
  const [popularTokens] = useState(tokens.slice(0, 3));
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);

  const debounced = useDebouncedCallback(
    // function
    async (value) => {
      setSearchLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const regex = new RegExp(value, "i");
      const token = tokens.filter((item) => regex.test(item.tokenname));
      if (token.length === 0) {
        const searchWithSymbol = tokens.filter((item) =>
          regex.test(item.tokensymbol)
        );
        setResults(searchWithSymbol);
      } else {
        setResults(token);
      }
      setSearchLoading(false);
    },
    // delay in ms
    500
  );

  useEffect(() => {
    debounced(searchValue);
  }, [searchValue, debounced]);

  const dispatch = useDispatch();

  const tippyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        tippyRef.current &&
        !tippyRef.current.contains(e.target) &&
        !inputRef.current.contains(e.target)
      ) {
        setVisible(false);
      }
    };
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleFocus = () => {
    setVisible(true);
    if (firstFocus) {
      const fetchApi = async () => {
        setLoading(true);
        try {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          setLoading(false);
        } catch (err) {
          setLoading(false);
        }
      };
      fetchApi();
      setFirstFocus(false);
    }
  };

  return (
    <>
      <Tippy
        visible={visible}
        interactive={true}
        offset={[0, -10]}
        render={(attrs) => (
          <div
            className={cx("tippyWrapper")}
            tabIndex="-1"
            {...attrs}
            ref={tippyRef}
          >
            {!searchValue && recents.length > 0 && (
              <div className={cx("tokenResult")}>
                <div className={cx("top")}>
                  <div className={cx("topIcon")}>
                    <AccessTimeIcon />
                  </div>
                  <div className={cx("topTitle")}>Recent Search</div>
                </div>
                <div className={cx("center")}>
                  <div className={cx("resultList")}>
                    {recents.map((token, index) => {
                      return loading ? (
                        <Skeletion type="search" />
                      ) : (
                        <Link
                          to={`/swap/${token.tokensymbol}/none`}
                          className={cx("item")}
                          key={index}
                          onClick={() => {
                            setVisible(false);
                          }}
                        >
                          <div className={cx("itemLeft")}>
                            <img src={token.tokenimage} alt="" />
                            <div className={cx("token ")}>
                              <div className={cx("tokenName")}>
                                {token.tokenname}
                              </div>
                              <div className={cx("tokenSymbol")}>
                                {token.tokensymbol}
                              </div>
                            </div>
                          </div>
                          <div className={cx("itemRight")}>
                            <div className={cx("price")}>
                              ${token.price.toFixed(2)}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            {!searchValue && (
              <div className={cx("tokenResult")}>
                <div className={cx("top")}>
                  <div className={cx("topIcon")}>
                    <TrendingUpIcon />
                  </div>
                  <div className={cx("topTitle")}>Popular Tokens</div>
                </div>
                <div className={cx("center")}>
                  <div className={cx("resultList")}>
                    {popularTokens.map((token) => {
                      return loading ? (
                        <Skeletion type="search" />
                      ) : (
                        <Link
                          to={`/swap/${token.tokensymbol}/none`}
                          className={cx("item")}
                          key={token.tokenname}
                          onClick={() => {
                            setVisible(false);
                            dispatch(addRecentSearch(token));
                            setRecents((prev) => {
                              var newRecents = prev;
                              const isExist = prev.some(
                                (item) => item.tokenname === token.tokenname
                              );
                              if (!isExist) {
                                newRecents.push(token);
                              }
                              return newRecents;
                            });
                          }}
                        >
                          <div className={cx("itemLeft")}>
                            <img src={token.tokenimage} alt="" />
                            <div className={cx("token ")}>
                              <div className={cx("tokenName")}>
                                {token.tokenname}
                              </div>
                              <div className={cx("tokenSymbol")}>
                                {token.tokensymbol}
                              </div>
                            </div>
                          </div>
                          <div className={cx("itemRight")}>
                            <div className={cx("price")}>
                              ${+token?.price.toFixed(2)}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            {searchValue && results.length > 0 ? (
              <div className={cx("tokenResult")}>
                <div className={cx("top")}>
                  <div className={cx("topTitle")}>Tokens</div>
                </div>
                <div className={cx("center")}>
                  <div className={cx("resultList")}>
                    {results.map((token) => {
                      return searchLoading ? (
                        <Skeletion type="search" />
                      ) : (
                        <Link
                          to={`/swap/${token.tokensymbol}/none`}
                          className={cx("item")}
                          key={token.tokenname}
                          onClick={() => {
                            setVisible(false);
                            dispatch(addRecentSearch(token));
                            setRecents((prev) => {
                              var newRecents = prev;
                              const isExist = prev.some(
                                (item) => item.tokenname === token.tokenname
                              );
                              if (!isExist) {
                                newRecents.push(token);
                              }
                              return newRecents;
                            });
                          }}
                        >
                          <div className={cx("itemLeft")}>
                            <img src={token.tokenimage} alt="" />
                            <div className={cx("token ")}>
                              <div className={cx("tokenName")}>
                                {token.tokenname}
                              </div>
                              <div className={cx("tokenSymbol")}>
                                {token.tokensymbol}
                              </div>
                            </div>
                          </div>
                          <div className={cx("itemRight")}>
                            <div className={cx("price")}>
                              {formatPrice(token?.price)}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              searchValue && <div className={cx("title")}>No tokens found.</div>
            )}
          </div>
        )}
      >
        <label htmlFor="search" className={cx("search")}>
          <SearchIcon className={cx("icon")} width="16" height="16" />

          <input
            ref={inputRef}
            onFocus={handleFocus}
            autoComplete="off"
            type="text"
            id="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search tokens"
          />
        </label>
      </Tippy>
    </>
  );
};

export default Search;
