"use client";

import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import listingsReducer from "../slices/listingsSlice";

export function makeStore() {
    return configureStore({
        reducer: {
            user: userReducer,
            listings: listingsReducer
        }
    })
};

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
 >;