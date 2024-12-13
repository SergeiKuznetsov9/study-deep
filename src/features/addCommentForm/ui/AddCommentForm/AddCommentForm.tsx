import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
  DynamicModuleLoader,
  ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { HStack } from "@/shared/ui/Stack";
import { Card } from "@/shared/ui/Card";

import {
  addCommentFormActions,
  addCommentFormReducer,
} from "../../model/slices/addCommentFormSlice";
import { useAddCommentFormText } from "../../model/selectors/addCommentFormSelectors";
import cls from "./AddCommentForm.module.scss";

export interface AddCommentFormProps {
  className?: string;
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
  const text = useAddCommentFormText();

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
      <Card padding="24" border="round" max className={className}>
        <HStack justify="between" max gap="16">
          <Input
            placeholder={t("Введите текст комментария")}
            value={text}
            onChange={onCommentTextChange}
            className={cls.input}
          />
          <Button variant="outline" onClick={onSendHandler}>
            {t("Отправить")}
          </Button>
        </HStack>
      </Card>
    </DynamicModuleLoader>
  );
};

export default AddCommentForm;
