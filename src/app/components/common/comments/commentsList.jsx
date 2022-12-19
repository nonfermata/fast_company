import React from "react";
import PropTypes from "prop-types";
import Comment from "./comment";
import _ from "lodash";
import getPublishedTime from "../../../utils/getPublishedTime";

const CommentsList = ({ comments, onDeleteComment }) => {
    const orderedComments = _.orderBy(comments, ["created_at"], ["desc"]);
    return (
        <>
            <h2>Comments</h2>
            <hr />
            {orderedComments.map((comment) => {
                const publishedTime = getPublishedTime(comment.created_at);
                return (
                    <Comment
                        key={comment._id}
                        publishedTime={publishedTime}
                        userId={comment.userId}
                        commentId={comment._id}
                        content={comment.content}
                        onDelete={onDeleteComment}
                    />
                );
            })}
        </>
    );
};
CommentsList.propTypes = {
    comments: PropTypes.arrayOf(PropTypes.object),
    onDeleteComment: PropTypes.func
};

export default CommentsList;
