"use client"

import DefaultFooter from "@/components/footer/footer"
import { useState } from 'react';
import { CldImage, CldUploadWidget } from 'next-cloudinary'; // Certifique-se de que o CldUploadWidget está importado corretamente
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AuthContext } from "@/contexts/authContext"
import { useContext } from "react"
import Image from "next/image";
import { User } from "lucide-react";


const Perfil = () => {
  const [publicId, setPublicId] = useState<string>('');
  const {user} = useContext(AuthContext)

  return (
    <main className="">
      <div className="">
        <div className="bg-slate-200 w-full h-48 z-0 relative mb-16">
          <CldUploadWidget
          uploadPreset="ml_default"
        >
          {({ open, results, error }) => {
            if (results?.event === 'success') {
              console.log('Uploaded image:', results.info);
              setPublicId(results?.info?.public_id);
              console.log('Public ID:', results?.info?.public_id);
            }
            return (
              <Button
                className="z-10 bg-black rounded-full w-32 h-32 absolute inset-x-0 bottom-0 transform translate-y-1/2 translate-x-10 border-none"
                type="button"
                onClick={(e) => {
                  e.preventDefault(); // Impede o envio do formulário
                  open();
                }}
              >
                {publicId? (
                  <CldImage
                  className="w-full h-full rounded-full border-none"
                    width={400}
                    height={400}
                    src={publicId}
                    alt="FotoDePerfil"
                  />
                ):(
                  <User className="w-16 h-16"></User>
                )}
              </Button>
            );
          }}
        </CldUploadWidget>
        </div>
        <div className="flex justify-center w-full">
          <Card className="w-[540px]">
            <CardContent>
              <CardTitle className="mb-6 mt-3">Editar informações</CardTitle>
              <div className="space-y-4">
                <div className="space-y-8">
                  <Input></Input>
                  <Input></Input>
                  <Input></Input>
                  <Input></Input>
                </div>
                <div className="flex justify-end">
                  <Button>Finalizar</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <DefaultFooter></DefaultFooter>
        </div>
      </div>
    </main>
  );
}
  
  export default Perfil

  