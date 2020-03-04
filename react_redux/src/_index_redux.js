import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import Counter from "./redux/Counter";
import Counter_reducer from "./redux/reducer/Counter_reducer";

const store = createStore(Counter_reducer);
const root = document.getElementById("root");

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => store.dispatch({ type: "INCREMENT" })}
      onDecrement={() => store.dispatch({ type: "DECREMENT" })}
    />,
    root
  );
}

render();
store.subscribe(render);