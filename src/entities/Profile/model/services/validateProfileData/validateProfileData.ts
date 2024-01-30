import { Profile, ValidateProfileError } from "../../types/profile";

// Такая простенька реализация.
// Функция на вход получает весь объект из формы и в зависимости от значений,
// может вернуть ошибки в виде массива сообщений, а может и ничего не вернуть если все
// хорошо

// Другой способ реализации - это создание санки, которая будет получать
// значения формы из стэйта и делать в принципе тоже самое

// этот вариант попроще

// Если проверка сложная, то можно создать отдельную функцию и заиспользовать ее в этой
export const validateProfileData = (
  profile: Profile
): ValidateProfileError[] => {
  if (!profile) {
    return [ValidateProfileError.NO_DATA];
  }
  const { first, lastname, age, country } = profile;
  const errors: ValidateProfileError[] = [];

  if (!first || !lastname) {
    errors.push(ValidateProfileError.INCORRECT_USER_DATA);
  }

  if (!age || !Number.isInteger(+age)) {
    errors.push(ValidateProfileError.INCORRECT_AGE);
  }

  if (!country) {
    errors.push(ValidateProfileError.INCORRECT_COUNTRY);
  }

  // Таким образом можно добавить сколь угодно много всевозможных проверок

  return errors;
};
