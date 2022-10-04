import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ selectedSort, onSort }) => {
    const handleSort = (item) => {
        if (selectedSort.iter === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else onSort({ iter: item, order: "asc" });
    };
    return (
        <thead>
            <tr>
                <th
                    role="button"
                    onClick={() => handleSort("name")}
                    scope="col"
                >
                    Имя
                </th>
                <th scope="col">Качества</th>
                <th
                    role="button"
                    onClick={() => handleSort("profession.name")}
                    scope="col"
                >
                    Профессия
                </th>
                <th
                    role="button"
                    onClick={() => handleSort("completedMeetings")}
                    scope="col"
                >
                    Встретился, раз
                </th>
                <th
                    role="button"
                    onClick={() => handleSort("rate")}
                    scope="col"
                >
                    Оценка
                </th>
                <th
                    role="button"
                    onClick={() => handleSort("bookmark")}
                    scope="col"
                >
                    Избранное
                </th>
                <th />
            </tr>
        </thead>
    );
};
TableHeader.propTypes = {
    selectedSort: PropTypes.object.isRequired,
    onSort: PropTypes.func.isRequired
};

export default TableHeader;
