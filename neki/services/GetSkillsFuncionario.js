import axios from "axios"

export const getSkillsFuncionario = async (userId,tokem) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/funcionarios/${userId}/skills/listar`,{
            headers: {
                Authorization: `Bearer ${tokem}`
            }
        }); 
        console.log(response)
        return response.data; // Retorna os dados obtidos da API (um array de objetos com as informações das skills)
    } catch (e) {
        console.log(e.response)
        return e.response
    }
}