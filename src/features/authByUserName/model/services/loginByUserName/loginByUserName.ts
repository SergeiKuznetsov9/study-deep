import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "entities/User";

interface LoginByUserNameProps {
  username: string;
  password: string;
}

// По-сути, мы в санке что-то получаем асинхронно и по получении возвращаем
// и когда возвращаем, это попадает в редьюсер для дальнейшей обработки

// В дженерике первым указываем то, что получим, вторым - то что отправим
// Если дженерик расписали, то напрямую аргумент можно не типизировать
// TS и так все поймет. Здесь для примера типизировано, чтобы было видно где

// у объекта thunkAPI, который передается вторым аргументом, есть множество
// всяких интересных методов для работы с редаксом, например dispatch? getState()
// и т.д. и т.п.
export const loginByUserName = createAsyncThunk<
  User,
  LoginByUserNameProps,
  { rejectValue: string }
>("login/loginByUsername", async (authdata: LoginByUserNameProps, thunkAPI) => {
  try {
    const response = await axios.post<User>(
      "http://localhost:8000/login",
      authdata
    );

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (error) {
    console.log(error);
    // Для того, чтобы в редьюсер вернуть ошибку
    return thunkAPI.rejectWithValue("error");
  }
});

// Санка готова. В ней мы что-то получили и что-то из нее вернули. Однако стейт мы
// никак не меняли. Для работы в слайсе с результатами санок, необходимо использовать
// extraReducers
