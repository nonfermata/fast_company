import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";
import { setTokens } from "../services/localStorage.service";

const httpLogin = axios.create();
const LoginContext = React.createContext();

export const useLogin = () => useContext(LoginContext);

const LoginProvider = ({ children }) => {
    // const [currentUser, setCurrentUser] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);
    async function signIn({ email, password, stayOn }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        try {
            const { data } = await httpLogin.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
        } catch (e) {
            errorCatcher(e);
            const { code, message } = e.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_NOT_FOUND") {
                    const errorObject = {
                        email: "Пользователь с таким email не найден."
                    };
                    throw errorObject;
                } else if (message === "INVALID_PASSWORD") {
                    const errorObject = {
                        password: "Неправильный пароль!"
                    };
                    throw errorObject;
                }
            }
        }
    }

    function errorCatcher(e) {
        const { message } = e.response.data;
        setError(message);
    }
    return (
        <LoginContext.Provider value={{ signIn }}>
            {children}
        </LoginContext.Provider>
    );
};
LoginProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default LoginProvider;
