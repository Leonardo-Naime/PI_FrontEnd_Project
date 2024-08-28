import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button";
import { CalendarDays, Gauge } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";

type Car = {
  id:string,
  ano:string,
  descricao:string,
  imageUrl:string[],
  marca:string,
  modelo:string,
  preco:string,
  tempoDeUso:string,
  user:any
}

const VehicleCard = ({vehicle}:{vehicle:Car}) => {
  const url = usePathname().split('/').pop() as string
  const garagem = "minhagaragem"
  const router = useRouter()

  return (
    <main>
      <Card className=" border-none">
        <CardContent className=" rounded-lg overflow-hidden flex justify-center p-0">
          <div className="">
            <div className="w-full">
              <div className="w-full"
              onClick={() => router.push(`/vehicle/${vehicle.id}`)}>
                <CldImage
                className="w-96 h-96"
                  width={1000}
                  height={1000}
                  src={vehicle.imageUrl[0]}
                  alt={vehicle.modelo}
                />
              </div>
            </div>
            <div className="bg-[#64BCED] h-1 "></div>
            <div className="font-sans text-sm p-6 pt-2 flex justify-between">
              <div>
                <div>{vehicle.modelo.split(' ')[0]} </div>
                <div className="mb-2 text-zinc-400">{vehicle.marca}</div>
                <div className="flex text-[12px]">
                  <div className="flex items-center mr-2">
                    <Gauge className="h-3 w-3 mr-1" />
                    <div>{vehicle.tempoDeUso} km</div>
                  </div>
                  <div className="flex items-center">
                    <CalendarDays className="h-3 w-3 mr-1" />
                    <div>{vehicle.ano}</div>
                  </div>
                </div>
              </div>
              <div className="items-center flex flex-col justify-between">
                <div>Por R${vehicle.preco}</div>
                {url === garagem ? (
                  <Button
                    className="bg-[#64BCED] w-32"
                    onClick={() => router.push(`/vehicle/${vehicle.id}`)}
                  >
                    Visualizar anúncio
                  </Button>
                ) : (
                  <Button
                    onClick={() => router.push(`/vehicle/${vehicle.id}`)}
                    className="bg-[#64BCED] w-32"
                  >
                    Sobre
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

export default VehicleCard