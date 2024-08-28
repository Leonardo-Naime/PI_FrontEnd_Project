"use client"

import DefaultFooter from "@/components/footer/footer"
import Header from "@/components/header/header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import UsersReq from "@/services/APIs/allUsers"
import DeleteUser from "@/services/APIs/deleteUser"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Car, Trash2, User } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { CldImage } from "next-cloudinary"

type User = {
  nome: string,
  email: string,
  fotoDePerfil:string,
  id: string
}

const Control = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const FetchUsers = async () => {
      const allusers: User[] = await UsersReq();
      setUsers(allusers);
    };
    FetchUsers();
  }, [users]);

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="justify-center flex">
        <ScrollArea className="h-96 w-[540px] rounded-md border">
          <div>
            {users.map((object, index) => (
              <>
                <Card key={index} className="border-0">
                  <CardContent className="p-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="ml-10">
                        {object?.fotoDePerfil ? (
                    <CldImage
                      className="rounded-full border-none w-10 h-10"
                      width={400}
                      height={400}
                      src={object.fotoDePerfil}
                      alt="FotoDePerfil"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#64BCED] items-center flex justify-center">
                      <User className="w-5 h-5 rounded-full bg-transparent" color="white"></User>
                    </div>
                  )}
                        </div>
                        <div className="ml-2">{object.nome}</div>
                      </div>
                      <div className="mr-10">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button className="bg-[#64BCED] h-6 rounded-lg">
                              Editar
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-white p-0">
                            <DropdownMenuItem className="flex p-0">
                              <Link
                                href={`/`}
                                className={cn(
                                  buttonVariants({ variant: "ghost" }),
                                  "w-full justify-start"
                                )}
                              >
                                <User className="mr-2 h-4 w-4" />
                                Ver perfil
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex p-0">
                              <Link
                                href={`/home/paineldecontrole/garagem/${object.id}`}
                                className={cn(
                                  buttonVariants({ variant: "ghost" }),
                                  "w-full justify-start"
                                )}
                              >
                                <Car className="mr-2 h-4 w-4" />
                                Acessar garagem
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex p-0">
                              <Button
                                className="bg-red-500 hover:bg-red-800 rounded-none w-full"
                                onClick={async () =>
                                  await DeleteUser(object.id)
                                }
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Deletar usuário
                              </Button>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div>
        <DefaultFooter />
      </div>
    </div>
  );
}

export default Control