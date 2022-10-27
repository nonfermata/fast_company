import React from "react";
import Quality from "./quality";
import PropTypes from "prop-types";

const Qualities = ({ qualities }) => {
    return (
        <>
            {qualities.map((quality) => (
                <Quality key={quality._id} {...quality} />
            ))}
        </>
    );
};
Qualities.propTypes = {
    qualities: PropTypes.array
};

export default Qualities;
