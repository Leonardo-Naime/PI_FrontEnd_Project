import axios from "axios"


const AllModels = async (brandId:string) => {
    try {
        const response = await axios.get("http://localhost:8080/fipe/marcas/"+brandId+"/modelos")
        return response 
    } catch(error){
        console.log(error)
    }
}

export default AllModels