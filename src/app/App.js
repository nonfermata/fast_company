import React from "react";
import Users from "./layouts/users";
import NavBar from "./components/navBar";
import { Route } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import UserPage from "./components/userPage";

const App = () => {
    return (
        <>
            <NavBar />
            <Route exact path="/" component={Main} />
            <Route path="/login" component={Login} />
            <Route path="/users/:userId" component={UserPage} />
            <Route exact path="/users" component={Users} />
        </>
    );
};
export default App;
