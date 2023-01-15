import React from "react";
import { useParams, Redirect } from "react-router-dom";
import UsersListPage from "../components/pages/usersListPage";
import UserPage from "../components/pages/userPage";
import EditUser from "../components/pages/editUser";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../../store/users";
import UsersLoader from "../components/ui/hoc/usersLoader";

const Users = () => {
    const { userId, edit } = useParams();
    const currentUserId = useSelector(getCurrentUserId());
    return (
        <UsersLoader>
            {userId ? (
                edit ? (
                    userId === currentUserId ? (
                        <EditUser />
                    ) : (
                        <Redirect to={`/users/${currentUserId}/edit`} />
                    )
                ) : (
                    <UserPage userId={userId} />
                )
            ) : (
                <UsersListPage />
            )}
        </UsersLoader>
    );
};

export default Users;
