import axios from "axios"

type Data = {
    yearMin:string,
    yearMax:string,
    precoMin:number,
    precoMax:number,
    marca:string
}

const FilterAll = async (data: Data, search:string, page:any, userId:any) => {
    console.log("Dados enviados:", data);
    try {
        const requestBody = {
            anoMin: data.yearMin,
            anoMax: data.yearMax,
            precoMin: data.precoMin,
            precoMax: data.precoMax,
            query: search,
            marca: data.marca,
            user_Id: userId
        };
        console.log(search)
        const response = await axios.get(`http://localhost:8080/anuncio/filtro?page=${page}&size=20`,{params:requestBody} );
        // console.log("Resposta recebida:", response.data);
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Erro na solicitação:", error.response?.data);
        } else {
            console.error("Erro desconhecido:", error);
        }
    }
}

export default FilterAll