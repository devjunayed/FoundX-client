import { Spinner } from "@heroui/react";

const FxLoader = ({ title }: { title?: string }) => {
  return (
    <div className="bg-black/10 h-screen fixed inset-0 z-[999] backdrop-blur-md items-center justify-center flex">
      <div className="flex flex-col">
        <Spinner variant="simple" size="lg" />
        {title && <span>{title}</span>}
      </div>
    </div>
  );
};

export default FxLoader;
