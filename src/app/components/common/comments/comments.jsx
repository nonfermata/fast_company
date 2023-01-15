import React, { useEffect } from "react";
import CommentsList from "./commentsList";
import AddCommentForm from "./addCommentForm";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    createComment,
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList,
    deleteComment
} from "../../../../store/comments";
import Loader from "../../../utils/loader";
import { nanoid } from "nanoid";
import { getCurrentUserId } from "../../../../store/users";

const Comments = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const currentUserId = useSelector(getCurrentUserId());
    const comments = useSelector(getComments());
    const isLoading = useSelector(getCommentsLoadingStatus());
    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);
    const handleDeleteComment = (id) => {
        dispatch(deleteComment(id));
    };

    const handleAddComment = (data) => {
        const comment = {
            ...data,
            _id: nanoid(),
            pageId: userId,
            userId: currentUserId,
            created_at: Date.now()
        };
        dispatch(createComment(comment));
    };
    return (
        <>
            <div className="card mb-2">
                <div className="card-body">
                    <AddCommentForm onSubmit={handleAddComment} />
                </div>
            </div>
            {comments && comments.length !== 0 && (
                <div className="card mb-3">
                    <div className="card-body">
                        {!isLoading ? (
                            <CommentsList
                                comments={comments}
                                onDeleteComment={handleDeleteComment}
                            />
                        ) : (
                            <Loader />
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;
