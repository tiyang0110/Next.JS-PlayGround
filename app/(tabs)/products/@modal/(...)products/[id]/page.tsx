"use client";

import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/solid"
import { useRouter } from "next/navigation";

export default async function ProductDetailModal({
  params
}:{
  params: { id: string }
}){
  const router = useRouter();
  const onCloseClick = () => {
    router.back();
  }

  return (
    <div className="absolute w-full h-full z-50 flex justify-center items-center bg-black bg-opacity-60 left-0 top-0">
      <button onClick={onCloseClick} className="absolute right-20 top-20">
        <XMarkIcon className="size-10" />
      </button>
      <div className="max-w-screen-sm w-full">
        <div className="text-neutral-200 aspect-square bg-neutral-700 rounded-md flex justify-center items-center">
          <PhotoIcon className="h-28" />
        </div>
      </div>
    </div>
  )
}