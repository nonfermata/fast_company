import React from "react";
import PropTypes from "prop-types";
import UserCard from "../../ui/userCards/userCard";
import QualitiesCard from "../../ui/userCards/qualitiesCard";
import MeetingsCard from "../../ui/userCards/meetingsCard";
import Comments from "../../common/comments/comments";
import { CommentsProvider } from "../../../hooks/useComments";
import { useSelector } from "react-redux";
import { getUserById } from "../../../../store/users";

const UserPage = ({ userId }) => {
    const user = useSelector(getUserById(userId));
    return (
        <div className="container">
            <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                    <UserCard
                        id={userId}
                        name={user.name}
                        profession={user.profession.name}
                        rate={user.rate}
                        image={user.image}
                    />
                    <QualitiesCard qualities={user.qualities} />
                    <MeetingsCard meetings={user.completedMeetings} />
                </div>
                <div className="col-md-8">
                    <CommentsProvider>
                        <Comments />
                    </CommentsProvider>
                </div>
            </div>
        </div>
    );
};
UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
