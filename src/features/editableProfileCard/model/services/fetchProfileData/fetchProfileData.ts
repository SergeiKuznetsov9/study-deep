import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Profile } from "@/entities/Profile";

export const fetchProfileData = createAsyncThunk<
  Profile,
  string,
  ThunkConfig<string>
>(
  "profile/fetchProfileData",
  async (username: string, { rejectWithValue, extra }) => {
    try {
      const response = await extra.api.get<Profile>(`/profile/${username}`);

      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue("error");
    }
  }
);
