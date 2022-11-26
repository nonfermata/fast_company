import React from "react";
import { useProfessions } from "../../hooks/useProfessions";
import PropTypes from "prop-types";
import Loader from "../../utils/loader";

const Profession = ({ id }) => {
    const { isLoading, getProfession } = useProfessions();
    const profession = getProfession(id);
    if (!isLoading) {
        return <>{profession.name}</>;
    }
    return <Loader />;
};
Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
