import React from "react";
import PropTypes from "prop-types";
import Bookmark from "../common/bookmark";
import DeleteButton from "../common/deleteButton";
import Qualities from "../ui/qualities";
import Table from "../common/table";

const UsersTable = ({
    users,
    onSort,
    selectedSort,
    onToggleBookMark,
    onDelete
}) => {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: {
            name: "Качества",
            component: (user) => <Qualities qualities={user.qualities} />
        },
        profession: { path: "profession.name", name: "Профессия" },
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
        },
        delete: {
            component: (user) => (
                <DeleteButton onDelete={() => onDelete(user._id)} />
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
    onToggleBookMark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default UsersTable;
