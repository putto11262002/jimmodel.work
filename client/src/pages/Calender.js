import { Button, Container, Row, Col, Placeholder, Spinner } from "react-bootstrap";

import { useState } from "react";
import useBuildCalender from "../hooks/useBuildCalender";
import Day  from "../components/calender/Day";
import Loader from "../components/shared/Loader";
const now = new Date();
const currentMonthInitialState = new Date(now.getFullYear(), now.getMonth(), 1);
export default function Calender() {
  const [currentMonth, setCurrentMonth] = useState(currentMonthInitialState);
  const {calender , loading}= useBuildCalender(currentMonth);
 
  function nextMonth() {
    setCurrentMonth(
      new Date(currentMonth.setMonth(currentMonth.getMonth() + 1))
    );
  }
  function previousMonth() {
    setCurrentMonth(
      new Date(currentMonth.setMonth(currentMonth.getMonth() - 1))
    );
  }

  return (
    <div className="calender-container d-flex flex-column justify-content-start p-0 m-0">
      <Row className="justify-content-center align-items-center py-2 border-bottom w-100 m-0">
        <Col className="  d-flex justify-content-center" xs={3}>
          <Button
            onClick={previousMonth}
            className="rounded-circle"
            variant="light"
          >
            <i className="bi bi-caret-left-fill"></i>
          </Button>
        </Col>
        <Col xs={6}>
          <h6 className="text-center m-0">
            {getMonthName(currentMonth.getMonth()) +
              " " +
              currentMonth.getFullYear()}
          </h6>
        </Col>

        <Col className=" d-flex justify-content-center" xs={3}>
          <Button
            onClick={nextMonth}
            className="rounded-circle"
            variant="light"
          >
            <i className="bi bi-caret-right-fill"></i>
          </Button>
        </Col>
      </Row>
      <div className="d-flex ">
        <div
          className="border-start border-end"
          style={{ width: `${100 / 7}%` }}
        >
          <p className="m-0 text-center">MON</p>
        </div>
        <div
          className="border-start border-end"
          style={{ width: `${100 / 7}%` }}
        >
          <p className="m-0 text-center">TUE</p>
        </div>
        <div
          className="border-start border-end"
          style={{ width: `${100 / 7}%` }}
        >
          <p className="m-0 text-center">WED</p>
        </div>
        <div
          className="border-start border-end"
          style={{ width: `${100 / 7}%` }}
        >
          <p className="m-0 text-center">THU</p>
        </div>
        <div
          className="border-start border-end"
          style={{ width: `${100 / 7}%` }}
        >
          <p className="m-0 text-center">FRI</p>
        </div>
        <div
          className="border-start border-end"
          style={{ width: `${100 / 7}%` }}
        >
          <p className="m-0 text-center">SAT</p>
        </div>
        <div
          className="border-start border-end"
          style={{ width: `${100 / 7}%` }}
        >
          <p className="m-0 text-center">SUN</p>
        </div>
      </div>
      <div className="flex-grow-1 d-flex justify-content-around flex-wrap align-content-stretch">
        {loading ? [ ...Array(28).keys() ].map( i => i+1).map(index => {
           return (
            <div
              key={index}
              className="border-start border-end border-bottom d-flex align-items-center justify-content-center"
              style={{
                width: `${100 / 7}%`,
                height: `${100 / Math.ceil(calender.length / 7)}%`,
              }}
            >
           
            <Loader/>
            </div>
          );
        }) : calender.map((day, index) => {
          return (
            <div
              key={index}
              className="border-start border-end border-bottom"
              style={{
                width: `${100 / 7}%`,
                height: `${100 / Math.ceil(calender.length / 7)}%`,
              }}
            >
           
            <Day  lastRow={day.length - (day.length - 8) < index} data={day} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

const getMonthName = (month) => {
  if ((month < 0) | (month > 12)) return;
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[month];
};
