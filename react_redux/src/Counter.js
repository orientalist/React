import React from "react";
import PropTypes from "prop-types";

class Counter extends React.Component {
  constructor() {
    super();
    this.state = { value: 0 };
  }

  render() {
    return (
      <div>
        <button onClick={() => this.setState({ value: this.state.value + 1 })}>
          INCREMENT
        </button>
        <br />
        Counter元件內部狀態:
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
        <Content value={this.state.value} />
      </div>
    );
  }
}

function Content(props) {
  return <p>Content 元件的props.value:{props.value}</p>;
}

Content.propTypes = {
  value: PropTypes.number.isRequired
};

export default Counter;