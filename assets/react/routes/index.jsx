import React from "react";
import { Route, Switch } from "wouter";
import NotFound from "../views/Public/NotFound";
import Home from "../views/Public/Home";
import TitleUpdater from "../tools/TitleUpdater";
import Articles from "../views/Public/Articles";
import ExternalRedirect from "../tools/ExternalRedirect";
import Login from "../views/Public/Login";
import EditorHome from "../views/Editor/EditorHome";
import Create from "../views/Editor/Article/Create";

function Routes() {
    return (
        <Switch>
            // public routes
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

            // editors commons routes
            <Route path="/dashboard">
                {() =>
                    <>
                        <TitleUpdater title="Tableau de bord" />
                        <EditorHome />
                    </>
                }
            </Route>

            // editors article CRUD routes
            <Route path="/article/create">
                {() =>
                    <>
                        <TitleUpdater title="Création d'un article" />
                        <Create />
                    </>
                }
            </Route>

            // footer routes
            <Route path="/github" component={() => <ExternalRedirect url="https://github.com/IacceptCookie" />} />
            <Route path="/linkedin" component={
                () => <ExternalRedirect url="https://www.linkedin.com/in/rapha%C3%ABl-durand-386720267" />
            } />

            // default not found route
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
