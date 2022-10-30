import React from "react";
import NavBar from "./components/ui/navBar";
import { Route } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";

const App = () => {
    return (
        <div className="mainContainer">
            <NavBar />
            <Route exact path="/" component={Main} />
            <Route path="/login/:type?" component={Login} />
            <Route path="/users/:userId?/:edit?" component={Users} />
        </div>
    );
};
export default App;
