import { StateSchema } from "app/providers/StoreProvider";

export const getAddCommentFormText = (state: StateSchema) =>
  // Это поле не проинициализировано пустой строкой по умолчанию, поэтому и возникает
  // предупреждение. Проинициализируем:
  state.addCommentForm?.text ?? "";
export const getAddCommentFormError = (state: StateSchema) =>
  state.addCommentForm?.error;
