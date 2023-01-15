/* eslint-disable indent */
import { createAction, createSlice } from "@reduxjs/toolkit";
import userService from "../app/services/user.service";
import localStorageService from "../app/services/localStorage.service";
import authService from "../app/services/auth.service";
import getRandomInt from "../app/utils/getRandomInt";
import history from "../app/utils/history";

const initialState = localStorageService.getAccessToken()
    ? {
          entities: null,
          isLoading: true,
          error: null,
          auth: { userId: localStorageService.getUserId() },
          isLoggedIn: true,
          dataLoaded: false
      }
    : {
          entities: null,
          isLoading: false,
          error: null,
          auth: null,
          isLoggedIn: false,
          dataLoaded: false
      };

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        usersRequested(state) {
            state.isLoading = true;
        },
        usersRequestFailed(state, action) {
            state.error = action.payload;
            state.isLoading = false;
        },
        usersReceived(state, action) {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        authRequestSuccess(state, action) {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        authRequestFailed(state, action) {
            state.error = action.payload;
        },
        userCreated(state, action) {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        userLoggedOut(state) {
            state.entities = null;
            state.dataLoaded = false;
            state.auth = null;
            state.isLoggedIn = false;
        },
        userUpdated(state, action) {
            const userIndex = state.entities.findIndex(
                (item) => item._id === action.payload._id
            );
            state.entities[userIndex] = action.payload;
        }
    }
});

const { actions, reducer: usersReducer } = usersSlice;
const {
    usersRequested,
    usersRequestFailed,
    usersReceived,
    authRequestSuccess,
    authRequestFailed,
    userCreated,
    userLoggedOut,
    userUpdated
} = actions;
const authRequested = createAction("users/authRequested");
const userCreateRequested = createAction("user/userCreateRequested");
const createUserFailed = createAction("user/createUserFailed");

export const updateUserData = (userData) => async (dispatch) => {
    try {
        const { content } = await userService.update(userData);
        dispatch(userUpdated(content));
    } catch (e) {}
};

export const logOut = () => (dispatch) => {
    dispatch(userLoggedOut());
    localStorageService.removeAuthData();
    history.push("/");
};

export const signIn = (loginData, redirect) => async (dispatch) => {
    const { email, password } = loginData;
    dispatch(authRequested());
    try {
        const data = await authService.login(email, password);
        dispatch(
            authRequestSuccess({
                userId: data.localId
            })
        );
        localStorageService.setTokens(data);
        history.push(redirect);
    } catch (e) {
        dispatch(authRequestFailed(e.message));
    }
};

export const signUp =
    ({ email, password, ...rest }) =>
    async (dispatch) => {
        dispatch(authRequested());
        try {
            const data = await authService.register(email, password);
            localStorageService.setTokens(data);
            dispatch(
                authRequestSuccess({
                    userId: data.localId
                })
            );
            dispatch(
                createUser({
                    _id: data.localId,
                    email,
                    image: `https://avatars.dicebear.com/api/avataaars/${(
                        Math.random() + 1
                    )
                        .toString(36)
                        .substring(7)}.svg`,
                    rate: getRandomInt(1, 5),
                    completedMeetings: getRandomInt(0, 200),
                    bookmark: false,
                    ...rest
                })
            );
        } catch (e) {
            dispatch(authRequestFailed(e.message));
        }
    };

function createUser(data) {
    return async function (dispatch) {
        dispatch(userCreateRequested());
        try {
            const { content } = await userService.create(data);
            dispatch(userCreated(content));
            history.push("/users");
        } catch (e) {
            dispatch(createUserFailed(e.message));
        }
    };
}

export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequested());
    try {
        const { content } = await userService.get();
        dispatch(usersReceived(content));
    } catch (e) {
        dispatch(usersRequestFailed(e.message));
    }
};

export const getUsersList = () => (state) => state.users.entities;
export const getUserById = (id) => (state) => {
    return state.users.entities
        ? state.users.entities.find((item) => item._id === id)
        : null;
};
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getCurrentUserId = () => (state) => state.users.auth.userId;

export default usersReducer;
