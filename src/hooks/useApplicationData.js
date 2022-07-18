import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useAppliacationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState(prev => ({ ...prev, day }))


  useEffect(() => {
    const dayURL = "/api/days";
    const appointmentURL = "/api/appointments";
    const interviewersURL = "/api/interviewers";
    Promise.all([
      axios.get(dayURL),
      axios.get(appointmentURL),
      axios.get(interviewersURL)
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, [])


  
  
  const getDayIndex = function (day) {
    const index = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4
    }
    return index[day]
  }
  
  
  function bookInterview(id, interview) {
  
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const dayIndex = getDayIndex(state.day)
    const day = { ...state.days[dayIndex], spots: state.days[dayIndex].spots - 1 }
    let days = state.days
    days[dayIndex] = day
  
    const url = `/api/appointments/${id}`;
    return axios.put(url, appointment)
    .then(() => { setState({ ...state, appointments, days }) })
  
    //ERROR MODE
    // const errorUrl = `/api/appointments/${id}`;
    // return axios.put(errorUrl, appointment)
    // .then(() => { setState({ ...state, appointments, days }) })
  }
  
  //  DELETING EXISTING INTERVIEW => CONFIRM => DELETEING
  function cancelInterview(id) {
  
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    const dayIndex = getDayIndex(state.day)
    const day = { ...state.days[dayIndex], spots: state.days[dayIndex].spots + 1 }
    let days = state.days
    days[dayIndex] = day
  
    const  url =`http://localhost:8001/api/appointments/${id}`;
    return axios.delete(url, appointment).then(() => { setState({ ...state, appointments, days }) })
  
    //ERROR MODE
    // const errorUrl = `http://localhost:8001/api/appointments/${id}`
    // return axios.delete(errorUrl, appointment).then(() => { setState({ ...state, appointments, days }) })
  }
  return {state,setDay,bookInterview,cancelInterview}

}
