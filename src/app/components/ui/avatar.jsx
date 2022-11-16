import React from "react";
import PropTypes from "prop-types";

const Avatar = ({ width, height }) => {
    return (
        <img
            src={`https://avatars.dicebear.com/api/avataaars/${(
                Math.random() + 1
            )
                .toString(36)
                .substring(7)}.svg`}
            className="rounded-circle shadow-1-strong me-3"
            alt="avatar"
            width={width}
            height={height}
        />
    );
};
Avatar.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string
};

export default Avatar;
