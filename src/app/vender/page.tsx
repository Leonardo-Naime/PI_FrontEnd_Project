"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/contexts/authContext";
import registrarVeiculo from "@/services/APIs/vehicleAuthentication";
import { useContext, useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
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
import AllModels from "@/services/APIs/allModels";
import AllYears from "@/services/APIs/allYears"

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
  const [openYears, setOpenYears] = useState(false)
  const [nameBrand, setNameBrand] = useState()
  const [nameModel, setNameModel] = useState()
  const [brandValue, setBrandValue] = useState("")
  const [modelValue, setModelValue] = useState("")
  const [yearsValue, setYearsValue] = useState("")
  const [brands, setBrands] = useState<any[]>([])
  const [brandId, setBrandId] = useState<string>()
  const [models, setModels] = useState<any[] | null>([]);
  const [modelId, setModelId] = useState<string>()
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [years, setYears] = useState<any[] | null>([]);
  const [yearsId, setYearsId] = useState<string>()
  const [yearsLoaded, setYearsLoaded] = useState(false);
  const [publicId, setPublicId] = useState<string[]>([]);
  const router = useRouter();
  const ctxfunc = useContext(AuthContext);
  const user = ctxfunc.user;
  const { register, handleSubmit } = useForm<vehicleData>();

  useEffect(() => {
    const fetchBrands = async () => {
      const brandsData = await AllBrands();
      if (brandsData) {
        setBrands(brandsData.data);
        setModelsLoaded(false)
        setYearsLoaded(false)
      }
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    const fetchModels = async () => {
      if(brandId){
        const response = await AllModels(brandId);
        if(response?.data){
          setModels(response.data.modelos || []);
          console.log(response.data.modelos)
          setModelsLoaded(true);
          setYearsLoaded(false)
        }
      }
    };
    fetchModels();
  }, [brandId]);

  useEffect(() => {
    const fetchYears = async () => {
      if(brandId && modelId){
        const response = await AllYears(brandId, modelId)
        if(response){
          setYears(response.data)
          console.log(response.data)
          setYearsLoaded(true)
        }
      }
    }
    fetchYears()
  }, [modelId])

  const handleVehicle = async (data: vehicleData) => {
    const yearsIdValue = yearsId || "";
    const nameBrandValue = nameBrand || "";
    const nameModelValue = nameModel || "";
    const response = await registrarVeiculo(
      yearsIdValue,
      data.descricao,
      publicId,
      nameBrandValue,
      nameModelValue,
      data.preco,
      data.tempo,
      user
    );
    if (response.status === 200) {
      console.log(response)
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
                {brandValue
                  ? brands.find((brands) => brands.codigo === brandValue)?.nome
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
                    {brands.map((brands, index) => (
                      <CommandItem
                        key={index}
                        value={brands.codigo}
                        onSelect={(currentValue) => {
                          setNameBrand(brands.nome)
                          setBrandValue(
                            currentValue === brandValue ? "" : currentValue
                          );
                          setBrandId(currentValue);
                          setOpenBrand(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            brandValue === brands.codigo
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {brands.nome}
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
                disabled={!models || models.length === 0}
              >
                {modelValue
                  ? models && models.length > 0
                    ? models.find((model) => model.nome === modelValue)?.nome
                    : "Carregando modelos..."
                  : "Selecionar modelo..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-0">
              <Command>
                <CommandInput placeholder="Buscar modelo..." />
                <CommandList>
                  <CommandEmpty>Nenhum modelo encontrado.</CommandEmpty>
                  <CommandGroup>
                    {modelsLoaded && models !== null ? (
                      models.map((model) => (
                        <CommandItem
                          key={model.codigo}
                          value={model.codigo}
                          onSelect={(currentValue) => {
                            setNameModel(model.nome)
                            setModelValue(
                              currentValue === modelValue ? "" : currentValue
                            );
                            setModelId(model.codigo)
                            setOpenModel(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              modelValue === model.nome
                              ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {model.nome}
                        </CommandItem>
                      ))
                    ) : (
                      <div></div>
                    )}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div>
        <Label className="block mb-2" htmlFor="ano">
            Ano
          </Label>
        <Popover open={openYears} onOpenChange={setOpenYears}>
            <PopoverTrigger asChild>
              <Button
                id="ano"
                variant="outline"
                role="combobox"
                aria-expanded={openYears}
                className="w-56 justify-between bg-[#EEEEEE]"
                disabled={!years || years.length === 0}
              >
                {yearsValue
                  ? years && years.length > 0
                    ? years.find((years) => years.codigo === yearsValue)?.nome
                    : "Viajando no tempo?..."
                  : "Selecionar anos..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-0">
              <Command>
                <CommandInput placeholder="Buscar ano..." />
                <CommandList>
                  <CommandEmpty>Nenhum ano encontrado.</CommandEmpty>
                  <CommandGroup>
                    {yearsLoaded && years !== null ? (
                      years.map((years) => (
                        <CommandItem
                          key={years.codigo}
                          value={years.codigo}
                          onSelect={(currentValue) => {
                            setYearsValue(
                              currentValue === yearsValue ? "" : currentValue
                            );
                            setYearsId(years.codigo)
                            setOpenYears(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              yearsValue === years.codigo
                              ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {years.nome}
                        </CommandItem>
                      ))
                    ) : (
                      <div></div>
                    )}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div>
        </div>
        <div>
          <div>
            <Label className="block mb-2" htmlFor="tempo">
              Quilometragem
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
