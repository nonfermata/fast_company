import React, { useEffect, useState } from "react";
import api from "../../../api";
import Loader from "../../../utils/loader";
import PropTypes from "prop-types";
import UserCard from "./userInfo/userCard";
import QualitiesCard from "./userInfo/qualitiesCard";
import MeetingsCard from "./userInfo/meetingsCard";
import Comments from "./comments/comments";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard
                            id={userId}
                            name={user.name}
                            profession={user.profession.name}
                            rate={user.rate}
                        />
                        <QualitiesCard qualities={user.qualities} />
                        <MeetingsCard meetings={user.completedMeetings} />
                    </div>
                    <div className="col-md-8">
                        <Comments userId={userId} />
                    </div>
                </div>
            </div>
        );
    }
    return <Loader />;
};
UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
