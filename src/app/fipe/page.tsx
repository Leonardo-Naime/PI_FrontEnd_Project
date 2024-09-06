"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/contexts/authContext";
import { useContext, useEffect, useState } from "react";
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
import Header from "@/components/header/header";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import DefaultFooter from "@/components/footer/footer";
import FipeVehicle from "@/services/APIs/fipeVehicle";

type vehicleData = {
  AnoModelo: "string"
CodigoFipe: "string"
Combustivel: "string"
Marca: "string"
MesReferencia: "string"
Modelo: "string"
SiglaCombustivel: "string"
TipoVeiculo: "string"
Valor: "string"
};

const Fipe = () => {
  const [openBrand, setOpenBrand] = useState(false)
  const [openModel, setOpenModel] = useState(false)
  const [openYears, setOpenYears] = useState(false)
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
  const [dataLoaded, setDataLoaded] = useState<boolean>(false)
  const [fipeVehicle, setFipeVehicle] = useState<vehicleData>()
  const router = useRouter();
  const ctxfunc = useContext(AuthContext);
  const user = ctxfunc.user;

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

  useEffect(() => {
    const fetchFipe = async () => {
      if(brandId && modelId && yearsId){
        const response = await FipeVehicle(brandId, modelId,yearsId)
        if(response){
          setDataLoaded(true)
          setFipeVehicle(response.data)
        }
      }
    }
    fetchFipe()
  }, [brandId, modelId, yearsId])

 return (
   <div className="bg-[#EEEE]">
     <div>
       <Header />
     </div>
     <div className="flex justify-center items-center space-x-14">
       <div className="flex justify-center items-center flex-col space-y-10 py-32">
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
                 className="w-56 justify-between bg-white"
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
                           setBrandValue(
                             currentValue === brandValue ? "" : currentValue
                           );
                           setDataLoaded(false)
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
                 className="w-56 justify-between bg-white"
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
                             setModelValue(
                               currentValue === modelValue ? "" : currentValue
                             );
                             setDataLoaded(false)
                             setModelId(model.codigo);
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
                 className="w-56 justify-between bg-white"
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
                             setDataLoaded(false)
                             setYearsId(years.codigo);
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
       </div>
       {dataLoaded === true && fipeVehicle ? (
         <div className="flex justify-center items-center">
           <Card>
             <CardTitle className="p-4">Resultado</CardTitle>
             <CardContent className="space-y-2">
               <p>Modelo:{fipeVehicle?.Modelo}</p>
               <p>Marca:{fipeVehicle?.Marca}</p>
               <p>Combustivel:{fipeVehicle?.Combustivel}</p>
               <p>Valor:{fipeVehicle?.Valor}</p>
               <p>Ano{fipeVehicle?.AnoModelo}</p>
             </CardContent>
           </Card>
         </div>
       ) : (
         <div></div>
       )}
     </div>
     <div>
       <DefaultFooter />
     </div>
   </div>
 );
}

export default Fipe