import React from "react";
import PropTypes from "prop-types";

function Button(props) {
  return (
    <button style={{ backgroundColor: props.color }}>{props.children}</button>
  );
}

Button.propTypes = {
  color: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired
};

function Message(props) {
  return (
    <li>
      {props.text} <Button color={props.color}>Delete</Button>
    </li>
  );
}

Message.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};

function MessageList() {
  const color = "gray";
  const messages = [{ text: "Hello React" }, { text: "Hello Redux" }];

  const child = messages.map((m, i) => {
    return <Message key={i} text={m.text} color={color}></Message>;
  });

  return (
    <div>
      <p>透過props將color逐層傳遞</p>
      <ul>{child}</ul>
    </div>
  );
}

export default MessageList;
