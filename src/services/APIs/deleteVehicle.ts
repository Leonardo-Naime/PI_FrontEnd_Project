import axios from "axios";

const DeleteVehicle = (id: any) => {
    console.log(id)
    try {
        const response = axios.delete("http://localhost:8080/anuncio/delete/"+id)
    } catch {

    }
}

export default DeleteVehicle