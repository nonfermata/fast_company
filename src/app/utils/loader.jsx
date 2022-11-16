import React from "react";
import PropTypes from "prop-types";

const Loader = ({ textSize }) => {
    return (
        <div className={"fw-light m-4 fs-" + textSize}>
            L O A D I N G . . . . .
        </div>
    );
};
Loader.defaultProps = {
    textSize: "3"
};

Loader.propTypes = {
    textSize: PropTypes.string
};

export default Loader;
