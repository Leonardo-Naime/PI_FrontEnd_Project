"use client"

import DefaultFooter from "@/components/footer/footer"
import Header from "@/components/header/header"
import VehicleCard from "@/components/vehicleCard/card";
import allCars from "@/services/APIs/allVehicles";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

type Car = {
  id: string;
  ano: string;
  descricao: string;
  nomeDoAutomovel: string;
  imagemUrl: string;
  marca: string;
  modelo: string;
  preco: string;
  tempoDeUso: string;
  user: any;
};

const Comprar = () => {
    const [cars, setCars] = useState<Car[]>([])
    const router = useRouter();

    useEffect(() => {
        const fetchCars = async () => {
            const useCars = await allCars()
            if (useCars) {
                // @ts-ignore
                setCars(useCars.data.content)
            }
        }
        fetchCars()
    }, []);

    return (
      <div className="bg-[#EEEEEE] flex min-h-screen flex-col">
        <div>
          <Header></Header>
        </div>
        <div className="flex">
          <div className="flex justify-center flex-grow mt-10 mb-10">
            {cars.length > 0 ? (
              <div className="grid grid-cols-3 gap-10">
                {cars.map((car, index) => (
                  <div
                    key={index}
                    >
                    <VehicleCard vehicle={car} buttontitle="Ver mais" />
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <p>Não há veículos no momento, volte mais tarde!</p>
              </div>
            )}
          </div>
        </div>
        <div>
          <DefaultFooter></DefaultFooter>
        </div>
      </div>
    );
}

export default Comprar