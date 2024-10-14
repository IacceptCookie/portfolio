import React from "react";
import { Route, Switch } from "wouter";
import NotFound from "../views/NotFound";
import Home from "../views/Home";
import TitleUpdater from "../tools/TitleUpdater";

function Routes() {
    return (
        <Switch>
            <Route path="/">
                {() =>
                    <>
                        <TitleUpdater title="Home page" />
                        <Home />
                    </>
                }
            </Route>
            <Route>
                {() =>
                    <>
                        <TitleUpdater title="404: Not found" />
                        <NotFound />
                    </>
                }
            </Route>
        </Switch>
    );
}

export default Routes;
