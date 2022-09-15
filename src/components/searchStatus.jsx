import React from 'react';

const SearchStatus = ({length}) => {
    const renderPhrase = number => {
        if (number === 0) return `Никто с тобой не тусанет`
        let word = 'человек'
        if ((number % 10 === 2 ||
            number % 10 === 3 ||
            number % 10 === 4) &&
            Math.floor(number / 10 % 10) !== 1) {
            word = 'человека'
        }
        return `${number} ${word} тусанет с тобой сегодня`
    }

    return (
        <h3>
            <span className={"badge " + (length > 0 ? "bg-primary" : "bg-danger")}>
                {renderPhrase(length)}
            </span>
        </h3>
    );
};

export default SearchStatus;
