import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
    const renderPhrase = (number) => {
        if (number === 0) return `Никто с тобой сегодня не тусанёт`;
        let word = "человек";
        if (
            (number % 10 === 2 || number % 10 === 3 || number % 10 === 4) &&
            Math.floor((number / 10) % 10) !== 1
        ) {
            word = "человека";
        }
        return `${number} ${word} тусанёт с тобой сегодня`;
    };

    return (
        <h3>
            <span
                className={"badge " + (length > 0 ? "bg-primary" : "bg-danger")}
            >
                {renderPhrase(length)}
            </span>
        </h3>
    );
};
SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
};

export default SearchStatus;
