"use client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Button,
} from "@heroui/react";
import { format } from "date-fns";
import {
  MdCheckCircle,
  MdDateRange,
  MdLocationPin,
  MdShare,
} from "react-icons/md";
import ImageGallery from "./ImageGallery";
import { useUser } from "@/src/context/user.provider";
import { FacebookIcon, FacebookShareButton } from "react-share";
import FxModalShare from "@/src/components/modals/FxModalShare";

export default function Post({ items }: { items: any }) {
  const { user } = useUser();
  return (
    <div className="gap-4 flex flex-col w-full">
      {items.map((item: any, index: number) => (
        <Card key={index} className="w-[800px] mx-auto bg-default-200">
          <CardHeader className="flex gap-3">
            <Image
              alt="heroui logo"
              height={40}
              radius="sm"
              src={item?.user?.profilePhoto}
              width={40}
            />
            <div className="flex flex-col">
              <p className="text-md">{item?.user?.name}</p>
              <p className="text-small text-default-500">{item?.user?.email}</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div>
              <div className="flex justify-between">
                <h3 className="text-xl">{item?.title}</h3>
                <p className="flex items-center text-sm gap-1">
                  <MdLocationPin /> {item?.location}, {item?.city}
                </p>
              </div>
              <p className="flex gap-0.5 items-center mt-1 text-xs mb-4">
                Found on: <MdDateRange />{" "}
                {format(new Date(item.dateFound), "dd MMM, yyyy")}
              </p>
              <div>
                <p>{item?.description}</p>
              </div>
              <Divider className="my-2" />
              <ImageGallery images={item?.images} />
            </div>
          </CardBody>
          <Divider />
          <CardFooter>
            <div className="grid grid-cols-2 justify-between w-full gap-2 ">
              {user?.email !== item.user.email && (
                <Button className=" border border-default-400">
                  <MdCheckCircle />
                  Claim Request
                </Button>
              )}
              <div className=" w-full">
                <FxModalShare
                  url={`http://localhost:3000/found-items/${item._id}`}
                />
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
