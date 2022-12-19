import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useHistory } from "react-router-dom";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import localStorageService, {
    setTokens
} from "../services/localStorage.service";
import Loader from "../utils/loader";

export const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: { key: process.env.REACT_APP_FIREBASE_KEY }
});
const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();
    async function getUserData() {
        try {
            const { content } = await userService.getCurrentUser();
            setUser(content);
        } catch (e) {
            errorCatcher(e);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            getUserData();
        } else {
            setIsLoading(false);
        }
    }, []);
    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);
    function logOut() {
        localStorageService.removeAuthData();
        setUser(null);
        history.push("/");
    }
    function randomInt(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    }
    async function signIn({ email, password }) {
        try {
            const { data } = await httpAuth.post(
                "accounts:signInWithPassword",
                {
                    email,
                    password,
                    returnSecureToken: true
                }
            );
            setTokens(data);
            await getUserData();
        } catch (e) {
            errorCatcher(e);
            const { code, message } = e.response.data.error;
            if (code === 400) {
                switch (message) {
                    case "INVALID_PASSWORD" || "EMAIL_NOT_FOUND":
                        throw new Error("Неверная пара e-mail – пароль!");
                    default:
                        throw new Error(
                            "Слишком много попыток входа! Побробуйте позднее."
                        );
                }
            }
        }
    }
    async function signUp({ email, password, ...rest }) {
        try {
            const { data } = await httpAuth.post("accounts:signUp", {
                email,
                password,
                returnSecureToken: true
            });
            console.log(data);
            setTokens(data);
            await createUser({
                _id: data.localId,
                email,
                image: `https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                )
                    .toString(36)
                    .substring(7)}.svg`,
                rate: randomInt(1, 5),
                completedMeetings: randomInt(0, 200),
                ...rest
            });
        } catch (e) {
            errorCatcher(e);
            const { code, message } = e.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "Пользователь с таким email уже существует."
                    };
                    throw errorObject;
                }
            }
        }
    }
    async function createUser(data) {
        try {
            const { content } = await userService.create(data);
            console.log(content);
            setUser(content);
        } catch (e) {
            errorCatcher(e);
        }
    }

    function errorCatcher(e) {
        const { message } = e.response.data;
        setError(message);
    }
    return (
        <AuthContext.Provider value={{ signIn, signUp, logOut, currentUser }}>
            {!isLoading ? children : <Loader />}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AuthProvider;
