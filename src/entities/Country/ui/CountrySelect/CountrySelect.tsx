import { Country } from "../../model/types/country";
import { FC, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ListBox } from "@/shared/ui/ListBox/ListBox";

interface CountrySelectProps {
  className?: string;
  value?: Country;
  onChange?: (value: Country) => void;
  readonly?: boolean;
}

const options = [
  { value: Country.ARMENIA, content: Country.ARMENIA },
  { value: Country.BELARUS, content: Country.BELARUS },
  { value: Country.KAZAHSTAN, content: Country.KAZAHSTAN },
  { value: Country.RUSSIA, content: Country.RUSSIA },
  { value: Country.UKRAINE, content: Country.UKRAINE },
];

export const CountrySelect: FC<CountrySelectProps> = memo(
  ({ className, value, onChange, readonly }) => {
    const { t } = useTranslation();

    const onChangeHandler = useCallback(
      (value: string) => {
        onChange?.(value as Country);
      },
      [onChange]
    );
    return (
      <ListBox
        items={options}
        className={className}
        label={t("Укажите валюту")}
        value={value}
        defaultValue={t("Укажите страну")}
        onChange={onChangeHandler}
        readonly={readonly}
      />
    );
  }
);
