"use client";
import FXInput from "@/src/components/form/FXInput";
import { Button, Divider } from "@heroui/react";
import React from "react";
import {
  FieldValues,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { MdDelete } from "react-icons/md";
const CreatePostPage = () => {
  const methods = useForm();

  const { control, handleSubmit } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const onSubmit = (data: FieldValues) => {
    
    const formValue = {
      ...data,
      questions: data.questions.map(
        (question: { value: string }) => question.value
      ),
    };
    console.log(formValue);
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FXInput label="Title" name="title" />
          <Divider className="my-6" />
          <div>
            <div className="flex justify-between items-center mb-4">
              <h1>Owner verification questions</h1>
              <Button onPress={() => append({ value: "" })}>Append</Button>
            </div>
            <div className="gap-4 flex flex-col ">
              {fields.map((field, index) => (
                <div className="flex items-center  gap-4 ">
                  <FXInput
                    key={field.id}
                    label={`Question ${index + 1}`}
                    name={`questions.${index}.value`}
                  />
                  <Button onPress={() => remove(index)}>
                    <MdDelete size={24} color="orange" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <Button className="mt-4" type="submit">
            Post
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreatePostPage;
