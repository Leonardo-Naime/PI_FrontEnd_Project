"use client"

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { MountainIcon, User, LogOut, Car, CarFront, Cctv} from "lucide-react"
import { useContext, useEffect } from "react"
import { Button, buttonVariants } from "../ui/button"
import { AuthContext } from "@/contexts/authContext"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { CldImage } from "next-cloudinary"




const Header = () => {
    const navigation = ['Comprar', 'Vender', 'FIPE', 'Sobre']
    const { user, signOut } = useContext(AuthContext)

    useEffect(() => {

    }, [user])

    return (
      <main className="bg-[#FFFFFF] h-20 flex flex-row items-center justify-between px-4">
        <div className="w-28">
          <Link href={"/home"}>
            <MountainIcon className="" size={28} />
          </Link>
        </div>
        {/* Gera os botões nomeados no array */}
        <div className="">
          {navigation.map((item, index) => (
            <Link
              key={index}
              href={`/${item.toLowerCase()}`}
              className={cn(buttonVariants({ variant: "ghost" }), "p-10")}
            >
              {item}
            </Link>
          ))}
        </div>
        <div className="text-sm font-medium w-28 z-10">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="rounded-full flex justify-end w-full p-0"
                  variant={"link"}
                >
                  <div className="absolute right-16">{user?.nome}</div>
                  {user.fotoDePerfil ? (
                    <CldImage
                      className="w-10 h-10 rounded-full border-none"
                      width={400}
                      height={400}
                      src={user.fotoDePerfil || ''}
                      alt="FotoDePerfil"
                    />
                  ):(
                    <div className="w-10 h-10 rounded-full bg-[#64BCED] items-center flex justify-center">
                      <User className="w-5 h-5 rounded-full bg-transparent" color="white"></User>
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white">
              <DropdownMenuItem className="flex ">
                  <Link
                    href={`/home/paineldecontrole`}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "w-full justify-start"
                    )}
                  >
                    <Cctv className="mr-2 h-4 w-4" />
                    Painel de Controle
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex ">
                  <Link
                    href={`/perfil`}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "w-full justify-start"
                    )}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Perfil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex">
                  <Button asChild variant={"ghost"}>
                    <Link href={"/minhagaragem"}>
                      <CarFront className="mr-2 h-4 w-4" />
                      <span>Meus anúncios</span>
                    </Link>
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex">
                  <Button
                    asChild
                    variant={"ghost"}
                    onClick={async () => await signOut()}
                    className="w-full justify-start"
                  >
                    <Link href={"/home"}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sair </span>
                    </Link>
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex flex-row">
              <Button className="p-10" asChild variant={"ghost"}>
                <Link href="/home/login">Entrar</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
    );
}

export default Header;
