import { FC } from "react";
import { useTranslation } from "react-i18next";

import { Currency, CurrencySelect } from "@/entities/Currency";
import { Country, CountrySelect } from "@/entities/Country";
import { Input } from "@/shared/ui/Input";
import { HStack, VStack } from "@/shared/ui/Stack";

import { Profile } from "../../model/types/profile";
import { Card } from "@/shared/ui/Card";
import { Avatar } from "@/shared/ui/Avatar";
import { ProfileCardLoading } from "../ProfileCardLoading/ProfileCardLoading";
import { ProfileCardError } from "../ProfileCardError/ProfileCardError";

interface ProfileCardProps {
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

export const ProfileCard: FC<ProfileCardProps> = ({
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

  if (isLoading) return <ProfileCardLoading />;

  if (error) return <ProfileCardError />;

  return (
    <Card padding="24" max className={className}>
      <VStack gap="32">
        {data?.avatar && (
          <HStack align="center" justify="center" max>
            <Avatar src={data.avatar} size={128} />
          </HStack>
        )}
        <HStack gap="24" max>
          <VStack gap="16" max>
            <Input
              value={data?.first}
              label={t("Имя")}
              onChange={onChangeFirstName}
              readonly={readonly}
            />
            <Input
              value={data?.lastname}
              label={t("Фамилия")}
              onChange={onChangeLastName}
              readonly={readonly}
            />
            <Input
              value={data?.age}
              label={t("Возраст")}
              onChange={onChangeAge}
              readonly={readonly}
            />
            <Input
              value={data?.city}
              label={t("Город")}
              onChange={onChangeCity}
              readonly={readonly}
            />
          </VStack>
          <VStack gap="16" max>
            <Input
              value={data?.username}
              label={t("Имя пользователя")}
              onChange={onChangeUserName}
              readonly={readonly}
            />
            <Input
              value={data?.avatar}
              label={t("Аватар")}
              onChange={onChangeAvatar}
              readonly={readonly}
            />
            <CurrencySelect
              value={data?.currency}
              onChange={onChangeCurrency}
              readonly={readonly}
            />
            <CountrySelect
              value={data?.country}
              onChange={onChangeCountry}
              readonly={readonly}
            />
          </VStack>
        </HStack>
      </VStack>
    </Card>
  );
};
