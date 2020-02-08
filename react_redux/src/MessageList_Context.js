import React from "react";
import PropTypes from "prop-types";

const context = React.createContext({ color: "gray" });

class Button extends React.Component {
  render() {
    return (
      <button style={{ backgroundColor:this.context.color }}>
        {this.props.children}
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.string.isRequired
};

Button.contextType=context;

function Message(props) {
  return (
    <li>
      {props.text}
      <Button>Delete</Button>
    </li>
  );
}

Message.propTypes = {
  text: PropTypes.string.isRequired
};

class MessageList_Context extends React.Component {
  render() {
    const messages = [{ text: "Hello React" }, { text: "Hello Redux" }];

    const children = messages.map((m, i) => <Message key={i} text={m.text} />);

    return (
      <div>
        <p>透過context傳遞color</p>
        <ul>{children}</ul>
      </div>
    );
  }
}

export default MessageList_Context;
