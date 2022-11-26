import React from "react";
import { useParams } from "react-router-dom";
import UsersListPage from "../components/pages/usersListPage";
import UserPage from "../components/pages/userPage";
import EditUser from "../components/pages/editUser";
import UserProvider from "../hooks/useUsers";

const Users = () => {
    const { userId, edit } = useParams();
    return (
        <UserProvider>
            {userId ? (
                edit ? (
                    <EditUser userId={userId} />
                ) : (
                    <UserPage userId={userId} />
                )
            ) : (
                <UsersListPage />
            )}
        </UserProvider>
    );
};

export default Users;
