import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { useUserAuthData } from "@/entities/User";
import { Text } from "@/shared/ui/Text";
import { Button } from "@/shared/ui/Button";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { HStack } from "@/shared/ui/Stack";
import { Card } from "@/shared/ui/Card";

import { useProfileData } from "../../model/selectors/getProfileData/getProfileData";
import { profileActions } from "../../model/slice/profileSlice";
import { updateProfileData } from "../../model/services/updateProfileData/updateProfileData";
import { useProfileReadonly } from "../../model/selectors/getProfileReadOnly/getProfileReadOnly";

interface ProfilePageHeaderProps {
  className?: string;
}

export const EditableProfilePageHeader: FC<ProfilePageHeaderProps> = ({
  className,
}) => {
  const { t } = useTranslation("profile");
  const dispatch = useAppDispatch();
  const authData = useUserAuthData();
  const profileData = useProfileData();
  const canEdit = authData?._id === profileData?.userId;

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadOnly(false));
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  const onSave = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);

  const readonly = useProfileReadonly();

  return (
    <Card padding="24" max border="partial">
      <HStack max justify="between" className={className}>
        <Text title={t("Профиль")} />
        {canEdit && (
          <>
            {readonly ? (
              <Button variant="outline" onClick={onEdit}>
                {t("Редактировать")}
              </Button>
            ) : (
              <HStack gap={"8"}>
                <Button variant="outline" onClick={onCancelEdit} color="error">
                  {t("Отменить")}
                </Button>
                <Button variant="outline" onClick={onSave} color="success">
                  {t("Сохранить")}
                </Button>
              </HStack>
            )}
          </>
        )}
      </HStack>
    </Card>
  );
};
