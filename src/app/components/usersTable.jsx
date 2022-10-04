import React from "react";
import User from "./user";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";

const UsersTable = ({ users, onSort, currentSort, ...rest }) => {
    return (
        <table className="table table-hover">
            <TableHeader selectedSort={currentSort} onSort={onSort} />
            <tbody>
                {users.map((user) => (
                    <User key={user._id} {...rest} {...user} />
                ))}
            </tbody>
        </table>
    );
};
UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    currentSort: PropTypes.object.isRequired
};

export default UsersTable;
