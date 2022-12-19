import React from "react";
import NavBar from "./components/ui/navBar";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfessions";
import { QualityProvider } from "./hooks/useQualities";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import Logout from "./layouts/logout";

const App = () => {
    return (
        <div className="mainContainer">
            <AuthProvider>
                <NavBar />
                <QualityProvider>
                    <ProfessionProvider>
                        <Switch>
                            <Route
                                exact
                                path="/"
                                component={Main}
                            />
                            <Route
                                path="/login/:type?"
                                component={Login}
                            />
                            <Route
                                path="/logout"
                                component={Logout}
                            />
                            <ProtectedRoute
                                path="/users/:userId?/:edit?"
                                component={Users}
                            />
                            <Redirect to="/" />
                        </Switch>
                    </ProfessionProvider>
                </QualityProvider>
            </AuthProvider>
            <ToastContainer />
        </div>
    );
};
export default App;
