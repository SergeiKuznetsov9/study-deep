import { FC } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ProfileCard.module.scss";
import { Text, TextAlign, TextTheme } from "shared/ui/Text/Text";
import { Input } from "shared/ui/Input/Input";
import { Profile } from "../../model/types/profile";
import { Loader } from "shared/ui/Loader";
import { Avatar } from "shared/ui/Avatar/Avatar";
import { Currency, CurrencySelect } from "entities/Currency";
import { Country, CountrySelect } from "entities/Country";

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
      <div
        className={classNames(cls.ProfileCard, { [cls.editing]: !readonly }, [
          className,
          cls.loading,
        ])}
      >
        <Loader />
      </div>
    );

  if (error)
    return (
      <div
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
      </div>
    );

  return (
    <div
      className={classNames(cls.ProfileCard, { [cls.editing]: !readonly }, [
        className,
      ])}
    >
      <div>
        {data?.avatar && (
          <div className={cls.avatarWrapper}>
            <Avatar src={data.avatar} alt="avatar" />
          </div>
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
      </div>
    </div>
  );
};
