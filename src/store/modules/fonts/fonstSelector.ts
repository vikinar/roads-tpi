import { createSelector } from "reselect";
import { RootState } from '../..';

export const getFontsReducer = (state: RootState) => {
    return state.fonts;
}

export const fontsSelector = createSelector(getFontsReducer, fontsReducer => {
    return fontsReducer.data;
})