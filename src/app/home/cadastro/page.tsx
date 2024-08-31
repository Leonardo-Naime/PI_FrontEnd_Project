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
    const { register, handleSubmit, formState: { errors }} = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [nome, setNome] = useState('');
    const [nomeTouched, setNomeTouched] = useState(false);
    const [email, setEmail] = useState('');
    const [emailTouched, setEmailTouched] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

    const handleNomeChange = (event) => {
      setNome(event.target.value);
    };
    const handleNomeFocus = () => {
      setNomeTouched(true);
    };
    const handleNomeBlur = () => {
      setNomeTouched(false);
    };

    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
    const handlePasswordFocus = () => {
      setPasswordTouched(true);
    };
    const handlePasswordBlur = () => {
      setPasswordTouched(false);
    };
    
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
    const handleEmailBlur = () => {
      setEmailTouched(true);
    };
    
    const handleConfirmPasswordBlur = () => {
      setConfirmPasswordTouched(true);
    };
    const handleConfirmPasswordChange = (event) => {
      setConfirmPassword(event.target.value);
    };
    
    async function handleSignUp(
        nome: any,
        email: any,
        password: any,
        passwordConfirm: any,) {
        console.log('Dados da requisição:', nome, email, password, passwordConfirm);
        try{
            const response = await registrarUsuario(nome, email, password, passwordConfirm)
            console.log(response)
            router.push('/home/login')
        } catch (error) {
            console.log(error);
        }
    }

    const isEmailValid = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isNomeValid = (nome: string | any[]) => nome.length >= 5 && nome.length <= 15 && /[A-Z]/.test(nome) && /[a-z]/.test(nome);

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
                  onChange={handleNomeChange}
                  onFocus={handleNomeFocus}
                  onBlur={handleNomeBlur}
                />
                {nomeTouched && (
                  <ul className="text-sm">
                    <li
                      className={
                        nome.length >= 5 && nome.length <= 15 ? "text-green-500" : "text-black"
                      }
                    >
                      • Entre 5 e 15 caracteres
                    </li>
                    <li
                      className={
                        /[A-Z]/.test(nome) ? "text-green-500" : "text-black"
                      }
                    >
                      • Uma letra maiúscula
                    </li>
                    <li
                      className={
                        /[a-z]/.test(nome) ? "text-green-500" : "text-black"
                      }
                    >
                      • Uma letra minúscula
                    </li>
                  </ul>
                )}
              </div>
              <div>
                <Label className="block mb-2" htmlFor="email">
                  E-mail
                </Label>
                <Input
                  {...register("email", {
                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  })}
                  id="email"
                  placeholder="Digite seu e-mail"
                  name="email"
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                />
                {emailTouched && !isEmailValid(email) && (
                <p className="text-red-500 text-sm">E-mail inválido</p>
              )}
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
                  onChange={handlePasswordChange}
                  onFocus={handlePasswordFocus}
                  onBlur={handlePasswordBlur}
                  
                />
                {passwordTouched && (
                  <ul className="text-sm">
                  <li
                    className={
                      password.length >= 8 ? "text-green-500" : "text-black"
                    }
                    >
                    • Pelo menos 8 caracteres
                  </li>
                  <li
                    className={
                      /[A-Z]/.test(password) ? "text-green-500" : "text-black"
                    }
                    >
                    • Uma letra maiúscula
                  </li>
                  <li
                    className={
                      /[a-z]/.test(password) ? "text-green-500" : "text-black"
                    }
                    >
                    • Uma letra minúscula
                  </li>
                  <li
                    className={
                      /\d/.test(password) ? "text-green-500" : "text-black"
                    }
                    >
                    • Um número
                  </li>
                  <li
                    className={
                      /[@$!%*?&]/.test(password) ? "text-green-500" : "text-black"
                    }
                    >
                    • Um caractere especial
                  </li>
                </ul>
              )}
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
                {...register("passwordConfirm", {
                  validate: (value) => value === password,
                })}
                onChange={handleConfirmPasswordChange}
                onBlur={handleConfirmPasswordBlur}
                id="passwordconfirm"
                placeholder="Confirme sua senha "
                type={showPassword ? "text" : "password"}
                name="passwordConfirm"
              />
              {confirmPasswordTouched && confirmPassword !== password && (
                <p className="text-red-500 text-sm">As senhas não coincidem</p>
              )}
              </div>

              <div className="justify-center flex">
                <Button className="w-full bg-[#64BCED]" type="submit">
                  Registrar
                </Button>
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