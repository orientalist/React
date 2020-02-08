import React from "react";
import ReactDom from "react-dom";
import Router from "Router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./css/app.scss";

ReactDom.render(
  
  <React.Fragment>
    <ToastContainer
      position="top-right"
      autoClose={1000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnVisibilityChange
      draggable
      pauseOnHover
    />
    <Router />
  </React.Fragment>,
  document.getElementById("root")
);
