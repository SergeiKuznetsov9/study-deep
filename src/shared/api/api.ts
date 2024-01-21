import axios from "axios";

export const $api = axios.create({
  // Эту АПИ будем задавать на этапе сборки нашего приложения
  baseURL: __API__,
  headers: {
    authorization: localStorage.getItem("USER_LOCALSTORAGE_KEY"),
  },
});
