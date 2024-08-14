'use client'

import * as React from "react";
import DefaultFooter from "@/components/footer/footer"
import Header from "@/components/header/header"
import VehicleReq from "@/services/APIs/vehicle"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useContext, useEffect, useState } from "react"
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
import { Flame } from "lucide-react";
import { AuthContext } from "@/contexts/authContext";
import UserVehicle from "@/services/APIs/userVehicle";
import LikeVehicles from "@/services/APIs/likeVehicles";
import UnlikeVehicles from "@/services/APIs/unlikeVehicles";

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
        <DefaultFooter></DefaultFooter>
      </div>
    </div>
  );
}
    
export default BuyCar