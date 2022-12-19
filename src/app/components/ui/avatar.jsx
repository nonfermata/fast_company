import React from "react";
import PropTypes from "prop-types";

const Avatar = ({ width, height, image }) => {
    return (
        <img
            src={image}
            className="rounded-circle shadow-1-strong me-3"
            alt="avatar"
            width={width}
            height={height}
        />
    );
};
Avatar.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    image: PropTypes.string
};

export default Avatar;
