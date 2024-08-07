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

const CarouselSize = () => {
  return (

    <div className="w-full border-none p-0">
      <Carousel
        className=" min-w-full px-12 "
      >
        <CarouselContent >
          {Array.from({ length: 9 }).map((_, index) => (
            <CarouselItem key={index} className="basis-1/6">
              <div className="">
                
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default CarouselSize
