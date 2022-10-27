import React from "react";
import PropTypes from "prop-types";
import ArrowIcon from "../arrowIcon";

const TableHeader = ({ selectedSort, onSort, columns }) => {
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else onSort({ path: item, order: "asc" });
    };
    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => {
                    return (
                        <th
                            key={column}
                            role={columns[column].path && "button"}
                            onClick={
                                columns[column].path &&
                                (() => handleSort(columns[column].path))
                            }
                            scope="col"
                        >
                            {selectedSort.path === columns[column].path ? (
                                <>
                                    {columns[column].name}{" "}
                                    <ArrowIcon direction={selectedSort.order} />
                                </>
                            ) : (
                                columns[column].name
                            )}
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
};
TableHeader.propTypes = {
    selectedSort: PropTypes.object.isRequired,
    onSort: PropTypes.func.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
