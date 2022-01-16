import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPeopleState, THUMBS } from "../../utils/types/People";
import peopleMock from "../../utils/mocks/data.json";

// hydrate localStorage
if (!localStorage.getItem("data")) {
  localStorage.setItem("data", JSON.stringify(peopleMock.data));
}

const people = localStorage.getItem("data");

const initialState: IPeopleState = {
  people: people ? JSON.parse(people) : peopleMock,
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
        // Save state in localStorage, I'm sure maybe its better in a thunk
        localStorage.setItem("data", JSON.stringify(state.people));
      }
    },
  },
});

// Action creators
export const { voteNow } = peopleSlice.actions;

export default peopleSlice.reducer;
