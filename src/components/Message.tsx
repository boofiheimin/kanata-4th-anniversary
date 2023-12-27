"use client";

import { Submission } from "@/data/submission";
import {
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalContent,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import Reveal from "./Reveal";

const Message = ({
  submission,
  lang,
}: {
  submission: Submission;
  lang?: string;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const tooltipText = lang === "ja" ? "クリックで拡大" : "Click to enlarge";

  return (
    <>
      <Reveal>
        <Card className="message">
          <CardBody>
            {submission.art && (
              <Tooltip showArrow={true} content={tooltipText}>
                <div
                  style={{
                    position: "relative",
                    height: 250,
                  }}
                  className="mb-5 cursor-pointer"
                >
                  <Image
                    className="object-contain"
                    sizes="250px"
                    fill
                    src={submission.art}
                    alt={`${submission.name}'s picture`}
                    onClick={() => {
                      onOpen();
                    }}
                  ></Image>
                </div>
              </Tooltip>
            )}
            <div>{submission.message}</div>
            <div className="text-right italic mt-2">{submission.name}</div>
          </CardBody>
        </Card>
      </Reveal>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="relative modal-size">
                  <Image
                    className="object-contain"
                    fill
                    src={submission.art!}
                    alt={`${submission.name}'s picture`}
                  ></Image>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Message;
