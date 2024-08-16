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
import { Calendar, Flame, Gauge, Heart, HeartOff, MessageSquare, Speech, Trash2, User } from "lucide-react";
import { AuthContext } from "@/contexts/authContext";
import UserVehicle from "@/services/APIs/userVehicle";
import LikeVehicles from "@/services/APIs/likeVehicles";
import UnlikeVehicles from "@/services/APIs/unlikeVehicles";
import { CldImage } from "next-cloudinary";
import DeleteVehicle from "@/services/APIs/deleteVehicle";
import UserMensage from "@/services/APIs/userMensage";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Form, useForm } from "react-hook-form";


type Car = {
    ano:string,
    descricao:string,
    imageUrl:string[],
    marca:string,
    modelo:string,
    preco:string,
    tempoDeUso:string,
    user:any
}

// const image = [
//   "Screenshot_4_ststqg",
//   "image_k3yhem",
//   "WIN_20240322_16_43_21_Pro_qciirc",
//   "13c6a83cc59ce0b09cbb1057fc116e40_vbcpfc",
//   "perritos-amigos_fj2fdd"
// ]

// const carro = {
//   ano: 1900,
//   descricao: "descricao foda",
//   nomeDoAutomovel: "BOmbacha Car",
//   marca:"marca",
//   modelo:"modelo",
//   preco:1900,
//   tempo: "2000 km",
// }

const BuyCar = () => {
  const router = useRouter();
  const {user} = useContext(AuthContext)
  const url = usePathname().split('/')
  const id = url[url.length-2]
  const [Car, setCar] = useState<Car>()
  const [isFavorited, setIsFavorited] = useState(true);
  const [showChatButton, setShowChatButton] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  
  const handleClick = async () => {
    if (user?.id === Car?.user.id) {
      handleDelete();
    } else {
    setIsFavorited(!isFavorited);
    setShowChatButton(isFavorited);
    if(!isFavorited){
      console.log("idcarro:",id,"userid:",user?.id)
      const likes = await UnlikeVehicles(id,user?.id)
    } else await LikeVehicles(id,user?.id)
  }
  };

  const handleSendMessage = () => {
    setMensagem(textareaValue);
    handleMensage(mensagem)
  };
  
  const handleTextareaChange = (event:any) => {
    setTextareaValue(event.target.value);
  };

  const handleMensage = async(mensagem:any) => {
    if(mensagem && user?.id){
      const response = UserMensage(mensagem, user.id, "bomba")
      console.log(response)
    }

  //   if(user)
  //   UserMensage(mensage, user?.id, "bomba")
  }

  const handleDelete = async () => {

    try {
      await DeleteVehicle(id);
      console.log("Vehicle deleted successfully!");
      router.push("/comprar");
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }

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
      <div>
        {Car?.imageUrl && (
          <div className="flex w-full h-screen">
            <div className="w-1/2 h-full relative">
              <CldImage fill={true} src={Car?.imageUrl[0]} alt="Image 1" />
            </div>
            <div className="w-1/2 h-full flex flex-wrap justify-center">
              {Car?.imageUrl.slice(1).map((imageUrl, index) => (
                <div key={index} className="w-1/2 h-1/2 p-2 relative">
                  <CldImage
                    fill={true}
                    src={imageUrl}
                    alt={`Image ${index + 2}`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex justify-around py-10">
          <div className="flex w-3/5 flex-col p-10">
            <div className="flex space-x-28 items-end pl-10 pb-10">
              <div>
                <div>
                  <h1>
                    {Car?.marca}{" "}
                    <span className="font-bold">{Car?.modelo.split(' ')[0]}</span>
                  </h1>
                </div>
                <div>
                  <h2 className="font-semibold text-gray-600">{Car?.modelo}</h2>
                </div>
              </div>
              <div className="flex space-x-28 items-end">
                <div className="text-gray-600">valor FIPE R$ {"109,000"}</div>
                <div className="font-semibold text-gray-600">
                  por R${" "}
                  <span className="text-red-600 text-3xl">{Car?.preco}</span>
                </div>
              </div>
            </div>
            <div className="py-5">
              <div className="pl-10">
                <div className="pb-5 font-semibold text-xl">FICHA TÉCNICA</div>
                <div className="grid grid-cols-3 gap-10">
                  <div className="flex flex-row">
                    <Calendar
                      className="w-5 h-5 rounded-full bg-transparent"
                      color="gray"
                    ></Calendar>
                    <p className="pl-1 text-gray-600">{Car?.ano}</p>
                  </div>
                  <div className="flex flex-row">
                    <Gauge
                      className="w-5 h-5 rounded-full bg-transparent"
                      color="gray"
                    ></Gauge>
                    <p className="pl-1 text-gray-600">{Car?.tempoDeUso}Km</p>
                  </div>
                  <div className="flex flex-row">
                    <Speech
                      className="w-5 h-5 rounded-full bg-transparent"
                      color="gray"
                    ></Speech>
                    <p className="pl-1 text-gray-600">{Car?.descricao}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div></div>
          <Card className="border-solid rounded-lg border-4 border-gray-300  space-y-20  bg-[EEEEE]">
            <CardTitle className="p-5 flex justify-center">
              Entre em contato!
            </CardTitle>
            <CardContent className="grid gap-4">
              <div className="flex justify-center">
                {(user?.id === Car?.user.id )|| (user?.admState)? (
                  <Button
                    onClick={handleClick}
                    className={`transition-transform transform bg-red-500 text-white px-4 py-2 rounded-full animate-out hover:scale-105 hover:bg-red-900`}
                  >
                    <Trash2 className="" style={{ marginRight: 4 }} />{" "}
                    {"Excluir anúncio"}
                  </Button>
                ) : (
                  <div>
                    {isFavorited ? (
                      <Button
                        onClick={handleClick}
                        className={`transition-transform transform bg-blue-500 text-white px-4 py-2 rounded-full animate-out hover:scale-105 hover:bg-blue-600`}
                      >
                        <Heart className="" style={{ marginRight: 4 }} />{" "}
                        {"Favoritar"}
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          onClick={handleClick}
                          className={`transition-transform transform bg-red-500 text-white px-4 py-2 rounded-full animate-in hover:scale-105 hover:bg-red-700`}
                        >
                          <HeartOff style={{ marginRight: 4 }} />{" "}
                          {"Desfavoritar"}
                        </Button>
                        {showChatButton && (
                          <Popover>
                          <PopoverTrigger>
                            <MessageSquare
                              className=""
                              style={{ marginRight: 4 }}
                            />{" "}
                            {"Chat"}
                          </PopoverTrigger>
                          <PopoverContent>
                            <Textarea placeholder="Envie sua proposta para o vendedor" 
                              id="mensagem"
                              value={textareaValue}
                              onChange={handleTextareaChange}
                            />
                            <Button type="button" onClick={handleSendMessage}>Send message</Button>
                          </PopoverContent>
                        </Popover>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
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