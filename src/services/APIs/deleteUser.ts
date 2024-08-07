import axios from "axios";

const DeleteUser = (id: any) => {
    console.log(id)
    try {
        const response = axios.delete("http://localhost:8080/User/delete/"+id)
    } catch {

    }
}

export default DeleteUser