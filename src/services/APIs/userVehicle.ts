import axios from "axios";

type Car = {
    ano:string,
    descricao:string,
    nomeDoAutomovel:string,
    imagemUrl:string,
    marca:string,
    modelo:string,
    preco:string,
    tempoDeUso:string,
    user:any
  }

const UserVehicle = async (userId:any) => {
    // console.log("user", userId)
    try{
    const response = await axios.get<Car>("http://localhost:8080/anuncio/id-user/"+userId)
    // console.log(response)
    console.log(response.data)
    return response.data

    } catch (error) {
        console.log(error)
        return[]
    }
}

export default UserVehicle