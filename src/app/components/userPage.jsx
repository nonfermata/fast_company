import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import QualitiesList from "./qualitiesList";
import api from "../api";
import Loader from "../utils/loader";

const UserPage = () => {
    const history = useHistory();
    const { userId } = useParams();
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((object) => setUser(object));
    }, []);
    const handleAllUsers = () => {
        history.push("/users");
    };
    if (user) {
        return (
            <div className="m-4">
                <h1>{user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <QualitiesList qualities={user.qualities} />
                <p>completedMeetings: {user.completedMeetings}</p>
                <h3>Rate: {user.rate}</h3>
                <button
                    className="btn btn-outline-primary mt-2"
                    onClick={handleAllUsers}
                >
                    Все пользователи
                </button>
            </div>
        );
    }
    return <Loader />;
};

export default UserPage;
