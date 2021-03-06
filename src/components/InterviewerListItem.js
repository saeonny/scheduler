import React from "react";
import "components/InterviewerListItem.scss"
import classNames from "classnames";
// const interviewer = {
//   id: 1,
//   name: "Sylvia Palmer",
//   avatar: "https://i.imgur.com/LpaY82x.png"
// };

export default function InterviewerListItem(props) {


  const interviewerClass = classNames("interviewers__item",
    {
      "interviewers__item--selected": props.selected
    }

  )



  return (
    <li className={interviewerClass} selected={props.selected} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}

    </li>

  );
};