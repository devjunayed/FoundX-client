import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { ReactNode } from "react";

interface IFxModal {
    children: ReactNode,
    header?: string,
    footer?: ReactNode,
    isOpen: boolean;
    onOpen?: () => void;
    onClose?: () => void;
    onOpenChange?: () => void;
    isControlled?: boolean;
    getButtonProps?: (props?: any) => any;
    getDisclosureProps?: (props?: any) => any;
}

export default function FxModal({children, header, footer, isOpen, onOpen, onOpenChange, onClose}: IFxModal) {


  return (
    <>
      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {header}
              </ModalHeader>
              <ModalBody>{children}</ModalBody>
              <ModalFooter>{footer}</ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
