import { Button } from "@heroui/button";
import {
  Card as NextUiCard,
  CardBody,
  CardFooter,
  CardHeader,
} from "@heroui/card";
import { Image } from "@heroui/image";
import { format } from "date-fns";

const Card = ({ post }: any) => {
  const { title, category, images, city, dateFound, _id } = post || {};

  return (
    <NextUiCard isFooterBlurred className="h-[300px] w-full">
      <CardHeader className="absolute top-1 z-10 flex-col items-center">
        <p className="absolute -top-0 right-1 rounded-full bg-black px-2 text-tiny uppercase">
          {category?.name}
        </p>
        <h4 className="mt-2 absolute left-0 w-full  rounded bg-black/60 p-1 text-xl  ">
          {title}
        </h4>
      </CardHeader>
      <Image
        removeWrapper
        alt={title}
        className="scale-120 z-0 h-full w-full -translate-y-6 object-cover"
        radius="lg"
        shadow="sm"
        src={images[0]}
        width="100%"
      />

      <CardFooter className="absolute bottom-0 z-10 justify-between border-t-1 border-zinc-400">
        <div>
          <p className="text-tiny ">{city}</p>
          <p className="text-tiny ">{format(dateFound, "dd MMMM yy")}</p>
        </div>
        <Button
          className="bg-black text-tiny text-white"
          radius="full"
          size="sm"
        >
          Details
        </Button>
      </CardFooter>
    </NextUiCard>
  );
};

export default Card;
