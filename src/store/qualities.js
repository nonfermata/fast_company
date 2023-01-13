import { createSlice } from "@reduxjs/toolkit";
import qualityService from "../app/services/quality.service";

const initialState = {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
};

const qualitiesSlice = createSlice({
    name: "qualities",
    initialState,
    reducers: {
        qualitiesRequested(state) {
            state.isLoading = true;
        },
        qualitiestRequestFailed(state, action) {
            state.error = action.payload;
            state.isLoading = false;
        },
        qualitiesReceived(state, action) {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        }
    }
});

const { actions, reducer: qualitiesReducer } = qualitiesSlice;
const { qualitiesRequested, qualitiestRequestFailed, qualitiesReceived } =
    actions;

function isOutdated(data) {
    if (Date.now() - data > 10 * 60 * 1000) {
        return true;
    } else {
        return false;
    }
}

export const loadQualitiesList = () => async (dispatch, getstate) => {
    const { lastFetch } = getstate().qualities;
    if (isOutdated(lastFetch)) {
        dispatch(qualitiesRequested());
        try {
            const { content } = await qualityService.get();
            dispatch(qualitiesReceived(content));
        } catch (e) {
            dispatch(qualitiestRequestFailed(e.message));
        }
    }
};

export const getQualities = () => (state) => state.qualities.entities;
export const getQualitiesLoadingStatus = () => (state) =>
    state.qualities.isLoading;

export default qualitiesReducer;
