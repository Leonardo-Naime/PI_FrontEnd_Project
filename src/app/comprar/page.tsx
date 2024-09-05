"use client";

import DefaultFooter from "@/components/footer/footer";
import Header from "@/components/header/header";
import VehicleCard from "@/components/vehicleCard/vehicleCard";
import allCars from "@/services/APIs/allVehicles";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { AuthContext } from "@/contexts/authContext";
import { Input } from "@/components/ui/input";
import { ArrowDown, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import SearchBar from "@/services/APIs/search";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import OpenedFilter from "@/components/filter/filter";

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
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState<Car[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPageNumber, setCurrentPageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [searchedCars, setSearchedCars] = useState<Car[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { register, handleSubmit } = useForm();

  const handleFilter = (yearMinMax: any) => {
    console.log(yearMinMax);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearch = async (searchData: any) => {
    const searchQuery = searchData.search;
    setSearchTerm(searchQuery);
    const response = await SearchBar(searchQuery, pageNumber);

    if (response && response.data) {
      setSearchedCars(response.data.content);
      setTotalPages(response.data.totalPages);
    }
  };

  useEffect(() => {
    const fetchCars = async () => {
      const useCars = await allCars(pageNumber);
      if (useCars) {
        setCars(useCars.data.content);
        setTotalPages(useCars.data.totalPages);
      }
    };
    fetchCars();
  }, [pageNumber]);

  const handlePageChange = (pageNumber: number) => {
    setPageNumber(pageNumber);
    setCurrentPageNumber(pageNumber);
  };

  return (
    <div className="bg-[#EEEEEE] flex min-h-screen flex-col w-full">
      <div>
        <Header></Header>
      </div>
      <div className="relative mt-10 justify-center">
        <div className="items-center flex justify-content:space-between">
          <div className="relative">
            <Button
              onClick={toggleDropdown}
              className="bg-[#64BCED] hover:bg-[#4baee4] mb-2 rounded-none"
            >
              <Filter />
              Filtrar
            </Button>
            {isDropdownOpen && <OpenedFilter onFilter={handleFilter} />}
          </div>
          <form
            className="flex w-80 top-0 left-24 self-start absolute"
            onSubmit={handleSubmit(handleSearch)}
          >
            <Input
              placeholder="pesquisar..."
              className="rounded-none"
              id="search"
              {...register("search")}
            ></Input>
            <Button className="rounded-none bg-[#64BCED] hover:bg-[#4baee4]">
              <Search />
            </Button>
          </form>
        </div>
      </div>
      <div className="flex p-6">
        <div className="flex justify-center flex-grow mt-10 mb-10">
          {searchTerm && searchedCars.length > 0 ? (
            <div className="grid grid-cols-4 gap-10">
              {searchedCars.map((car, index) => (
                <div key={index}>
                  <VehicleCard vehicle={car} />
                </div>
              ))}
            </div>
          ) : cars.length > 0 ? (
            <div className="grid grid-cols-4 gap-10">
              {cars.map((car, index) => (
                <div key={index}>
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
            {Array.from({ length: totalPages }, (_, i) => i).map(
              (pageNumber) => {
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
              }
            )}
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
};

export default Comprar;
