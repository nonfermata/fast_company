import React, { useEffect } from "react";
import Quality from "./quality";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
    getQualities,
    getQualitiesLoadingStatus,
    loadQualitiesList
} from "../../../../store/qualities";

const QualitiesList = ({ qualities: userQualitiesId }) => {
    const dispatch = useDispatch();
    const qualities = useSelector(getQualities());
    const isLoading = useSelector(getQualitiesLoadingStatus());
    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);
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
    return "Loading...";
};
QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
