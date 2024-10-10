import React from "react";
import { Route, Switch } from "wouter";
import NotFound from "../views/NotFound";
import Home from "../views/Home";

function Routes() {
    return (
        <Switch>
            <Route path="/">
                {() => <Home />}
            </Route>
            <Route component={NotFound} />
        </Switch>
    );
}

export default Routes;
