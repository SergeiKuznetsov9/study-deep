import { FC, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { ProfileCard } from "@/entities/Profile";
import { Currency } from "@/entities/Currency";
import { Country } from "@/entities/Country";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Text, TextTheme } from "@/shared/ui/deprecated/Text";
import {
  DynamicModuleLoader,
  ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { VStack } from "@/shared/ui/Stack";

import { useProfileForm } from "../../model/selectors/getProfileForm/getProfileForm";
import { useProfileError } from "../../model/selectors/getProfileError/getProfileError";
import { useProfileIsLoading } from "../../model/selectors/getProfileIsLoading/getProfileIsLoading";
import { useProfileReadonly } from "../../model/selectors/getProfileReadOnly/getProfileReadOnly";
import { profileActions, profileReducer } from "../../model/slice/profileSlice";
import { useProfileValidateErrors } from "../../model/selectors/getProfileValidateErrors/getProfileValidateErrors";
import { fetchProfileData } from "../../model/services/fetchProfileData/fetchProfileData";
import { ValidateProfileError } from "../../model/const/const";
import { EditableProfilePageHeader } from "../EditableProfilePageHeader/EditableProfilePageHeader";

interface EditableProfileCardProps {
  className?: string;
  userId?: string;
}

export const EditableProfileCard: FC<EditableProfileCardProps> = ({
  className,
  userId,
}) => {
  const dispatch = useAppDispatch();

  const reducers: ReducersList = {
    profile: profileReducer,
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchProfileData(userId));
    }
  }, [dispatch]);

  const { t } = useTranslation("profile");

  const validateErrors = useProfileValidateErrors();
  const validateErrorTranslates = {
    [ValidateProfileError.SERVER_ERROR]: t("Серверная ошибка при сохранении"),
    [ValidateProfileError.INCORRECT_AGE]: t("Некорректный возраст"),
    [ValidateProfileError.INCORRECT_COUNTRY]: t("Некорректный регион"),
    [ValidateProfileError.INCORRECT_USER_DATA]: t("Имя и фамилия обязательны"),
    [ValidateProfileError.NO_DATA]: t("Данные не указаны"),
  };

  const formData = useProfileForm();
  const error = useProfileError();
  const isLoading = useProfileIsLoading();
  const readonly = useProfileReadonly();

  const onChangeFirstName = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ first: value || "" }));
    },
    [dispatch]
  );

  const onChangeLastName = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ lastname: value || "" }));
    },
    [dispatch]
  );

  const onChangeAge = useCallback(
    (value?: string) => {
      if (/^(\d+)?$/.test(value!)) {
        dispatch(profileActions.updateProfile({ age: Number(value || 0) }));
      }
    },
    [dispatch]
  );

  const onChangeCity = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ city: value || "" }));
    },
    [dispatch]
  );

  const onChangeUserName = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ username: value || "" }));
    },
    [dispatch]
  );

  const onChangeAvatar = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ avatar: value || "" }));
    },
    [dispatch]
  );

  const onChangeCurrency = useCallback(
    (currency?: Currency) => {
      dispatch(profileActions.updateProfile({ currency }));
    },
    [dispatch]
  );

  const onChangeCountry = useCallback(
    (country?: Country) => {
      dispatch(profileActions.updateProfile({ country }));
    },
    [dispatch]
  );

  return (
    <DynamicModuleLoader reducers={reducers}>
      <VStack gap="8" max className={className}>
        <EditableProfilePageHeader />
        {validateErrors?.length &&
          validateErrors.map((err: keyof typeof validateErrorTranslates) => (
            <Text
              theme={TextTheme.ERROR}
              text={validateErrorTranslates[err]}
              key={err}
            />
          ))}
        <ProfileCard
          className={className}
          data={formData}
          error={error}
          isLoading={isLoading}
          onChangeFirstName={onChangeFirstName}
          onChangeLastName={onChangeLastName}
          onChangeAge={onChangeAge}
          onChangeCity={onChangeCity}
          onChangeUserName={onChangeUserName}
          onChangeAvatar={onChangeAvatar}
          onChangeCurrency={onChangeCurrency}
          onChangeCountry={onChangeCountry}
          readonly={readonly}
        />
      </VStack>
    </DynamicModuleLoader>
  );
};
