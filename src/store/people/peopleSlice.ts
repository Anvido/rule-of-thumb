import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPeopleState, THUMBS } from "../../constants/types/People";
import people from "../../constants/mocks/data.json";

const initialState: IPeopleState = {
  people: people.data,
};

export const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    voteNow: (state, action: PayloadAction<{ id: number; thumb: THUMBS }>) => {
      const person = state.people.find(
        (person) => person.id === action.payload.id
      );

      if (person) {
        if (action.payload.thumb === THUMBS.UP) {
          person.votes.positive += 1;
        }
        if (action.payload.thumb === THUMBS.DOWN) {
          person.votes.negative += 1;
        }
        person.lastUpdated = new Date().toISOString();
      }
    },
  },
});

// Action creators
export const { voteNow } = peopleSlice.actions;

export default peopleSlice.reducer;
