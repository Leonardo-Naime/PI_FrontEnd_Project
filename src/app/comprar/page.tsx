"use client"

import DefaultFooter from "@/components/footer/footer"
import Header from "@/components/header/header"
import VehicleCard from "@/components/vehicleCard/card";
import allCars from "@/services/APIs/allVehicles";
import { useEffect, useState } from "react"

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

const Comprar = () => {
    const [cars, setCars] = useState<Car[]>([])

    useEffect(() => {
        const fetchCars = async () => {
            const useCars = await allCars()
            if (useCars) {
                setCars(useCars.data)
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
                <div className="w-52">
                    <div className="bg-[#64BCED] h-1"></div>
                    <div className="bg-white h-full"></div>
                </div>
                <div className="flex justify-center flex-grow mt-10 mb-10">
                    {cars.length > 0 ? (
                        <div className="grid grid-cols-5 gap-10">
                            {cars.map((car, index) => (
                                <VehicleCard key={index} vehicle={car} />
                            ))}
                        </div>
                    ):(<div>
                        <p>Não há veículos no momento, volte mais tarde!</p>
                    </div>)}
                </div>
            </div>
            <div>
                <DefaultFooter></DefaultFooter>
            </div>
        </div>
    )
}

export default Comprar