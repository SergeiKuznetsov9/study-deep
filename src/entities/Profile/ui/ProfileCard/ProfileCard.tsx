import { FC } from "react";
import { useTranslation } from "react-i18next";

import { Currency, CurrencySelect } from "@/entities/Currency";
import { Country, CountrySelect } from "@/entities/Country";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Text, TextAlign, TextTheme } from "@/shared/ui/Text";
import { Input } from "@/shared/ui/Input";
import { Loader } from "@/shared/ui/Loader";
import { Avatar } from "@/shared/ui/Avatar";
import { HStack, VStack } from "@/shared/ui/Stack";

import { Profile } from "../../model/types/profile";
import cls from "./ProfileCard.module.scss";

interface profileCardProps {
  className?: string;
  data?: Profile;
  error?: string;
  isLoading?: boolean;
  readonly?: boolean;
  onChangeFirstName?: (value: string) => void;
  onChangeLastName?: (value: string) => void;
  onChangeUserName?: (value: string) => void;
  onChangeAvatar?: (value: string) => void;
  onChangeAge?: (value: string) => void;
  onChangeCity?: (value: string) => void;
  onChangeCurrency?: (value: Currency) => void;
  onChangeCountry?: (value: Country) => void;
}

export const ProfileCard: FC<profileCardProps> = ({
  className,
  data,
  error,
  isLoading,
  readonly,
  onChangeFirstName,
  onChangeLastName,
  onChangeAge,
  onChangeCity,
  onChangeUserName,
  onChangeAvatar,
  onChangeCurrency,
  onChangeCountry,
}) => {
  const { t } = useTranslation("profile");

  if (isLoading)
    return (
      <HStack
        justify="center"
        max
        className={classNames(cls.ProfileCard, { [cls.editing]: !readonly }, [
          className,
          cls.loading,
        ])}
      >
        <Loader />
      </HStack>
    );

  if (error)
    return (
      <HStack
        justify="center"
        max
        className={classNames(cls.ProfileCard, { [cls.editing]: !readonly }, [
          className,
          cls.error,
        ])}
      >
        <Text
          theme={TextTheme.ERROR}
          title={t("Произошла ошибка при загрузке профиля")}
          text={t("Попробуйте обновить страницу")}
          align={TextAlign.RIGHT}
        />
      </HStack>
    );

  return (
    <VStack
      gap="16"
      max
      className={classNames(cls.ProfileCard, { [cls.editing]: !readonly }, [
        className,
      ])}
    >
      {data?.avatar && (
        <HStack justify="center" max className={cls.avatarWrapper}>
          <Avatar src={data.avatar} alt="avatar" />
        </HStack>
      )}
      <Input
        value={data?.first}
        placeholder={t("Ваше имя")}
        className={cls.input}
        onChange={onChangeFirstName}
        readonly={readonly}
      />
      <Input
        value={data?.lastname}
        placeholder={t("Ваша фамилия")}
        className={cls.input}
        onChange={onChangeLastName}
        readonly={readonly}
      />
      <Input
        value={data?.age}
        placeholder={t("Ваш возраст")}
        className={cls.input}
        onChange={onChangeAge}
        readonly={readonly}
      />
      <Input
        value={data?.city}
        placeholder={t("Город")}
        className={cls.input}
        onChange={onChangeCity}
        readonly={readonly}
      />
      <Input
        value={data?.username}
        placeholder={t("Введите имя пользователя")}
        className={cls.input}
        onChange={onChangeUserName}
        readonly={readonly}
      />
      <Input
        value={data?.avatar}
        placeholder={t("Введите ссылку на аватар")}
        className={cls.input}
        onChange={onChangeAvatar}
        readonly={readonly}
      />
      <CurrencySelect
        className={cls.input}
        value={data?.currency}
        onChange={onChangeCurrency}
        readonly={readonly}
      />
      <CountrySelect
        className={cls.input}
        value={data?.country}
        onChange={onChangeCountry}
        readonly={readonly}
      />
    </VStack>
  );
};
