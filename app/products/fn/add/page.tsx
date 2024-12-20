"use client";

import Input from "@/components/input"
import { PhotoIcon } from "@heroicons/react/24/solid"
import Button from "@/components/button"
import { useState } from "react";
import { uploadProduct } from "./actions";
import { useFormState } from "react-dom";
import Link from "next/link";

export default function AddProduct(){
  const [preview, setPreview] = useState("");
  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { files }} = event;

    if(!files || files.length === 0) return;

    if(!files[0].type.startsWith('image/')){
      alert('이미지 파일만 업로드 할 수 있습니다.');
      setPreview("");
      return;
    }

    if(files[0].size > (1024 ** 2) * 3){
      alert('3MB이상 이미지는 업로드 하실 수 없습니다.');
      setPreview("");
      return;
    }

    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);
  }

  const [state, action] = useFormState(uploadProduct, null);

  return (
    <div>
      <form action={action} className="p-5 flex flex-col gap-5">
        <label htmlFor="photo" className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center" style={{ backgroundImage: `url(${preview})`}}>
          {preview ? null : (
            <>
              <PhotoIcon className="w-20" />
              <div className="text-neutral-400 text-sm">
                사진을 추가해주세요.
                {state?.fieldErrors.photo}
              </div>
            </>
          )}
        </label>
        <input onChange={onImageChange} type="file" className="hidden" name="photo" id="photo"/>
        <Input name="title" required placeholder="제목" type="text" errors={state?.fieldErrors.title} />
        <Input name="price" required placeholder="가격" type="number" errors={state?.fieldErrors.price} />
        <Input name="description" required placeholder="자세한 설명" type="text" errors={state?.fieldErrors.description} />
        <Button text="작성완료" />
      </form>
      <Link href="/products">
        <div className="px-5 pb-5">
          <Button text="목록으로" />
        </div>
      </Link>
    </div>
  )
}