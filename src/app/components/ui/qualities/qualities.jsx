import React from "react";
import Quality from "./quality";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";
import Loader from "../../../utils/loader";

const Qualities = ({ qualities: userQualitiesId }) => {
    const { qualities, isLoading } = useQualities();
    const userQualities = userQualitiesId.map((id) =>
        qualities.find((item) => item._id === id)
    );
    if (!isLoading) {
        return (
            <>
                {userQualities.map((quality) => (
                    <Quality
                        key={quality._id}
                        {...quality}
                    />
                ))}
            </>
        );
    }
    return <Loader />;
};
Qualities.propTypes = {
    qualities: PropTypes.array
};

export default Qualities;
