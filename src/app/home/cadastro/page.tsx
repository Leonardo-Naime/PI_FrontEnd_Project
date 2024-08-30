"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import registrarUsuario from "@/services/APIs/userRegistration"
import Image from 'next/image'
import { CldImage } from "next-cloudinary"
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"

const Cadastro = () => {
    const router = useRouter();
    const { register, handleSubmit } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    
    async function handleSignUp(
        nome: string,
        email: string,
        password: string,
        passwordConfirm: string,) {
        // console.log(data);
        try{
            const response = await registrarUsuario(nome, email, password, passwordConfirm)
            console.log(response)
            router.push('/home/login')
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
            <form
              onSubmit={handleSubmit((data) =>
                handleSignUp(
                  data.nome,
                  data.email,
                  data.password,
                  data.passwordConfirm
                )
              )}
              className="space-y-4"
            >
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
              <div className="relative">
                <Label className="block mb-2" htmlFor="password">
                  Senha
                </Label>
                <Input
                  {...register("password")}
                  id="password"
                  placeholder="Digite sua senha"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="pr-10" // Espaço extra para o botão
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-8"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5"/>
                  ):(
                    <Eye className="w-5 h-5"/>
                  )}
                </button>
              </div>
              <div>
                <Label className="block mb-2" htmlFor="passwordconfirm">
                  Confirmar senha
                </Label>
                <Input
                  {...register("passwordConfirm")}
                  id="passwordconfirm"
                  placeholder="Confirme sua senha "
                  type={showPassword ? "text" : "password"}
                  name="passwordConfirm"
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