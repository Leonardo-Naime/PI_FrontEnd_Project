import axios from "axios"

const LikeVehicles = async (idAnuncio:any, idUser:any) => {
    try{
        const result = await axios.post("http://localhost:8080/anuncio/"+idAnuncio+"/like/"+idUser)
        console.log("like!!", result)
        return result
    } catch(error){
        console.log(error)
    }


}

export default LikeVehicles