"use client";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import LightGallery from "lightgallery/react";
import Link from "next/link";
import Image from "next/image";

const ImageGallery = ({ images }: { images: string[] }) => {
  return (
    <div className="w-full h-full">
      <LightGallery
        elementClassNames={`grid  gap-2 ${images.length === 1 ? "grid-cols-1" : "grid-cols-2"} `}
        speed={500}
        plugins={[lgThumbnail, lgZoom]}
      >
        {images.map((image, index) => (
          <Link
            className={`${images.length === 3 && index === 0 ? "col-span-2" : "col-span-1"}`}
            key={index}
            href={image}
          >
            <Image
              alt=""
              width={500}
              height={500}
              className={`w-full h-[400px] object-cover rounded-lg `}
              src={image}
            />
          </Link>
        ))}
      </LightGallery>
    </div>
  );
};

export default ImageGallery;
