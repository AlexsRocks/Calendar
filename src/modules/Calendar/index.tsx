import React from "react";
import Header from "./Header";
import Body from "./Body";
import moment from "moment";

const Calendar = () => {
  const startCalendar = moment().startOf("month").startOf("week");
  return (
    <div>
      <Header />
      <Body startCalendar={startCalendar} />
    </div>
  );
};

export default Calendar;
