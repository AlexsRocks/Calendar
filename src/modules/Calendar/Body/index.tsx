import React, { FC } from "react";
import styles from "./Body.module.scss";
import moment from "moment";
import cx from "classnames";

export type IPaginatorProps = {
  startCalendar: moment.Moment;
};

const Body: FC<IPaginatorProps> = ({ startCalendar }) => {
  const day = startCalendar.clone();
  console.log(day.weekday());
  const arrayDay = [...Array(42)].map(() => day.add(1, "day").clone());
  return (
    <div className={styles.table}>
      {arrayDay.map((item: any, i) => (
        <div
          key={`day-${i}`}
          className={cx(styles.day, {
            [styles.weekend]: item.day() === 6 || item.day() === 0,
            [styles.today]: moment().isSame(item, "day"),
          })}
        >
          {item.format("D")}
        </div>
      ))}
    </div>
  );
};

export default Body;
