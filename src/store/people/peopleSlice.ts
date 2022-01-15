import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPeopleState } from "../../constants/types/People";
import people from "../../constants/mocks/data.json";

const initialState: IPeopleState = {
  people: people.data,
};

export const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    test: (state, action: PayloadAction<number>) => {
      state.people = [];
    },
  },
});

// Action creators
export const { test } = peopleSlice.actions;

export default peopleSlice.reducer;
