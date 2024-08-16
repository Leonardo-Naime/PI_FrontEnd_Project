import axios from "axios";

const registrarVeiculo = async (
    ano:string,
    descricao:string,
    images:string[],
    marca:string,
    modelo:string,
    preco:string,
    tempoDeUso:string,
    user:any
) => {
    try {
        const response = await axios.post('http://localhost:8080/anuncio',{
            marca:marca,
            modelo:modelo,
            tempoDeUso:tempoDeUso,
            ano:ano,
            preco:preco,
            descricao:descricao,
            imageUrl: images,
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