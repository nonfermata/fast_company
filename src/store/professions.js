import { createSlice } from "@reduxjs/toolkit";
import professionService from "../app/services/profession.service";

const initialState = {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
};

const professionsSlice = createSlice({
    name: "professions",
    initialState,
    reducers: {
        professionsRequested(state) {
            state.isLoading = true;
        },
        professionsRequestFailed(state, action) {
            state.error = action.payload;
            state.isLoading = false;
        },
        professionsReceived(state, action) {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        }
    }
});

const { actions, reducer: professionsReducer } = professionsSlice;
const { professionsRequested, professionsRequestFailed, professionsReceived } =
    actions;

function isOutdated(data) {
    return Date.now() - data > 10 * 60 * 1000;
}

export const loadProfessionsList = () => async (dispatch, getstate) => {
    const { lastFetch } = getstate().professions;
    if (isOutdated(lastFetch)) {
        dispatch(professionsRequested());
        try {
            const { content } = await professionService.get();
            dispatch(professionsReceived(content));
        } catch (e) {
            dispatch(professionsRequestFailed(e.message));
        }
    }
};

export const getProfessions = () => (state) => state.professions.entities;
export const getProfessionsLoadingStatus = () => (state) =>
    state.professions.isLoading;
export const getProfessionById = (id) => (state) =>
    state.professions.entities.find((item) => item._id === id);

export default professionsReducer;
