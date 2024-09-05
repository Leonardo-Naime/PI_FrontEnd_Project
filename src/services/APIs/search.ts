import axios from "axios"

const SearchBar = async(pesquisa:any, pageNumber:any) => {
    try{
        const response = await axios.get(`http://localhost:8080/anuncio/search?page=${pageNumber}&size=20&query=`+pesquisa)
        return response
    } catch(error){
        console.log(error)
    }
}

export default SearchBar