"use client";
import FXDatePicker from "@/src/components/form/FXDatePicker";
import FXInput from "@/src/components/form/FXInput";
import FXSelect from "@/src/components/form/FXSelect";
import dateToIso from "@/src/utils/dateToIso";
import { allDistict } from "@bangladeshi/bangladesh-address";
import { Button, Divider } from "@heroui/react";
import React from "react";
import {
  FieldValues,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { MdDelete } from "react-icons/md";

const cityOptions = allDistict()
  .sort()
  .map((city: string) => ({ key: city, label: city }));

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
      dateFound: dateToIso(data.dateFound),
    };
    console.log(formValue);
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h1>Post a found item</h1>
            <Divider className="my-6" />
            <div className="flex flex-col gap-4">
              <div className="flex justify-between gap-4">
                <FXInput label="Title" name="title" />
                <FXDatePicker label="Found Date" name="dateFound" />
              </div>
              <div className="flex gap-4">
                <FXInput label="Location" name="location" />
                <FXSelect options={cityOptions} label="City" name="city" />
              </div>
              <div className="flex gap-4">
                <FXInput label="Category" name="category" />
                <FXInput label="Upload Image" name="uploadImage" />
              </div>
            </div>
          </div>
          <Divider className="my-6" />
          <div>
            <div className="flex justify-between items-center mb-4">
              <h1>Owner verification questions</h1>
              <Button onPress={() => append({ value: "" })}>Append</Button>
            </div>
            <Divider className="my-6" />

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
