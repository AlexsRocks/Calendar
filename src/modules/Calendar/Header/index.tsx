import React, { FC } from "react";
import moment from "moment";
import ViewsDatePicker from "./DatePicker";

import styles from "./Header.module.scss";

export type IPaginatorProps = {
  dateHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setCurrentDate: any;
  openFormHandler: (methodName: string, eventForUpdate: any) => void;
  date: moment.Moment;
};

const Header: FC<IPaginatorProps> = ({
  dateHandler,
  setCurrentDate,
  openFormHandler,
  date,
}) => {
  return (
    <div className={styles.header}>
      <div className={styles.addEvents}>
        <button
          className={styles.create}
          onClick={() => openFormHandler("Create", null)}
        >
          <span>+</span>
        </button>
      </div>
      <ViewsDatePicker
        dateHandler={dateHandler}
        setCurrentDate={setCurrentDate}
        date={date}
      />
    </div>
  );
};

export default Header;
