import "components/Application.scss";
import React , {useState}from "react";
import DayList from "./DayList";
import { appointments } from "./Appointment/appointmentData";
import Appointment from "./Appointment";

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];



export default function Application(props) {
  const [day,setDay] = useState("Monday")
  let appointmentComponents = Object.values(appointments).map((appointment)=>{
    return (<Appointment key = {appointment.id} {...appointment}/>)
  })
  appointmentComponents[5] = <Appointment key = "last"time = "5pm"/>
  console.log(appointmentComponents)
  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={days}
            value={day}
            setDay= {setDay}
          />

        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentComponents}
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}
