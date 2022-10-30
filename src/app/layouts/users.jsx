import React from "react";
import { useParams } from "react-router-dom";
import UsersListPage from "../components/page/usersListPage";
import UserPage from "../components/page/userPage";
import EditUser from "../components/page/edit/editUser";

const Users = () => {
    const { userId, edit } = useParams();
    return userId ? (
        edit ? (
            <EditUser userId={userId} />
        ) : (
            <UserPage userId={userId} />
        )
    ) : (
        <UsersListPage />
    );
};

export default Users;
