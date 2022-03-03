import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Data, Item } from "../../models/Data";
import { fetchData } from "./actions";

export enum CurrentOption {
  repo,
  local,
}

interface ICurrentRepo {
  item: Item | null, 
  isLocal: boolean,
}

interface IDataState {
  data: Data | null;
  localData: Item[];
  currentRepo: ICurrentRepo;
  isLoading: boolean;
  isRepoLoading: boolean;
  search: string;
  option: CurrentOption;
  error?: string;
}

const initialState: IDataState = {
  data: null,
  localData: [],
  currentRepo: { item: null, isLocal: false },
  isLoading: false,
  isRepoLoading: false,
  search: "",
  option: CurrentOption.repo,
  error: "",
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    clearData(state) {
      state.data = null;
      state.localData = [];
      state.isLoading = false;
      state.error = "";
    },
    clearRepo(state) {
      state.currentRepo = { item: null, isLocal: false };
      state.isLoading = false;
      state.error = "";
    },
    addRepo(state, action: PayloadAction<{ item: Item; isLocal: boolean }>) {
      state.currentRepo = action.payload;
      state.error = "";
    },
    hideLoading(state) {
      state.isLoading = false;
      state.error = "";
    },
    cleanError(state) {
      state.error = "";
    },
    setOption(state, action: PayloadAction<CurrentOption>) {
      state.option = action.payload;
    },
    addLocalRepo(
      _,
      action: PayloadAction<{ technology: string; items: string }>
    ) {
      localStorage.setItem(action.payload.technology, action.payload.items);
    },
    parseTechnologyData(state, action: PayloadAction<{ technology: string; search: string }>) {
      const arr: Item[] = JSON.parse(
        localStorage.getItem(action.payload.technology.toLowerCase()) ?? "[]"
      );

      if(arr.length) {
        const data: Item[] = [];

        arr.forEach((value) => {
          if(value.fullName.toLocaleLowerCase().includes(action.payload.search.toLowerCase())) {
            data.push(value);
          }
        })

        state.localData = data;
      }
      state.error = "";
 
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(fetchData.pending, (state, action) => {
      state.isLoading = true;
    });
    addCase(fetchData.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = "";

      if (payload && typeof payload !== "string") {
        state.data = payload;
      } else if (payload === "string") {
        state.error = payload;
      }
    });
    addCase(fetchData.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error.error.message;
    });
  },
});

export const {
  addSearch,
  addRepo,
  clearRepo,
  clearData,
  cleanError,
  hideLoading,
  addLocalRepo,
  parseTechnologyData,
  setOption,
} = dataSlice.actions;
export const dataReducer = dataSlice.reducer;
