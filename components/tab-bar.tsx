"use client";

import Link from "next/link";
import {
  NewspaperIcon as SolidNewspaperIcon,
  HomeIcon as SolidHomeIcon,
  ChatBubbleOvalLeftEllipsisIcon as SolidChatIcon,
  VideoCameraIcon as SolidLiveIcon,
  UserIcon as SolidUserIcon,
} from '@heroicons/react/24/solid';
import {
  NewspaperIcon as OutlineNewspaperIcon,
  HomeIcon as OutlineHomeIcon,
  ChatBubbleOvalLeftEllipsisIcon as OutlineChatIcon,
  VideoCameraIcon as OutlineLiveIcon,
  UserIcon as OutlineUserIcon,
} from '@heroicons/react/24/outline';

import { usePathname } from "next/navigation";

export default function TabBar(){
  const pathname = usePathname();

  return (
    <div className="w-full mx-auto max-w-screen-md grid grid-cols-5 border-neutral-600 border-t px-5 py-3 *:flex *:flex-col *:items-center *:gap-px *:text-white bg-neutral-800">
      <Link href="/products">
        {pathname === '/products' ? <SolidHomeIcon className="w-7 h-7" /> : <OutlineHomeIcon className="w-7 h-7" />}
        <span>홈</span>
      </Link>
      <Link href="/life">
        {pathname === '/life' ? <SolidNewspaperIcon className="w-7 h-7" /> : <OutlineNewspaperIcon className="w-7 h-7" />}
        <span>동네생활</span>
      </Link>
      <Link href="/chat">
        {pathname === '/chat' ? <SolidChatIcon className="w-7 h-7" /> : <OutlineChatIcon className="w-7 h-7" />}
        <span>채팅</span>
      </Link>
      <Link href="/live">
        {pathname === '/live' ? <SolidLiveIcon className="w-7 h-7" /> : <OutlineLiveIcon className="w-7 h-7" />}
        <span>쇼핑</span>
      </Link>
      <Link href="/profile">
        {pathname === '/profile' ? <SolidUserIcon className="w-7 h-7" /> : <OutlineUserIcon className="w-7 h-7" />}
        <span>나의당근</span>
      </Link>
    </div>
  );
}