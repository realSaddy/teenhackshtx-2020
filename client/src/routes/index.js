import React from "react";
import { Switch, Route } from "react-router-dom";

import Index from "../pages/Index";
import Item from "../pages/Item";
import PageNotFound from "../pages/PageNotFound";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Index} />
      <Route path="/item" component={Item} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  );
}
