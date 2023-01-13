import React from "react";
import { useParams, Redirect } from "react-router-dom";
import UsersListPage from "../components/pages/usersListPage";
import UserPage from "../components/pages/userPage";
import EditUser from "../components/pages/editUser";
import UserProvider from "../hooks/useUsers";
import { useAuth } from "../hooks/useAuth";

const Users = () => {
    const { userId, edit } = useParams();
    const { currentUser } = useAuth();
    return (
        <UserProvider>
            {userId ? (
                edit ? (
                    userId === currentUser._id ? (
                        <EditUser />
                    ) : (
                        <Redirect to={`/users/${currentUser._id}/edit`} />
                    )
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
