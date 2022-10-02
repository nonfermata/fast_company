import React, { useEffect, useState } from "react";
import Users from "./components/users";
import api from "./api";

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    const handleProfessionSelect = (item) => {
        setCurrentPage(1);
        setSelectedProf(item);
    };

    const clearFilter = () => {
        setSelectedProf();
    };

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
            <Users
                professions={professions}
                users={users}
                pageSize={pageSize}
                currentPage={currentPage}
                selectedProf={selectedProf}
                onToggleBookMark={handleToggleBookMark}
                onDelete={handleDelete}
                pageChange={handlePageChange}
                onItemSelect={handleProfessionSelect}
                onClearFilter={clearFilter}
            />
        </>
    );
};

export default App;
