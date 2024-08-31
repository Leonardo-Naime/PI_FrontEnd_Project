"use client";

import DefaultFooter from "@/components/footer/footer";
import { useEffect, useState } from "react";
import { CldImage, CldUploadWidget } from "next-cloudinary"; // Certifique-se de que o CldUploadWidget está importado corretamente
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/contexts/authContext";
import { useContext } from "react";
import { Eye, EyeOff, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import ProfileChange from "@/services/APIs/profileChange";
import Header from "@/components/header/header";
import { useRouter } from "next/navigation";

const Perfil = () => {
  const [imagePublicId, setPublicId] = useState<string>("");
  const { user, refreshUserData } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = async (data: any) => {
    const fulldata = {
      nome: data?.nome,
      email: data?.email,
      senha: data?.password,
      confirmarSenha: data?.confirmPassword,
      fotoDePerfil: imagePublicId,
    };
    console.log(fulldata);
    await ProfileChange(user, fulldata);
    refreshUserData();
  };

  useEffect(() => {
    const fulldata = {
      fotoDePerfil: imagePublicId,
    };
    console.log(fulldata);
    const x = async () => await ProfileChange(user, fulldata);
    x();
    refreshUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagePublicId]);

  return (
    <main className="">
      <div className="">
        <Header />
        <div className="bg-slate-200 w-full h-48 z-0 relative mb-16">
          <CldUploadWidget
            uploadPreset="ml_default"
            onUpload={(results) => {
              if (results?.event === "success") {
                setPublicId(results?.info?.public_id);
                // handleChange("");
                // console.log("Public ID:", results?.info?.public_id);
              }
            }}
          >
            {({ open }) => {
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
                      priority={true}
                    />
                  ) : (
                    <User className="w-16 h-16 "></User>
                  )}
                </Button>
              );
            }}
          </CldUploadWidget>
        </div>
        <form onSubmit={handleSubmit(handleChange)}>
          <div className="flex justify-center w-full">
            <Card className="w-[540px] mb-8">
              <CardContent>
                <CardTitle className="mb-6 mt-3">Editar informações</CardTitle>
                <div className="space-y-4">
                  <div className="">
                    <Label className="block mb-2" id="nome" htmlFor="nome">
                      NomeDeUsuário
                    </Label>
                    <Input
                      defaultValue={user?.nome}
                      {...register("nome")}
                      name="nome"
                      id="nome"
                    ></Input>
                  </div>
                  <div className="">
                    <Label className="block mb-2" id="email" htmlFor="email">
                      Email
                    </Label>
                    <Input
                      defaultValue={user?.email}
                      {...register("email")}
                      name="email"
                      id="email"
                    ></Input>
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
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-8"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <div>
                    <Label className="block mb-2" htmlFor="passwordConfirm">
                      Confirmar senha
                    </Label>
                    <Input
                      {...register("passwordConfirm")}
                      id="passwordConfirm"
                      placeholder="Confirme sua senha "
                      type={showPassword ? "text" : "password"}
                      name="passwordConfirm"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button className="bg-[#64BCED] hover:bg-[#1d465c]">
                      Finalizar
                    </Button>
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
};

export default Perfil;
