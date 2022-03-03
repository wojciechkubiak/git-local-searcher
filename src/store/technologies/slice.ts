import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ITechnologiesState {
  currentTechnology: string;
  technologies: string[];
  isLoading: boolean;
  error?: string;
}

const initialState: ITechnologiesState = {
  currentTechnology: JSON.parse(
    localStorage.getItem("technologies") || "[]"
  )[0],
  technologies: JSON.parse(localStorage.getItem("technologies") || "[]"),
  isLoading: true,
  error: "",
};

const technologiesSlice = createSlice({
  name: "technologies",
  initialState,
  reducers: {
    addTechnology(state, action: PayloadAction<string>) {
      if (!state.technologies.includes(action.payload)) {
        state.technologies = [...state.technologies, action.payload];

        const currentLocal = JSON.parse(
          localStorage.getItem("technologies") || "[]"
        );

        if (!currentLocal.includes(action.payload)) {
          currentLocal.push(action.payload);
          localStorage.setItem("technologies", JSON.stringify(currentLocal));
        }
      }
      state.isLoading = false;
      state.error = "";
    },
    setCurrentTechnology(state, action: PayloadAction<string>) {
      if (state.currentTechnology !== action.payload) {
        state.currentTechnology = action.payload;
      }
    },
  },
});

export const { addTechnology, setCurrentTechnology } =
  technologiesSlice.actions;
export const technologiesReducer = technologiesSlice.reducer;
