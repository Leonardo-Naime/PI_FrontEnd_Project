import axios from "axios"

const UnlikeVehicles = async (idAnuncio:any, idUser:any) => {
    try{
        const result = await axios.post("http://localhost:8080/anuncio/"+idAnuncio+"/unlike/"+idUser)
        console.log("dislike:(", result)
        return result
    } catch(error){
        console.log(error)
    }


}

export default UnlikeVehicles