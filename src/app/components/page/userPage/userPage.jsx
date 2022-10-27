import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Qualities from "../../ui/qualities";
import api from "../../../api";
import Loader from "../../../utils/loader";
import PropTypes from "prop-types";

const UserPage = ({ userId }) => {
    const history = useHistory();
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
                <Qualities qualities={user.qualities} />
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
UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
