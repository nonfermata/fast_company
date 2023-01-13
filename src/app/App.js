import React, { useEffect } from "react";
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
import { useDispatch } from "react-redux";
import { loadQualitiesList } from "../store/qualities";
import { loadProfessionsList } from "../store/professions";

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadProfessionsList());
    }, []);
    return (
        <div className="mainContainer">
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
            <ToastContainer />
        </div>
    );
};
export default App;
