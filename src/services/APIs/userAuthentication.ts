import axios from 'axios';

const logarUsuario = async (
    email: string, 
    senha: string,
) => {
  console.log(email, senha)
  try {
    const response = await axios.post("http://localhost:8080/auth", {
      email:email,
      senha:senha,
    });
    
    if (!response) {
        throw new Error('Login failed');
      }
      // console.log(response.data);
      return response;
    } catch (error) {
      console.log(error)
      throw error;
    }
};

export default logarUsuario;