import React, { FC } from "react";
import moment from "moment";
import cx from "classnames";

import styles from "./Body.module.scss";

export type IPaginatorProps = {
  date: moment.Moment;
  openFormHandler: (methodName: string, eventForUpdate: any) => void;
  currentDate: moment.Moment;
};

const Body: FC<IPaginatorProps> = ({ date, openFormHandler, currentDate }) => {
  const day = date.clone().startOf("week");
  const arrayDay = [...Array(42)].map(() => day.add(1, "day").clone());
  const txt = localStorage.getItem("events");
  return (
    <div className={styles.table}>
      {arrayDay.map((item: any, i) => (
        <div
          key={`day-${i}`}
          className={cx(styles.day, {
            [styles.weekend]: item.day() === 6 || item.day() === 0,
            [styles.today]: moment().isSame(item, "day"),
            [styles.mons]: currentDate.isSame(item, "month"),
          })}
        >
          <div className={cx(styles.dayHeader)}>
            <span>{item.format("D")}</span>
            <span>{item.day(item.day()).format("dd")}</span>
          </div>
          <div className={styles.events}>
            {JSON.parse(txt || "[]")?.map((items: any) =>
              items.date === item.format("YYYY-MM-DD") ? (
                <span
                  key={item.unix()}
                  className={styles.event}
                  onDoubleClick={() => openFormHandler("Update", items)}
                >
                  {items.title}
                </span>
              ) : null
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Body;
