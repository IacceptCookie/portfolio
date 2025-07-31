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
import Example from "../views/Editor/Article/Example";
import ManageFilter from "../views/Editor/Filter/Manage";
import ManageArticle from "../views/Editor/Article/Manage";
import Contact from "../views/Public/Contact";
import TwoFactorCheck from "../views/Public/TwoFactorCheck";
import PrivateRoute from "../tools/PrivateRoute";
import Logout from "../views/Public/Logout";
import Preview from "../views/Editor/Article/Preview";
import {useArticlePreview} from "../providers/ArticlePreviewProvider";
import ArticlePreviewRoute from "./ArticlePreviewRoute";

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
            <Route path="/logout">
                {() =>
                    <>
                        <TitleUpdater title="Déconnexion" />
                        <Logout />
                    </>
                }
            </Route>
            <Route path="/login/2fa">
                {() =>
                    <>
                        <TitleUpdater title="Vérifiez votre code par email" />
                        <TwoFactorCheck />
                    </>
                }
            </Route>
            <Route path="/contact">
                {() =>
                    <>
                        <TitleUpdater title="Me contacter" />
                        <Contact />
                    </>
                }
            </Route>

            // editors commons routes
            <Route path="/dashboard">
                {() =>
                    <PrivateRoute role="ROLE_READER">
                        <TitleUpdater title="Tableau de bord" />
                        <EditorHome />
                    </PrivateRoute>
                }
            </Route>

            // editors article CRUD routes
            <Route path="/article/create">
                {() =>
                    <PrivateRoute role="ROLE_EDITOR">
                        <TitleUpdater title="Création d'un article" />
                        <Create />
                    </PrivateRoute>
                }
            </Route>
            <Route path="/article/example">
                    {() =>
                        <PrivateRoute role="ROLE_EDITOR">
                                <TitleUpdater title="Exemple d'article" />
                                <Example />
                        </PrivateRoute>
                    }
            </Route>
            <Route
                path="/article/preview"
                component={ArticlePreviewRoute}
            />
            <Route path="/article/manage">
                    {() =>
                        <PrivateRoute role="ROLE_READER">
                                <TitleUpdater title="Gérer les articles" />
                                <ManageArticle />
                        </PrivateRoute>
                    }
            </Route>

            // editors filter CRUD routes
            <Route path="/filter/manage">
                {() =>
                    <PrivateRoute role="ROLE_READER">
                        <TitleUpdater title="Gérer les filtres" />
                        <ManageFilter />
                    </PrivateRoute>
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
