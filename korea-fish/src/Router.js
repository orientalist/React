import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import App from "pages/App";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={App} />
    </Switch>
  </BrowserRouter>
);

export default Router;
