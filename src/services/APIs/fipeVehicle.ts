import axios from 'axios';

const FipeVehicle = async (brandId:string, modelId:string, yearId:string) => {
    try{
        const response = await axios.get("https://parallelum.com.br/fipe/api/v1/carros/marcas/"+brandId+"/modelos/"+modelId+"/anos/"+yearId) 
        return response
    } catch(error){
        console.log(error)
    }
}

export default FipeVehicle