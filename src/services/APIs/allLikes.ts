import axios from "axios";

const UsersLikeReq = async (id:any) => {
    try{
        const response = await axios.get("http://localhost:8080/anuncio/"+id+"/likes")
        return response.data;
    } catch(error) {
        console.log(error)
        throw error
    }
}

export default UsersLikeReq