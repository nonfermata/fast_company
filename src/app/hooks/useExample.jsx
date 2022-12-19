import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const ExampleContext = React.createContext();  // #1

export const useExample = () => useContext(ExampleContext);  // #2

export const ExampleProvider = ({ children }) => {  // #3
    const [example, setExample] = useState([]);  // #4
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    function errorCatcher(e) {
        const { message } = e.response.data;
        setError(message);
    }

    return (
        <ExampleContext.Provider
            value={{ example, isLoading }}
        >
            {children}
        </ExampleContext.Provider>
    );
};

ExampleProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
