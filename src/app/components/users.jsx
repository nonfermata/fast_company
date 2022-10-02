import React from "react";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";

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
    const filteredUsers = selectedProf
        ? users.filter((user) => user.profession._id === selectedProf._id)
        : users;
    const count = filteredUsers.length;
    const usersCrops = paginate(filteredUsers, currentPage, pageSize);
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
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Имя</th>
                                <th scope="col">Качества</th>
                                <th scope="col">Профессия</th>
                                <th scope="col">Встретился, раз</th>
                                <th scope="col">Оценка</th>
                                <th scope="col">Избранное</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersCrops.map((user) => (
                                <User key={user._id} {...rest} {...user} />
                            ))}
                        </tbody>
                    </table>
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
    professions: PropTypes.oneOfType(PropTypes.object, PropTypes.array),
    selectedProf: PropTypes.object,
    currentPage: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    pageChange: PropTypes.func.isRequired,
    onItemSelect: PropTypes.func.isRequired,
    onClearFilter: PropTypes.func.isRequired,
    rest: PropTypes.object
};

export default Users;
