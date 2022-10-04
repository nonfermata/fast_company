import React, { useState } from "react";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import UsersTable from "./usersTable";
import _ from "lodash";

const Users = ({
    users,
    professions,
    selectedProf,
    currentPage,
    pageSize,
    pageChange,
    onItemSelect,
    onClearFilter,
    ...rest
}) => {
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const filteredUsers = selectedProf
        ? users.filter(
            (user) =>
                JSON.stringify(user.profession) ===
                  JSON.stringify(selectedProf)
        )
        : users;
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.iter], [sortBy.order]);
    const usersCrops = paginate(sortedUsers, currentPage, pageSize);

    const handleSort = (item) => {
        setSortBy(item);
    };

    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        items={professions}
                        onItemSelect={onItemSelect}
                        selectedItem={selectedProf}
                    />
                    <button
                        className="btn btn-secondary m-2"
                        onClick={onClearFilter}
                    >
                        Очистить
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus length={count} />
                {count > 0 && (
                    <UsersTable
                        users={usersCrops}
                        onSort={handleSort}
                        currentSort={sortBy}
                        {...rest}
                    />
                )}
                <Pagination
                    count={count}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    pageChange={pageChange}
                />
            </div>
        </div>
    );
};
Users.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    professions: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    selectedProf: PropTypes.object,
    currentPage: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    pageChange: PropTypes.func.isRequired,
    onItemSelect: PropTypes.func.isRequired,
    onClearFilter: PropTypes.func.isRequired
};

export default Users;
