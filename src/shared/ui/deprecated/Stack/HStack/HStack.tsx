import { Flex, FlexProps } from "../Flex/Flex";

type HStackProps = Omit<FlexProps, "direction">;

/**
 * Устарел, необходимо использовать новый компонент
 * @deprecated
 */
export const HStack = (props: HStackProps) => {
  return <Flex direction="row" {...props} />;
};
