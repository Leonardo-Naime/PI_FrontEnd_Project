"use client"

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { MountainIcon, User, LogOut, Car, CarFront } from "lucide-react"
import { useContext } from "react"
import { Button, buttonVariants } from "../ui/button"
import { AuthContext } from "@/contexts/authContext"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import Link from "next/link"
import { cn } from "@/lib/utils"




const Header = () => {
    const navigation = ['Comprar', 'Vender', 'FIPE', 'Sobre']
    const { user, signOut } = useContext(AuthContext)

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
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white">
                <DropdownMenuItem className="flex ">
                  <Link
                    href={`/`}
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
