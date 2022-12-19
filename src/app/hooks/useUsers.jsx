import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import userService from "../services/user.service";
import Loader from "../utils/loader";

const UserContext = React.createContext();

export const useUsers = () => useContext(UserContext);

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    async function getUsers() {
        try {
            const { content } = await userService.get();
            setUsers(content);
            setIsLoading(false);
        } catch (e) {
            errorCatcher(e);
        }
    }

    function getUserById(id) {
        return users.find((user) => user._id === id);
    }

    function errorCatcher(e) {
        const { message } = e.response.data;
        setError(message);
    }

    return (
        <UserContext.Provider value={{ users, getUserById }}>
            {!isLoading ? children : <Loader />}
        </UserContext.Provider>
    );
};
UserProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default UserProvider;
