"use client";

import { dislikePost, likePost } from "@/app/posts/[id]/actions";
import { HandThumbUpIcon as HandThumbUpIconOutline } from "@heroicons/react/24/outline";
import { HandThumbUpIcon as HandThumbUpIconSolid } from "@heroicons/react/24/solid";
import { useOptimistic } from "react";

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  postId: number;
}

export default function LikeButton({isLiked, likeCount, postId}:LikeButtonProps){
  const [state, reducerFn] = useOptimistic({ isLiked, likeCount }, (previousState, payload) => ({
    isLiked: !previousState.isLiked,
    likeCount: previousState.isLiked ? previousState.likeCount - 1 : previousState.likeCount + 1
  }));

  const onClick = async () => {
    reducerFn(undefined);

    if(isLiked){
      await dislikePost(postId);
    }else {
      await likePost(postId);
    }
  }

  return (
    <button onClick={onClick} className={`flex items-center gap-2 text-neutral-400 text-sm border rounded-full p-2 ${state.isLiked ? "bg-orange-500 text-white border-orange-500" : "hover:bg-neutral-800"}`}>
      {state.isLiked ? (
        <>
          <HandThumbUpIconSolid className="size-5" />
          <span>{state.likeCount}</span>
        </>
      ) : (
        <>
          <HandThumbUpIconOutline className="size-5" />
          <span>공감하기 ({state.likeCount})</span>
        </>
      )}
    </button>
  )
}