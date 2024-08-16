"use client"

import DefaultFooter from "@/components/footer/footer"
import Header from "@/components/header/header"
import VehicleCard from "@/components/vehicleCard/vehicleCard";
import allCars from "@/services/APIs/allVehicles";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

type Car = {
  id: string;
  ano: string;
  descricao: string;
  imageUrl: string[];
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
                    <VehicleCard vehicle={car} />
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
        <Pagination>
  <PaginationContent>
    {currentPageNumber > 0 && (
      <PaginationItem>
        <PaginationPrevious 
          href="#" 
          onClick={() => handlePageChange(currentPageNumber - 1)} 
        />
      </PaginationItem>
    )}
    {Array.from({ length: totalPages }, (_, i) => i).map((pageNumber) => {
      if (pageNumber === currentPageNumber) {
        return (
          <PaginationItem key={pageNumber}>
            <PaginationLink 
              href="#" 
              onClick={() => handlePageChange(pageNumber)} 
              className="text-black border  border-black"
            >
              {pageNumber + 1}
            </PaginationLink>
          </PaginationItem>
        );
      } else if (pageNumber === currentPageNumber - 1) {
        return (
          <PaginationItem key={pageNumber}>
            <PaginationLink 
              href="#" 
              onClick={() => handlePageChange(pageNumber)} 
              className="text-black"
            >
              {pageNumber + 1}
            </PaginationLink>
          </PaginationItem>
        );
      } else if (pageNumber === currentPageNumber + 1) {
        return (
          <PaginationItem key={pageNumber}>
            <PaginationLink 
              href="#" 
              onClick={() => handlePageChange(pageNumber)} 
              className="text-black"
            >
              {pageNumber + 1}
            </PaginationLink>
          </PaginationItem>
        );
      } else if (pageNumber === 0) {
        return (
          <PaginationItem key={pageNumber}>
            <PaginationLink 
              href="#" 
              onClick={() => handlePageChange(pageNumber)} 
              className="text-black"
            >
              1
            </PaginationLink>
            {currentPageNumber > 2 && (
              <span className="mx-2 text-black">...</span>
            )}
          </PaginationItem>
        );
      } else if (pageNumber === totalPages - 1) {
        return (
          <PaginationItem key={pageNumber}>
            {currentPageNumber < totalPages - 3 && (
              <span className="mx-2 text-black">...</span>
            )}
            <PaginationLink 
              href="#" 
              onClick={() => handlePageChange(pageNumber)} 
              className="text-black"
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      } else {
        return null;
      }
    })}
    {currentPageNumber < totalPages - 1 && (
      <PaginationItem>
        <PaginationNext 
          href="#" 
          onClick={() => handlePageChange(currentPageNumber + 1)} 
        />
      </PaginationItem>
    )}
  </PaginationContent>
</Pagination>
</div>
        <div>
          <DefaultFooter></DefaultFooter>
        </div>
      </div>
    );
}

export default Comprar