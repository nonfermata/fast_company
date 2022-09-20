import React from "react";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";

const Users = ({
    users,
    count,
    currentPage,
    pageSize,
    pageChange,
    ...rest
}) => {
    const usersCrops = paginate(users, currentPage, pageSize);
    return (
        <>
            {count === 0
                ? null
                : (
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
        </>
    );
};
Users.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    count: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    pageChange: PropTypes.func.isRequired,
    rest: PropTypes.object
};

export default Users;
