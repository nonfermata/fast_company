import React, { useEffect, useState } from "react";
import CommentsList from "./commentsList";
import PropTypes from "prop-types";
import AddCommentForm from "./addCommentForm";
import api from "../../../api";

const Comments = ({ userId }) => {
    const [updateStatus, setUpdateStatus] = useState(true);
    const [userComments, setUserComments] = useState();
    useEffect(() => {
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setUserComments(data));
    }, [updateStatus]);

    const updateCommentsList = () => {
        setUpdateStatus(!updateStatus);
    };
    return (
        <>
            <div className="card mb-2">
                <div className="card-body">
                    <AddCommentForm
                        userId={userId}
                        updateCommentsList={updateCommentsList}
                    />
                </div>
            </div>
            {userComments && userComments.length !== 0 && (
                <div className="card mb-3">
                    <div className="card-body">
                        <CommentsList
                            userId={userId}
                            updateCommentsList={updateCommentsList}
                            updateStatus={updateStatus}
                            comments={userComments}
                        />
                    </div>
                </div>
            )}
        </>
    );
};
Comments.propTypes = {
    userId: PropTypes.string
};

export default Comments;
