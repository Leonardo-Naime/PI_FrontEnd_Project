'use client'

import * as React from "react";
import DefaultFooter from "@/components/footer/footer"
import Header from "@/components/header/header"
import VehicleReq from "@/services/APIs/vehicle"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useContext, useEffect, useState } from "react"
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
import { Flame } from "lucide-react";
import { AuthContext } from "@/contexts/authContext";
import UserVehicle from "@/services/APIs/userVehicle";
import LikeVehicles from "@/services/APIs/likeVehicles";
import UnlikeVehicles from "@/services/APIs/unlikeVehicles";
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
  const {user} = useContext(AuthContext)
  const url = usePathname().split('/')
  const id = url[url.length-2]
  const [Car, setCar] = useState<Car>()
  const [isFavorited, setIsFavorited] = useState(false);
  
  const handleClick = async () => {
    setIsFavorited(!isFavorited);
    if(!isFavorited){
      console.log("idcarro:",id,"userid:",user?.id)
      const likes = await UnlikeVehicles(id,user?.id)
    } else await LikeVehicles(id,user?.id)
  };

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
      {user?.id === Car?.user.id ?(
        <Button
        onClick={handleClick}
        className={`transition-transform transform ${isFavorited ? 'bg-orange-500' : 'bg-red-500'} 
        text-white px-4 py-2 rounded-full 
        ${isFavorited ? 'animate-out hover:scale-105 hover:bg-orange-600' : 'animate-in hover:scale-105 hover:bg-red-700'}`}
        >
        {isFavorited ? (
          <>
            <Flame className=""/> {"Fodase"}
          </>
        ):('Desfavoritar')}
      </Button>
      ):(
        <Button
        onClick={handleClick}
        className={`transition-transform transform ${isFavorited ? 'bg-orange-500' : 'bg-red-500'} 
        text-white px-4 py-2 rounded-full 
        ${isFavorited ? 'animate-out hover:scale-105 hover:bg-orange-600' : 'animate-in hover:scale-105 hover:bg-red-700'}`}
        >
        {isFavorited ? (
          <>
            <Flame className=""/> {"Favoritar"}
          </>
        ):('Desfavoritar')}
      </Button>
      )}
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