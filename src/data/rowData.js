import classNames from "classnames/bind";
import styles from "~/components/table/Table.module.scss";

const cx = classNames.bind(styles);

export const tokensColumn = [
  { field: "id", headerName: "#", width: 50 },
  {
    field: "name",
    headerName: "Name",
    width: 350,
    renderCell: (params) => {
      return (
        <div className={cx("cellWithImg")}>
          <img className={cx("cellImg")} src={params.row.img} alt="avatar" />
          <span className={cx("tokenName")}>{params.row.name}</span>
          <span className={cx("symbol")}>({params.row.symbol})</span>
        </div>
      );
    },
  },
  {
    field: "price",
    headerName: "Price",
    width: 230,
  },
  {
    field: "priceChange",
    headerName: "Price Change",
    width: 230,
  },
  {
    field: "colume24h",
    headerName: "Volume 24H",
    width: 130,
  },
  {
    field: "tvl",
    headerName: "TVL",
    width: 130,
  },
];
