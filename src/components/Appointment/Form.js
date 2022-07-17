import React, { useState } from "react";
import "./styles.scss";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error,setError] = useState("")

  const reset = function(){
    setStudent("");
    setInterviewer(null);
  }
  const cancel = function (){
    reset();
    props.onCancle();

  }
  const save = function () {
    if(student === "") {
      setError("Student name cannot be empty")
      return
    }
    if(interviewer === null) {
      setError("Please select Interviewewr")
      return
    }
    setError("")
    props.onSave(student,interviewer)
  }

  return (<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name={props.student}
        type="text"
        placeholder="Enter Student Name"
        value={student}
        onChange = {(e)=>{setStudent(e.target.value)}}
      />
    </form>
    <InterviewerList 
      interviewers = {props.interviewers} interviewer={interviewer} onChange = {setInterviewer}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick = {cancel}>Cancel</Button>
      <Button confirm onClick = {save}>Save</Button>
    </section>
  </section>
</main>
)
}