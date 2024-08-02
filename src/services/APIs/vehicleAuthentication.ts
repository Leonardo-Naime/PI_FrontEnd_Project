import axios from "axios";

const registrarVeiculo = async (
    ano:string,
    descricao:string,
    nome:string,
    imagem:string,
    marca:string,
    modelo:string,
    preco:string,
    tempo:string,
    user:any
) => {
    try {
        console.log(user)
        const response = await axios.post('http://localhost:8080/anuncio',{
            marca:marca,
            modelo:modelo,
            nomeDoAutomovel:nome,
            tempoDeUso:tempo,
            ano:ano,
            preco:preco,
            descricao:descricao,
            imagemUrl:imagem,
            user:{
                id: user.id
             }
        });

        if(!response.data) {
            throw new Error('Vehicle registration failed')
        }
        console.log('response.data',response.data)
        console.log('response', response)
        return response

    } catch(error) {
        throw error;
    }
}

export default registrarVeiculo