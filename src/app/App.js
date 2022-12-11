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
import AuthProvider from "./hooks/useAuth";
import LoginProvider from "./hooks/useLogin";

const App = () => {
    return (
        <div className="mainContainer">
            <LoginProvider>
                <AuthProvider>
                    <NavBar />
                    <QualityProvider>
                        <ProfessionProvider>
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
                                path="/users/:userId?/:edit?"
                                component={Users}
                            />
                        </ProfessionProvider>
                    </QualityProvider>
                </AuthProvider>
            </LoginProvider>
            <ToastContainer />
        </div>
    );
};
export default App;
