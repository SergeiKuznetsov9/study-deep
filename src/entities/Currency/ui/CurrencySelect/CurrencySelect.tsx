import { Currency } from "../../model/types/currency";
import { FC, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ListBox } from "@/shared/ui/ListBox/ListBox";

interface CurrencySelectProps {
  className?: string;
  value?: Currency;
  onChange?: (value: Currency) => void;
  readonly?: boolean;
}

const options = [
  { value: Currency.RUB, content: Currency.RUB },
  { value: Currency.USD, content: Currency.USD },
  { value: Currency.EUR, content: Currency.EUR },
];

export const CurrencySelect: FC<CurrencySelectProps> = memo(
  ({ className, value, onChange, readonly }) => {
    const { t } = useTranslation();

    const onChangeHandler = useCallback(
      (value: string) => {
        onChange?.(value as Currency);
      },
      [onChange]
    );
    return (
      <ListBox
        items={options}
        className={className}
        value={value}
        defaultValue={t("Укажите валюту")}
        label={t("Укажите валюту")}
        onChange={onChangeHandler}
        readonly={readonly}
      />
    );
  }
);
