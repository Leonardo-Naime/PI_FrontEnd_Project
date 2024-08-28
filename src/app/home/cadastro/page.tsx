"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { redirect, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import registrarUsuario from "@/services/APIs/userRegistration"
import Image from 'next/image'
import { CldImage } from "next-cloudinary"


const Cadastro = () => {
    const router = useRouter();
    const { register, handleSubmit } = useForm();
    
    async function handleSignUp(
        nome: string,
        email: string,
        senha: string,
        confirmarSenha: string,) {
        // console.log(data);
        try{
            const response = await registrarUsuario(nome, email, senha, confirmarSenha)
            console.log(response)
            if(response.status === 200){

              router.push('/home/login')
            }
        } catch (error) {
            console.log(error);
        }
        

    }

    return (
      <div className="min-h-screen bg-[#f3f4f6] flex justify-end">
        <div className="w-full">
          <CldImage
          className="h-full w-full"
            width={1920}
            height={1080}
            alt="carImage"
            src="wzfs0jgf4u5wfckqs6ju"
          />
        {/* <Image
                  className="h-full "
                  src={"https://placehold.co/1920x1080/png"}
                  alt="Workflow"
                  width={1920}
                  height={1080}
                /> */}
        </div>
        <div className="bg-white p-10 rounded-lg shadow-lg w-96 flex items-center">
          <div className="w-full">
            <div className="flex justify-center mb-10">
              <Button className="bg-[#64BCED] text-white w-24 h-12 rounded-lg"></Button>
            </div>
            <h2 className="text-center text-2xl font-bold mb-5">Acesso</h2>
            <form onSubmit={handleSubmit((data) => handleSignUp(
                data.nome, 
                data.email, 
                data.senha, 
                data.confirmarSenha))} className="space-y-4">
              <div>
                <Label className="block mb-2" htmlFor="user">
                  Nome de usuário
                </Label>
                <Input
                  {...register("nome")}
                  id="user"
                  placeholder="Ex: jonasBrothers"
                  name="nome"
                />
              </div>
              <div>
                <Label className="block mb-2" htmlFor="email">
                  E-mail
                </Label>
                <Input
                  {...register("email")}
                  id="email"
                  placeholder="Digite seu e-mail"
                  name="email"
                />
              </div>
              <div>
                <Label className="block mb-2" htmlFor="password">
                  Senha
                </Label>
                <Input
                  {...register("senha")}
                  id="password"
                  placeholder="Digite sua senha"
                  type="password"
                  name="senha"
                />
              </div>
              <div>
                <Label className="block mb-2" htmlFor="passwordconfirm">
                  Confirmar senha
                </Label>
                <Input
                  {...register("confirmarSenha")}
                  id="passwordconfirm"
                  placeholder="Confirme sua senha "
                  type="password"
                  name="confirmarSenha"
                />
              </div>
            
              <div className="justify-center flex">
                <Button className="w-40 bg-[#64BCED]">Entrar</Button>
              </div>
              <div className="text-center">
                <span className="text-sm">Ja tem sua conta? </span>
                <Link
                  className="text-sm text-blue-600 hover:underline"
                  href="/home/login"
                >
                  Entrar
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
}

export default Cadastro