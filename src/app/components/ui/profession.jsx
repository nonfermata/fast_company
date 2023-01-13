import React from "react";
import PropTypes from "prop-types";
import Loader from "../../utils/loader";
import { useSelector } from "react-redux";
import {
    getProfessionById,
    getProfessionsLoadingStatus
} from "../../../store/professions";

const Profession = ({ id }) => {
    const profession = useSelector(getProfessionById(id));
    const isLoading = useSelector(getProfessionsLoadingStatus());
    if (!isLoading) {
        return <>{profession.name}</>;
    }
    return <Loader />;
};
Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
