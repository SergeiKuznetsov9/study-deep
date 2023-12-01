import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LoginSchema } from "../types/loginSchema";
import { loginByUserName } from "../services/loginByUserName/loginByUserName";

const initialState: LoginSchema = {
  username: "",
  password: "",
  isLoading: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },

  // Это поле используется для изменения стейта на основе результатов, воз-
  // вращаемых санками
  extraReducers: (builder) => {
    // у кажой санки есть три состояния (reject fullfield pending)
    // для обработки каждого состояния следует добавить по редьюсеру
    // в этот раздел. И именно в action попадет то, что вернет санка
    builder
      .addCase(loginByUserName.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(loginByUserName.fulfilled, (state, action) => {
        // Если мы здесь обратимся к action.payload, то это будет тип User
        state.isLoading = false;
      })
      .addCase(loginByUserName.rejected, (state, action) => {
        // Если мы здесь обратимся к action.payload, то это будет тип String
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
