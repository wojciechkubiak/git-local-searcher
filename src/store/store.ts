import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { Services, services } from "../services/services";
import { dataReducer } from "./data/slice";
import {technologiesReducer} from "./technologies/slice";

const reducers = combineReducers({
  data: dataReducer,
  technologies: technologiesReducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: services,
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type AppRootState = ReturnType<typeof reducers>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;
export interface AppThunkApiConfig {
  state: AppRootState;
  dispatch: AppDispatch;
  extra: Services;
}
