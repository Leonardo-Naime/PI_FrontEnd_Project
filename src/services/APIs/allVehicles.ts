import axios, { AxiosResponse } from "axios";

type Car = {
    ano:string,
    descricao:string,
    nome:string,
    imagem:string,
    marca:string,
    modelo:string,
    preco:string,
    tempo:string,
    user:any
}

const allCars = async ():Promise<AxiosResponse<Car[], any>> => {
    try {
        const response = await axios.get<Car[]>("http://localhost:8080/anuncio")
        return response
    } catch(error) {
        console.log(error)
        return { data: [] } as unknown as AxiosResponse<Car[], any>;
    }

}

export default allCars