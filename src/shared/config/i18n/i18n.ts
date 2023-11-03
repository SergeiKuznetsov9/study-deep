import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // язык по умолчанию
    fallbackLng: "ru",

    // это свойство определяет логирование в консоли различных событий работы библиотеки
    // его стоит сделать условным, в зависимости от процесса
    // Когда мы добавили перемнную __IS_DEV__, ТайпСкрипт будет ругаться, т.к. он ничего не знает об этой
    // перемнной. Ему нужно подсказать о наличии такой переменной в глобальном файле стилей
    debug: __IS_DEV__,

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
