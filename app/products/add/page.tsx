"use client";

import Input from "@/components/input"
import { PhotoIcon } from "@heroicons/react/24/solid"
import Button from "@/components/button"
import { useState } from "react";
import { uploadProduct } from "./actions";

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

  return (
    <div>
      <form action={uploadProduct} className="p-5 flex flex-col gap-5">
        <label htmlFor="photo" className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center" style={{ backgroundImage: `url(${preview})`}}>
          {preview ? null : (
            <>
              <PhotoIcon className="w-20" />
              <div className="text-neutral-400 text-sm">사진을 추가해주세요.</div>
            </>
          )}
        </label>
        <input onChange={onImageChange} type="file" className="hidden" name="photo" id="photo"/>
        <Input name="title" required placeholder="제목" type="text" />
        <Input name="price" required placeholder="가격" type="number" />
        <Input name="description" required placeholder="자세한 설명" type="text" />
        <Button text="작성완료" />
      </form>
    </div>
  )
}