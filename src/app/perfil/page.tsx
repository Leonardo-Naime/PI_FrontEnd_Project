"use client"

import DefaultFooter from "@/components/footer/footer"
import { useEffect, useState } from 'react';
import { CldImage, CldUploadWidget } from 'next-cloudinary'; // Certifique-se de que o CldUploadWidget está importado corretamente
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AuthContext } from "@/contexts/authContext"
import { useContext } from "react"
import { User } from "lucide-react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import ProfileChange from "@/services/APIs/profileChange";
import Header from "@/components/header/header";


const Perfil = () => {
  const [imagePublicId, setPublicId] = useState<string>('');
  const {user, refreshUserData} = useContext(AuthContext)
  const {register, handleSubmit} = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = async (data:any) => {
    const fulldata = {
      nome: data?.nome,
      email: data?.email,
      senha: data?.senha,
      confirmarSenha: data?.confirmarSenha,
      fotoDePerfil: imagePublicId
    };
    console.log(fulldata.fotoDePerfil)
    await ProfileChange(user, fulldata)
    refreshUserData()
  }

  return (
    <main className="">
      <div className="">
        <Header/>
        <div className="bg-slate-200 w-full h-48 z-0 relative mb-16">
          <CldUploadWidget 
          uploadPreset="ml_default">
            {({ open, results }) => {
              if (results?.event === "success" && !isSubmitting) {
                // console.log("Uploaded image:", results.info);
                setPublicId(results?.info?.public_id)
                handleChange('')
                // console.log("Public ID:", results?.info?.public_id);
              }
              return (
                <Button
                  className="z-10 bg-[#64BCED] rounded-full w-32 h-32 absolute inset-x-0 bottom-0 transform translate-y-1/2 translate-x-10 border-none p-0"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    open();
                  }}
                >
                  {user?.fotoDePerfil ? (
                    <CldImage
                      className="w-full h-full rounded-full border-none"
                      width={400}
                      height={400}
                      src={user.fotoDePerfil}
                      alt="FotoDePerfil"
                    />
                  ) : (
                    <User className="w-16 h-16 "></User>
                  )}
                </Button>
              );
            }}
          </CldUploadWidget>
        </div>
        <form onSubmit={handleSubmit((data) => handleChange(data))}>
          <div className="flex justify-center w-full">
            <Card className="w-[540px] mb-8">
              <CardContent>
                <CardTitle className="mb-6 mt-3">Editar informações</CardTitle>
                <div className="space-y-4">
                  <div className="">
                    <Label className="block mb-2" id="nome" htmlFor="nome">NomeDeUsuário</Label>
                    <Input defaultValue={user?.nome} 
                    {...register("nome")}
                    name="nome"
                    id="nome"
                    ></Input>
                  </div>
                  <div className="">
                    <Label className="block mb-2" id="email" htmlFor="email">Email</Label>
                    <Input defaultValue={user?.email} 
                    {...register("email")}
                    name="email"
                    id="email"
                    ></Input>
                  </div>
                  <div className="">
                    <Label className="block mb-2" id="senha" htmlFor="senha">NovaSenha</Label>
                    <Input
                    {...register("senha")}
                    name="senha"
                    id="senha"
                    ></Input>
                  </div>
                  <div className="">
                    <Label className="block mb-2" id="confirmarSenha" htmlFor="confirmarSenha">ConfirmarSenha</Label>
                    <Input
                    {...register("confirmarSenha")}
                    name="confirmarSenha"
                    id="confirmarSenha"
                    ></Input>
                  </div>
                  <div className="flex justify-end">
                    <Button className="bg-[#64BCED] hover:bg-[#64BCED]">Finalizar</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
        <div>
          <DefaultFooter></DefaultFooter>
        </div>
      </div>
    </main>
  );
}
  
export default Perfil

  