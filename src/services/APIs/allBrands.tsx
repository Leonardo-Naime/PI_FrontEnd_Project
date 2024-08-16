import axios from "axios"

const AllBrands = async () => {
    try {
        const response = await axios.get("http://localhost:8080/fipe/marcas")
        return response 
    } catch(error){
        console.log(error)
    }
}

export default AllBrands