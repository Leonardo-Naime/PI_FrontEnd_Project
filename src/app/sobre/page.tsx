"use client"

import Header from "@/components/header/header"
import DefaultFooter from "@/components/footer/footer"


const Sobre = () => {

  return (
    <main className="">
          <Header></Header>
        <div className="bg-[#EEEEEE] py-12">
        <div className="bg-[#EEEEEE] container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4 ">Sobre o Projeto</h1>
          <p className="text-lg mb-8">
            Este projeto é um trabalho desenvolvido para a matéria de Projeto Integrador da Universidade Tecnológica Federal do Paraná (UTFPR) - Campus Campo Mourão. O objetivo do projeto é desenvolver uma solução inovadora que integre conhecimentos de diferentes áreas, como tecnologia, design e negócios.
          </p>
          <div className="flex flex-wrap justify-center mb-8">
            <div className="w-full md:w-1/2 xl:w-1/3 py-4 pr-4">
              <h2 className="text-2xl font-bold mb-2">Objetivos</h2>
              <p className="text-lg">
                O objetivo principal do projeto é desenvolver uma solução que atenda às necessidades de um problema real, utilizando tecnologias emergentes e inovadoras. Além disso, o projeto visa promover a integração entre os membros da equipe e desenvolver habilidades importantes, como trabalho em equipe, comunicação e resolução de problemas.
              </p>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-4">
              <h2 className="text-2xl font-bold mb-2">Metodologia</h2>
              <p className="text-lg">
                A metodologia utilizada no projeto é baseada em uma abordagem ágil, com sprints regulares e reuniões de feedback. Além disso, a equipe utiliza ferramentas de colaboração online para gerenciar o projeto e compartilhar informações.
              </p>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-4">
              <h2 className="text-2xl font-bold mb-2">Resultados Esperados</h2>
              <p className="text-lg">
                Os resultados esperados do projeto incluem a desenvolvimento de uma solução inovadora e eficaz, que atenda às necessidades do problema proposto. Além disso, a equipe espera desenvolver habilidades importantes e promover a integração entre os membros.
              </p>
            </div>
          </div>
          </div>
        </div>
          <DefaultFooter></DefaultFooter>
    </main>
  );
}
  
  export default Sobre