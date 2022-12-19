import React from "react";
import PropTypes from "prop-types";
import Bookmark from "../common/bookmark";
import Qualities from "../ui/qualities";
import Table from "../common/table";
import Profession from "./profession";

const UsersTable = ({
    users,
    onSort,
    selectedSort,
    onToggleBookMark
}) => {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: {
            name: "Качества",
            component: (user) => <Qualities qualities={user.qualities} />
        },
        profession: {
            path: "profession.name",
            name: "Профессия",
            component: (user) => <Profession id={user.profession} />
        },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <Bookmark
                    bookmark={user.bookmark}
                    id={user._id}
                    onToggleBookMark={onToggleBookMark}
                />
            )
        }
    };
    return (
        <Table
            onSort={onSort}
            columns={columns}
            selectedSort={selectedSort}
            data={users}
        />
    );
};
UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookMark: PropTypes.func.isRequired
};

export default UsersTable;
