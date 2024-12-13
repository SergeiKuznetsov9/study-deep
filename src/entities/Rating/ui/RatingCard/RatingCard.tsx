import { FC, useCallback, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { useTranslation } from "react-i18next";

import { Card } from "@/shared/ui/Card";
import { HStack, VStack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { StarRating } from "@/shared/ui/StarRating";
import { Modal } from "@/shared/ui/Modal";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";
import { Drawer } from "@/shared/ui/Drawer";

interface RatingCardProps {
  className?: string;
  title?: string;
  feedbackTitle?: string;
  hasFeedback?: boolean;
  rate?: number;
  onCancel?: (starsCount: number) => void;
  onAccept?: (starsCount: number, feedback?: string) => void;
}

export const RatingCard: FC<RatingCardProps> = ({
  className,
  title,
  feedbackTitle,
  hasFeedback,
  rate = 0,
  onCancel,
  onAccept,
}) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [starsCount, setStarsCount] = useState(rate);
  const [feedback, setFeedback] = useState("");

  const onSelectStars = useCallback(
    (selectedStarsCount: number) => {
      setStarsCount(selectedStarsCount);

      if (hasFeedback) {
        setIsModalOpen(true);
      } else {
        onAccept?.(selectedStarsCount);
      }
    },
    [hasFeedback, onAccept]
  );

  const acceptHandle = useCallback(() => {
    setIsModalOpen(false);
    onAccept?.(starsCount, feedback);
  }, [feedback, onAccept, starsCount]);

  const cancelHandle = useCallback(() => {
    setIsModalOpen(false);
    onCancel?.(starsCount);
  }, [onCancel, starsCount]);

  const modalContent = (
    <VStack gap="32" max>
      <Text title={feedbackTitle} />
      <Input
        placeholder={t("Ваш отзыв")}
        value={feedback}
        onChange={setFeedback}
      />
      <HStack max gap="16" justify="end">
        <Button onClick={cancelHandle}>{t("Закрыть")}</Button>
        <Button onClick={acceptHandle}>{t("Отправить")}</Button>
      </HStack>
    </VStack>
  );

  return (
    <Card className={className} padding="24" border="round" max>
      <VStack align="center" gap="8">
        <Text title={starsCount ? t("Спасибо за оценку!") : title} />
        <StarRating
          size={40}
          onSelect={onSelectStars}
          selectedStars={starsCount}
        />
      </VStack>
      <BrowserView>
        <Modal isOpen={isModalOpen}>{modalContent}</Modal>
      </BrowserView>
      <MobileView>
        <Drawer isOpen={isModalOpen} onClose={cancelHandle}>
          {modalContent}
        </Drawer>
      </MobileView>
    </Card>
  );
};
