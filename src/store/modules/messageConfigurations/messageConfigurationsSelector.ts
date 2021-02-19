import { createSelector } from "reselect";
import { RootState } from '../..';

export const getMessageConfigurationReducer = (state: RootState) => {
    return state.messageConfiguration;
}

export const getMessageConfiguration = createSelector(
    getMessageConfigurationReducer,
    messageConfigurationeReducer => {
        return messageConfigurationeReducer.data;
    }
);