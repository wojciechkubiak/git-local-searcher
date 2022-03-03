import { createAsyncThunk } from "@reduxjs/toolkit";

import { AppThunkApiConfig } from "../store";
import { Data } from "../../models/Data";
import { IDataInput } from "../../services/DataService";

export const fetchData = createAsyncThunk<
  Data | null | string,
  IDataInput,
  AppThunkApiConfig
>("fetchData", async (data, { extra }) => extra.dataService.getData(data));
