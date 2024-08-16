import axios from 'axios';

const AllYears = async (brandId:any, modelId:any) => {
    try{
        const response = await axios.get("http://localhost:8080/fipe/marcas/"+brandId+"/modelos/"+modelId+"/anos") 
        return response
    } catch(error){
        console.log(error)
    }
}

export default AllYears