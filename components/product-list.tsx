"use client";

import { InitailProducts } from "@/app/(tabs)/products/page";

import { useEffect, useRef, useState } from "react";
import { getMoreProduects } from "@/app/(tabs)/products/actions";
import ListProduct from "./list-product";

interface ProductListProps {
  initailProducts: InitailProducts
};

export default function ProductList({ initailProducts }:ProductListProps){
  const [product, setProducts] = useState(initailProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  const trigger = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(async (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      const element = entries[0];
      if(element.isIntersecting && trigger.current){
        observer.unobserve(trigger.current);
        setIsLoading(true);
        const newProduct = await getMoreProduects(page + 1);

        if(newProduct.length !== 0){
          setPage(prev => prev + 1);
          setProducts(prev => [...prev, ...newProduct]);
        }else{
          setIsLastPage(true);
        }
    
        setIsLoading(false);
      }
    }, {
      threshold: 1.0,
      rootMargin: "0px 0px -100px 0px"
    });

    if(trigger.current){
      observer.observe(trigger.current);
    }

    return () => {
      observer.disconnect();
    }
  }, [page]);

  return (
    <div className="p-5 flex flex-col gap-5">
      {product.map((product) => <ListProduct key={product.id} {...product} />)}
      {isLastPage ? null : (
        <span ref={trigger} className="text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95">{isLoading ? '로딩중' : '더보기'}</span>
      )}
    </div>
  )
}