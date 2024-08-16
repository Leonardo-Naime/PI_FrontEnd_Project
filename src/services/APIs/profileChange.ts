import axios from "axios"

type UserUpdate = {
    nome: string;
    email: string;
    senha: string;
    confirmarSenha: string;
    fotoDePerfil: string;
}

const ProfileChange = async (User:any, UserUpdateDTO:UserUpdate) => {
    try{
        console.log("lomba", UserUpdateDTO.fotoDePerfil)
        const result = await axios.put("http://localhost:8080/User/"+User.id,{
            nome: UserUpdateDTO.nome,
            email: UserUpdateDTO.email,
            senha: UserUpdateDTO.senha,
            confirmarSenha: UserUpdateDTO.confirmarSenha,
            fotoDePerfil: UserUpdateDTO.fotoDePerfil,
            admState: User.admState
        })
        console.log(result)
        return result
    } catch (error) {
        console.log(error)
    }
}

export default ProfileChange