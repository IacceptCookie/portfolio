import React, { Suspense, lazy } from "react";
import { Route, Switch } from "wouter";
import TitleUpdater from "../tools/TitleUpdater";
import PrivateRoute from "../tools/PrivateRoute";
import ExternalRedirect from "../tools/ExternalRedirect";

// Eager loaded components (public, frequently used)
import NotFound from "../views/Public/NotFound";
import Home from "../views/Public/Home";
import Articles from "../views/Public/Articles";
import Login from "../views/Public/Login";
import Contact from "../views/Public/Contact";
import Profile from "../views/Public/Profile";

// Lazy loaded components (editor routes, less frequently used)
const Logout = lazy(() => import("../views/Public/Logout"));
const TwoFactorCheck = lazy(() => import("../views/Public/TwoFactorCheck"));
const CGU = lazy(() => import("../views/Public/CGU"));
const Help = lazy(() => import("../views/Public/Help"));
const EditorHome = lazy(() => import("../views/Editor/EditorHome"));
const CreateArticle = lazy(() => import("../views/Editor/Article/Create"));
const Example = lazy(() => import("../views/Editor/Article/Example"));
const ManageArticle = lazy(() => import("../views/Editor/Article/Manage"));
const CreateFilter = lazy(() => import("../views/Editor/Filter/Create"));
const ManageFilter = lazy(() => import("../views/Editor/Filter/Manage"));
const ArticlePreviewRoute = lazy(() => import("./ArticlePreviewRoute"));
const ArticleRoute = lazy(() => import("./ArticleRoute"));
const UpdateArticleRoute = lazy(() => import("./UpdateArticleRoute"));
const UpdateFilterRoute = lazy(() => import("./UpdateFilterRoute"));

// Loading fallback component
const LoadingFallback = () => (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
        fontSize: '1.2rem',
        color: '#666'
    }}>
        Loading...
    </div>
);

function Routes() {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <Switch>
            {/* public routes */}
            <Route path="/">
                {() =>
                    <>
                        <TitleUpdater title="Bienvenue" />
                        <Home />
                    </>
                }
            </Route>
            <Route path="/profile">
                {() =>
                    <>
                        <TitleUpdater title="Mon profil" />
                        <Profile />
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

            {/* editors commons routes */}
            <Route path="/dashboard">
                {() =>
                    <PrivateRoute role="ROLE_READER">
                        <TitleUpdater title="Tableau de bord" />
                        <EditorHome />
                    </PrivateRoute>
                }
            </Route>

            {/* editors article CRUD routes */}
            <Route path="/article/create">
                {() =>
                    <PrivateRoute role="ROLE_EDITOR">
                        <TitleUpdater title="Création d'un article" />
                        <CreateArticle />
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
            <Route
                path="/article/update/:slug"
                component={UpdateArticleRoute}
            />
            <Route
                path="/article/:slug"
                component={ArticleRoute}
            />

            {/* editors filter CRUD routes */}
            <Route path="/filter/create">
                {() =>
                    <PrivateRoute role="ROLE_EDITOR">
                        <TitleUpdater title="Création d'un filtre" />
                        <CreateFilter />
                    </PrivateRoute>
                }
            </Route>
            <Route
                path="/filter/update/:type/:id"
                component={UpdateFilterRoute}
            />
            <Route path="/filter/manage">
                {() =>
                    <PrivateRoute role="ROLE_READER">
                        <TitleUpdater title="Gérer les filtres" />
                        <ManageFilter />
                    </PrivateRoute>
                }
            </Route>

            {/* footer routes */}
            <Route path="/github" component={() => <ExternalRedirect url="https://github.com/IacceptCookie" />} />
            <Route path="/linkedin" component={
                () => <ExternalRedirect url="https://www.linkedin.com/in/rapha%C3%ABl-durand-386720267" />
            } />
            <Route path="/cgu">
                {() =>
                    <>
                        <TitleUpdater title="Conditions générales d'utilisation" />
                        <CGU />
                    </>
                }
            </Route>
            <Route path="/help">
                {() =>
                    <>
                        <TitleUpdater title="Une question ?" />
                        <Help />
                    </>
                }
            </Route>

            {/* default not found route */}
            <Route>
                {() =>
                    <>
                        <TitleUpdater title="404: Not found" />
                        <NotFound />
                    </>
                }
            </Route>
            </Switch>
        </Suspense>
    );
}

export default Routes;
