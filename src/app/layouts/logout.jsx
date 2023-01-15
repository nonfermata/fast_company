import React, { useEffect } from "react";
import Loader from "../utils/loader";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/users";

const Logout = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logOut());
    }, []);
    return <Loader />;
};

export default Logout;
