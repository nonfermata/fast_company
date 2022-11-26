/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/usersTable";
import _ from "lodash";
import Loader from "../../../utils/loader";
import TextField from "../../common/form/textField";
import { useUsers } from "../../../hooks/useUsers";
import { useProfessions } from "../../../hooks/useProfessions";

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchData, setSearchData] = useState("");
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const pageSize = 4;

    const { professions } = useProfessions();

    const { users } = useUsers();

    const handleDelete = (id) => {
        // if (users.length - 1 === (currentPage - 1) * pageSize) {
        //     setCurrentPage(currentPage - 1);
        // }
        // setUsers((users) => users.filter((user) => user._id !== id));
        console.log(id);
    };

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
        const newArr = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        // setUsers(newArr);
        console.log(newArr);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const handleSearchChange = (name, value) => {
        setSearchData(value);
    };

    useEffect(() => {
        if (selectedProf) setSearchData("");
    }, [selectedProf]);

    useEffect(() => {
        if (searchData) setSelectedProf();
    }, [searchData]);

    if (users) {
        const filteredUsers = selectedProf
            ? users.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
              )
            : users.filter((user) =>
                  user.name.toLowerCase().includes(searchData.toLowerCase())
              );

        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const usersCrops = paginate(sortedUsers, currentPage, pageSize);

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                            selectedItem={selectedProf}
                        />
                        <button
                            className="btn btn-secondary m-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div
                    className="d-flex flex-column"
                    style={{ flexGrow: "1" }}
                >
                    <SearchStatus length={count} />
                    <TextField
                        placeholder="Поиск..."
                        value={searchData}
                        name="search"
                        onChange={handleSearchChange}
                    />
                    {count > 0 && (
                        <UsersTable
                            users={usersCrops}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onToggleBookMark={handleToggleBookMark}
                            onDelete={handleDelete}
                        />
                    )}
                    <Pagination
                        count={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        pageChange={handlePageChange}
                    />
                </div>
            </div>
        );
    }
    return <Loader />;
};

export default UsersListPage;
