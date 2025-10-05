import React, { useState } from "react";
import FxModal from "./FxModal";
import { useDisclosure } from "@heroui/modal";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { MdCopyAll, MdShare } from "react-icons/md";
import { Button } from "@heroui/button";
import { CopyToClipboard } from "react-copy-to-clipboard";

const FxModalShare = ({ url }: { url: string }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [copied, setCopied] = useState(false);
  return (
    <div className=" ">
      <Button onPress={onOpen} className="w-full border border-default-400">
        <MdShare />
        Share
      </Button>
      <FxModal
        onClose={() => setCopied(false)}
        onOpenChange={onOpenChange}
        isOpen={isOpen}
      >
        <div>
          <h3 className="my-4 text-lg">Share on social</h3>
          <div className="flex gap-4 justify-center items-center ">
            <FacebookShareButton url={url}>
              <FacebookIcon className="rounded-full" />
            </FacebookShareButton>
            <FacebookMessengerShareButton appId="" url={url}>
              <FacebookMessengerIcon className="rounded-full" />
            </FacebookMessengerShareButton>
            <WhatsappShareButton url={url}>
              <WhatsappIcon className="rounded-full" />
            </WhatsappShareButton>
            <TelegramShareButton url={url}>
              <TelegramIcon className="rounded-full" />
            </TelegramShareButton>
            <EmailShareButton url={url}>
              <EmailIcon className="rounded-full" />
            </EmailShareButton>
          </div>
          <p className="my-4 text-center text-lg font-bold">or</p>
          <div className="w-full gap-4 flex items-center justify-between">
            <p className="truncate  border p-2 rounded-xl border-default-300">{url}</p>
            <CopyToClipboard text={url} onCopy={() => setCopied(true)}>
              <Button>{copied ? "Copied!" : <MdCopyAll size={24} />}</Button>
            </CopyToClipboard>
          </div>
        </div>
      </FxModal>
    </div>
  );
};

export default FxModalShare;
