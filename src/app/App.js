import React from "react";
import NavBar from "./components/ui/navBar";
import { Route } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfessions";
import { QualityProvider } from "./hooks/useQualities";

const App = () => {
    return (
        <div className="mainContainer">
            <NavBar />
            <Route
                exact
                path="/"
                component={Main}
            />
            <QualityProvider>
                <ProfessionProvider>
                    <Route
                        path="/login/:type?"
                        component={Login}
                    />
                    <Route
                        path="/users/:userId?/:edit?"
                        component={Users}
                    />
                </ProfessionProvider>
            </QualityProvider>
            <ToastContainer />
        </div>
    );
};
export default App;
