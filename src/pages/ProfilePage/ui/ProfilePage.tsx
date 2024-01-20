import { profileReducer } from "entities/Profile";
import { useTranslation } from "react-i18next";
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";

const reducers: ReducersList = {
  profile: profileReducer,
};

const ProfilePage = () => {
  const { t } = useTranslation("main");

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div>
        <div>{t("СТраница профиля")}</div>
      </div>
    </DynamicModuleLoader>
  );
};

export default ProfilePage;
