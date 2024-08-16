import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import VehicleCard from "../vehicleCard/vehicleCard"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import allCars from "@/services/APIs/allVehicles";
import { useEffect, useState } from "react"

const CarouselSize = () => {
  const [cars, setCars] = useState([])

  useEffect(() => {
    const fetchCars = async () => {
      const useCars = await allCars(0)
      if (useCars) {
        // @ts-ignore
        setCars(useCars.data.content.slice(0, 10))
      }
    }
    fetchCars()
  }, []);

return (
    <Carousel className="w-3/4">
      <CarouselContent className="-ml-10 ">
        {Array.from({ length: 10}).map((_, index) => (
          <CarouselItem key={index} className="basis-1/3 pl-10">
            {cars.slice(index * 1, (index + 1)).map((car, carIndex) => (
              <VehicleCard key={carIndex} vehicle={car} />
            ))}
          </CarouselItem>
        ))}
      </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
    </Carousel>
);

};

export default CarouselSize
