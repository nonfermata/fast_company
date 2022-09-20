import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import api from "./api";

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    const count = users.length;
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleToggleBookMark = (id) => {
        setUsers((users) =>
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };

    const handleDelete = (id) => {
        if (users.length - 1 === (currentPage - 1) * pageSize) {
            setCurrentPage(currentPage - 1);
        }
        setUsers((users) => users.filter((user) => user._id !== id));
    };

    return (
        <>
            <SearchStatus length={users.length} />
            <Users
                users={users}
                count={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onToggleBookMark={handleToggleBookMark}
                onDelete={handleDelete}
                pageChange={handlePageChange}
            />
        </>
    );
};

export default App;
