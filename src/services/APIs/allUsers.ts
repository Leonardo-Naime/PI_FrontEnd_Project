import axios from "axios";

const UsersReq = async () => {
    try{
        const response = await axios.get("http://localhost:8080/User")
        return response.data.content;
    } catch(error) {
        console.log(error)
        throw error
    }
}

export default UsersReq