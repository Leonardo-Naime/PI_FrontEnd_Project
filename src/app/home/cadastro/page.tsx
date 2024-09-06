"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import registrarUsuario from "@/services/APIs/userRegistration";
import Image from "next/image";
import { CldImage } from "next-cloudinary";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
// key={index}
//                          value={brands.nome}
//                          onSelect={(currentValue) => {
//                           if (currentValue === "") {
//                             setBrandValue("");
//                             setValue('marca', "");
//                           } else {
//                             setBrandValue(currentValue);
//                             setValue('marca', currentValue)
//                           }
//                            setDataLoaded(false)
//                            setBrandName(currentValue);
//                            setOpenBrand(false);
//                          }}
const Cadastro = () => {
    const router = useRouter();
    const { register, handleSubmit, watch, formState: { errors }} = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [nomeFocused, setNomeFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [erro, setErro] = useState('');

    const handleNomeFocus = () => {
      setNomeFocused(true);
    };
  
    const handleNomeBlur = () => {
      setNomeFocused(false);
    };
  
    const handlePasswordFocus = () => {
      setPasswordFocused(true);
    };
  
    const handlePasswordBlur = () => {
      setPasswordFocused(false);
    };

    const nome = watch("nome");
    const email = watch("email");
    const password = watch("password");
    const passwordConfirm = watch("passwordConfirm");
    
    const isNomeValid = (nome) => nome.length >= 5 && nome.length <= 15 && /[A-Z]/.test(nome) && /[a-z]/.test(nome);
    const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid = (password) => {
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumber = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*()_+=[\]{};':"\\|,.<>?]/.test(password);
      const hasMinLength = password.length >= 8;

      return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && hasMinLength;
    };
    const isConfirmPasswordValid = (passwordConfirm) => passwordConfirm === password;
    
    async function handleSignUp(
        nome: string,
        email: string,
        password: string,
        passwordConfirm: string,) {
          if (!isNomeValid(nome)) {
            setErro('Nome inválido');
            return;
          }
          if (!isEmailValid(email)) {
            setErro('E-mail inválido');
            return;
          }
          if (!isPasswordValid(password)) {
            setErro('Senha inválida');
            return;
          }
          if (!isConfirmPasswordValid(passwordConfirm)) {
            setErro('Senha diferente da original');
            return;
          }
        console.log('Dados da requisição:', nome, email, password, passwordConfirm);
        try{
            const response = await registrarUsuario(nome, email, password, passwordConfirm)
            console.log(response)
            router.push('/home/login')
        } catch (error) {
            console.log("a");
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
                  onFocus={handleNomeFocus}
                  onBlur={handleNomeBlur}
                />
                {nomeFocused && (
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
                />
                {email && !isEmailValid(email) && (
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
                  onFocus={handlePasswordFocus}
                  onBlur={handlePasswordBlur}
                  className="pr-10" // Espaço extra para o botão
                />
                {passwordFocused && (
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
                <Label className="block mb-2" htmlFor="passwordConfirm">
                  Confirmar senha
                </Label>
                <Input
                {...register("passwordConfirm", {
                  validate: (value) => value === password,
                })}
                id="passwordConfirm"
                placeholder="Confirme sua senha "
                type={showPassword ? "text" : "password"}
                name="passwordConfirm"
              />
              {passwordConfirm && !isConfirmPasswordValid(passwordConfirm) && (
                  <p className="text-red-500 text-sm">As senhas não coincidem</p>
                )}
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
};

export default Cadastro;
              <div className="justify-center flex">
                <Button className="w-full bg-[#64BCED]">
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
                  {erro && (
                    <div className="text-red-500 text-center">{erro}</div>
                  )}
            </form>
          </div>
        </div>
      </div>
    );
}
