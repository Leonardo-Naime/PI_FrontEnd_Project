import axios from "axios"

const YearBetween = async(yearMin:number, yearMax:number) => {
    try{
        const response = await axios.get("http://localhost/8080/anuncio/ano-entre/"+yearMin+"/"+yearMax)
        return response
    } catch(error){
        console.log(error)
    }
}

export default YearBetween