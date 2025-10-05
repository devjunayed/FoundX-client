import { useDisclosure } from "@heroui/modal";
import FXForm from "../form/FXForm";
import FxModal from "./FxModal";
import FXInput from "../form/FXInput";
import { FieldValues, useFormContext, useFormState } from "react-hook-form";
import { Button } from "@heroui/button";
import { MdCheckCircle, MdSend } from "react-icons/md";
import FXTextArea from "../form/FXTextArea";
import { useCreateClaimRequest } from "@/src/hooks/claimItems.hook";
import FxLoader from "../UI/FxLoader";

const FxModalClaim = ({ questions, itemId }: { questions: string[],itemId: string }) => {
  const { onOpen, onOpenChange, isOpen, onClose } = useDisclosure();
  const {mutate: handleCreateClaim, isPending} = useCreateClaimRequest();

  const onSubmit = (fieldData: FieldValues) => {
    const answers = Object.keys(fieldData)
      .filter((fieldkey) => fieldkey !== "description")
      .map((answerKey) => fieldData[answerKey]);

    const finalData = {
        item: itemId,
        description: fieldData.description,
        answers
    }

    handleCreateClaim(finalData);
  };
  return (
    <div className="w-full">
      {isPending && <FxLoader title="submiting data..." />}
      <Button
        onPress={() => onOpen()}
        className="w-full border border-default-400"
      >
        <MdCheckCircle />
        Claim Request
      </Button>
      <FxModal
        header="Claim Request"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <FXForm onSubmit={onSubmit}>
          {questions.map((question, index) => (
            <div key={index}>
              <p className="pl-1 my-2">Answer {index + 1}</p>
              <FXInput label={`${question}?`} name={`answer-${index + 1}`} />
            </div>
          ))}
          <p className="pl-1 my-2">Description</p>
          <FXTextArea
            name="description"
            label="Write something more that can help..."
          />
          <div className="flex justify-center w-full">
            <Button type="submit" className="mt-4 w-full">
              Send <MdSend className="-rotate-45" />{" "}
            </Button>
          </div>
        </FXForm>
      </FxModal>
    </div>
  );
};

export default FxModalClaim;
