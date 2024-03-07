import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./AddCommentForm.module.scss";
import { Input } from "shared/ui/Input/Input";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { useAppSelector } from "shared/lib/hooks/useAppSelector/useAppSelector";
import {
  getAddCommentFormText,
  getAddCommentFormError,
} from "../../model/selectors/addCommentFormSelectors";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
  addCommentFormActions,
  addCommentFormReducer,
} from "../../model/slices/addCommentFormSlice";
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";

export interface AddCommentFormProps {
  className?: string;
  // по сути, мы делигировали отправку комментария тому компоненту, который будет
  // использовать эту фичу
  onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
  addCommentForm: addCommentFormReducer,
};

const AddCommentForm: FC<AddCommentFormProps> = ({
  className,
  onSendComment,
}) => {
  const { t } = useTranslation("comments");
  const dispatch = useAppDispatch();
  const text = useAppSelector(getAddCommentFormText);
  const error = useAppSelector(getAddCommentFormError);

  const onCommentTextChange = useCallback(
    (value: string) => {
      dispatch(addCommentFormActions.setText(value));
    },
    [dispatch]
  );

  const onSendHandler = useCallback(() => {
    onCommentTextChange("");
    onSendComment(text || "");
  }, [onCommentTextChange, onSendComment, text]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames(cls.AddCommentForm, {}, [className])}>
        <Input
          placeholder={t("Введите текст комментария")}
          value={text}
          onChange={onCommentTextChange}
          className={cls.input}
        />
        <Button theme={ButtonTheme.OUTLINE} onClick={onSendHandler}>
          {t("Отправить")}
        </Button>
      </div>
    </DynamicModuleLoader>
  );
};

export default AddCommentForm;
