import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { getUserAuthData } from "@/entities/User";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Text } from "@/shared/ui/Text/Text";
import { Button, ButtonTheme } from "@/shared/ui/Button/Button";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector/useAppSelector";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { HStack } from "@/shared/ui/Stack";

import { getProfileData } from "../../model/selectors/getProfileData/getProfileData";
import { profileActions } from "../../model/slice/profileSlice";
import { updateProfileData } from "../../model/services/updateProfileData/updateProfileData";
import { getProfileReadonly } from "../../model/selectors/getProfileReadOnly/getProfileReadOnly";

interface ProfilePageHeaderProps {
  className?: string;
}

export const EditableProfilePageHeader: FC<ProfilePageHeaderProps> = ({
  className,
}) => {
  const { t } = useTranslation("profile");
  const dispatch = useAppDispatch();
  const authData = useAppSelector(getUserAuthData);
  const profileData = useAppSelector(getProfileData);
  const canEdit = authData?.id === profileData?.id;

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadOnly(false));
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  const onSave = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);

  const readonly = useAppSelector(getProfileReadonly);

  return (
    <HStack max justify="between" className={classNames("", {}, [className])}>
      <Text title={t("Профиль")} />
      {canEdit && (
        <>
          {readonly ? (
            <Button theme={ButtonTheme.OUTLINE} onClick={onEdit}>
              {t("Редактировать")}
            </Button>
          ) : (
            <HStack gap={"8"}>
              <Button theme={ButtonTheme.OUTLINE_RED} onClick={onCancelEdit}>
                {t("Отменить")}
              </Button>
              <Button theme={ButtonTheme.OUTLINE} onClick={onSave}>
                {t("Сохранить")}
              </Button>
            </HStack>
          )}
        </>
      )}
    </HStack>
  );
};
