"use client"

import DefaultFooter from "@/components/footer/footer"
import Header from "@/components/header/header"
import VehicleCard from "@/components/vehicleCard/card";
import { AuthContext } from "@/contexts/authContext";
import UserVehicle from "@/services/APIs/userVehicle";
import { useContext, useEffect, useState } from "react";

type Car = {
  id:string,
  ano:string,
  descricao:string,
  nomeDoAutomovel:string,
  imagemUrl:string,
  marca:string,
  modelo:string,
  preco:string,
  tempoDeUso:string,
  user:any
}

const Garage = () => {
    const [cars, setCars] = useState<Car[]>([])
    const [userLoaded, setUserLoaded] = useState(false);
    const { user } = useContext(AuthContext)
    useEffect(() => {
        if (user?.id) {
          setUserLoaded(true);
        }
      }, [user?.id]);
      
      useEffect(() => {
        if (userLoaded) {
          const fetchCar = async () => {
            const userCars = await UserVehicle(user?.id) as Car[];
            setCars(userCars);
            console.log(userCars)
          };
          fetchCar();
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [userLoaded]);

return (
  <div className="bg-[#EEEEEE] flex min-h-screen flex-col">
    <div>
      <Header></Header>
    </div>
    <div className="flex justify-center items-center flex-grow mt-10 mb-10">
      {cars.length > 0 ? (
        <div className="grid grid-cols-3 gap-10">
          {cars.map((car, index) => (
            <VehicleCard key={index} vehicle={car} buttontitle={"Editar"}/>
          ))}
        </div>
      ) : (
        <div className="">
          <p>voce não possui carros anunciados</p>
        </div>
      )}
    </div>
    <div>
      <DefaultFooter></DefaultFooter>
    </div>
  </div>
);
}

export default Garage