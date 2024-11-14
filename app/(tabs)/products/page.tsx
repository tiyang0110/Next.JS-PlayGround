import Link from "next/link";
import ProductList from "@/components/product-list";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { PlusIcon } from "@heroicons/react/24/solid";


async function getInitialProducts(){
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true
    },
    take: 1,
    orderBy: {
      created_at: 'desc'
    }
  });

  return products;
}

export type InitailProducts = Prisma.PromiseReturnType<typeof getInitialProducts>;

export default async function Products(){
  const initialProducts = await getInitialProducts();

  return (
    <div>
      <ProductList initailProducts={initialProducts} />
      <Link href="/products/fn/add" className="bg-orange-500 flex justify-center items-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-orange-400">
        <PlusIcon className="size-10" />
      </Link>
    </div>
  )
}