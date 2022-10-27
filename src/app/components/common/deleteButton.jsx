import React from "react";
import PropTypes from "prop-types";

const DeleteButton = ({ onDelete }) => {
    return (
        <button className="btn btn-danger" onClick={onDelete}>
            delete
        </button>
    );
};
DeleteButton.propTypes = {
    onDelete: PropTypes.func.isRequired
};

export default DeleteButton;
