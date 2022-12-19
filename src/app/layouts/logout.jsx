import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import Loader from "../utils/loader";

const Logout = () => {
    const { logOut } = useAuth();
    useEffect(() => {
        logOut();
    }, []);
    return <Loader />;
};

export default Logout;
