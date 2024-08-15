import axios from "axios";

type Car = {
    ano:string,
    descricao:string,
    nomeDoAutomovel:string,
    imageUrl:string[],
    marca:string,
    modelo:string,
    preco:string,
    tempo:string,
    user:any
}

const VehicleReq = async (id: string) => {
    try{
        const response = await axios.get("http://localhost:8080/anuncio/"+id)
        console.log(response)
        return response.data as unknown as Car
    } catch(error) {
        console.log(error)
        throw(error)
    }

}

export default VehicleReq