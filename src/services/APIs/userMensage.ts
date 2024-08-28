import axios from "axios"


const UserMensage = async (mensage:string, num:string, anuncioId:string, userId:string) => {
    try {
        const response = await axios.post("http://localhost:8080/anuncio/"+anuncioId+"/comentario/"+userId,{
            comentario:mensage,
            numero: num
        })
        return response 
    } catch(error){
        console.log(error)
    }
}

export default UserMensage