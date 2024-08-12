"use client"

import Header from "@/components/header/header"
import CarouselSize from "@/components/homeCarousel/carousel"
import DefaultFooter from "@/components/footer/footer"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"


const Home = () => {

  return (
    <main className="">
      <div>
        <div>
          <Header></Header>
        </div>
        <div className="bg-[#EEEEEE] flex w-full justify-center h-full pt-4 pb-4">
           <CarouselSize>
            </CarouselSize>
        </div>
        <div>
          <DefaultFooter></DefaultFooter>
        </div>
      </div>
    </main>
  );
}
  
  export default Home

  