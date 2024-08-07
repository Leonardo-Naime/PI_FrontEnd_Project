"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthContext } from "@/contexts/authContext"
import registrarVeiculo from "@/services/APIs/vehicleAuthentication"
import Link from "next/link"
import { useContext } from "react"
import { useForm } from "react-hook-form"
import { CldUploadWidget } from 'next-cloudinary';
import VehicleForm from "@/components/imageButton/widgetbutton"

type vehicleData = {
    nome:string,
    modelo:string,
    marca:string,
    ano:string,
    tempo:string,
    preco:string,
    descricao:string,
    imagem:string,
    user:any
}

const handleImageUpload = (error:any, result:any) => {
  if(error){
    console.error('Upload error', error)
    return;
  }
  console.log('Uploaded image:', result)
}

const CadastroVeiculo = () => {
    const ctxfunc = useContext(AuthContext)
    const user = ctxfunc.user
    const { register, handleSubmit } = useForm<vehicleData>();

    const handleVehicle = async (data:vehicleData) => {
        const x = await registrarVeiculo(data.ano, data.descricao,data.nome, data.imagem, data.marca,data.modelo,data.preco,data.tempo,user);
    }

    return (
      <div className=" flex flex-col justify-center items-center w-full 2xl:h-screen">
        <div className="flex flex-col items-center space-y-4">
          <Button className="bg-[#64BCED] text-white w-24 h-12 rounded-lg"></Button>
          <p className="">Anunciar Veículo</p>
        </div>
        <form
          onSubmit={handleSubmit(handleVehicle)}
          className="flex flex-col justify-center items-center space-y-4 mt-6"
        >
          <div>
            <div>
              <Label className="block mb-2" htmlFor="nome">
                NomeDoVeículo
              </Label>
              <Input
                className="bg-[#EEEEEE]"
                {...register("nome")}
                id="nome"
                placeholder="Ex:Gol"
                name="nome"
              ></Input>
            </div>
          </div>
          <div>
            <div>
              <Label className="block mb-2" htmlFor="modelo">
                Modelo
              </Label>
              <Input
                className="bg-[#EEEEEE]"
                {...register("modelo")}
                id="modelo"
                placeholder="Ex:G5"
                name="modelo"
              ></Input>
            </div>
          </div>
          <div>
            <div>
              <Label className="block mb-2" htmlFor="marca">
                Marca
              </Label>
              <Input
                className="bg-[#EEEEEE]"
                {...register("marca")}
                id="marca"
                placeholder="Ex:Volkswagen"
                name="marca"
              ></Input>
            </div>
          </div>
          <div>
            <div>
              <Label className="block mb-2" htmlFor="ano">
                Ano
              </Label>
              <Input
                className="bg-[#EEEEEE]"
                {...register("ano")}
                id="ano"
                placeholder="Ex:1989"
                name="ano"
              ></Input>
            </div>
          </div>
          <div>
            <div>
              <Label className="block mb-2" htmlFor="tempo">
                TempoDeUso
              </Label>
              <Input
                className="bg-[#EEEEEE]"
                {...register("tempo")}
                id="tempo"
                placeholder="Ex:6 anos"
                name="tempo"
              ></Input>
            </div>
          </div>
          <div>
            <div>
              <Label className="block mb-2" htmlFor="preco">
                Preço
              </Label>
              <Input
                className="bg-[#EEEEEE]"
                {...register("preco")}
                id="preco"
                placeholder="Ex:R$ 5.800"
                name="preco"
              ></Input>
            </div>
          </div>
          <div className="pb-4">
            <div>
              <Label className="block mb-2" htmlFor="descricao">
                Descrição
              </Label>
              <Input
                className="bg-[#EEEEEE]"
                {...register("descricao")}
                id="descricao"
                placeholder="Ex:Um carro moderno completo, 2.0 compacto, sem: porta, sinto, banco"
                name="descricao"
              ></Input>
            </div>
          </div>
          <div className="pb-4">
            <div>
              <Label className="block mb-2" htmlFor="imagem">
                Imagem
              </Label>
              <Input
                className="bg-[#EEEEEE]"
                {...register("imagem")}
                id="imagem"
                placeholder="Foto"
                name="imagem"
              ></Input>
            </div>
          </div>
          <VehicleForm/>
          <Button className="bg-[#64BCED]" type="submit">
            Confirmar
          </Button>
        </form>
      </div>
    );
};

export default CadastroVeiculo