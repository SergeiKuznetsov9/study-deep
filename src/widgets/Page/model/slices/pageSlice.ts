import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PageSchema } from "../types/pageSchema";

const initialState: PageSchema = {
  scroll: {},
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setScrollPosition: (
      state,
      { payload }: PayloadAction<{ path: string; position: number }>
    ) => {
      state.scroll[payload.path] = payload.position;
    },
  },
});

export const { actions: pageActions } = pageSlice;
export const { reducer: pageReducer } = pageSlice;
