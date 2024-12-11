import React from "react";
import { Route, Switch } from "wouter";
import NotFound from "../views/NotFound";
import Home from "../views/Home";
import TitleUpdater from "../tools/TitleUpdater";
import Articles from "../views/Articles";
import ExternalRedirect from "../tools/ExternalRedirect";
import Login from "../views/Login";
import EditorHome from "../views/EditorHome";

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
            <Route path="/articles">
                {() =>
                    <>
                        <TitleUpdater title="Mes articles" />
                        <Articles />
                    </>
                }
            </Route>
            <Route path="/login">
                {() =>
                    <>
                        <TitleUpdater title="Connexion" />
                        <Login />
                    </>
                }
            </Route>
            <Route path="/dashboard">
                {() =>
                    <>
                        <TitleUpdater title="Tableau de bord" />
                        <EditorHome />
                    </>
                }
            </Route>
            <Route path="/github" component={() => <ExternalRedirect url="https://github.com/IacceptCookie" />} />
            <Route path="/linkedin" component={
                () => <ExternalRedirect url="https://www.linkedin.com/in/rapha%C3%ABl-durand-386720267" />
            } />
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
