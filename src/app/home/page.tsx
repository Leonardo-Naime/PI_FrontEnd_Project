"use client"

import Header from "@/components/header/header"
import CarouselSize from "@/components/homeCarousel/carousel"
import DefaultFooter from "@/components/footer/footer"


const Home = () => {

  return (
    <main className="">
      <div>
        <div>
          <Header></Header>
        </div>
        <div className="bg-[#EEEEEE] flex flex-col justify-center items-center h-60">
          <CarouselSize></CarouselSize>
        </div>
        <div>
          <DefaultFooter></DefaultFooter>
        </div>
      </div>
    </main>
  );
}
  
  export default Home

  