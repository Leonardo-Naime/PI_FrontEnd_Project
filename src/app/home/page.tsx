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
        <div className="bg-[#EEEEEE] pt-20 pb-20">
          <div className="mb-5">
            <h2 className="text-center text-3xl text-zinc-500 font-sans font-light">Destaques</h2>
          </div>
          <div className="flex w-full justify-center h-full">
            <CarouselSize>
            </CarouselSize>
          </div>
        </div>
        <div>
          <DefaultFooter></DefaultFooter>
        </div>
      </div>
    </main>
  );
}
  
  export default Home

  