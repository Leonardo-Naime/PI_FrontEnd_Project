import axios from "axios"

const PriceBetween = async(precoMin:any, precoMax:any) => {
    try{
        const response = await axios.get("http://localhost/8080/anuncio/preco-entre/"+precoMin+"/"+precoMax)
        return response
    } catch(error){
        console.log(error)
    }
}

export default PriceBetween