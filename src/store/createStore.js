import { configureStore, combineReducers } from "@reduxjs/toolkit";
import qualitiesReducer from "./qualities";
import professionsReducer from "./professions";
import usersReducer from "./users";

const rootReducer = combineReducers({
    qualities: qualitiesReducer,
    professions: professionsReducer,
    users: usersReducer
});

function createStore() {
    return configureStore({
        reducer: rootReducer,
        // middleware: (getDefaultMiddleware) =>
        //     getDefaultMiddleware().concat(logger),
        devTools: process.env.NODE_ENV !== "production"
    });
}

export default createStore;
