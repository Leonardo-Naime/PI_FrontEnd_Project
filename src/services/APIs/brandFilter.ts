import axios from "axios"

const BrandFilter = async(marca:any) => {
    try{
        const response = await axios.get("http://localhost/8080/anuncio/marca/"+marca)
        return response
    } catch(error){
        console.log(error)
    }
}

export default BrandFilter