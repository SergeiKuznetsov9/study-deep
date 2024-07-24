import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ProfilePageHeader.module.scss";
import { Text } from "shared/ui/Text/Text";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { useAppSelector } from "shared/lib/hooks/useAppSelector/useAppSelector";
import {
  getProfileData,
  getProfileReadonly,
  profileActions,
  updateProfileData,
} from "entities/Profile";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { getUserAuthData } from "entities/User";

interface ProfilePageHeaderProps {
  className?: string;
}

export const ProfilePageHeader: FC<ProfilePageHeaderProps> = ({
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
    <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
      <Text title={t("Профиль")} />
      {canEdit && (
        <div className={cls.btnsWrapper}>
          {readonly ? (
            <Button
              className={cls.editBtn}
              theme={ButtonTheme.OUTLINE}
              onClick={onEdit}
            >
              {t("Редактировать")}
            </Button>
          ) : (
            <>
              <Button
                className={cls.editBtn}
                theme={ButtonTheme.OUTLINE_RED}
                onClick={onCancelEdit}
              >
                {t("Отменить")}
              </Button>
              <Button
                className={cls.saveBtn}
                theme={ButtonTheme.OUTLINE}
                onClick={onSave}
              >
                {t("Сохранить")}
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
