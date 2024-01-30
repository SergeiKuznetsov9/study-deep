import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Profile, ValidateProfileError } from "../../types/profile";
import { getProfileForm } from "../../selectors/getProfileForm/getProfileForm";
import { validateProfileData } from "../validateProfileData/validateProfileData";

export const updateProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<ValidateProfileError[]>
>(
  "profile/updateProfileData",
  async (_: void, { rejectWithValue, extra, getState }) => {
    const formData = getProfileForm(getState())!;

    // Ну а здесь в Санке для апдэйта профильДаты будем запускать
    // функцию валидации
    const errors = validateProfileData(formData);

    if (errors.length) {
      return rejectWithValue(errors);
    }

    try {
      const response = await extra.api.put<Profile>("/profile", formData);

      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
    }
  }
);
