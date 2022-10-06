import React from "react";
import PropTypes from "prop-types";

const ArrowIcon = ({ direction }) => {
    return (
        <i className={"bi bi-caret-" + (direction === "asc" ? "up" : "down") + "-fill"}></i>
    );
};
ArrowIcon.propTypes = {
    direction: PropTypes.string.isRequired
};

export default ArrowIcon;
