import React from "react";
import CommentsList from "./commentsList";
import AddCommentForm from "./addCommentForm";
import { useComments } from "../../../hooks/useComments";

const Comments = () => {
    const { createComment, comments, deleteComment } = useComments();

    const handleDeleteComment = (id) => {
        deleteComment(id);
    };

    const handleSubmit = (data) => {
        createComment(data);
    };
    return (
        <>
            <div className="card mb-2">
                <div className="card-body">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            {comments && comments.length !== 0 && (
                <div className="card mb-3">
                    <div className="card-body">
                        <CommentsList
                            comments={comments}
                            onDeleteComment={handleDeleteComment}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;
