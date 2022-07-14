import React from "react";
import classNames from "classnames";

import "components/Button.scss";


// props.children => button text area used in Parent
// in Parent => <Button> any button text </Button>


// for className => // JSX
// <Button confirm>Confirm</Button>
// = >result
// <button class="button button--confirm">Confirm</button>
// it follows that scss

//CLASSNAMES [LIBRARY]
// const buttonClass = classNames("button", {
//   "button--confirm": props.confirm (if this true => button button--confirm),
//   "button--danger": props.danger (if this is true => button button--danger)
// });

export default function Button(props) {

  const buttonClass = classNames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger
  });

  return (
    <button className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
