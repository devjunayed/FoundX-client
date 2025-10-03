"use client";
import FXDatePicker from "@/src/components/form/FXDatePicker";
import FXInput from "@/src/components/form/FXInput";
import FXSelect from "@/src/components/form/FXSelect";
import FXTextArea from "@/src/components/form/FXTextArea";
import { useUser } from "@/src/context/user.provider";
import { useGetCategories } from "@/src/hooks/categories.hook";
import { useCreatePost } from "@/src/hooks/post.hook";
import dateToIso from "@/src/utils/dateToIso";
import { allDistict } from "@bangladeshi/bangladesh-address";
import { Button, Divider, Spinner } from "@heroui/react";
import React, { useState } from "react";
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
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [previewImageFiles, setPreviewImageFiles] = useState<string[] | []>([]);
  const { user } = useUser();
  const { data: categoriesData, isLoading, isSuccess } = useGetCategories();
  const { mutate: handleCreatePost, isPending } = useCreatePost();

  let categoryOptions: { key: string; label: string }[] = [];

  if (categoriesData && !isLoading) {
    categoryOptions = categoriesData.data.map(
      (category: { _id: string; name: string }) => ({
        key: category._id,
        label: category.name,
      })
    );
  }

  const methods = useForm();

  const { control, handleSubmit } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const onSubmit = (data: FieldValues) => {
    const formData = new FormData();

    const formValue = {
      ...data,
      questions: data.questions.map(
        (question: { value: string }) => question.value
      ),
      user: user?._id,
      dateFound: dateToIso(data.dateFound),
    };

    formData.append("data", JSON.stringify(formValue));

    for (let image of imageFiles) {
      formData.append("itemImages", image);
    }

    console.log(formData.get("data"));
    console.log(formData.get("itemImages"));

    handleCreatePost(formData);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      setImageFiles((prev) => [...prev, file]);

      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewImageFiles((prev) => [...prev, reader.result as string]);
      };

      reader.readAsDataURL(file);

      e.target.value = "";
    }
  };

  const handleImageRemove = (fileIndex: number) => {
    setPreviewImageFiles((prev) =>
      prev.filter((_, index) => index !== fileIndex)
    );
    setImageFiles((prev) => prev.filter((_, index) => index !== fileIndex));
  };
  return (
    <>
      {isPending && (
        <div className="bg-black/10 h-screen fixed inset-0 z-[999] backdrop-blur-md items-center justify-center flex">
          <Spinner variant="simple" size="lg" />
        </div>
      )}
      <div className="bg-default-100 p-8 rounded-xl">
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
                  <div className="flex-1">
                    <FXSelect
                      options={categoryOptions}
                      label="Category"
                      name="category"
                      disabled={!isSuccess}
                    />
                  </div>
                  <div className="flex-1 min-w-xs">
                    <label
                      className="block p-2 cursor-pointer h-full w-full border border-default-300 rounded-lg"
                      htmlFor="image"
                    >
                      <p className="flex h-full w-full text-sm text-default-500 items-center">
                        Upload Image
                      </p>
                    </label>
                    <input
                      onChange={(e) => handleFileChange(e)}
                      type="file"
                      multiple
                      id="image"
                      className="hidden"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex flex-wrap  gap-4 ">
                    {previewImageFiles.length > 0 &&
                      previewImageFiles.map((imageDataUrl, index) => (
                        <div className="relative group">
                          <img
                            className="size-48  rounded-lg p-1 object-cover border border-dashed border-default-300"
                            src={imageDataUrl}
                          />
                          <div className="absolute group-hover:flex  hidden top-0 left-0    items-center justify-center bg-black/70 size-48 ">
                            <MdDelete
                              onClick={() => handleImageRemove(index as number)}
                              className="size-8 cursor-pointer"
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div>
                  <FXTextArea label="Description" name="description" />
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
    </>
  );
};

export default CreatePostPage;
