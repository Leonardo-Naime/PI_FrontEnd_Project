"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/contexts/authContext";
import registrarVeiculo from "@/services/APIs/vehicleAuthentication";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Check, ChevronsUpDown, Mountain } from "lucide-react";
import AllBrands from "@/services/APIs/allBrands";

const marcas = [
  {
    codigo: "1",
    nome: "Acura",
  },
  {
    codigo: "2",
    nome: "Agrale",
  },
  {
    codigo: "3",
    nome: "Alfa Romeo",
  },
  {
    codigo: "4",
    nome: "AM Gen",
  },
  {
    codigo: "5",
    nome: "Asia Motors",
  },
]

const modelo = [
  {
    codigo: "1",
    nome: "Carro bomba",
  },
  {
    codigo: "2",
    nome: "Mermaid",
  },
  {
    codigo: "3",
    nome: "Romano a gas",
  },
  {
    codigo: "4",
    nome: "Amarok geração",
  },
  {
    codigo: "5",
    nome: "Samba canção",
  },
]

type vehicleData = {
  modelo: string;
  marca: string;
  ano: string;
  tempo: string;
  preco: string;
  descricao: string;
  imageUrl: string[];
  user: any;
};

const CadastroVeiculo = () => {
  const [openBrand, setOpenBrand] = useState(false)
  const [openModel, setOpenModel] = useState(false)
  const [value, setValue] = useState("")
  const [brands, setBrands] = useState<any[]>([])
  const [brandId, setBrandId] = useState<string>()
  const [models, setModels] = useState()
  const [modelId, setModelId] = useState()
  const [publicId, setPublicId] = useState<string[]>([]);
  const router = useRouter();
  const ctxfunc = useContext(AuthContext);
  const user = ctxfunc.user;
  const { register, handleSubmit } = useForm<vehicleData>();

  useEffect(() => {
    const handleAllBrands = async () => {
      // const response = await AllBrands();
    }
    handleAllBrands()
  })

  const handleVehicle = async (data: vehicleData) => {
    console.log(publicId)
    const response = await registrarVeiculo(
      data.ano,
      data.descricao,
      publicId,
      data.marca,
      data.modelo,
      data.preco,
      data.tempo,
      user
    );
    if (response.status === 200) {
      console.log(publicId)
      router.push("/minhagaragem/");
    } else {
      console.log("erro ao registrar veículo", response);
    }
  };

  return (
    <div className=" flex flex-col justify-center items-center w-full 2xl:h-screen">
      <div className="flex flex-col items-center space-y-4">
        <Mountain className="w-10 h-10 mt-2" />
        <p className="font-serif">Anunciar Veículo</p>
      </div>
      <form
        onSubmit={handleSubmit(handleVehicle)}
        className="flex flex-col justify-center items-center space-y-4 mt-6"
      >
        <div>
          <Label className="block mb-2" htmlFor="ano">
            Marca
          </Label>
          <Popover open={openBrand} onOpenChange={setOpenBrand}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openBrand}
                className="w-56 justify-between bg-[#EEEEEE]"
              >
                {value
                  ? marcas.find((marcas) => marcas.codigo === value)?.nome
                  : "Selecionar marca..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-0">
              <Command>
                <CommandInput placeholder="Buscar marca..." />
                <CommandList>
                  <CommandEmpty>Marca não encontrada.</CommandEmpty>
                  <CommandGroup>
                    {marcas.map((marcas, index) => (
                      <CommandItem
                        key={index}
                        value={marcas.codigo}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setBrandId(currentValue);
                          setOpenBrand(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === marcas.codigo
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {marcas.nome}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label className="block mb-2" htmlFor="ano">
            Modelo
          </Label>
          <Popover open={openModel} onOpenChange={setOpenModel}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openModel}
                className="w-56 justify-between bg-[#EEEEEE]"
              >
                {value
                  ? modelo.find((modelo) => modelo.codigo === value)?.nome
                  : "Selecionar modelo..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-0">
              <Command>
                <CommandInput placeholder="Buscar modelo..." />
                <CommandList>
                  <CommandEmpty>No modelo found.</CommandEmpty>
                  <CommandGroup>
                    {modelo.map((modelo) => (
                      <CommandItem
                        key={modelo.codigo}
                        value={modelo.codigo}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpenModel(false);
                          
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === modelo.codigo
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {modelo.nome}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <div>
            <Label className="block mb-2" htmlFor="ano">
              Ano
            </Label>
            <Input
              className="bg-[#EEEEEE]"
              {...register("ano")}
              id="ano"
              placeholder="Ex:1989"
              name="ano"
              inputMode="numeric"
              pattern="[0-9]{1,3}(.[0-9]{2})?"
              maxLength={4}
              onKeyPress={(e) => {
                const keyCode = e.which || e.keyCode;
                if (keyCode === 46 || keyCode === 44) {
                  // Allow decimal point or comma
                  return;
                }
                if (keyCode < 48 || keyCode > 57) {
                  // Block non-numeric characters
                  e.preventDefault();
                }
              }}
            ></Input>
          </div>
        </div>
        <div>
          <div>
            <Label className="block mb-2" htmlFor="tempo">
              Kilometragem
            </Label>
            <Input
              className="bg-[#EEEEEE]"
              {...register("tempo")}
              id="tempo"
              placeholder="Ex:17000"
              name="tempo"
              inputMode="numeric"
              pattern="[0-9]{1,3}(.[0-9]{2})?"
              maxLength={6}
              onKeyPress={(e) => {
                const keyCode = e.which || e.keyCode;
                if (keyCode === 46 || keyCode === 44) {
                  // Allow decimal point or comma
                  return;
                }
                if (keyCode < 48 || keyCode > 57) {
                  // Block non-numeric characters
                  e.preventDefault();
                }
              }}
            ></Input>
          </div>
        </div>
        <div>
          <div>
            <Label className="block mb-2" htmlFor="preco">
              Preço
            </Label>
            <Input
              className="bg-[#EEEEEE]"
              {...register("preco")}
              id="preco"
              placeholder="Ex:R$ 5.800"
              name="preco"
              inputMode="numeric"
              pattern="[0-9]{1,3}(.[0-9]{2})?"
              maxLength={9}
              onKeyPress={(e) => {
                const keyCode = e.which || e.keyCode;
                if (keyCode === 46 || keyCode === 44) {
                  // Allow decimal point or comma
                  return;
                }
                if (keyCode < 48 || keyCode > 57) {
                  // Block non-numeric characters
                  e.preventDefault();
                }
              }}
            ></Input>
          </div>
        </div>
        <div className="pb-4">
          <div>
            <Label className="block mb-2" htmlFor="descricao">
              Descrição
            </Label>
            <Input
              className="bg-[#EEEEEE]"
              {...register("descricao")}
              id="descricao"
              placeholder="Ex:Um carro moderno completo, 2.0 compacto, sem: porta, sinto, banco"
              name="descricao"
            ></Input>
          </div>
        </div>
        <div>
          <CldUploadWidget
            uploadPreset="ml_default"
            options={{
              maxFiles: 10,
              maxFileSize: 10485760,
              multiple: true,
            }}
          >
            {({ open, results, error }) => {
              if (results?.event === "success") {
                if (
                  results?.info?.public_id &&
                  !publicId.includes(results?.info?.public_id)
                ) {
                  setPublicId([...publicId, results?.info?.public_id]);
                  console.log(publicId);
                }
              }
              return (
                <Button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    open();
                  }}
                  className="bg-[#64BCED]"
                >
                  Upload an Image
                </Button>
              );
            }}
          </CldUploadWidget>
        </div>
        <Button className="bg-[#64BCED]" type="submit">
          Confirmar
        </Button>
      </form>
    </div>
  );
};

export default CadastroVeiculo;
