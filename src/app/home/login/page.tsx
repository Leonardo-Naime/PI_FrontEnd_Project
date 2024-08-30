"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation";
import { useContext, useState } from "react"
import { AuthContext } from "@/contexts/authContext"
import Image from 'next/image'
import { CldImage } from "next-cloudinary"
import { Eye, EyeOff } from "lucide-react"


const Login = () => {
    const router = useRouter();
    const { register, handleSubmit } = useForm();
    const { signIn } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false);

    async function handleSignIn(
      email:any,
      password:any){
      console.log(email, password)
      await signIn({email, password})
      router.push('/home') 
    }
    

    return (
      <div className="min-h-screen bg-[#f3f4f6] flex justify-between">
        <div className="w-full">
        <CldImage
          className="h-full w-full"
            width={1920}
            height={1080}
            alt="carImage"
            src="qqm57mcnfpk4fv8dst3k"
          />
          
        </div>
        <div className="bg-white p-10 rounded-lg shadow-lg w-96 flex items-center">
          <div className="w-full">
            <div className="flex justify-center mb-10">
              <Button className="bg-[#64BCED] text-white w-24 h-12 rounded-lg"></Button>
            </div>
            <h2 className="text-center text-2xl font-bold mb-5">Acesso</h2>
            <form
              className="space-y-4"
              onSubmit={handleSubmit((data) =>
                handleSignIn(data.email, data.password)
              )}
            >
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
              <div className="text-right">
                <Link
                  className="text-sm text-blue-600 hover:underline"
                  href="#"
                >
                  Esqueci minha senha
                </Link>
              </div>
              <Button className="w-full bg-[#64BCED]" type="submit">
                Entrar
              </Button>
              <div className="text-center">
                <span className="text-sm">Ainda não tem uma conta? </span>
                <Link
                  className="text-sm text-blue-600 hover:underline"
                  href="/home/cadastro"
                >
                  Crie a sua
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};

export default Login;