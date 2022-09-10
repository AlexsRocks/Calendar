import React, { FC, memo } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Box from "@mui/material/Box";
import moment from "moment/moment";

import styles from "../Header.module.scss";

export type IViewsDatePicker = {
  dateHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setCurrentDate: any;
  date: moment.Moment;
};

const ViewsDatePicker: FC<IViewsDatePicker> = ({
  dateHandler,
  setCurrentDate,
  date,
}) => {
  return (
    <div style={{ position: "relative" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          views={["year", "month"]}
          label="Year and Month"
          inputFormat="dd.MM.yyyy"
          value={date}
          onChange={(newValue: any) => {
            setCurrentDate(moment([newValue.$y, newValue.$M]));
            localStorage.setItem(
              "date",
              JSON.stringify(
                newValue
                  .clone()
                  .subtract(1, "month")
                  .add(1, "month")
                  .format("YYYY-MM-D")
              )
            );
          }}
          renderInput={({ InputProps, inputRef }) => (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <div className={styles.switch} ref={inputRef}>
                <button
                  className={styles.dateSwitch}
                  type={"button"}
                  value={"prev"}
                  onClick={dateHandler}
                >
                  &lt;
                </button>
                <div className={styles.date}>{date.format("MMMM YYYY")}</div>
                <button
                  className={styles.dateSwitch}
                  type={"button"}
                  value="next"
                  onClick={dateHandler}
                >
                  &gt;
                </button>
                {InputProps?.endAdornment}
              </div>
            </Box>
          )}
        />
      </LocalizationProvider>
    </div>
  );
};

export default memo(ViewsDatePicker);
