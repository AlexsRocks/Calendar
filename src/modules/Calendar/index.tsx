import React, { useState } from "react";
import Header from "./Header";
import Body from "./Body";
import moment from "moment";
import cx from "classnames";

import styles from "./index.module.scss";

const defaultEvent: any = {
  title: "",
  description: "",
  date: "",
  time: "",
};

const Calendar = () => {
  const [method, setMethod] = useState(null);
  const [isShowForm, setShowForm] = useState(false);

  const eventsLocalStorage: string = localStorage.getItem("events") || "[]";
  const dateLocalStorage: string =
    localStorage.getItem("date") || `${moment().format("YYYY-MM-D")}`;
  const [event, setEvent] = useState(defaultEvent);
  let events = JSON.parse(eventsLocalStorage);
  const [currentDate, setCurrentDate] = useState(moment(dateLocalStorage));
  const _date = currentDate?.clone().startOf("month");
  const dateHandler = (e: any) => {
    switch (e.target.value) {
      case "prev":
        setCurrentDate((prev) => prev.clone().subtract(1, "month"));
        localStorage.setItem(
          "date",
          JSON.stringify(
            currentDate.clone().subtract(1, "month").format("YYYY-MM-D")
          )
        );
        break;
      case "next":
        setCurrentDate((next) => next.clone().add(1, "month"));
        localStorage.setItem(
          "date",
          JSON.stringify(
            currentDate.clone().add(1, "month").format("YYYY-MM-D")
          )
        );
        break;
    }
  };

  const openModalFormHandler = (methodName: any, eventForUpdate: any) => {
    setMethod(methodName);
    setEvent(eventForUpdate || { ...defaultEvent });
    setShowForm(true);
  };

  const cancelButtonHandler = () => {
    setShowForm(false);
    setEvent(null);
  };

  const changeEventHandler = (text: any, field: any) => {
    setEvent((prevState: any) => ({
      ...prevState,
      [field]: text,
    }));
  };
  const eventFetchHandler = () => {
    if (method === "Update") {
      const update = events.map((item: any) =>
        item.id === event.id ? { ...event } : item
      );
      localStorage.setItem("events", JSON.stringify(update));
    } else {
      event.id = Date.now();
      events = [...events, event];
      localStorage.setItem("events", JSON.stringify(events));
    }
    cancelButtonHandler();
  };

  const removeEventHandler = () => {
    const remove = events.filter((item: any) => item.id != event.id);
    localStorage.setItem("events", JSON.stringify(remove));
    cancelButtonHandler();
  };

  return (
    <>
      {isShowForm ? (
        <div
          className={styles.formPositionWrapper}
          onClick={cancelButtonHandler}
        >
          <div
            className={styles.formWrapper}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              className={styles.eventTitle}
              value={event.title}
              onChange={(e) => changeEventHandler(e.target.value, "title")}
              placeholder="Title"
            />
            <textarea
              className={styles.eventBody}
              value={event.description}
              onChange={(e) =>
                changeEventHandler(e.target.value, "description")
              }
              placeholder="Description"
            />
            <div className={styles.times}>
              <div className={styles.date}>
                <label htmlFor="date">Date</label>
                <br />
                <input
                  id="date"
                  type="date"
                  className={styles.eventTitle}
                  value={event.date}
                  onChange={(e) => changeEventHandler(e.target.value, "date")}
                  placeholder="date"
                />
              </div>
              <div className={styles.time}>
                <label htmlFor="Time">Time</label>
                <br />
                <input
                  id="Time"
                  type="time"
                  className={styles.eventTitle}
                  value={event.time}
                  onChange={(e) => changeEventHandler(e.target.value, "time")}
                  placeholder="time"
                />
              </div>
            </div>
            <div className={styles.buttonsWrapper}>
              <button
                className={styles.buttonWrapper}
                onClick={cancelButtonHandler}
              >
                Cancel
              </button>
              <button
                className={styles.buttonWrapper}
                onClick={eventFetchHandler}
              >
                {method}
              </button>
              {method === "Update" ? (
                <button
                  className={cx(styles.remove, styles.buttonWrapper)}
                  onClick={removeEventHandler}
                >
                  Remove
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
      <Header
        dateHandler={dateHandler}
        setCurrentDate={setCurrentDate}
        openFormHandler={openModalFormHandler}
        date={_date}
      />
      <Body
        date={_date}
        openFormHandler={openModalFormHandler}
        currentDate={currentDate}
      />
    </>
  );
};

export default Calendar;
