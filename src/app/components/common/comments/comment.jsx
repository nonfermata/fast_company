import React from "react";
import PropTypes from "prop-types";
import Avatar from "../../ui/avatar";
import { useUsers } from "../../../hooks/useUsers";
import { useAuth } from "../../../hooks/useAuth";

const Comment = ({ userId, publishedTime, content, onDelete, commentId }) => {
    const { currentUser } = useAuth();
    const { getUserById } = useUsers();
    const user = getUserById(userId);
    return (
        <div className="bg-light card-body  mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start ">
                        <Avatar
                            width="65"
                            height="65"
                            image={user.image}
                        />
                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1 ">
                                        {user.name}
                                        <span className="small">
                                            {" – " + publishedTime}
                                        </span>
                                    </p>
                                    {currentUser._id === userId && (
                                        <button
                                            onClick={() => onDelete(commentId)}
                                            className="btn btn-sm text-primary d-flex align-items-center"
                                        >
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                    )}
                                </div>
                                <p className="small mb-0">{content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
Comment.propTypes = {
    userId: PropTypes.string,
    commentId: PropTypes.string,
    publishedTime: PropTypes.string,
    onDelete: PropTypes.func,
    content: PropTypes.string
};

export default Comment;
