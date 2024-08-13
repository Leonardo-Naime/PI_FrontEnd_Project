'use client'

import * as React from "react";
import DefaultFooter from "@/components/footer/footer"
import Header from "@/components/header/header"
import VehicleReq from "@/services/APIs/vehicle"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import CarouselSize from "@/components/homeCarousel/carousel";
import { CldImage } from "next-cloudinary";

type Car = {
    ano:string,
    descricao:string,
    nome:string,
    imagem:string,
    marca:string,
    modelo:string,
    preco:string,
    tempo:string,
    user:any
}

const BuyCar = () => {
  const url = usePathname().split('/')
  const id = url[url.length-2]
  const [Car, setCar] = useState<Car>()

  
  useEffect(() => {
    const fetchCar = async () => {
      const car = await VehicleReq(id);
      setCar(car);
    };
    fetchCar();
  }, [id]);
    
  return (
    <div className="bg-[#EEEEEE]">
      <div>
        <Header></Header>
      </div>
      <CldImage
        width={340}
        height={340}
        src="perritos-amigos_yoqchq"
        alt="Dogs"
      />
      <div>
        <DefaultFooter></DefaultFooter>
      </div>
    </div>
  );
}
    
export default BuyCar