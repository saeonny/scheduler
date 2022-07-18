

export function getAppointmentsForDay(state, name) {
  //DayObj on that day = name
  const thatDayObj = state.days.filter(day => day.name === name);


  //if there is no appointmnets or no available days
  if (thatDayObj.length === 0 || state.days.length === 0) {
    return []
  }

  //list of appointments on that day
  const appointmentIds = thatDayObj[0].appointments

  //result => list of appointmnet objs on that day=name
  let appointments = []
  for (let id of appointmentIds) {
    appointments.push(state.appointments[id])

  }
  return appointments

}

// getInterview(state, appointement.interview)
// 1: {
//   id: 1,
//   time: "12pm",
//   interview: {
//   student: "Archie Cohen",
//   interviewer: 10
//   }
//   },
export function getInterview(state, interviewObj) {
  if (!interviewObj) {
    return null
  }
  const interview_with_interviewer = {};
  interview_with_interviewer.student = interviewObj.student;
  interview_with_interviewer.interviewer= state.interviewers[interviewObj.interviewer];
  return interview_with_interviewer;


}

export function getInterviewersForDay(state, day_name) {
  const filteredDays = state.days.filter(day => day.name === day_name);
    if(state.days.length === 0 || filteredDays.length===0){
      return [];
    }
  
    const interviewersFromDays = filteredDays[0].interviewers;
   
    let interviewersOnThatDay = [];
  
    for(let interviewer of interviewersFromDays) {
      
      interviewersOnThatDay.push(state.interviewers[interviewer]);
    }
    
    return interviewersOnThatDay

}