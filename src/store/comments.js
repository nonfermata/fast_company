import { createAction, createSlice } from "@reduxjs/toolkit";
import commentService from "../app/services/commentService";

const initialState = {
    entities: null,
    isLoading: true,
    error: null
};

const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        commentsRequested(state) {
            state.isLoading = true;
        },
        commentsRequestFailed(state, action) {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentsReceived(state, action) {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsAddedNew(state, action) {
            state.entities.push(action.payload);
        },
        commentDeleted(state, action) {
            const newArray = [...state.entities];
            state.entities = newArray.filter(
                (item) => item._id !== action.payload
            );
        }
    }
});

const { actions, reducer: commentsReducer } = commentsSlice;
const {
    commentsRequested,
    commentsRequestFailed,
    commentsReceived,
    commentsAddedNew,
    commentDeleted
} = actions;
const updateCommentsRequested = createAction(
    "comments/updateCommentsRequested"
);
const updateCommentsFailed = createAction("comments/updateCommentsFailed");

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReceived(content));
    } catch (e) {
        dispatch(commentsRequestFailed(e.message));
    }
};

export const createComment = (data) => async (dispatch) => {
    dispatch(updateCommentsRequested());
    try {
        const { content } = await commentService.createComment(data);
        dispatch(commentsAddedNew(content));
    } catch (e) {
        dispatch(updateCommentsFailed());
    }
};

export const deleteComment = (id) => async (dispatch) => {
    dispatch(updateCommentsRequested());
    try {
        const { content } = await commentService.deleteComment(id);
        if (content === null) {
            dispatch(commentDeleted(id));
        }
    } catch (e) {
        dispatch(updateCommentsFailed());
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
