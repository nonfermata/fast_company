import React from "react";
import PropTypes from "prop-types";
import Bookmark from "./bookmark";
import DeleteButton from "./deleteButton";
import QualitiesList from "./qualitiesList";
import Table from "./table";

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
            component: (user) => <QualitiesList qualities={user.qualities} />
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
                <DeleteButton id={user._id} onDelete={onDelete} />
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
