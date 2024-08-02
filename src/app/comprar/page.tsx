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
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPageNumber, setCurrentPageNumber] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const fetchCars = async () => {
            const useCars = await allCars(pageNumber)
            if (useCars) {
                // @ts-ignore
                setCars(useCars.data.content)
                // @ts-ignore
                setTotalPages(useCars.data.totalPages)
            }
        }
        fetchCars()
    }, [pageNumber]);

    const handlePageChange = (pageNumber: number) => {
      setPageNumber(pageNumber)
      setCurrentPageNumber(pageNumber)
    }

    return (
      <div className="bg-[#EEEEEE] flex min-h-screen flex-col">
        <div>
          <Header></Header>
        </div>
        <div className="flex">
          <div className="flex justify-center flex-grow mt-10 mb-10">
            {cars.length > 0 ? (
              <div className="grid grid-cols-4 gap-10">
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
        <div className="flex justify-center mb-10"> 
            {Array.from({ length: totalPages }, (_, i) => i).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`mx-2 ${pageNumber === currentPageNumber ? ' text-black' : ' text-gray-500'}`}
            >
            {pageNumber + 1}
            </button>
            ))}
        </div>
        <div>
          <DefaultFooter></DefaultFooter>
        </div>
      </div>
    );
}

export default Comprar