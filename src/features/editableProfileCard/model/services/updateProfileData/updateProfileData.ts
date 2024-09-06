import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";

import { Profile } from "entities/Profile";

import { getProfileForm } from "../../selectors/getProfileForm/getProfileForm";
import { validateProfileData } from "../validateProfileData/validateProfileData";
import { ValidateProfileError } from "../../types/editableProfileCardSchema";

export const updateProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<ValidateProfileError[]>
>(
  "profile/updateProfileData",
  async (_, { rejectWithValue, extra, getState }) => {
    const formData = getProfileForm(getState())!;

    const errors = validateProfileData(formData);

    if (errors.length) {
      return rejectWithValue(errors);
    }

    try {
      const response = await extra.api.put<Profile>(
        `/profile/${formData?.id}`,
        formData
      );

      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
    }
  }
);
