import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props) {
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  
  const SAVING = "SAVING"
  const CONFIRM = "CONFIRM"
  const DELETEING = "DELETING"
  const EDIT = "EDIT"
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"




  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id,interview)
    .then(() =>{transition(SHOW)})
    .catch(()=> {transition(ERROR_SAVE,true)})
    
  }
  function cancels() { 
    transition(DELETEING,true)
    props.cancelInterview(props.id)
    .then(()=> {transition(EMPTY)})
    .catch(()=> transition(ERROR_DELETE,true))
    
  }
  


  return <article className="appointment">
    <Header time={props.time} />

    {mode === SHOW &&
      <Show student={props.interview.student}
            interviewer={props.interview.interviewer.name}
            onDelete = {()=>{transition(CONFIRM)}}
            onEdit = {()=>transition(EDIT)}
        
        />}

    {mode === EMPTY &&
      <Empty onAdd={() => { transition(CREATE) }} />}


    {mode === CREATE &&
      <Form interviewers={props.interviewers} onCancle={ back } onSave={save} />
    }

    {mode === SAVING &&
     <Status message = "SAVING" />
    
    }
    {mode === CONFIRM &&
     <Confirm message = "Are you sure to delete?" onConfirm = {cancels} onCancel = {back}/>
    
    }
    {mode === DELETEING &&
    <Status message = "Deleting" />
    }

    {mode === EDIT &&
    <Form student = {props.interview.student} interviewer = {props.interview.interviewer.id}interviewers={props.interviewers} onCancle={ back } onSave={save}/>
    
    
    }

    {mode === ERROR_SAVE &&
    <Error message = "Could not Save appointment" onClose = {back}/>
    
    }

    {mode === ERROR_DELETE&&
    <Error message = "Could not Delete appointment" onClose = {back}/>
    }




  </article>
}