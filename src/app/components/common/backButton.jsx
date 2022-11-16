import React from "react";
import { useHistory } from "react-router-dom";

const BackButton = () => {
    const history = useHistory();
    return (
        <button
            className="btn btn-secondary"
            onClick={() => history.goBack()}
        >
            <i className="bi bi-caret-left-fill"></i> Назад
        </button>
    );
};

export default BackButton;
