import axios from "axios"

type UserUpdate = {
    nome: string;
    email: string;
    senha: string;
    confirmarSenha: string;
    fotoDePerfil: string;
}

const ProfileChange = async (idUser:any, UserUpdateDTO:UserUpdate) => {
    try{
        console.log("lomba", UserUpdateDTO.fotoDePerfil)
        const result = await axios.put("http://localhost:8080/User/"+idUser,{
            nome: UserUpdateDTO.nome,
            email: UserUpdateDTO.email,
            senha: UserUpdateDTO.senha,
            confirmarSenha: UserUpdateDTO.confirmarSenha,
            fotoDePerfil: UserUpdateDTO.fotoDePerfil
        })
        console.log(result)
        return result
    } catch (error) {
        console.log(error)
    }
}

export default ProfileChange