import { createStore,applyMiddleware } from "redux";
import thunk from 'redux-thunk';

//action function
function increment(){
    return {type:'INCREMENT'};
};
function decrement(){
    return {type:'DECREMENT'};
};

//encapsule action function
function incrementIfOdd(){
    return (dispatch,getState)=>{
        const value=getState();
        if(value%2===0){
            return;
        }
        dispatch(increment());
    };
};
function incrementAsync(delay=1000){
    return (dispatch)=>{
        setTimeout(()=>{
            dispatch(increment);
        },delay);
    };
};


//reducer
function counter(state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

//store
const store = createStore(counter,applyMiddleware(thunk));

let currentValue = store.getState();

//listener
const listener = () => {
  const previousValue = currentValue;
  currentValue = store.getState();
  console.log(`pre state:${previousValue} next state:${currentValue}`);
};

store.subscribe(listener);

store.dispatch(increment());
store.dispatch(incrementIfOdd());
store.dispatch(incrementAsync());
store.dispatch(decrement());

export default currentValue;

