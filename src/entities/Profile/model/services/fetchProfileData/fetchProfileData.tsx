import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkExtraArg } from "app/providers/StoreProvider";
import { Profile } from "../../types/profile";

export const fetchProfileData = createAsyncThunk<
  Profile,
  void,
  {
    rejectValue: string;
    extra: ThunkExtraArg;
  }
>("profile/fetchProfileData", async (_: void, { rejectWithValue, extra }) => {
  try {
    const response = await extra.api.get<Profile>("/profile");

    return response.data;
  } catch (error) {
    console.error(error);
    return rejectWithValue("error");
  }
});
