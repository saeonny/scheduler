import "components/Application.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList";
import { appointments } from "./Appointment/appointmentData";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";





export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers : {}
  });
  const setDay = day => setState(prev => ({ ...prev, day }))
  




  //CALL DAY DATA FROM API


  
  
  useEffect(()=>{
    const dayURL = "/api/days";
    const appointmentURL = "/api/appointments";
    const interviewersURL = "/api/interviewers";
    Promise.all([
      axios.get(dayURL),
      axios.get(appointmentURL),
      axios.get(interviewersURL)
    ]).then((all) => {
      setState(prev=>({...prev, days:all[0].data, appointments:all[1].data, interviewers:all[2].data }));
    })
  },[])

 
  const dailyAppointments = getAppointmentsForDay(state,state.day)

  


  const appointmentComponents = dailyAppointments.map((appointment)=>{
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state,state.day)
    return (<Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers = {interviewers}
    />)
  })
  appointmentComponents[5] = <Appointment key = "last"time = "5pm"/>
 


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
            days={state.days}
            value={state.day}
            setDay={setDay}
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
