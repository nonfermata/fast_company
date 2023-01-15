import React from "react";
import NavBar from "./components/ui/navBar";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import Logout from "./layouts/logout";
import AppLoader from "./components/ui/hoc/appLoader";

const App = () => {
    return (
        <div className="mainContainer">
            <AppLoader>
                <AuthProvider>
                    <NavBar />
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
                </AuthProvider>
            </AppLoader>
            <ToastContainer />
        </div>
    );
};
export default App;
