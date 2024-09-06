import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from "@/components/ui/command"
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import AllBrands from "@/services/APIs/allBrands";

const OpenedFilter = ({onFilter}:any) => {
  const { register, handleSubmit, setValue } = useForm();
  const [openBrand, setOpenBrand] = useState(false)
  const [brandValue, setBrandValue] = useState("")
  const [brands, setBrands] = useState<any[]>([])
  const [brandName, setBrandName] = useState<string>()
  const [dataLoaded, setDataLoaded] = useState<boolean>(false)

  useEffect(() => {
    const fetchBrands = async () => {
      const brandsData = await AllBrands();
      if (brandsData) {
        setBrands(brandsData.data);
      }
    };
    fetchBrands();
  }, []);

  const handleFilter = (data:any) => {
    onFilter(data)
    console.log(brandName)
  }

  return (
    <div className=" left-0 right-0 bg-white border shadow-md p-4 mt-2 w-full">
      <form
        className="flex flex-col items-center space-y-4"
        onSubmit={handleSubmit(handleFilter)}
      >
        <div className="flex flex-rol space-x-8">
          <div>
            <div>
              <Label>Ano</Label>
            </div>
            <div className="flex space-x-4">
              <div className="">
                <Input
                  className="w-32"
                  id="mixyear"
                  {...register("minyear")}
                  placeholder="De"
                  inputMode="numeric"
                  pattern="[0-9]{1,3}(.[0-9]{2})?"
                  maxLength={4}
                  onKeyPress={(e) => {
                    const keyCode = e.which || e.keyCode;
                    if (keyCode < 48 || keyCode > 57) {
                      // Block non-numeric characters
                      e.preventDefault();
                    }
                  }}
                ></Input>
              </div>
              <div>
                <Input
                  className="w-32"
                  id="maxyear"
                  {...register("maxyear")}
                  placeholder="Até"
                  inputMode="numeric"
                  pattern="[0-9]{1,3}(.[0-9]{2})?"
                  maxLength={4}
                  onKeyPress={(e) => {
                    const keyCode = e.which || e.keyCode;
                    if (keyCode < 48 || keyCode > 57) {
                      // Block non-numeric characters
                      e.preventDefault();
                    }
                  }}
                ></Input>
              </div>
            </div>
          </div>
          <div>
            <div>
              <Label>Preço</Label>
            </div>
            <div className="flex space-x-4">
              <div className="">
                <Input
                  className="w-32"
                  id="precomin"
                  {...register("precomin")}
                  placeholder="De"
                  inputMode="numeric"
                  pattern="[0-9]{1,3}(.[0-9]{2})?"
                  maxLength={4}
                  onKeyPress={(e) => {
                    const keyCode = e.which || e.keyCode;
                    if (keyCode < 48 || keyCode > 57) {
                      // Block non-numeric characters
                      e.preventDefault();
                    }
                  }}
                ></Input>
              </div>
              <div>
                <Input
                  className="w-32"
                  id="precomax"
                  {...register("precomax")}
                  placeholder="Até"
                  inputMode="numeric"
                  pattern="[0-9]{1,3}(.[0-9]{2})?"
                  maxLength={4}
                  onKeyPress={(e) => {
                    const keyCode = e.which || e.keyCode;
                    if (keyCode < 48 || keyCode > 57) {
                      // Block non-numeric characters
                      e.preventDefault();
                    }
                  }}
                ></Input>
              </div>
            </div>
          </div>
          <div>
            <div><Label>Marca</Label></div>
            <Popover open={openBrand} onOpenChange={setOpenBrand}>
             <PopoverTrigger asChild>
               <Button
                 variant="outline"
                 role="combobox"
                 aria-expanded={openBrand}
                 className="w-56 justify-between bg-white"
               >
                 {brandValue
                   ? brands.find((brands) => brands.nome === brandValue)?.nome
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
                         value={brands.nome}
                         onSelect={(currentValue) => {
                          setValue('marca', currentValue)
                           setBrandValue(
                             currentValue === brandValue ? "" : currentValue
                           );
                           setDataLoaded(false)
                           setBrandName(currentValue);
                           setOpenBrand(false);
                         }}
                       >
                         <Check
                           className={cn(
                             "mr-2 h-4 w-4",
                             brandValue === brands.nome
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
        </div>

        <div>
          <Button className="bg-[#64BCED] hover:bg-[#4baee4] w-64">
            Filtrar
          </Button>
        </div>
      </form>
    </div>
  );
}

export default OpenedFilter