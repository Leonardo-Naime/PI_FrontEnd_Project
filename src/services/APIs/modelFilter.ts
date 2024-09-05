import axios from "axios"

const ModelFilter = async(model:any) => {
    try{
        const response = await axios.get("http://localhost/8080/anuncio/modelo/"+model)
        return response
    } catch(error){
        console.log(error)
    }
}

export default ModelFilter