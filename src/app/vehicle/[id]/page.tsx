'use client'

import * as React from "react";
import DefaultFooter from "@/components/footer/footer"
import Header from "@/components/header/header"
import VehicleReq from "@/services/APIs/vehicle"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
    nomeDoAutomovel:string,
    imageUrl:string[],
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
      console.log(car)
    };
    fetchCar();
  }, [id]);
    
  return (
    <div className="bg-[#EEEEEE]">
      <div>
        <Header></Header>
      </div>
      <div>
      {Car?.imageUrl && (
        <div className="flex w-full h-64">
          {Car.imageUrl.map((imageUrl, index) => (
            <CldImage
            key={index}
            width={340}
            height={340}
            src={imageUrl}
            alt={`Image ${index + 1}`}
            />
          ))}
        </div>
      )}
      <div className="flex justify-around">
        <div className="flex flex-col p-10">
          <div className="flex space-x-28 items-end">
            <div>
              <div className="flex">
                <h1>{Car?.nomeDoAutomovel}</h1>
                <h1>{Car?.marca}</h1>
              </div>
              <div>
                <h2>{Car?.modelo}</h2>
              </div>
            </div>
            <div className="flex space-x-16">
              <div>Preço na Fipe: {"109,000"}</div>
              <div>Preço do vendedor: {Car?.preco}</div>
            </div>
          </div>
          <div>
            <div>
              <div>Ficha técnica</div>
              <div className="grid grid-cols-3">
                <p>marca</p>
                <p>modela</p>
                <p>ano</p>
                <p>km</p>
                <p>tal</p>
                <p>lal</p>
              </div>
            </div>
          </div>
        </div>
        <Card className="border-none p-0 space-y-2 bg-[EEEEE]">
          <CardTitle className="p-2">Entre em contato!</CardTitle>
          <CardContent className="p-0"><Button>Like</Button></CardContent>
        </Card>
      </div>
      </div>
      <div>
        <DefaultFooter></DefaultFooter>
      </div>
    </div>
  );
}
    
export default BuyCar