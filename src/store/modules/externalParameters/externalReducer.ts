import {combineReducers} from '@reduxjs/toolkit';

import {externalParametersReducer} from './externalParameters/externalParametersSlice';
import {externalParametersGroupReducer} from './externalParametersGroup/externalParametersGroupSlice';
import {externalParameterReducer} from "./externalParameter";

export const externalReducer = combineReducers({
    parameters: externalParametersReducer,
    groups: externalParametersGroupReducer,
    parameter: externalParameterReducer
});
